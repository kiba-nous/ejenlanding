# EjenCukai Website Audit & Improvement Plan

**Date:** 4 August 2026
**Scope:** `ejencukai.my` React landing site (`src/`), Tally forms, Chip-in payment flow, WhatsApp handoff
**Status:** ⚙️ **Partially implemented** — see [§11 What shipped](#11-what-shipped) for exactly what is now in the code and what is still open. Sections below are the original audit; code blocks in them are proposals unless §11 says otherwise.

**Decisions since the audit:**
- Consultation price is **RM149 per hour** (60-minute session), not the RM99/RM129 suggested in §2.3.
- Calendly is **`https://calendly.com/ejencukaimy`** — the open question in §5.5 is resolved.
- The Chip-in consultation product **has not been created yet**; the code ships with a WhatsApp fallback until it exists. See `CONSULTATION_SETUP.md`.

---

## 0. TL;DR — Top 10 actions, ranked

| # | Action | Impact | Effort | Section |
|---|--------|--------|--------|---------|
| 1 | Cut the consultation form from **9 required fields → 4**, branch Individu vs Perniagaan | 🔴 Very high | S | [§4](#4-form--whatsapp) |
| 2 | Auto-redirect form submit → **WhatsApp with pre-filled message** | 🔴 Very high | S–M | [§4](#4-form--whatsapp) |
| 3 | Fix the **e-book revenue leak** — `/ebook/thank-you/be` is public, anyone can take the PDF free | 🔴 Very high | S | [§7.1](#71-e-book-thank-you-pages-are-unprotected) |
| 4 | Add **testimonials + real trust proof** (currently zero social proof on the whole site) | 🔴 High | M | [§2.1](#21-you-have-no-social-proof-at-all) |
| 5 | Ship the **paid personal-tax consultation**: Chip-in → thank-you → Calendly | 🔴 High | M | [§5](#5-new-chip-in--calendly-booking-flow) |
| 6 | Remove/hide stale startup content: waitlist "Q3 2025", "500+ businesses", Investors in navbar | 🟠 High | S | [§3](#3-what-to-remove) |
| 7 | Add **meta description + Open Graph tags** — WhatsApp/FB shares currently render a blank card | 🟠 High | S | [§6.1](#61-metaog-tags-missing) |
| 8 | Add **deadline urgency** (30 April BE / 30 June B) — your single strongest conversion lever | 🟠 High | S | [§2.4](#24-no-urgency-anywhere) |
| 9 | Add a **404 / catch-all route** — unknown URLs currently render a blank white page | 🟠 Medium | S | [§6.3](#63-no-404-route--blank-page) |
| 10 | Fix **language inconsistency** (default BM, but half the UI is hardcoded English) | 🟡 Medium | M | [§2.6](#26-language-is-inconsistent) |

---

## 1. What the site is today

**Routes** (`src/App.tsx`):

| Route | Component | Audience | Verdict |
|-------|-----------|----------|---------|
| `/` | `Home` | Individuals + SMEs looking to hire a tax agent | Keep — main money page |
| `/form` | `FormPage` (Tally `dWbqvd`) | Leads | **Fix urgently** — see §4 |
| `/ebook` | `EbookPage` | Individuals, RM25/RM29 | Best-converting page you have |
| `/ebook/thank-you/be` \| `/b` | `EbookThankYou` | Buyers | **Unprotected** — see §7.1 |
| `/business` | `Business` + waitlist | SME waitlist for unlaunched product | Stale — see §3 |
| `/tax-firms` | `TaxFirms` + waitlist | Tax firms, unlaunched product | Stale — see §3 |
| `/investors` | `Investors` + investor form | VCs | Remove from public nav — see §3.2 |
| `/privacy-policy`, `/terms-of-service` | legal | — | Keep |
| `/about` | `AboutUs` | — | **Commented out** in `App.tsx:27` — see §2.2 |

**The core problem:** the site is trying to be two businesses at once.

- **Business A (real, earning money today):** an LHDN-registered tax agency selling filing/advisory at RM200–RM2,000, plus RM25–RM29 e-books.
- **Business B (aspirational):** an AI tax SaaS co-pilot / marketplace with a waitlist, a demo, and an investor deck.

A homeowner who lands on `/` looking for someone to file their BE form sees Business A in the hero, then a Play Store app, then an e-book, then agency pricing, then "Why Choose Us" — but the navbar offers them *Business*, *Tax Firms*, and *Investors*, which are all Business B. That split costs conversions on both sides.

**Recommendation:** make `/` 100% Business A. Move Business B behind its own entry point (a separate subdomain, or unlinked pages you share directly).

---

## 2. Marketing audit

### 2.1 You have no social proof at all

I searched every component: there is **not one testimonial, review, client logo, case study, star rating, or named person** anywhere on the site. For a service where the buyer is handing over their income data and IC number, this is the single biggest trust gap.

The only trust signals present are three unsourced text labels in `Hero.tsx:85-87`:

```
LHDN Registered   ·   30+ Years Experience   ·   100% Compliant
```

These are claims, not proof. "100% Compliant" in particular is a claim I'd soften — it's unverifiable and reads as marketing filler next to a real credential.

**What to add, in priority order:**

**a) Testimonial section on `/` (between `Features` and `Footer`), 3 cards.** The format that works for Malaysian tax services:

> "Saya ingat kena bayar cukai RM3,200. Lepas EjenCukai semak, rupanya saya terlepas pelepasan PRS dan insurans. Akhirnya dapat refund."
> — **Aiman R.**, Software Engineer, Selangor · *Borang BE 2024*

Rules for these:
- **Specific outcome + specific number.** "Bagus, terima kasih" converts nothing.
- **Real first name + surname initial + role + state.** Full anonymity kills credibility; full names create PDPA/consent work. First name + initial is the sweet spot — but still get written consent.
- **Say which form/service.** It lets the reader self-identify.
- Photo optional. A photo doubles credibility but a stock photo destroys it — no photo beats fake photo.

**b) A "results" strip.** Replace the vague trust indicators with countable facts you can defend:

```
LHDN-registered tax agent  ·  Borang BE, B & syarikat  ·  1,200+ borang difailkan  ·  Balas dalam 24 jam
```

Only use a number you can actually produce a record for. If you can't, drop the number and keep the qualitative claim.

**c) Screenshots of real WhatsApp messages** (names/numbers blurred). This is the highest-trust, lowest-effort proof format in the Malaysian market, and you already have the conversations sitting in your WhatsApp Business.

**d) Google Business Profile reviews.** You have none linked. Set up GBP for the KL address, drive every happy client to review, then embed the rating. It also wins you local SEO for "ejen cukai kuala lumpur".

**e) Compliance caution:** as a tax agent, never publish a testimonial that implies a **guaranteed** refund or guaranteed tax reduction, and don't publish client tax figures without written consent. Frame outcomes as "what we found in this case", not "what you will get".

### 2.2 There is no human behind the brand

`AboutUs.tsx` exists (287 lines) but the route is commented out at `App.tsx:27`, and the footer's "About Us" link (`Footer.tsx:35`) is dead plain text.

For a professional service, anonymity is a conversion killer. People hire *a tax agent*, not *a website*. Bring back an About page with:

- The lead agent's **name, photo, and LHDN tax agent licence number** (Sec. 153(3) approval number). That licence number is your strongest single trust asset and it's currently invisible.
- Where the "30+ years" comes from — whose 30 years?
- Firm name, SSM registration number, KL office address.

Then link it in the footer *and* the navbar. Review `AboutUs.tsx` content first — it was written for the SaaS positioning and likely needs a rewrite before it goes live.

### 2.3 The offer ladder has a RM25 → RM500 canyon

| Product | Price | Where |
|---------|-------|-------|
| E-book Borang BE | RM25 | `/ebook` |
| E-book Borang B | RM29 | `/ebook` |
| **← nothing here →** | **RM30–RM499** | — |
| Individual tax filing | RM500 | `PricingTiers.tsx:11` |
| Individual tax planning | RM500 | `PricingTiers.tsx:18` |
| Refund application | RM200 | `PricingTiers.tsx:25` |

A person who buys the RM25 e-book, reads it, and realises they want help has nowhere to go except a RM500 commitment or a free consultation form. That's a 20× jump.

**Fill it with the paid consultation you're asking for in §5 — RM99 or RM129 for 30 minutes.** It:
- monetises the traffic that currently bounces off the free form,
- filters out non-serious enquiries (huge time saving),
- makes no-shows rare (people show up for what they paid for),
- and converts upward if you credit the fee toward filing: *"Yuran RM99 ini akan ditolak dari yuran pemfailan jika anda teruskan dengan kami."*

Also worth adding: an **e-book bundle** (BE + B for RM45) and an **e-book → consultation upsell** on the thank-you page.

### 2.4 No urgency anywhere

Tax has the best natural deadline in any industry and you're not using it:

- **30 April** — Borang BE (e-Filing)
- **30 June** — Borang B (business income)
- **CP500** instalment dates

Add a deadline banner that changes by season. Even a static line under the hero CTA — *"Tarikh akhir e-Filing Borang BE: 30 April"* with a countdown in Feb–April — will lift form starts measurably. Pair it with a late-filing consequence, because the penalty is the real motivator: *"Denda lewat fail boleh mencecah 300% cukai kena bayar."*

Outside the season, switch the same slot to planning: *"Rancang cukai 2026 sekarang — sebelum tahun taksiran tutup."*

### 2.5 Hero has three competing CTAs

`Hero.tsx:52-75` renders three same-size buttons side by side:

1. Book Consultation (primary blue)
2. Ask AI 🤖 (outline → external `ai.ejencukai.my`)
3. Buy E-Book 📖 (outline)

Three CTAs = no CTA. Worse, #2 sends the visitor **off your site entirely** on their first click, to a chatbot that will answer their tax question for free — which is exactly the thing you want to charge for.

**Proposal:** one primary + one secondary.

```
[ Tempah Konsultasi ]   [ Beli E-Book RM25 ]
```

Move "Tanya AI" to the navbar as a small text link, or below the fold. Keep the emoji off the primary buttons — 🤖/📖 read as informal next to a licensed professional service.

Also: `hero.description` is thin — *"Professional tax services backed by 30+ years of LHDN-registered experience."* It says what you are, not what the reader gets. Try outcome-first:

> **BM:** "Kami uruskan cukai anda dari mula sampai habis — betul, tepat pada masa, dan tanpa risiko denda LHDN."
> **EN:** "We handle your tax filing end to end — accurate, on time, and audit-ready."

### 2.6 Language is inconsistent

`LanguageContext.tsx:213` defaults to `'bm'`, which is right for your market. But large parts of the UI ignore the translation system entirely and are hardcoded English:

| Location | Hardcoded English |
|----------|-------------------|
| `Hero.tsx:85-87` | "LHDN Registered", "30+ Years Experience", "100% Compliant" |
| `Footer.tsx:15-18` | "SST Compliance", "Income Tax Filing", "Financial Analytics", "LHDN Integration" |
| `Footer.tsx:27,32,35,36` | "Privacy Policy", "Terms of Service", "About Us", "Support" |
| `Footer.tsx:41` | "Contact" |
| `PricingTiers.tsx` | BM strings exist, but the service names read like translated-English, not natural BM |
| `EbookPage.tsx` | 100% BM, no EN toggle at all — the language switcher is a no-op on this page |

A BM-default visitor sees a half-English page, which undercuts the "kami faham anda" positioning. Two options:

- **Cheap fix:** move the remaining strings into `LanguageContext`, and hide the EN/BM toggle on `/ebook` since that page is BM-only.
- **Better fix (recommended):** commit to **BM-first everywhere**, keep EN as a genuine full translation, and have a native BM speaker rewrite `PricingTiers` and `Services` copy. The current BM reads machine-translated in places ("Mengganggu" for "Disruptive" in `Investors.tsx:20` is a good example of literal-translation drift).

Also, `index.html:2` declares `lang="en"` while the site defaults to BM — set it to `ms` (or update it with the toggle).

### 2.7 Pricing page has no CTA

`PricingTiers.tsx` renders 11 service cards with prices and descriptions — and **not a single button**. A visitor who reads "Individual Income Tax Filing · RM500" and wants it has to scroll past it, hit `Features`, and find the CTA there.

Every pricing card should have its own action: *"Tempah"* → `/form` with the service pre-selected (Tally hidden field), or straight to WhatsApp with the service name pre-filled.

Also, 11 cards in one flat list is a lot of cognitive load. Consider tabs (Individu / Bisnes) or collapsing the corporate list.

### 2.8 The e-book page is your best page — copy its pattern

`EbookPage.tsx` is genuinely well built: pain points → product comparison → guarantee strip → FAQ → repeated CTA → BM throughout. It does everything the homepage doesn't.

Two things it's still missing:
- **Social proof** — even 2 buyer quotes would lift it.
- **A preview.** Nobody buys a PDF sight-unseen. Add 2–3 page screenshots or a free sample chapter (which also becomes your lead magnet, see §2.9).

Then port the structure to `/` and to the future `/konsultasi-peribadi` page.

### 2.9 No free lead magnet = no email list

Every entry point is either paid (e-book, services) or high-commitment (9-field form). There's nothing that captures an email from someone who isn't ready to buy today — and in tax, "not ready today" means "ready in April".

**Add one free thing** in exchange for an email + WhatsApp number:

- *"Senarai Semak Pelepasan Cukai 2025"* — a 1-page PDF checklist of every relief with the limits
- or the first chapter of the BE e-book

Then run a simple sequence: checklist → 3 tips → e-book offer → consultation offer. This is the highest-ROI marketing asset you don't have.

### 2.10 Tracking is installed but measures nothing

`index.html:5-12` loads GA4 (`G-K8525HVM7Z`) with a default pageview config and **zero custom events**. You currently cannot answer: how many people clicked WhatsApp? started the form? finished it? clicked a Chip-in button?

Minimum event set to add:

| Event | Fires on |
|-------|----------|
| `whatsapp_click` | Floating button, footer, any `wa.me` link (with a `location` param) |
| `form_start` / `form_submit` | Tally `Tally.onOpen` / redirect |
| `ebook_checkout_click` | Chip-in button, with `product: be\|b` |
| `consultation_checkout_click` | New Chip-in consultation button |
| `calendly_booked` | Calendly `event_scheduled` postMessage |

Also missing: **Meta Pixel** and **TikTok Pixel**. If you ever intend to run paid social in Malaysia — and for a April-deadline business you should — install them now so the pixel has audience history before you spend.

---

## 3. What to remove

### 3.1 Stale waitlist content (remove or update — it's actively damaging)

`WaitlistForm.tsx:149-162` shows three stat blocks, embedded in both `/business` and `/tax-firms`:

```
500+          Q3 2025            50%
Businesses    Expected launch    Early bird discount
waiting
```

It is **August 2026**. "Expected launch Q3 2025" is over a year past due. Any visitor — customer, partner, or investor — reads this as an abandoned project. `footer.copyright` in `LanguageContext.tsx:108,207` also still says **© 2025**.

**Action:** delete the three stat blocks, or replace with current true numbers. Update the copyright to render the year dynamically. This is a 10-minute fix with outsized damage-control value.

### 3.2 `/investors` in the public navbar

`Navbar.tsx:20` puts *Investors / Pelabur* in the main nav, one click from every customer.

`Investors.tsx` publicly exposes market sizing, TAM, revenue-stream strategy, and positioning. Two problems: it dilutes a 5-item nav aimed at buyers, and it tells a prospective client that your attention is on fundraising rather than on their Borang B.

**Action:** remove from the navbar (and the mobile menu). Keep the route live so you can send the link directly to investors. Optionally move it to a footer link under a "Company" heading.

### 3.3 `/business` and `/tax-firms`

Both are marketing pages for a product that doesn't exist yet, ending in a waitlist for a launch date that has passed. `Business.tsx:142` also links to `chat.ejencukai.my` as a "See Demo".

**Decision needed.** Pick one:

- **If the marketplace/SaaS is still coming:** keep the pages, delete the stale stats, replace "Join Waitlist" with "Get notified", and remove them from the main nav (put them under a footer "Product" column).
- **If it's shelved:** delete both routes and both components, plus `WaitlistForm.tsx`. This also removes the fragile Tally-branding CSS hack (see §3.5).

Either way they should not occupy 2 of your 5 navbar slots while your actual paying services (`/form`, `/ebook`) occupy 1.

### 3.4 Dead footer links

`Footer.tsx:15-18` — "SST Compliance", "Income Tax Filing", "Financial Analytics", "LHDN Integration" are plain `<li>` text under a heading called "Features". They link nowhere, and they describe SaaS features you don't sell. `Footer.tsx:35-36` — "About Us" and "Support" are also dead text.

**Action:** replace the "Features" column with your **actual services**, each linking to the relevant section or to `/form`:

```
Perkhidmatan
├─ Pemfailan Cukai Individu      → /form
├─ Pemfailan Cukai Syarikat      → /form
├─ E-Book Borang BE & B          → /ebook
└─ Konsultasi Peribadi           → /konsultasi-peribadi
```

Make "About Us" a real link (§2.2) and point "Support" at WhatsApp.

### 3.5 The Tally branding-removal hack

`WaitlistForm.tsx:9-56` injects ~40 lines of CSS to hide Tally's "Made with Tally" badge, including a white overlay `<div>` positioned over the bottom 40px of the iframe (`WaitlistForm.tsx:123-131`).

Three problems:
1. It's brittle — any Tally DOM change breaks it, and the blanket selector `div[style*="font-size: 11px"]` is global and could hide unrelated elements.
2. The white overlay sits at `zIndex: 25` over the iframe's bottom edge — on short viewports it can cover the submit button.
3. Hiding the badge is typically **against Tally's free-plan terms**; the supported way to remove it is their paid plan.

**Action:** delete the hack. Either pay for Tally Pro, accept the badge, or move to a native form (§4.3) which removes the question entirely.

### 3.6 Unused translation keys

`LanguageContext.tsx` carries ~40 keys for the unlaunched SaaS (`features.gst.*`, `features.multiuser.*`, `features.ai.*`, `features.integration.*`, `features.automation.*`, `features.analytics.*`, `features.security.*`, `features.intelligence.*`, `features.alerts.*`, `features.monitoring.*`, `features.compliance.*`, `features.compliant.*`, `hero.title.part1`, `hero.tryDemo`, `hero.forBusinessDemo`, …). `Features.tsx` only uses three of them.

Harmless at runtime, but it makes the file hard to maintain and it's where you'd add real copy. Prune whatever the SaaS decision in §3.3 makes redundant.

### 3.7 Minor removals

- **`hero.askAI` from the hero** (§2.5) — keep the tool, demote the button.
- **The rotating-adjective animation** in `Business.tsx:14-34`, `TaxFirms.tsx:14-34`, `Investors.tsx:14-34` — `titleNumber` state is computed and never rendered in the JSX I reviewed. Dead state running a `setTimeout` loop every 2s on three pages.
- **`Investors.tsx:3` / `TaxFirms.tsx:3`** import `MoveRight` and `Button`; verify they're used or drop them (also `Business.tsx:3`).
- **`favicon`** is `/cal.png` (`index.html:14`) — use the actual logo mark.
- **`<title>Ejen Cukai </title>`** has a trailing space and no keywords — see §6.1.

---

## 4. Form → WhatsApp

### 4.1 What's wrong today

The consultation form (`FormPage.tsx:49`, Tally `dWbqvd`) asks **nine questions and every single one is required**:

| # | Field | Required | Problem |
|---|-------|:--------:|---------|
| 1 | Gelaran / Title | ✅ | Low value. Make optional or drop. |
| 2 | Nama / Name | ✅ | Keep. |
| 3 | Emel / Email | ✅ | Keep, but consider optional if you have WhatsApp. |
| 4 | Nombor telefon (WhatsApp) | ✅ | Keep — this is the money field. |
| 5 | **Nama syarikat** | ✅ | **Blocks every individual.** A salaried person filing BE has no company. |
| 6 | **Jenis syarikat** | ✅ | Same. |
| 7 | **Industri** | ✅ | Same. |
| 8 | Kategori | ✅ | Keep — this is your routing field. |
| 9 | Pertanyaan anda | ✅ | Keep, but make it optional. |

**Fields 5–7 make the form unanswerable for individual clients** — the largest segment of your traffic, and the exact audience the RM25 BE e-book attracts. They either type "N/A" three times or, far more likely, close the tab.

On top of that:
- Every extra required field costs roughly 5–10% of completions. Nine required fields on mobile is brutal.
- The form is in a **lazy-loaded iframe** with a fixed `height="694"` (`FormPage.tsx:52`) — it can clip or double-scroll on mobile.
- **There is no redirect after submit.** The user submits into a void, sees Tally's default thank-you inside the iframe, and nothing routes them to you. No WhatsApp handoff, no confirmation page, no GA4 conversion event.
- You then have to manually check Tally and reach out — losing the moment of highest intent.

### 4.2 Option A — Fix it inside Tally (fastest, ~1 hour, no code)

**Step 1 — Branch on client type.** Make the *first* question:

> **Anda ingin dapatkan bantuan untuk?**
> ○ Cukai peribadi (gaji / freelance)
> ○ Cukai perniagaan / syarikat

Then use Tally's **conditional logic** so that fields 5–7 (company name/type/industry) only appear when "perniagaan" is selected. Individuals never see them.

**Step 2 — Cut required fields to four:**

| Keep required | Make optional | Drop |
|---------------|---------------|------|
| Nama | Emel | Gelaran |
| No. WhatsApp | Pertanyaan | |
| Jenis klien (new Q1) | | |
| Kategori | | |

**Step 3 — Turn on the redirect.** In Tally → *Settings → After submission → Redirect to page*, and pipe the answers into the URL. Tally supports answer piping with `@field_name`:

```
https://wa.me/60103216650?text=Hi%20EjenCukai%2C%20saya%20@nama.%20Saya%20perlukan%20bantuan%20untuk%20@kategori.
```

That drops the user straight into WhatsApp with a pre-written message. You still get the full submission in Tally as backup.

**Step 4 — Add a hidden field** `sumber` populated from the URL (`?sumber=ebook`, `?sumber=hero`, `?sumber=pricing`) so you know which CTA produced each lead.

**Step 5 — Enable Tally's email + WhatsApp notification** to yourself so you respond within minutes, not hours.

### 4.3 Option B — Native React form (recommended, better conversion)

The iframe is the weakest link: it's slow, it can't be styled, it breaks the visual flow, it needs the branding hack, and it can't fire your analytics. A native form gives you full control and an instant WhatsApp handoff.

**Proposed UX — 3 short steps, one question per screen on mobile:**

```
Step 1  →  Untuk siapa?          [ Diri sendiri ]  [ Perniagaan saya ]
Step 2  →  Perkhidmatan apa?     [ Fail Borang BE ] [ Fail Borang B ] [ Cukai syarikat ]
                                 [ Perancangan cukai ] [ Lain-lain ]
Step 3  →  Nama + No. WhatsApp   (2 inputs, then submit)
```

Three taps and two text inputs versus nine required fields. Expect a large lift in completion.

**Proposed component** (`src/components/QuickConsultForm.tsx` — *not created*):

```tsx
const WHATSAPP_NUMBER = '60103216650'; // no +, no spaces

function buildWhatsAppUrl({ clientType, service, name }: Lead) {
  const message = [
    `Hi EjenCukai! Saya ${name}.`,
    ``,
    `Jenis klien: ${clientType}`,
    `Perkhidmatan: ${service}`,
    ``,
    `Boleh bantu saya?`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

async function handleSubmit(lead: Lead) {
  // 1. Persist the lead first — never lose it if WhatsApp fails to open
  await fetch('/.netlify/functions/save-lead', {
    method: 'POST',
    body: JSON.stringify(lead),
  });

  // 2. Track the conversion
  window.gtag?.('event', 'form_submit', {
    client_type: lead.clientType,
    service: lead.service,
  });

  // 3. Hand off to WhatsApp
  window.location.href = buildWhatsAppUrl(lead);
}
```

**Important details, easy to get wrong:**

- **Save the lead *before* redirecting.** If WhatsApp doesn't open (desktop without WhatsApp Web, blocked popup, user cancels), you must still have the contact. Use `await`, or `navigator.sendBeacon` if you need it to be non-blocking.
- **Use `window.location.href`, not `window.open`.** A redirect triggered inside an async callback is treated as a popup by mobile Safari and gets blocked. If you must use `window.open`, open it synchronously in the click handler and set `.location` afterward.
- **Use `wa.me`, not `api.whatsapp.com`** — `wa.me` handles the app-vs-web decision itself.
- **Pre-filled text is editable** by the user and is *not* guaranteed to send — it lands in their compose box. That's fine (it's still a warm intro), but never treat "redirected to WhatsApp" as "lead contacted you".
- **Desktop fallback:** show a confirmation screen with a *"Buka WhatsApp"* button and your number as copyable text, in case the redirect does nothing.
- **Keep `wa.link/57vmqo`** (the floating button in `WhatsAppButton.tsx:7`) or switch it to a `wa.me` link with pre-filled text — the short link can't carry a message, so it starts every chat cold.

**Where to store leads:** Netlify Forms (free, zero infra), a Google Sheet via Apps Script, or keep Tally as the store and POST to its API. Netlify Forms is the least work given you're already on Netlify.

### 4.4 WhatsApp operations (not code, but it's where leads die)

- Use **WhatsApp Business** with a greeting message, away message, and **saved replies** for the five questions you answer daily.
- Add **labels**: `Lead Baru`, `Quoted`, `Bayar`, `Fail Selesai` — a free CRM.
- Set **business hours** and say so on the site: *"Kami balas dalam 24 jam, Isnin–Jumaat 9am–6pm."* Under-promising the response time beats silence.
- Add a `whatsapp_click` GA4 event to every WhatsApp entry point with a `location` param so you learn which one works.

---

## 5. New: Chip-in → Calendly booking flow

**Goal:** sell a paid personal tax consultation. Buyer pays via Chip-in, lands on a thank-you page, and books their slot on your Calendly.

### 5.1 Recommended shape

```
/konsultasi-peribadi  (new sales page, BM)
        │
        │  [ Tempah Konsultasi · RM99 ]
        ▼
https://pay.chip-in.asia/konsultasi        ← new Chip-in product
        │  success_redirect
        ▼
/booking/thank-you                          ← new route
        │  embeds Calendly inline widget
        ▼
Calendly: "Konsultasi Cukai Peribadi (30 min)"
        │  on event_scheduled
        ▼
Confirmation + WhatsApp link
```

Chip-in first, Calendly second — **not the reverse**. If you let people book first and pay later, no-shows and unpaid bookings will eat your calendar. Paying is the qualification step.

### 5.2 Chip-in setup

Mirror exactly what you already do for the e-books (`EBOOK_DELIVERY_SETUP.md`):

1. Create a payment link product in the Chip-in dashboard: **"Konsultasi Cukai Peribadi — 30 minit"**, RM99.
2. Set **Success redirect** to `https://ejencukai.my/booking/thank-you`.
3. Keep the callback URL pointed at your existing webhook: `https://ejencukai.my/.netlify/functions/chip-in-webhook`.
4. Enable **collect buyer name + email** at checkout — you'll want them for prefill and for reconciliation.

Then extend the webhook's product map (`netlify/functions/chip-in-webhook.cjs:79-93`). Note the existing matcher checks `/thank-you/be` before `/thank-you/b` to avoid a substring collision; adding `/booking/thank-you` is a distinct path so it's safe:

```js
let productKey = null
if (successRedirect.includes('/booking/thank-you'))   productKey = 'consult'
else if (successRedirect.includes('/thank-you/be'))   productKey = 'be'
else if (successRedirect.includes('/thank-you/b'))    productKey = 'b'
```

### 5.3 The thank-you page

Route to add in `App.tsx`:

```tsx
<Route path="/konsultasi-peribadi" element={<ConsultationPage />} />
<Route path="/booking/thank-you"   element={<BookingThankYou />} />
```

The page should embed Calendly **inline** rather than redirecting away — a redirect to a third-party domain right after payment feels like a scam to a first-time buyer. Keep them on `ejencukai.my` with your navbar and footer visible.

```tsx
// src/components/BookingThankYou.tsx  (proposal — not created)
const CALENDLY_URL = 'https://calendly.com/ejencukai/konsultasi-peribadi'; // ⚠️ CONFIRM

useEffect(() => {
  const s = document.createElement('script');
  s.src = 'https://assets.calendly.com/assets/external/widget.js';
  s.async = true;
  document.body.appendChild(s);
  return () => { document.body.removeChild(s); };
}, []);

// prefill from what we stashed before checkout
const params = new URLSearchParams({
  name:  stashed.name  ?? '',
  email: stashed.email ?? '',
  a1:    stashed.phone ?? '',   // a1 = your first custom Calendly question
  hide_gdpr_banner: '1',
});

<div
  className="calendly-inline-widget"
  data-url={`${CALENDLY_URL}?${params}`}
  style={{ minWidth: 320, height: 700 }}
/>
```

**Prefilling the buyer's details.** Chip-in's success redirect does not reliably carry buyer fields as query params, so don't depend on it. The clean approach: capture name / email / WhatsApp on `/konsultasi-peribadi` *before* sending them to Chip-in, stash it, and read it back on return:

```tsx
// before redirecting to Chip-in
sessionStorage.setItem('ejc_booking', JSON.stringify({ name, email, phone }));
window.location.href = CHIPIN_CONSULT_URL;
```

`sessionStorage` survives the round trip because the user returns to the same origin in the same tab. If it's empty (new tab, cleared storage), just let Calendly ask — degrade gracefully, never block the booking.

**Confirm the booking happened** by listening to Calendly's postMessage, and fire your analytics there:

```tsx
useEffect(() => {
  const onMsg = (e: MessageEvent) => {
    if (e.origin !== 'https://calendly.com') return;          // always check origin
    if (e.data?.event === 'calendly.event_scheduled') {
      window.gtag?.('event', 'calendly_booked', { value: 99, currency: 'MYR' });
      setBooked(true);
    }
  };
  window.addEventListener('message', onMsg);
  return () => window.removeEventListener('message', onMsg);
}, []);
```

### 5.4 ⚠️ The `/booking/thank-you` page will be publicly reachable

Anyone who knows or guesses the URL can open it and book a paid slot without paying. Same class of problem as §7.1.

Options, cheapest first:

1. **Accept it** — the URL isn't linked anywhere, and Calendly still requires them to fill in details. Low risk at your volume. Add a manual reconciliation step: before each call, check the booking against Chip-in payments.
2. **Obscure the path** — `/booking/thank-you-a7f3` instead of a guessable one. Weak, but free.
3. **Token guard (proper fix)** — have the webhook write a short-lived token (Netlify Blobs / Upstash / a Supabase row) keyed to the purchase, include it in the success redirect, and have the page verify it via a function before rendering Calendly. ~2 hours of work; worth it once volume justifies it.

Do **option 1 + 2 now**, and option 3 when you're selling more than a handful a week.

### 5.5 Calendly configuration checklist

- Event type: **"Konsultasi Cukai Peribadi (30 minit)"**, one-on-one, video or phone.
- Add a required custom question: **"No. WhatsApp"** — so you can follow up outside Calendly.
- Add: *"Sila sediakan penyata EA / rekod pendapatan anda sebelum sesi."* Better calls, less wasted time.
- Buffers: 10 min after each booking. Minimum notice: 12 hours.
- Reminders: email + SMS at 24h and 1h. This is where no-shows are actually prevented.
- Redirect after booking → a small page (or Calendly's confirmation) with a *"Chat dengan kami di WhatsApp"* button.
- Availability: only publish hours you'll genuinely keep, especially Feb–April.

**⚠️ To confirm:** your real Calendly URL and event slug — there's no Calendly reference anywhere in the codebase, so `https://calendly.com/ejencukai/konsultasi-peribadi` above is a placeholder.

### 5.6 Sales page copy outline

Reuse the `EbookPage.tsx` structure — it works:

1. **Hero** — *"Tak pasti macam mana nak fail cukai anda? Cakap terus dengan ejen cukai berdaftar LHDN."* · RM99 · 30 minit · CTA
2. **Pain points** — 3 bullets (terlepas pelepasan, takut kena audit, tak faham borang)
3. **What you get** — semakan situasi cukai anda · senarai pelepasan yang anda layak tuntut · jawapan kepada semua soalan anda · ringkasan bertulis selepas sesi
4. **Who it's for / not for** — sets expectations, cuts refund requests
5. **The agent** — name, photo, LHDN licence number (§2.2)
6. **Testimonials** (§2.1)
7. **FAQ** — Berapa lama? Boleh refund? Perlu sediakan apa? Yuran ditolak dari pemfailan?
8. **Final CTA**

Add the credit-toward-filing line — it converts the RM99 into a first step rather than a cost: *"Yuran RM99 akan ditolak dari yuran pemfailan sekiranya anda teruskan dengan kami."*

---

## 6. Technical / SEO findings

### 6.1 Meta/OG tags missing

`index.html` (21 lines) contains a GA4 snippet, a favicon, a viewport tag, and `<title>Ejen Cukai </title>` — with a trailing space. There is **no meta description, no Open Graph, no Twitter card, no canonical**.

Consequence: when anyone shares `ejencukai.my` on **WhatsApp** — the dominant sharing channel in Malaysia — the preview is a bare URL with no image, no title, no description. That kills click-through on exactly the channel your customers use.

```html
<title>EjenCukai — Ejen Cukai Berdaftar LHDN | Fail Borang BE, B & Syarikat</title>
<meta name="description" content="Ejen cukai berdaftar LHDN dengan 30+ tahun pengalaman. Kami uruskan pemfailan Borang BE, Borang B dan cukai syarikat anda — tepat, patuh, tanpa risiko denda." />
<link rel="canonical" href="https://ejencukai.my/" />

<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://ejencukai.my/" />
<meta property="og:title"       content="EjenCukai — Ejen Cukai Berdaftar LHDN" />
<meta property="og:description" content="Fail cukai anda dengan betul. Konsultasi dengan ejen cukai berdaftar LHDN." />
<meta property="og:image"       content="https://ejencukai.my/og-image.png" />
<meta property="og:locale"      content="ms_MY" />
<meta name="twitter:card"       content="summary_large_image" />
```

You'll need to create `public/og-image.png` at **1200×630**. Since this is an SPA, per-route OG tags need prerendering — Netlify's prerender option or a small build-time step. At minimum get the homepage right, and give `/ebook` its own tags (it's the most-shared page).

### 6.2 No `robots.txt`, no `sitemap.xml`, no structured data

`public/` contains only `_redirects` and images. Add:

- `public/robots.txt` with a `Sitemap:` line
- `public/sitemap.xml` listing `/`, `/ebook`, `/form`, `/konsultasi-peribadi`, `/privacy-policy`, `/terms-of-service`
- **JSON-LD** in `index.html`: `ProfessionalService` (name, address, phone, `areaServed: MY`, `priceRange`) and `FAQPage` for the `/ebook` FAQs — FAQ rich results are very achievable for tax queries and cost you nothing.

Your organic opportunity here is real: *"cara isi borang BE"*, *"pelepasan cukai 2025"*, *"ejen cukai berdaftar LHDN"* are high-intent BM searches with weak competition. But you have **no blog and no content pages**, so you can't rank for any of them. Consider a `/panduan` section — it also feeds the e-book funnel.

### 6.3 No 404 route → blank page

`netlify.toml` and `public/_redirects` both rewrite `/*` → `/index.html` (correct for an SPA), but `App.tsx:21-33` has **no catch-all `<Route path="*">`**. So any unknown URL — a typo, a stale link, a mistyped share — renders the router with no match: a completely blank white page, no navbar, no footer, no way back.

```tsx
<Route path="*" element={<NotFound />} />
```

Even a minimal one with the logo, a "halaman tidak dijumpai" line, and links to `/` and WhatsApp.

### 6.4 Duplicated Tally loading logic

`src/utils/tallyService.ts` implements a careful, deduplicated script loader — and **nothing imports it**. `FormPage.tsx:9-27` and `WaitlistForm.tsx` each roll their own instead. If you keep Tally anywhere, route everything through `tallyService`. If you move to a native form (§4.3), delete it.

### 6.5 Accessibility quick wins

- Buttons built from `<div>`/`<a>` without roles in a few spots — verify keyboard focus works on the CTA rows.
- Colour contrast: `text-apple-gray-3` on white is light. Check the `text-[13px] text-apple-gray-3` disclaimers against WCAG AA (4.5:1) — several will fail.
- `EbookPage.tsx` FAQ toggles lack `aria-expanded` / `aria-controls`.
- The floating WhatsApp button (`WhatsAppButton.tsx`) sits at `bottom-6 right-6 z-50` and can cover form submit buttons on small screens. Test at 360×640.
- Images have `alt` text — good.

---

## 7. Bugs & risks found during review

*(Reported, not fixed — no code was changed.)*

### 7.1 E-book thank-you pages are unprotected

`EbookThankYou.tsx:7-16` hardcodes both Google Drive URLs in the **client bundle**:

```
be: https://drive.google.com/file/d/1eWCx_i9HNGjt1DxgMzqlysYllaeVVM83/view
b:  https://drive.google.com/file/d/10_uhl-2B0uhmKcKuvMGgADU78omue2oy/view
```

The routes `/ebook/thank-you/be` and `/ebook/thank-you/b` are public with no payment check. **Anyone can navigate directly to those URLs and download both e-books for free** — and since the URLs ship in the JS bundle, they can also be extracted from the built site or from `view-source`. Both Drive links are "anyone with the link can view".

This is a live revenue leak on a product you're actively selling. Fixes, cheapest first:

1. **Signed/expiring link** — have `chip-in-webhook.cjs` generate a short-lived token on `purchase.paid`, store it (Netlify Blobs / Supabase), and redirect to `/ebook/thank-you/be?t=<token>`; the page calls a function to exchange the token for the Drive URL. The URL never ships in the bundle.
2. **Email delivery** — send the link by email from the webhook. Note that commit `c164903` ("remove auto email") deliberately removed this, so the webhook now verifies the signature, logs, and returns `OK` without delivering anything (`chip-in-webhook.cjs:111-112`). Delivery depends entirely on the thank-you page today.
3. **At minimum**, rotate both Drive file IDs — the current ones may already be circulating.

### 7.2 `chip-in-webhook.cjs:107` references an undefined variable

```js
if (!ebookUrl) {
  console.error(`Ebook URL not set for slug: ${slug}`)   // ← `slug` is never defined
```

`slug` doesn't exist in that scope — the variable is `productKey`. If `EBOOK_BE_URL` or `EBOOK_B_URL` is ever unset in Netlify, this line throws `ReferenceError` instead of logging, the handler 500s, and Chip-in sees a failed webhook (and will likely retry). It's a latent bug on an error path, so it's invisible until the day it matters.

### 7.3 Webhook returns 200 on signature failure

`chip-in-webhook.cjs:30, 35, 50` return `200 OK` when the signature is missing, the key is unset, or verification fails. That's a deliberate choice to stop Chip-in retrying, and it's defensible — but it means a misconfigured `CHIPIN_PUBLIC_KEY` fails **completely silently**. Since the webhook no longer delivers anything (§7.1), you'd have no signal at all. Add an alert (email/Slack/Sentry) on verification failure.

### 7.4 `.env` handling — OK

`.env` is correctly listed in `.gitignore` and `git ls-files` confirms only `.env.example` is tracked. No secrets in the repo. ✅

### 7.5 Copyright year is hardcoded

`LanguageContext.tsx:108` and `:207` — "© 2025". Should be `new Date().getFullYear()`.

---

## 8. Suggested homepage structure (after changes)

```
1.  Navbar          Laman Utama · Perkhidmatan · E-Book · Tentang Kami · [WhatsApp]
                    (Business / Tax Firms / Investors removed from nav)
2.  Hero            Outcome headline + 1 primary CTA + 1 secondary
                    Deadline banner (seasonal)
3.  Trust strip     LHDN licence no. · forms filed · response time
4.  Services        4 cards, each with its own CTA
5.  ⭐ Testimonials  3 cards — NEW
6.  Pricing         tabbed Individu / Bisnes, CTA per card
7.  ⭐ Consultation  RM99 paid consultation block — NEW
8.  E-Book banner    (keep, it works)
9.  Mobile app       (keep — but move below the fold, it's not the main offer)
10. ⭐ FAQ           6–8 questions, with FAQPage schema — NEW
11. Final CTA       WhatsApp + form
12. Footer          real links, real services, About Us live
```

---

## 9. Roadmap

### Week 1 — bleeding stops here (all small)

- [ ] **Fix e-book thank-you leak — rotate the two Drive file IDs (§7.1)** ← still open, needs you
- [x] ~~Tally: branch Individu/Perniagaan, cut to 4 required fields~~ → superseded: Tally replaced by a native 3-step form (§4.3)
- [x] Form redirects to WhatsApp with a pre-filled message (§4.2/§4.3)
- [x] Delete stale waitlist stats + dynamic © year (§3.1)
- [x] Remove Investors from navbar (§3.2)
- [x] Add meta description + OG tags (§6.1) — ⚠️ `public/og-image.png` still needs creating
- [x] Add 404 catch-all route (§6.3)
- [x] Add GA4 events for WhatsApp + form + checkout (§2.10)

### Weeks 2–4 — build the money

- [ ] **Collect 5–8 testimonials** — component is built and wired, waiting on real quotes (§2.1)
- [ ] Restore `/about` with agent name, photo, LHDN licence no. (§2.2)
- [x] Build `/konsultasi-peribadi` + `/booking/thank-you` + Calendly (§5) — ⚠️ Chip-in product still to create
- [x] Native `QuickConsultForm` replacing the Tally iframe (§4.3)
- [x] CTAs on every pricing card (§2.7)
- [x] Rewrite footer links to real services (§3.4)
- [x] Deadline/urgency banner (§2.4)

### Month 2+ — compounding

- [ ] Free lead magnet + email sequence (§2.9)
- [ ] `/panduan` content section for organic search (§6.2)
- [ ] Decide the fate of `/business` + `/tax-firms` (§3.3)
- [ ] Meta + TikTok pixels, then a Feb–April deadline campaign (§2.10)
- [ ] BM copy review by a native speaker (§2.6)
- [ ] Token-guarded delivery for e-books and bookings (§7.1, §5.4)
- [ ] Google Business Profile + review collection (§2.1)

---

## 10. What to measure

| Metric | Where | Target |
|--------|-------|--------|
| Form completion rate | GA4 `form_start` → `form_submit` | >50% after the 4-field cut |
| WhatsApp click rate | `whatsapp_click` / sessions | >8% |
| E-book conversion | `ebook_checkout_click` / `/ebook` views | >3% |
| Consultation bookings | `calendly_booked` | track from zero |
| Lead → paying client | manual, WhatsApp labels | know this number |
| Homepage bounce | GA4 | <60% |

You currently can't measure any of these. Fixing that (§2.10) is a prerequisite for knowing whether anything else in this document worked.

---

## Open questions for you

1. **Is the SaaS/marketplace still happening?** The answer decides §3.3 (keep vs delete `/business`, `/tax-firms`, `WaitlistForm`). *Still open* — the pages are out of the navbar but still live.
2. ~~What's the real Calendly URL?~~ ✅ `https://calendly.com/ejencukaimy`
3. ~~Price for the personal consultation?~~ ✅ RM149 / hour
4. **Do you have past clients who'd give a testimonial?** Even 3 unlocks the highest-impact item on this list. The section is built and will appear the moment you add real quotes.
5. **What's your LHDN tax agent licence number**, and can it be published? It's your strongest trust asset and it's currently nowhere on the site.

---

## 11. What shipped

Implemented on `main`. Build, type-check and lint all pass.

### New

| File | What it does |
|------|--------------|
| `src/config/site.ts` | Single source of truth for phone, e-mail, Chip-in links, Calendly, price, and the seasonal deadline logic |
| `src/utils/analytics.ts` | GA4 wrapper + `wa.me` URL builder. Never throws into a caller — a blocked tag can't break checkout |
| `src/components/QuickConsultForm.tsx` | 3-step native form replacing the Tally iframe |
| `src/components/ConsultationPage.tsx` | `/konsultasi-peribadi` — RM149/hour sales page + detail capture |
| `src/components/BookingThankYou.tsx` | `/booking/thank-you` — inline Calendly with prefill and booking confirmation |
| `src/components/ConsultationBanner.tsx` | Homepage entry point for the consultation |
| `src/components/Testimonials.tsx` | Built, wired, renders **nothing** until real quotes are added |
| `src/components/NotFound.tsx` | 404 catch-all |
| `public/robots.txt`, `public/sitemap.xml` | Thank-you pages `Disallow`ed |
| `CONSULTATION_SETUP.md` | The 3 manual steps: Chip-in product, Calendly event, Netlify Forms |

### Changed

- **`/form`** — nine required fields → three steps, two typed inputs; branches so individuals are never asked for company details; saves the lead, *then* hands off to WhatsApp
- **Hero** — three competing CTAs → one primary + one secondary; "Tanya AI" demoted to a text link; trust strip translated and "100% Compliant" replaced with "Balas dalam 24 jam"; seasonal deadline line added
- **Navbar** — Business / Tax Firms / Investors removed (routes still live); Konsultasi added
- **Footer** — dead SaaS feature list → real linked services; Support → WhatsApp; © year now dynamic
- **PricingTiers** — every one of the 11 cards now has a WhatsApp CTA pre-filled with that service name
- **EbookPage** — checkout tracking, same-tab checkout, contact details from config
- **WhatsAppButton** — `wa.link` → `wa.me` with a pre-filled opener + click tracking
- **`index.html`** — meta description, OG/Twitter cards, canonical, `ProfessionalService` JSON-LD, `lang="ms"`, favicon → logo, plus the hidden Netlify Forms target
- **`chip-in-webhook.cjs`** — recognises the consultation product; fixed the §7.2 `ReferenceError` on the missing-URL path
- Removed the pre-existing unused imports/props flagged in §3.7, clearing all 9 lint errors and 14 type errors that were already in the repo

### Deliberately not done

- **E-book leak (§7.1)** — needs you to rotate the Drive file IDs; a `sessionStorage` guard would have broken real buyers, since the e-book checkout opens in a new tab with fresh storage
- **Testimonials content** — inventing quotes would be fabricated social proof
- **`/about` page** — needs your name, photo and LHDN licence number
- **`/business` + `/tax-firms` fate** — blocked on open question 1
- **BM copy review** — needs a native speaker, not a translation pass from me

---

## 12. Redesign — 19 September 2026 (`audit` branch)

Full visual and UX rework on top of §11. Build, type-check and lint pass; every page was screenshot-checked at 1440px and 390px.

### Design system

- **Tokens** (`tailwind.config.js`): `brand` scale derived from the logo's sky-blue → cyan; `ink` cool neutrals; card/float shadows; `display-*` type scale. The old `apple-*` names remain as aliases so the unlinked `/business`, `/tax-firms` and `/investors` pages still render.
- **Type**: Plus Jakarta Sans (bold display, regular body) loaded via `<link rel="preconnect">` instead of a render-blocking CSS `@import`.
- **Primitives** (`src/components/ui/`): `Button` (renders `<Link>`, `<a>` or `<button>` — no more `<Link><button>` nesting), `Accordion` (ARIA-wired, shared by all FAQ blocks), `SectionHeading`, `Badge`, `CheckItem`, `reveal()` motion preset.

### Homepage (new order)

Hero with an illustrative case card → trust stats → **How it works** (new) → **Services & fees** in Individu/Perniagaan tabs (replaces the 4-card "Our services" and the 11-card pricing wall; mobile page length went from ~11,300px to ~10,400px with far more content) → Consultation + E-book side by side → Why us + free tools (AI, receipt app) → **FAQ** (new, 6 questions) → final CTA.

### Bugs fixed

| Bug | Fix |
|-----|-----|
| Consultation and E-book pages ignored the EN toggle | Every string on both pages is now bilingual |
| Language reset to BM on every reload | Persisted in `localStorage`; `<html lang>` follows the choice |
| Every route shared one `<title>`/description | `usePageMeta` hook sets per-page title, description, and `noindex` on thank-you/404 pages |
| Client-side navigation kept the old scroll position | `ScrollToTop` component; hash links (`/#faq`) scroll to the section |
| Mobile menu CTA (`w-full mx-4`) overflowed; no Escape/close-on-navigate; exit animation never ran | Rebuilt with `AnimatePresence`, body scroll lock, Escape, auto-close on route change |
| `<button>` nested inside `<Link>` (invalid HTML, double tab stop) | `Button` component handles all three cases |
| Legal pages printed "Last updated: {today}" | Fixed date from git history; shared `LegalLayout` |
| Play Store link opened without `noopener` | All external links use `rel="noopener noreferrer"` |
| Floating WhatsApp button covered the form's submit button on phones | Hidden on `/form`, which already ends in a WhatsApp handoff |
| Two copies of the FAQ component, one without ARIA | Single `Accordion` |
| `hero.title` copy targeted businesses although individuals are the main audience | New hero copy, one primary CTA |

### Follow-up, same day

- **Pricing model changed.** Per-service prices are gone. Real engagements varied too much for them to hold, so the site now advertises a single starting figure, **RM1,950 per year of assessment** (`FILING` in `src/config/site.ts`), with the service list shown as two plain columns and the quote given on WhatsApp. The FAQ and JSON-LD `priceRange` follow.
- **Testimonials are live.** Three real clients (a home studio owner, an online business owner and an affiliate marketer, all Borang B), shown by initial only at their request. Edit them in `src/components/Testimonials.tsx`.
- **Decluttered.** Hero lost the floating bubbles, deadline chip, dotted background and trust list; the trust-stats strip, the free-tools strip and the extra CTA under "How it works" were removed; "Why us" is three cards instead of four plus a licence card; FAQ is five questions; product cards carry two bullets each.

### Deploy fix

The first deploy from this branch failed at Netlify's functions bundling step, not the Vite build: `chip-in-webhook.js` is CommonJS while `package.json` declares `"type": "module"`, and `@netlify/build` 37 now rejects that. The function is renamed to **`chip-in-webhook.cjs`**; the endpoint stays `/.netlify/functions/chip-in-webhook`, so nothing changes in the Chip-in dashboard. A `.nvmrc` pins Node 20 for reproducible builds.

### Still open (unchanged from §11)

E-book delivery URLs are public (rotate Drive IDs / issue tokens from the webhook), testimonials need real quotes, `/about` needs the founder's details, and the BM copy still deserves a native-speaker pass. The privacy policy and terms still describe a SaaS with Google sign-in that this site does not have — they were restyled, not rewritten.
