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
  → Matches Payment Link slug to correct ebook
  → Sends email via Resend with Google Drive link
  → Buyer redirected to ejencukai.my/ebook/thank-you/be (or /b)
  → Thank-you page shows a "Buka E-Book" button linking to Google Drive
```

**Stack:** Netlify Functions · Resend · Chip-in Webhook · Google Drive

---

## Repo Structure

```
ejencukai-repo/
├── netlify/
│   └── functions/
│       └── chip-in-webhook.js    ← serverless webhook receiver
├── src/
│   └── components/
│       ├── EbookPage.tsx         ← landing page with buy buttons
│       └── EbookThankYou.tsx     ← post-payment page (one per product)
└── .env.example                  ← copy to .env for local dev, never commit .env
```

---

## Step 1 — Set Up Chip-in Payment Links

In your Chip-in Merchant Portal:

1. Go to **Collect → Payment Links** → create two payment links:
   - `Panduan Asas Cukai Individu Bergaji (Borang BE)` — set your price, slug e.g. `borangbe`
   - `Panduan Asas Cukai Individu Berbisnes (Borang B)` — set your price, slug e.g. `borangb`

2. Set the **Success Redirect URL** for each payment link separately:
   - Borang BE → `https://ejencukai.my/ebook/thank-you/be`
   - Borang B  → `https://ejencukai.my/ebook/thank-you/b`

3. Copy the **slug** from each payment URL — the last part of:
   ```
   https://pay.chip-in.asia/YOUR_SLUG_HERE
   ```
   Both slugs go into your environment variables in Step 3.

4. Go to **Developers → Webhooks → New Live Webhook**:
   - Name: `Ebook Delivery`
   - Callback URL: `https://ejencukai.my/.netlify/functions/chip-in-webhook`
   - Event: `purchase.paid`
   - Click **Create**

5. Copy the **Public Key** that Chip-in generates — you will need it in Step 3.

> **How product matching works:** The webhook identifies which ebook was purchased using
> `purchase.payment_page_uid` in the Chip-in payload — the slug from the payment link URL.
> Set `CHIPIN_SLUG_BE` and `CHIPIN_SLUG_B` to match exactly.

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

  if (payload.event_type !== 'purchase.paid') {
    return { statusCode: 200, body: 'Ignored' }
  }

  const buyerEmail = payload.client.email
  const buyerName  = payload.client.full_name

  // 3. Match payment link slug to correct ebook
  // CHIPIN_SLUG_BE / CHIPIN_SLUG_B = slug from pay.chip-in.asia/SLUG
  // EBOOK_BE_URL / EBOOK_B_URL = Google Drive view links
  const slug = payload.purchase?.payment_page_uid

  const PRODUCT_MAP = {
    [process.env.CHIPIN_SLUG_BE]: {
      url:   process.env.EBOOK_BE_URL,
      label: 'Panduan Asas Cukai Individu Bergaji (Borang BE)',
    },
    [process.env.CHIPIN_SLUG_B]: {
      url:   process.env.EBOOK_B_URL,
      label: 'Panduan Asas Cukai Individu Berbisnes (Borang B)',
    },
  }

  const product = PRODUCT_MAP[slug]

  if (!product) {
    console.warn(`Unknown payment slug: ${slug} | buyer: ${buyerEmail}`)
    return { statusCode: 200, body: 'Unknown product' }
  }

  const { url: ebookUrl, label: ebookLabel } = product

  // 4. Send delivery email with Google Drive link
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'EjenCukai <contact@ejencukai.my>',
      to: buyerEmail,
      subject: `E-book anda sedia dibuka — ${ebookLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p>Assalamualaikum ${buyerName},</p>

          <p>Terima kasih kerana membeli <strong>${ebookLabel}</strong> daripada EjenCukai.</p>

          <p>Klik butang di bawah untuk membuka e-book anda:</p>

          <p style="margin: 24px 0;">
            <a href="${ebookUrl}"
               style="background:#1a56db; color:#fff; padding:12px 24px;
                      border-radius:6px; text-decoration:none; font-weight:600;">
              Buka E-Book
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
    return { statusCode: 200, body: 'Email failed' }
  }

  console.log(`Ebook link sent to ${buyerEmail} — ${ebookLabel}`)
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
| `CHIPIN_SLUG_BE` | Payment link slug for Borang BE (e.g. `borangbe`) |
| `CHIPIN_SLUG_B` | Payment link slug for Borang B (e.g. `borangb`) |
| `RESEND_API_KEY` | Your Resend API key |
| `EBOOK_BE_URL` | Google Drive view link for Borang BE PDF |
| `EBOOK_B_URL` | Google Drive view link for Borang B PDF |

### For Local Dev

Copy `.env.example` to `.env` and fill in the values. Never commit `.env`.

```env
CHIPIN_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
...paste full key here...
-----END PUBLIC KEY-----"
CHIPIN_SLUG_BE=borangbe
CHIPIN_SLUG_B=borangb
RESEND_API_KEY=re_xxxxxxxxxxxx
EBOOK_BE_URL=https://drive.google.com/file/d/YOUR_BE_FILE_ID/view?usp=sharing
EBOOK_B_URL=https://drive.google.com/file/d/YOUR_B_FILE_ID/view?usp=sharing
```

---

## Step 4 — Host the PDF Files on Google Drive

1. Upload both PDFs to Google Drive
2. Right-click each file → **Share** → set to "Anyone with the link can view"
3. Copy the sharing URL — it looks like:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
4. Paste the Borang BE URL into `EBOOK_BE_URL` and the Borang B URL into `EBOOK_B_URL`

The same URLs go in both the Netlify env vars (for the webhook email) and in
`EbookThankYou.tsx` (for the thank-you page button).

---

## Step 5 — Landing Page CTAs (`EbookPage.tsx`)

Update the payment link constants at the top of `EbookPage.tsx`:

```tsx
const CHIPIN_BE_URL = 'https://pay.chip-in.asia/borangbe'  // your actual slug
const CHIPIN_B_URL  = 'https://pay.chip-in.asia/borangb'   // your actual slug
```

---

## Step 6 — Thank You Pages (`EbookThankYou.tsx`)

Update the Google Drive URLs in `EbookThankYou.tsx`:

```tsx
const EBOOK_CONFIG = {
  be: {
    label:    'Panduan Cukai Individu Bergaji (Borang BE)',
    driveUrl: 'https://drive.google.com/file/d/YOUR_BE_FILE_ID/view?usp=sharing',
  },
  b: {
    label:    'Panduan Cukai Individu Berbisnes (Borang B)',
    driveUrl: 'https://drive.google.com/file/d/YOUR_B_FILE_ID/view?usp=sharing',
  },
}
```

Two separate routes are already wired up in `App.tsx`:
- `/ebook/thank-you/be` → shows Borang BE button only
- `/ebook/thank-you/b`  → shows Borang B button only

Each page has a single **Buka E-Book** button that opens the correct Drive file in a new tab.

---

## Testing the Webhook Locally

Use [ngrok](https://ngrok.com) to expose your local Netlify dev server:

```bash
# Terminal 1 — start Netlify dev
npx netlify dev

