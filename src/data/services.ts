/**
 * Service catalogue.
 *
 * Prices are deliberately absent: work is quoted per year of assessment from
 * a single starting figure (see `FILING` in config/site.ts), because real
 * cases varied too much for per-service prices to hold.
 */

export type Audience = 'individu' | 'perniagaan';

export interface Service {
  id: string;
  audience: Audience;
  bm: string;
  en: string;
}

export const SERVICES: Service[] = [
  // ── Individu ──────────────────────────────────────────────────────────
  { id: 'individual-filing', audience: 'individu', bm: 'Pemfailan Borang BE & B', en: 'Borang BE & B filing' },
  { id: 'individual-planning', audience: 'individu', bm: 'Perancangan cukai individu', en: 'Individual tax planning' },
  { id: 'refund', audience: 'individu', bm: 'Permohonan pulangan cukai', en: 'Tax refund application' },
  { id: 'cp500', audience: 'individu', bm: 'Rayuan & semakan CP500', en: 'CP500 appeal & review' },

  // ── Perniagaan ────────────────────────────────────────────────────────
  { id: 'corporate-filing', audience: 'perniagaan', bm: 'Pemfailan cukai syarikat (Borang C / P / PT)', en: 'Corporate tax filing (Borang C / P / PT)' },
  { id: 'corporate-planning', audience: 'perniagaan', bm: 'Perancangan cukai syarikat', en: 'Corporate tax planning' },
  { id: 'advisory', audience: 'perniagaan', bm: 'Nasihat cukai ikut kes', en: 'Case-based tax advisory' },
  { id: 'audit-support', audience: 'perniagaan', bm: 'Sokongan audit & siasatan LHDN', en: 'LHDN audit & investigation support' },
  { id: 'einvoice', audience: 'perniagaan', bm: 'Penyediaan e-Invois (MyInvois)', en: 'e-Invoice setup (MyInvois)' },
  { id: 'withholding', audience: 'perniagaan', bm: 'Cukai pegangan', en: 'Withholding tax' },
  { id: 'stamp-duty', audience: 'perniagaan', bm: 'Duti setem', en: 'Stamp duty' },
];
