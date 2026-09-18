import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../config/site';
import { Button } from './ui/button';

const EBOOK_CONFIG = {
  be: {
    bm: 'Panduan Cukai Individu Bergaji (Borang BE)',
    en: 'Salaried Individual Tax Guide (Borang BE)',
    driveUrl: 'https://drive.google.com/file/d/1eWCx_i9HNGjt1DxgMzqlysYllaeVVM83/view?usp=sharing',
  },
  b: {
    bm: 'Panduan Cukai Individu Berbisnes (Borang B)',
    en: 'Business Individual Tax Guide (Borang B)',
    driveUrl: 'https://drive.google.com/file/d/10_uhl-2B0uhmKcKuvMGgADU78omue2oy/view?usp=sharing',
  },
} as const;

type EbookKey = keyof typeof EBOOK_CONFIG;

/**
 * Post-purchase delivery page.
 *
 * NOTE: this route is publicly reachable and the Drive links are the real
 * delivery URLs. It is `noindex` and disallowed in robots.txt, but anyone
 * with the URL can still read the PDF. The durable fix is a one-time token
 * issued by the Chip-in webhook; until then, rotate the Drive file IDs if
 * the link ever leaks.
 */
export function EbookThankYou({ ebook }: { ebook: EbookKey }) {
  const { language, pick } = useLanguage();
  const config = EBOOK_CONFIG[ebook];
  const label = config[language];

  usePageMeta({ title: pick('Terima kasih', 'Thank you'), noindex: true });

  return (
    <>
      <Navbar />

      <main id="main" className="relative flex min-h-[80vh] items-center justify-center bg-ink-50 px-5 py-20">
        <div className="absolute inset-x-0 top-0 -z-0 h-72 bg-hero-glow" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="card relative w-full max-w-md rounded-xl3 p-8 text-center md:p-10"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <h1 className="mt-6 text-[26px] font-bold leading-tight text-ink-900">
            {pick('Terima kasih atas pembelian anda!', 'Thank you for your purchase!')}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{label}</p>

          <div className="mt-7">
            <Button
              href={config.driveUrl}
              size="lg"
              className="w-full"
              onClick={() => trackEvent('ebook_open', { product: ebook })}
            >
              <Download className="h-[18px] w-[18px]" />
              {pick('Buka e-book', 'Open the e-book')}
            </Button>
          </div>
          <p className="mt-3 text-[12.5px] text-ink-500">
            {pick('Simpan pautan ini. Anda boleh buka semula bila-bila masa.', 'Save this link. You can reopen it any time.')}
          </p>

          <div className="mt-8 border-t border-ink-100 pt-6 text-[13.5px] text-ink-500">
            <p>{pick('Ada masalah akses?', 'Trouble accessing it?')}</p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a
                href={buildWhatsAppUrl(pick('Hi EjenCukai! Saya baru beli e-book tetapi ada masalah akses.', 'Hi EjenCukai! I just bought the e-book but can’t access it.'))}
                onClick={() => trackEvent('whatsapp_click', { location: 'ebook_thank_you' })}
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
            className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-500 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {pick('Kembali ke laman utama', 'Back to home')}
          </Link>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