# Terminal 2 — expose to internet
ngrok http 8888
```

Temporarily set your Chip-in webhook callback URL to the ngrok URL:
```
https://xxxx.ngrok.io/.netlify/functions/chip-in-webhook
```

To confirm the correct slug field name, log the full payload during a test payment:
```js
console.log('Full payload:', JSON.stringify(payload, null, 2))
```

Check Netlify function logs to verify `payload.purchase.payment_page_uid` matches your
slugs. Adjust the field path if Chip-in uses a different key name.

---

## Deployment Checklist

- [ ] `netlify/functions/chip-in-webhook.js` created
- [ ] All 6 environment variables set in Netlify dashboard
- [ ] `CHIPIN_SLUG_BE` and `CHIPIN_SLUG_B` match your payment link slugs exactly
- [ ] `EBOOK_BE_URL` and `EBOOK_B_URL` are Drive view links — tested in browser
- [ ] Chip-in webhook configured with correct callback URL and `purchase.paid` event
- [ ] Chip-in success redirect URLs set per product:
      - Borang BE → `ejencukai.my/ebook/thank-you/be`
      - Borang B  → `ejencukai.my/ebook/thank-you/b`
- [ ] `EbookPage.tsx` — `CHIPIN_BE_URL` and `CHIPIN_B_URL` updated to real payment links
- [ ] `EbookThankYou.tsx` — `driveUrl` values updated for both BE and B
- [ ] End-to-end test: sandbox payment → email received → Drive link opens correctly
- [ ] `.env` confirmed in `.gitignore`

---

## How Chip-in Retries Work

If your function returns anything other than `200`, Chip-in will retry the webhook
multiple times — the buyer could receive duplicate emails. Always return
`{ statusCode: 200 }` even when something goes wrong, and log errors to Netlify's
function logs instead. Handle failures through the Resend dashboard and Chip-in's
transaction log manually if needed.

---

*Last updated: April 2026*  
*Stack: Netlify Functions · Chip-in Webhook · Resend · Google Drive*
