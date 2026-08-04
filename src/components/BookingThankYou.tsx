import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, MessageCircle, ExternalLink } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import {
  CALENDLY_EVENT_URL, CONSULTATION, BOOKING_STORAGE_KEY, CONTACT_EMAIL, WHATSAPP_DISPLAY,
} from '../config/site';

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
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: CalendlyPrefill;
      }) => void;
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
  const widgetRef = useRef<HTMLDivElement>(null);
  const [booked, setBooked] = useState(false);
  const [widgetFailed, setWidgetFailed] = useState(false);

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

      trackEvent('calendly_booked', {
        value: CONSULTATION.priceMYR,
        currency: 'MYR',
      });
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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 pt-14 pb-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-apple-blue/10 rounded-full p-4">
                <CheckCircle className="w-10 h-10 text-apple-blue" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-light text-apple-gray-1 mb-3">
              {booked ? (
                <>Sesi anda <span className="font-semibold">telah ditempah!</span></>
              ) : (
                <>Terima kasih atas <span className="font-semibold">pembayaran anda!</span></>
              )}
            </h1>

            <p className="text-[16px] text-apple-gray-2 leading-relaxed max-w-lg mx-auto">
              {booked
                ? 'Pengesahan dan pautan sesi telah dihantar ke emel anda. Jumpa anda tidak lama lagi!'
                : 'Satu langkah terakhir. Pilih tarikh dan masa yang sesuai untuk sesi konsultasi anda di bawah.'}
            </p>

            {!booked && (
              <p className="mt-4 text-[13px] text-apple-gray-3">
                Konsultasi Cukai Peribadi · {CONSULTATION.durationMinutes} minit · {CONSULTATION.priceLabel}
              </p>
            )}
          </motion.div>
        </div>

        {/* Calendly */}
        {!booked && (
          <div className="container mx-auto px-6 pb-12 max-w-4xl">
            {widgetFailed ? (
              <div className="bg-apple-gray-6 border border-apple-gray-4 rounded-apple p-10 text-center">
                <p className="text-[15px] text-apple-gray-2 mb-6">
                  Kalendar tempahan tidak dapat dimuatkan di sini. Sila buka kalendar kami dalam tab baharu:
                </p>
                <a
                  href={CALENDLY_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-apple-blue hover:opacity-90 text-white text-[15px] font-semibold py-3.5 px-6 rounded-apple-button transition-opacity duration-200"
                >
                  Pilih masa anda
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <div
                ref={widgetRef}
                className="calendly-inline-widget rounded-apple overflow-hidden"
                style={{ minWidth: 320, height: 720 }}
              />
            )}
          </div>
        )}

        {/* Prep note + support */}
        <div className="bg-apple-gray-6 border-y border-apple-gray-4">
          <div className="container mx-auto px-6 py-12 max-w-2xl">
            <h2 className="text-lg font-medium text-apple-gray-1 mb-4">Sebelum sesi anda</h2>
            <ul className="space-y-2.5 mb-8">
              {[
                'Sediakan penyata EA anda (jika makan gaji)',
                'Kumpulkan rekod pendapatan sampingan, jika ada',
                'Senaraikan soalan yang anda ingin tanya, supaya tiada yang tertinggal',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-apple-gray-2">
                  <CheckCircle className="w-4 h-4 text-apple-blue mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="text-[14px] text-apple-gray-3 space-y-2">
              <p>Perlukan bantuan dengan tempahan anda?</p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href={buildWhatsAppUrl('Hi EjenCukai! Saya baru bayar untuk Konsultasi Cukai Peribadi dan perlukan bantuan dengan tempahan saya.')}
                  onClick={() => trackEvent('whatsapp_click', { location: 'booking_thank_you' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-apple-blue hover:opacity-70 transition-opacity duration-150"
                >
                  <MessageCircle className="w-4 h-4" />
                  {WHATSAPP_DISPLAY}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-apple-blue hover:opacity-70 transition-opacity duration-150">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-8">
          <Link to="/" className="flex items-center gap-1.5 text-apple-gray-3 hover:text-apple-gray-1 text-sm transition-colors duration-150">
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke laman utama
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
