const crypto = require('crypto')

exports.handler = async (event) => {

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  console.log('Webhook received')

  // 1. Verify Chip-in RSA signature
  const signature = event.headers['x-signature']

  // Normalize the public key — Netlify env vars may have literal \n or missing PEM headers
  const rawKey = process.env.CHIPIN_PUBLIC_KEY || ''
  console.log('Public key first 60 chars:', rawKey.substring(0, 60))
  const base64Key = rawKey
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/-----BEGIN RSA PUBLIC KEY-----/g, '')
    .replace(/-----END RSA PUBLIC KEY-----/g, '')
    .replace(/\\n/g, '')
    .replace(/\s+/g, '')
  console.log('Base64 key length:', base64Key.length)
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${base64Key.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`

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
  console.log('Full payload:', JSON.stringify(payload))

  if (payload.event_type !== 'purchase.paid') {
    return { statusCode: 200, body: 'Ignored' }
  }

  const buyerEmail = payload.client?.email

  console.log('Buyer email:', buyerEmail)

  // 3. Match product from success_redirect URL (e.g. "https://ejencukai.my/ebook/thank-you/b")
  const successRedirect = payload.success_redirect || ''
  console.log('Success redirect:', successRedirect)

  const PRODUCT_MAP = {
    be: {
      url:   process.env.EBOOK_BE_URL,
      label: 'Panduan Asas Cukai Individu Bergaji (Borang BE)',
    },
    b: {
      url:   process.env.EBOOK_B_URL,
      label: 'Panduan Asas Cukai Individu Berbisnes (Borang B)',
    },
  }

  // Check 'be' before 'b' to avoid substring false-match
  let productKey = null
  if (successRedirect.includes('/thank-you/be')) productKey = 'be'
  else if (successRedirect.includes('/thank-you/b')) productKey = 'b'

  console.log('Product key:', productKey)

  const product = PRODUCT_MAP[productKey]

  if (!product) {
    console.warn(`Could not determine product from success_redirect: "${successRedirect}"`)
    return { statusCode: 200, body: 'Unknown product' }
  }

  const { url: ebookUrl, label: ebookLabel } = product

  if (!ebookUrl) {
    console.error(`Ebook URL not set for slug: ${slug}`)
    return { statusCode: 200, body: 'OK' }
  }

  console.log(`Payment confirmed for ${buyerEmail} — ${ebookLabel}`)
  return { statusCode: 200, body: 'OK' }
}
