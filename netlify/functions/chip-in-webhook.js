const crypto = require('crypto')

exports.handler = async (event) => {

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  console.log('Webhook received')

  // 1. Verify Chip-in RSA signature
  const signature = event.headers['x-signature']
  const rawKey = process.env.CHIPIN_PUBLIC_KEY || ''

  // Netlify env vars store newlines as literal \n — convert them back
  const publicKey = rawKey.replace(/\\n/g, '\n')

  if (!signature) {
    console.warn('Missing x-signature header')
    return { statusCode: 200, body: 'OK' }
  }

  if (!publicKey) {
    console.error('CHIPIN_PUBLIC_KEY env var is not set')
    return { statusCode: 200, body: 'OK' }
  }

  let isValid = false
  try {
    isValid = crypto
      .createVerify('SHA256')
      .update(event.body)
      .verify(publicKey, signature, 'base64')
  } catch (err) {
    console.error('Signature verification error:', err.message)
  }

  if (!isValid) {
    console.warn('Invalid Chip-in signature — check CHIPIN_PUBLIC_KEY format')
    return { statusCode: 200, body: 'OK' }
  }

  console.log('Signature verified')

  // 2. Parse payload
  let payload
  try {
    payload = JSON.parse(event.body)
  } catch (err) {
    console.error('Failed to parse payload:', err.message)
    return { statusCode: 200, body: 'OK' }
  }

  console.log('Event type:', payload.event_type)

  if (payload.event_type !== 'purchase.paid') {
    return { statusCode: 200, body: 'Ignored' }
  }

  const buyerEmail = payload.client?.email
  const buyerName  = payload.client?.full_name || 'Pelanggan'

  console.log('Buyer email:', buyerEmail)

  // 3. Match payment link slug to correct ebook
  const slug = payload.purchase?.payment_page_uid
  console.log('Payment slug received:', slug)
  console.log('Expected BE slug:', process.env.CHIPIN_SLUG_BE)
  console.log('Expected B slug:', process.env.CHIPIN_SLUG_B)

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
    console.warn(`Unknown payment slug: "${slug}" — check CHIPIN_SLUG_BE and CHIPIN_SLUG_B env vars`)
    return { statusCode: 200, body: 'Unknown product' }
  }

  const { url: ebookUrl, label: ebookLabel } = product

  if (!ebookUrl) {
    console.error(`Ebook URL not set for slug: ${slug}`)
    return { statusCode: 200, body: 'OK' }
  }

  console.log(`Sending email to ${buyerEmail} for: ${ebookLabel}`)

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

  const resendBody = await emailRes.text()

  if (!emailRes.ok) {
    console.error('Resend error:', emailRes.status, resendBody)
    return { statusCode: 200, body: 'Email failed' }
  }

  console.log(`Email sent successfully to ${buyerEmail} — ${ebookLabel} | Resend response: ${resendBody}`)
  return { statusCode: 200, body: 'OK' }
}
