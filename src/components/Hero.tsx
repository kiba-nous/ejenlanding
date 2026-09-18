import { motion } from 'framer-motion';
import { ArrowRight, Check, FileCheck2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
});

/**
 * Illustrative "case card". Built from DOM rather than an image so it renders
 * crisp at every size and needs no asset. Figures are labelled as an example
 * on the card itself.
 */
function CaseCard() {
  const { pick } = useLanguage();

  const rows = [
    { label: pick('Dokumen diterima', 'Documents received'), done: true },
    { label: pick('Pelepasan disemak', 'Reliefs checked'), done: true },
    { label: pick('Dihantar ke LHDN', 'Submitted to LHDN'), done: false },
  ];

  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-brand-gradient opacity-[0.08] blur-2xl" aria-hidden="true" />

      <motion.div {...fadeUp(0.25)} className="card overflow-hidden rounded-xl3 shadow-float" aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-ink-100 px-6 py-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <FileCheck2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[15px] font-bold text-ink-900">Borang B · {pick('Tahun Taksiran', 'YA')} {new Date().getFullYear() - 1}</p>
            <p className="text-[12.5px] text-ink-500">{pick('Contoh kes', 'Example case')}</p>
          </div>
        </div>

        <ul className="divide-y divide-ink-100 px-6">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center gap-3 py-4">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  r.done ? 'bg-brand-600 text-white' : 'border-2 border-dashed border-ink-300 text-transparent'
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className={`text-[15px] font-medium ${r.done ? 'text-ink-800' : 'text-ink-400'}`}>{r.label}</span>
            </li>
          ))}
        </ul>

        <div className="mx-6 mb-6 mt-2 flex items-end justify-between rounded-2xl bg-ink-50 p-5">
          <div>
            <p className="text-[12.5px] font-medium text-ink-500">{pick('Cukai selepas pelepasan', 'Tax after reliefs')}</p>
            <p className="mt-1 text-[28px] font-extrabold leading-none tracking-tight text-ink-900">RM 640</p>
          </div>
          <p className="text-[13px] font-bold text-emerald-700">{pick('Jimat RM 1,340', 'Saved RM 1,340')}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  const { pick } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-hero-glow" aria-hidden="true" />

      <div className="container-x grid items-center gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-12 lg:py-36">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow">
            {pick('Ejen cukai berdaftar LHDN', 'LHDN-registered tax agent')}
          </motion.p>

          <motion.h1
            {...fadeUp(0.06)}
            className="mt-5 text-balance text-display-md text-ink-900 sm:text-display-lg xl:text-display-xl"
          >
            {pick(
              <>Fail cukai dengan betul, <span className="bg-brand-gradient bg-clip-text text-transparent">tanpa pening kepala.</span></>,
              <>File your taxes right, <span className="bg-brand-gradient bg-clip-text text-transparent">without the headache.</span></>
            )}
          </motion.h1>

          <motion.p {...fadeUp(0.12)} className="mt-6 max-w-lg text-pretty text-[17px] leading-relaxed text-ink-600 md:text-[18px]">
            {pick(
              'Hantar dokumen melalui WhatsApp. Kami kira, semak dan failkan cukai anda, dengan penjelasan yang mudah difahami.',
              'Send your documents over WhatsApp. We calculate, review and file your taxes, with explanations you can actually follow.'
            )}
          </motion.p>

          <motion.div {...fadeUp(0.18)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/form" size="lg" onClick={() => trackEvent('hero_cta_click', { cta: 'consultation' })}>
              <MessageCircle className="h-[18px] w-[18px]" />
              {pick('Mula di WhatsApp', 'Start on WhatsApp')}
            </Button>
            <Button to="/#perkhidmatan" size="lg" variant="ghost" onClick={() => trackEvent('hero_cta_click', { cta: 'pricing' })}>
              {pick('Lihat harga', 'See pricing')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.p {...fadeUp(0.26)} className="mt-8 text-[14px] text-ink-500">
            {pick('30+ tahun pengalaman · Balas dalam 24 jam', '30+ years of experience · Reply within 24 hours')}
          </motion.p>
        </div>

        <div className="lg:col-span-5">
          <CaseCard />
        </div>
      </div>
    </section>
  );
}

export { Hero };
