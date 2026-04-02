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
