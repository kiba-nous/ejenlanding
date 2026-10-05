import { motion } from 'framer-motion';
import { Check, ScanLine, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import { PLAY_STORE_URL } from '../config/site';
import { Badge, CheckItem } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * The EjenCukai receipt-scanner app. Sits after the e-book and consultation
 * as the third self-serve tool: something a visitor can start using today,
 * long before filing season.
 *
 * `app-phone.png` is `app.png` cropped to the phone frame; the rounded clip
 * hides the white corners left over from the original mockup.
 */
function MobileApp() {
  const { pick } = useLanguage();

  return (
    <section className="overflow-hidden bg-ink-50 py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Phone on the blue panel */}
        <motion.div {...reveal()} className="relative order-2 flex justify-center lg:order-1 lg:col-span-5">
          <div className="absolute inset-x-4 bottom-0 top-16 rounded-[2.5rem] bg-brand-400 sm:inset-x-10 lg:inset-x-0" aria-hidden="true">
            <div className="absolute bottom-6 left-6 grid grid-cols-3 gap-2 opacity-50">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink-950/40" />
              ))}
            </div>
          </div>

          <img
            src="/app-phone.png"
            alt={pick('Skrin aplikasi EjenCukai', 'EjenCukai app screen')}
            width={568}
            height={1146}
            loading="lazy"
            className="relative w-[220px] -rotate-[4deg] shadow-float [border-radius:16%/8%] sm:w-[250px]"
          />

          {/* Scan chip */}
          <div
            className="absolute bottom-[14%] left-2 flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-3 pr-4 shadow-float sm:left-10 lg:-left-2"
            aria-hidden="true"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 text-brand-400">
              <ScanLine className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[13px] font-bold text-ink-900">{pick('Resit diimbas', 'Receipt scanned')}</span>
              <span className="mt-0.5 flex items-center gap-1 text-[11.5px] font-semibold text-brand-700">
                <Check className="h-3 w-3" strokeWidth={3} />
                {pick('Disimpan oleh AI', 'Saved by AI')}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div {...reveal(0.08)} className="order-1 lg:order-2 lg:col-span-7 lg:pl-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{pick('Aplikasi EjenCukai', 'The EjenCukai app')}</span>
            <Badge>
              <Sparkles className="h-3.5 w-3.5" />
              {pick('Baharu', 'New')}
            </Badge>
          </div>
          <h2 className="mt-4 text-balance text-display-sm text-ink-900 md:text-display-md">
            {pick(
              <>Simpan resit anda dengan <span className="text-brand-600">AI.</span></>,
              <>Save your receipts with <span className="text-brand-600">AI.</span></>
            )}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[17px] leading-relaxed text-ink-600">
            {pick(
              'Aplikasi EjenCukai menggunakan teknologi AI untuk mengimbas dan menyimpan resit anda secara automatik, supaya semuanya sedia bila tiba musim cukai.',
              'The EjenCukai app uses AI to scan and save your receipts automatically, so everything is ready when tax season comes.'
            )}
          </p>

          <ul className="mt-7 space-y-3">
            <CheckItem>{pick('Imbas resit dengan kamera telefon', 'Scan receipts with your phone camera')}</CheckItem>
            <CheckItem>{pick('Jejak perbelanjaan dan pendapatan di satu tempat', 'Track expenses and income in one place')}</CheckItem>
            <CheckItem>{pick('Tiada lagi resit hilang atau pudar', 'No more lost or faded receipts')}</CheckItem>
          </ul>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('app_download_click', { location: 'home_app_section' })}
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-ink-950 py-3 pl-4 pr-6 text-white shadow-[inset_0_-3px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-ink-800"
          >
            <img src="/playstore-icon.png" alt="" width={96} height={96} className="h-7 w-7" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/70">
                {pick('Muat turun di', 'Get it on')}
              </span>
              <span className="text-[17px] font-bold">Google Play</span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export { MobileApp };
