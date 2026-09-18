import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { CALENDLY_EVENT_URL, CONSULTATION, BOOKING_STORAGE_KEY, CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../config/site';
import { Button } from './ui/button';
import { CheckItem } from './ui/Section';

/**
 * Post-payment landing page: confirms the purchase, then books the slot.
 *
 * Calendly is embedded inline rather than redirected to — sending a buyer to
 * a third-party domain immediately after they pay reads as a scam to a
 * first-time customer. They stay on ejencukai.my with our nav and footer.
 *
 * NOTE: this route is publicly reachable. Anyone with the URL can book without
 * paying. That is an accepted trade-off at current volume (the URL is not
 * linked anywhere and Calendly still collects their details); reconcile
 * bookings against Chip-in payments before each call. The durable fix is a
 * one-time token issued by the Chip-in webhook and verified here.
 */

interface CalendlyPrefill {
  name?: string;
  email?: string;
  customAnswers?: Record<string, string>;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: CalendlyPrefill }) => void;
    };
  }
}

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

/** Reads the details stashed on /konsultasi-peribadi before checkout. */
function readStashedDetails(): { name: string; email: string; phone: string } | null {
  try {
    const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function BookingThankYou() {
  const { pick } = useLanguage();
  const widgetRef = useRef<HTMLDivElement>(null);
  const [booked, setBooked] = useState(false);
  const [widgetFailed, setWidgetFailed] = useState(false);

  usePageMeta({ title: pick('Pilih masa sesi anda', 'Pick your session time'), noindex: true });

  // Load Calendly and mount the inline widget with whatever we know about
  // the buyer. Missing details are fine — Calendly simply asks for them.
  useEffect(() => {
    const stashed = readStashedDetails();
    const prefill: CalendlyPrefill = {};
    if (stashed?.name) prefill.name = stashed.name;
    if (stashed?.email) prefill.email = stashed.email;
    // a1 maps to the first custom question on the Calendly event ("No. WhatsApp").
    if (stashed?.phone) prefill.customAnswers = { a1: stashed.phone };

    const mount = () => {
      if (!widgetRef.current || !window.Calendly) {
        setWidgetFailed(true);
        return;
      }
      window.Calendly.initInlineWidget({
        url: `${CALENDLY_EVENT_URL}?hide_gdpr_banner=1`,
        parentElement: widgetRef.current,
        prefill,
      });
    };

    if (window.Calendly) {
      mount();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', mount);
      return () => existing.removeEventListener('load', mount);
    }

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    script.onload = mount;
    script.onerror = () => setWidgetFailed(true);
    document.body.appendChild(script);

    // The script is intentionally left in the document — removing it breaks
    // the widget if the user navigates back to this page.
  }, []);

  // Calendly reports the booking by postMessage. Always verify the origin
  // before trusting anything that arrives on the message channel.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return;
      if (event.data?.event !== 'calendly.event_scheduled') return;

      trackEvent('calendly_booked', { value: CONSULTATION.priceMYR, currency: 'MYR' });
      setBooked(true);

      // The stash has served its purpose; don't leave contact details behind.
      try {
        sessionStorage.removeItem(BOOKING_STORAGE_KEY);
      } catch {
        // Nothing to clean up.
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const prep = [
    pick('Sediakan penyata EA anda (jika makan gaji)', 'Have your EA statement ready (if salaried)'),
    pick('Kumpulkan rekod pendapatan sampingan, jika ada', 'Gather records of any side income'),
    pick('Senaraikan soalan yang anda ingin tanya, supaya tiada yang tertinggal', 'List the questions you want to ask so nothing is missed'),
  ];

  return (
    <>
      <Navbar />

      <main id="main" className="bg-white">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-hero-glow" aria-hidden="true" />
          <div className="container-x max-w-3xl pb-8 pt-14 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <h1 className="mt-6 text-balance text-display-sm text-ink-900">
                {booked
                  ? pick('Sesi anda telah ditempah!', 'Your session is booked!')
                  : pick('Terima kasih atas pembayaran anda!', 'Thank you for your payment!')}
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-ink-600">
                {booked
                  ? pick(
                      'Pengesahan dan pautan sesi telah dihantar ke emel anda. Jumpa anda tidak lama lagi!',
                      'A confirmation and the session link have been sent to your email. See you soon!'
                    )
                  : pick(
                      'Satu langkah terakhir. Pilih tarikh dan masa yang sesuai untuk sesi konsultasi anda di bawah.',
                      'One last step. Choose a date and time for your consultation below.'
                    )}
              </p>

              {!booked && (
                <p className="mt-4 text-[13px] font-medium text-ink-500">
                  {pick('Konsultasi Cukai Peribadi', 'Personal Tax Consultation')} · {CONSULTATION.durationMinutes} {pick('minit', 'min')} · {CONSULTATION.priceLabel}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Calendly */}
        {!booked && (
          <div className="container-x max-w-4xl pb-12">
            {widgetFailed ? (
              <div className="card rounded-xl3 p-10 text-center">
                <p className="text-[15px] text-ink-600">
                  {pick(
                    'Kalendar tempahan tidak dapat dimuatkan di sini. Sila buka kalendar kami dalam tab baharu:',
                    'The booking calendar couldn’t load here. Please open it in a new tab:'
                  )}
                </p>
                <div className="mt-6">
                  <Button href={CALENDLY_EVENT_URL} size="lg">
                    {pick('Pilih masa anda', 'Pick your time')}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                ref={widgetRef}
                className="calendly-inline-widget overflow-hidden rounded-xl3 border border-ink-200"
                style={{ minWidth: 320, height: 720 }}
              />
            )}
          </div>
        )}

        {/* Prep note + support */}
        <section className="border-t border-ink-100 bg-ink-50">
          <div className="container-x max-w-2xl py-12">
            <h2 className="text-[18px] font-bold text-ink-900">{pick('Sebelum sesi anda', 'Before your session')}</h2>
            <ul className="mt-4 space-y-2.5">
              {prep.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>

            <div className="mt-8 text-[14px] text-ink-500">
              <p>{pick('Perlukan bantuan dengan tempahan anda?', 'Need help with your booking?')}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={buildWhatsAppUrl(
                    pick(
                      'Hi EjenCukai! Saya baru bayar untuk Konsultasi Cukai Peribadi dan perlukan bantuan dengan tempahan saya.',
                      'Hi EjenCukai! I just paid for a Personal Tax Consultation and need help with my booking.'
                    )
                  )}
                  onClick={() => trackEvent('whatsapp_click', { location: 'booking_thank_you' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  {WHATSAPP_DISPLAY}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-700 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {pick('Kembali ke laman utama', 'Back to home')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
