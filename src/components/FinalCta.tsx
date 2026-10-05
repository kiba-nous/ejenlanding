import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getDeadlineNotice, WHATSAPP_DISPLAY } from '../config/site';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { Button } from './ui/button';
import { reveal } from './ui/motion';

/**
 * Oversized version of the calculator mark from the logo. The screen shows
 * the deadline line, so the graphic carries information, not just shape.
 */
function Keypad() {
  return (
    <div
      className="w-[240px] rounded-[36px] border-[10px] border-ink-950 bg-brand-300/40 p-5"
      aria-hidden="true"
    >
      <div className="h-12 rounded-xl bg-ink-950" />
      <div className="mt-5 grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-full ${i === 8 ? 'bg-white' : 'bg-ink-950'}`}
          />
        ))}
      </div>
    </div>
  );
}

function FinalCta() {
  const { language, pick } = useLanguage();

  return (
    <section className="bg-white pb-20 pt-4 md:pb-28">
      <div className="container-x">
        <motion.div
          {...reveal()}
          className="relative grid items-center gap-12 overflow-hidden rounded-xl3 bg-brand-400 px-6 py-14 text-ink-950 md:px-14 md:py-16 lg:grid-cols-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-ledger [background-size:28px_28px]" aria-hidden="true" />

          <div className="relative lg:col-span-8">
            <p className="inline-flex items-center gap-2 rounded-lg bg-ink-950 px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-brand-300">
              {getDeadlineNotice(language)}
            </p>
            <h2 className="mt-6 text-balance text-display-sm md:text-display-lg">
              {pick('Selesaikan cukai anda minggu ini.', 'Get your taxes done this week.')}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-[16.5px] leading-relaxed text-ink-900/80">
              {pick(
                'Hantar butiran anda sekarang. Kami biasanya balas dengan sebut harga dalam 24 jam pada hari bekerja, dan anda hanya bayar selepas setuju.',
                'Send your details now. We usually reply with a quote within 24 hours on working days, and you only pay once you agree.'
              )}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/form" size="lg" variant="dark" onClick={() => trackEvent('final_cta_click', { cta: 'form' })}>
                {pick('Mula di WhatsApp', 'Start on WhatsApp')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={buildWhatsAppUrl()}
                size="lg"
                variant="white"
                onClick={() => trackEvent('whatsapp_click', { location: 'final_cta' })}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-[15px]">{WHATSAPP_DISPLAY}</span>
              </Button>
            </div>
          </div>

          <div className="relative hidden justify-center lg:col-span-4 lg:flex">
            <div className="rotate-[6deg]">
              <Keypad />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { FinalCta };
