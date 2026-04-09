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
  // CHIPIN_SLUG_BE / CHIPIN_SLUG_B = the slug from pay.chip-in.asia/SLUG
  // EBOOK_BE_URL / EBOOK_B_URL = Google Drive view links for each ebook
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
