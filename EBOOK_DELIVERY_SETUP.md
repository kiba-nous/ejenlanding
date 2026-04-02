# Ebook Delivery System — EjenCukai

Automated ebook delivery after Chip-in payment. No third-party middleware. One Netlify function, one Resend email.

---

## Architecture Overview

```
Buyer clicks "Beli Sekarang" on ejencukai.my/ebook
  → Chip-in hosted payment page (BE or B link)
  → Payment confirmed
  → Chip-in fires POST webhook
  → ejencukai.my/.netlify/functions/chip-in-webhook
  → Verifies signature
  → Matches Product ID to correct ebook
  → Sends email via Resend with ebook download link
```

**Stack:** Netlify Functions · Resend · Chip-in Webhook · Google Drive (PDF hosting)

---

## Repo Structure

Add the following to your existing ejencukai.my repo:

```
ejencukai-repo/
├── netlify/
│   └── functions/
│       └── chip-in-webhook.js    ← serverless webhook receiver
├── src/
│   └── pages/
│       └── ebook/
│           ├── index.html        ← landing page (or .jsx/.astro)
│           └── thank-you.html    ← post-payment confirmation page
└── .env                          ← local dev only, never commit
```

---

## Step 1 — Set Up Chip-in Payment Links

In your Chip-in Merchant Portal:

1. Go to **Collect → Products** → create two products:
   - `Panduan Asas Cukai Individu Bergaji (Borang BE)` — set your price
   - `Panduan Asas Cukai Individu Berbisnes (Borang B)` — set your price

2. For each product, generate a **Payment Link**

3. Set the **Success Redirect URL** for both to:
   ```
   https://ejencukai.my/ebook/thank-you
   ```

4. After creating each product, **copy the Product ID** from the product detail page. It is a UUID that looks like:
   ```
   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
   You need both IDs — they go into your environment variables in Step 3.

5. Go to **Developers → Webhooks → New Live Webhook**:
   - Name: `Ebook Delivery`
   - Callback URL: `https://ejencukai.my/.netlify/functions/chip-in-webhook`
   - Event: `purchase.paid`
   - Click **Create**

6. Copy the **Public Key** that Chip-in generates — you will need it in Step 3

---

## Step 2 — Create the Netlify Function

Create `netlify/functions/chip-in-webhook.js`:

