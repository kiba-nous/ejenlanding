import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getDeadlineNotice, WHATSAPP_DISPLAY } from '../config/site';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { Button } from './ui/button';
import { reveal } from './ui/motion';

function FinalCta() {
  const { language, pick } = useLanguage();

  return (
    <section className="bg-white pb-20 pt-4 md:pb-28">
      <div className="container-x">
        <motion.div
          {...reveal()}
          className="relative overflow-hidden rounded-xl3 bg-ink-950 px-6 py-14 text-center text-white md:px-16 md:py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(79,179,255,0.28),transparent_70%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-dots opacity-[0.15] [background-size:22px_22px]" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-300">{getDeadlineNotice(language)}</p>
            <h2 className="mt-4 text-balance text-display-sm md:text-display-md">
              {pick('Selesaikan cukai anda minggu ini.', 'Get your taxes done this week.')}
            </h2>
            <p className="mt-4 text-pretty text-[16px] leading-relaxed text-white/70">
              {pick(
                'Hantar butiran anda sekarang. Kami balas dengan sebut harga dalam 24 jam, dan anda hanya bayar selepas setuju.',
                'Send your details now. We reply with a quote within 24 hours, and you only pay once you agree.'
              )}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/form" size="lg" variant="white" onClick={() => trackEvent('final_cta_click', { cta: 'form' })}>
                {pick('Mula di WhatsApp', 'Start on WhatsApp')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={buildWhatsAppUrl()}
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
                onClick={() => trackEvent('whatsapp_click', { location: 'final_cta' })}
              >
                <MessageCircle className="h-4 w-4" />
                {WHATSAPP_DISPLAY}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { FinalCta };
