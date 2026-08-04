# Consultation Booking — Setup Guide

The code for the paid consultation flow is live in the repo. Three things
still need to be done **outside** the codebase before it can take money.

```
/konsultasi-peribadi          →  Chip-in checkout  →  /booking/thank-you  →  Calendly
(sales page + detail capture)    (RM149 payment)      (inline Calendly)      (slot booked)
```

**Price:** RM149 per hour · 60-minute session.

---

## 1. Create the Chip-in product ⬅️ required

Until this is done, the booking button falls back to WhatsApp so no lead is
lost — but nobody can pay.

1. Chip-in dashboard → create a payment link:
   - **Name:** Konsultasi Cukai Peribadi — 60 minit
   - **Price:** RM149
   - **Collect buyer name + email** at checkout (needed for reconciliation)
2. **Success redirect:** `https://ejencukai.my/booking/thank-you`
3. **Callback URL:** `https://ejencukai.my/.netlify/functions/chip-in-webhook`
   *(same webhook as the e-books — it already recognises this product)*
4. Copy the payment link and paste it into `src/config/site.ts`:

```ts
export const CHIPIN = {
  ebookBE: 'https://pay.chip-in.asia/borangbe',
  ebookB: 'https://pay.chip-in.asia/borangb',
  consultation: 'https://pay.chip-in.asia/YOUR-SLUG-HERE',  // ← paste here
};
```

That single line is the only change needed. The page switches from the
WhatsApp fallback to real checkout automatically.

---

## 2. Configure the Calendly event ⬅️ recommended

The embed currently points at `https://calendly.com/ejencukaimy`, which shows
your event picker. Buyers land one click from booking rather than directly on
it — fine to launch with, better to tighten.

1. Create an event type: **"Konsultasi Cukai Peribadi (60 minit)"**
2. Add a **required custom question: "No. WhatsApp"**
   → this must be the **first** custom question; the prefill code maps the
   stored phone number to Calendly's `a1` slot.
3. Add to the description: *"Sila sediakan penyata EA / rekod pendapatan anda
   sebelum sesi."*
4. Buffer: 10 min after. Minimum notice: 12 hours.
5. Reminders: email + SMS at 24h and 1h — this is what actually prevents
   no-shows.
6. Then update `src/config/site.ts` so buyers skip the picker:

```ts
export const CALENDLY_EVENT_URL = `${CALENDLY_BASE}/konsultasi-cukai-peribadi`;
```

---

## 3. Enable Netlify Forms ⬅️ required for the enquiry form

The `/form` page now saves each lead before handing off to WhatsApp. The
submission target is a hidden static form in `index.html` named `konsultasi`.

1. Deploy once — Netlify detects the form at build time.
2. Netlify dashboard → **Forms** → confirm `konsultasi` is listed.
3. Set up a **form notification** to your email so leads reach you instantly.

If Netlify Forms is not enabled, the save silently fails and the user still
gets handed to WhatsApp — the flow degrades, it doesn't break. But you'd lose
the written record, so verify step 2.

---

## How buyer details reach Calendly

Chip-in's success redirect doesn't reliably carry buyer fields, so the flow
captures name / email / WhatsApp on the sales page **before** checkout and
stashes them in `sessionStorage` (`ejc_booking`).

This is why checkout navigates in the **same tab** — a new tab gets a fresh
`sessionStorage` and the prefill would be lost. If you ever change that
`window.location.href` to `window.open`, the prefill silently stops working.

If the stash is missing (new tab, private mode, storage cleared), Calendly
simply asks for the details itself. It never blocks a booking.

---

## ⚠️ Known gap: `/booking/thank-you` is publicly reachable

Anyone with the URL can open it and book a slot without paying. This is an
accepted trade-off at current volume — the URL isn't linked anywhere, it's
`Disallow`ed in `robots.txt`, and Calendly still collects their details.

**Mitigation for now:** before each call, check the booking against your
Chip-in payments.

**Proper fix when volume justifies it (~2 hours):** have the webhook issue a
one-time token on `purchase.paid`, store it (Netlify Blobs), append it to the
success redirect, and have the page verify it via a function before rendering
Calendly. The same mechanism fixes the e-book delivery leak documented in
`WEBSITE_AUDIT.md` §7.1.

---

## Testing before launch

- [ ] `/konsultasi-peribadi` — form validates empty/short name, bad email, short phone
- [ ] Submitting with `CHIPIN.consultation` empty → opens WhatsApp with the message
- [ ] Submitting with the link set → lands on Chip-in checkout
- [ ] Complete a real RM149 payment → returns to `/booking/thank-you`
- [ ] Calendly loads inline, name/email prefilled
- [ ] Book a slot → success state appears, confirmation email arrives
- [ ] GA4 realtime shows `consultation_checkout_click` then `calendly_booked`
- [ ] Netlify → Forms shows a `konsultasi` submission from `/form`