```js
const crypto = require('crypto')

exports.handler = async (event) => {

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  // 1. Verify Chip-in RSA signature
  const signature = event.headers['x-signature']
  const publicKey = process.env.CHIPIN_PUBLIC_KEY

  let isValid = false
  try {
    isValid = crypto
      .createVerify('SHA256')
      .update(event.body)
      .verify(publicKey, signature, 'base64')
  } catch (err) {
    console.error('Signature verification error:', err)
  }

  // Always return 200 to Chip-in even on failure — prevents retries
  if (!isValid) {
    console.warn('Invalid Chip-in signature')
    return { statusCode: 200, body: 'OK' }
  }

  // 2. Parse payload
  const payload = JSON.parse(event.body)

  // Only handle paid purchases
  if (payload.event_type !== 'purchase.paid') {
    return { statusCode: 200, body: 'Ignored' }
  }

  const buyerEmail  = payload.client.email
  const buyerName   = payload.client.full_name
  const productId   = payload.purchase.products[0].id
  const productName = payload.purchase.products[0].name

  // 3. Match product to correct ebook using Chip-in Product ID
  // More reliable than string matching — IDs never change even if you rename the product
  // CHIPIN_PRODUCT_ID_BE and CHIPIN_PRODUCT_ID_B are the UUIDs from your Chip-in dashboard
  const PRODUCT_MAP = {
    [process.env.CHIPIN_PRODUCT_ID_BE]: {
      url:   process.env.EBOOK_BE_URL,
      label: 'Panduan Asas Cukai Individu Bergaji (Borang BE)',
    },
    [process.env.CHIPIN_PRODUCT_ID_B]: {
      url:   process.env.EBOOK_B_URL,
      label: 'Panduan Asas Cukai Individu Berbisnes (Borang B)',
    },
  }

  const product = PRODUCT_MAP[productId]

  if (!product) {
    // Unknown product ID — log for manual follow-up, don't crash
    console.warn(`Unknown product ID received: ${productId} | buyer: ${buyerEmail}`)
    return { statusCode: 200, body: 'Unknown product' }
  }

  const { url: ebookUrl, label: ebookLabel } = product

  // 4. Send delivery email via Resend
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'EjenCukai <contact@ejencukai.my>',
      to: buyerEmail,
      subject: `E-book anda sedia dimuat turun — ${ebookLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p>Assalamualaikum ${buyerName},</p>

          <p>Terima kasih kerana membeli <strong>${ebookLabel}</strong> daripada EjenCukai.</p>

          <p>Klik butang di bawah untuk memuat turun e-book anda:</p>

          <p style="margin: 24px 0;">
            <a href="${ebookUrl}"
               style="background:#1a56db; color:#fff; padding:12px 24px;
                      border-radius:6px; text-decoration:none; font-weight:600;">
              Muat Turun E-Book
            </a>
          </p>

          <p style="font-size:13px; color:#666;">
            Pautan ini adalah untuk kegunaan peribadi anda. Jangan kongsikan kepada orang lain.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:24px 0;" />

          <p style="font-size:13px; color:#666;">
            Sebarang pertanyaan? Hubungi kami di
            <a href="mailto:contact@ejencukai.my">contact@ejencukai.my</a>
          </p>

          <p style="font-size:13px; color:#666;">— Team EjenCukai</p>
        </div>
      `
    })
  })

  if (!emailRes.ok) {
    const err = await emailRes.text()
    console.error('Resend error:', err)
    // Still return 200 — log the error but don't trigger Chip-in retries
    return { statusCode: 200, body: 'Email failed' }
  }

  console.log(`Ebook delivered to ${buyerEmail} — ${ebookLabel} (product: ${productId})`)
  return { statusCode: 200, body: 'OK' }
}
```

---

## Step 3 — Environment Variables

### In Netlify Dashboard
Go to **Site → Environment Variables** and add:

| Key | Value |
|---|---|
| `CHIPIN_PUBLIC_KEY` | RSA public key from Chip-in Developers → Webhooks |
| `CHIPIN_PRODUCT_ID_BE` | Product ID UUID for Borang BE (from Chip-in product detail page) |
| `CHIPIN_PRODUCT_ID_B` | Product ID UUID for Borang B (from Chip-in product detail page) |
| `RESEND_API_KEY` | Your Resend API key |
| `EBOOK_BE_URL` | Direct download link for Borang BE PDF |
| `EBOOK_B_URL` | Direct download link for Borang B PDF |

### For Local Dev (never commit this file)
Create `.env` in your repo root:

```env
CHIPIN_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
...paste full key here...
-----END PUBLIC KEY-----"
CHIPIN_PRODUCT_ID_BE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CHIPIN_PRODUCT_ID_B=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxx
EBOOK_BE_URL=https://drive.google.com/...
EBOOK_B_URL=https://drive.google.com/...
```

Make sure `.env` is in your `.gitignore`.

---

## Step 4 — Host the PDF Files

**Quickest option — Google Drive:**
1. Upload both PDFs to Google Drive
2. Right-click → Share → set to "Anyone with the link can view"
3. Change the URL from:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
   to a direct download link:
   ```
   https://drive.google.com/uc?export=download&id=FILE_ID
   ```
4. Paste this into `EBOOK_BE_URL` / `EBOOK_B_URL`

**Better option later — Supabase Storage:**
Upload PDFs to a private Supabase Storage bucket and generate signed URLs that expire after 7 days. Add this when volume justifies it.

---

## Step 5 — Landing Page CTAs

In your `ebook/index.html` (or component), the buy buttons simply link to your Chip-in payment links:

```html
<!-- Borang BE -->
<a href="https://pay.chip-in.asia/YOUR_BE_LINK" target="_blank">
  Beli Sekarang — Borang BE
</a>

<!-- Borang B -->
<a href="https://pay.chip-in.asia/YOUR_B_LINK" target="_blank">
  Beli Sekarang — Borang B
</a>
```

Replace `YOUR_BE_LINK` and `YOUR_B_LINK` with the actual Chip-in payment URLs.

---

## Step 6 — Thank You Page

Create `ebook/thank-you.html` — a simple page buyers land on after payment. No logic needed here, just a confirmation message. The email with the download link is already on its way.

```html
<h1>Terima kasih atas pembelian anda!</h1>
<p>E-book akan dihantar ke emel anda dalam masa beberapa minit.</p>
<p>Semak folder Spam jika tidak menerima dalam 5 minit.</p>
```

---

## Testing the Webhook Locally

Use [ngrok](https://ngrok.com) to expose your local Netlify dev server:

```bash
# Terminal 1 — start Netlify dev
npx netlify dev

# Terminal 2 — expose to internet
ngrok http 8888
```

Then temporarily set your Chip-in webhook callback URL to the ngrok URL:
```
https://xxxx.ngrok.io/.netlify/functions/chip-in-webhook
```

Trigger a test payment in Chip-in's sandbox mode and confirm the email arrives.

---

## Deployment Checklist

- [ ] Netlify function file created at `netlify/functions/chip-in-webhook.js`
- [ ] All 6 environment variables set in Netlify dashboard
- [ ] Both Chip-in Product IDs copied correctly (not payment link URLs — the UUIDs)
- [ ] PDF files uploaded, direct download links tested in browser
- [ ] Chip-in webhook configured with correct callback URL and `purchase.paid` event
- [ ] Chip-in payment links created for both ebooks
- [ ] Success redirect URL set on both Chip-in products → `ejencukai.my/ebook/thank-you`
- [ ] Thank-you page live at `ejencukai.my/ebook/thank-you`
- [ ] End-to-end test done with Chip-in sandbox payment
- [ ] `.env` confirmed in `.gitignore`

---

## How Chip-in Retries Work

If your function returns anything other than `200`, Chip-in will retry the webhook multiple times. This means a buyer could receive duplicate emails. Always return `{ statusCode: 200 }` — even when something goes wrong — and log errors to Netlify's function logs instead. Handle failures through the Resend dashboard and Chip-in's transaction log manually if needed.

---

*Last updated: April 2026*
*Stack: Netlify Functions · Chip-in Webhook · Resend*
