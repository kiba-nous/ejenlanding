/**
 * Thin wrapper over the GA4 tag loaded in index.html.
 *
 * Every call is a no-op when gtag is absent (ad blocker, local dev, SSR), so
 * tracking can never break a user flow — especially not a checkout or a
 * WhatsApp handoff.
 */

import { WHATSAPP_NUMBER } from '../config/site';

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: EventParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;

  try {
    window.gtag?.('event', name, params);
  } catch {
    // Analytics must never throw into the caller.
  }
}

/**
 * Builds a wa.me deep link, optionally pre-filling the compose box.
 *
 * wa.me is used deliberately over api.whatsapp.com — it decides between the
 * installed app and WhatsApp Web on its own.
 *
 * Note: pre-filled text lands in the user's compose box and is editable. It
 * is not sent automatically, so a click here is a warm intro, not a contact.
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Opens WhatsApp and records where the click came from.
 *
 * `location` is the CTA identifier (e.g. 'hero', 'floating_button') so the
 * report shows which entry points actually work.
 */
export function openWhatsApp(location: string, message?: string): void {
  trackEvent('whatsapp_click', { location });
  window.location.href = buildWhatsAppUrl(message);
}
