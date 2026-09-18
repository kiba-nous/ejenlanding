/**
 * Central site configuration.
 *
 * Anything that changes when a business detail changes (a price, a payment
 * link, a phone number) lives here so it never has to be hunted down across
 * components.
 */

/** WhatsApp business number — digits only, no "+", no spaces. */
export const WHATSAPP_NUMBER = '60103216650';

/** Human-readable version of the same number, for display. */
export const WHATSAPP_DISPLAY = '+6010 321 6650';

export const CONTACT_EMAIL = 'contact@ejencukai.my';

/** Chip-in payment links. */
export const CHIPIN = {
  ebookBE: 'https://pay.chip-in.asia/borangbe',
  ebookB: 'https://pay.chip-in.asia/borangb',

  /**
   * TODO: Create the "Konsultasi Cukai Peribadi" product in the Chip-in
   * dashboard, then paste its payment link here (e.g.
   * 'https://pay.chip-in.asia/konsultasi').
   *
   * Set the product's Success redirect to:
   *   https://ejencukai.my/booking/thank-you
   *
   * While this is empty the booking page stays fully usable — the CTA falls
   * back to WhatsApp instead of checkout, so no lead is lost in the meantime.
   */
  consultation: '',
} as const;

/**
 * Calendly scheduling page.
 *
 * Once the dedicated event type exists, append its slug here — e.g.
 * `${CALENDLY_BASE}/konsultasi-cukai-peribadi` — so buyers land straight on
 * the booking screen instead of the event picker.
 */
export const CALENDLY_BASE = 'https://calendly.com/ejencukaimy';
export const CALENDLY_EVENT_URL = CALENDLY_BASE;

/**
 * Filing and advisory work is quoted per year of assessment. Real cases have
 * varied too much in complexity for a per-service price list to be honest,
 * so the site advertises one starting figure and quotes the rest on WhatsApp.
 */
export const FILING = {
  fromMYR: 1950,
  fromLabel: 'RM1,950',
  unitBm: 'tahun taksiran',
  unitEn: 'year of assessment',
} as const;

/** Paid personal tax consultation. */
export const CONSULTATION = {
  priceMYR: 149,
  priceLabel: 'RM149',
  /** Billing unit, used in copy like "RM149 / jam". */
  unitBm: 'jam',
  unitEn: 'hour',
  durationMinutes: 60,
} as const;

/** sessionStorage key used to carry buyer details across the Chip-in round trip. */
export const BOOKING_STORAGE_KEY = 'ejc_booking';

/**
 * Malaysian tax deadlines, used to drive the seasonal urgency line.
 * Month is 0-indexed to match `Date#getMonth`.
 */
const DEADLINES = [
  { month: 3, day: 30, bm: 'Tarikh akhir e-Filing Borang BE: 30 April', en: 'Borang BE e-Filing deadline: 30 April' },
  { month: 5, day: 30, bm: 'Tarikh akhir e-Filing Borang B: 30 Jun', en: 'Borang B e-Filing deadline: 30 June' },
];

/**
 * Returns the urgency line to show under the hero.
 *
 * Inside filing season it names the next deadline and how many days are left;
 * outside it, it switches to a planning message so the slot never sits empty
 * or — worse — advertises a date that has already passed.
 */
export function getDeadlineNotice(language: 'en' | 'bm', now = new Date()) {
  const year = now.getFullYear();

  for (const deadline of DEADLINES) {
    const date = new Date(year, deadline.month, deadline.day, 23, 59, 59);
    if (now > date) continue;

    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / 86_400_000);

    // Only push urgency within ~10 weeks of the date; earlier than that it
    // reads as noise rather than a prompt.
    if (daysLeft > 70) break;

    return language === 'bm'
      ? `${deadline.bm}. Tinggal ${daysLeft} hari lagi.`
      : `${deadline.en}. ${daysLeft} days left.`;
  }

  return language === 'bm'
    ? `Rancang cukai ${year} anda dari sekarang, sebelum tahun taksiran ditutup.`
    : `Plan your ${year} tax now, before the assessment year closes.`;
}
