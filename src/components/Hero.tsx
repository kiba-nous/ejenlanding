import { motion } from 'framer-motion';
import { ArrowRight, Check, CheckCheck, FileText, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
});

/** Drops a piece of the illustration onto the "desk" with a slight settle. */
const drop = (delay: number, rotate: number) => ({
  initial: { opacity: 0, y: 24, rotate: rotate * 2 },
  animate: { opacity: 1, y: 0, rotate },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/** Circular rubber stamp. SVG so the ring text follows the curve. */
function ReviewedStamp({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <path id="stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text className="fill-current text-[10px] font-semibold uppercase" letterSpacing="1.6">
        <textPath href="#stamp-ring">{label}</textPath>
      </text>
      <path d="M46 61l9 9 19-20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Hero illustration: the filing "desk". A Borang B worksheet with the reliefs
 * we found highlighted, a reviewed stamp, the WhatsApp thread the documents
 * arrived in, and the result. Built from DOM so it stays crisp and needs no
 * asset; labelled as an illustrative example on the sheet itself.
 */
function FilingDesk() {
  const { pick } = useLanguage();
  const ya = new Date().getFullYear() - 1;

  const rows = [
    { label: pick('Pendapatan berkanun', 'Statutory income'), value: '48,200', found: false },
    { label: pick('Pelepasan individu', 'Individual relief'), value: '9,000', found: false },
    { label: pick('Gaya hidup', 'Lifestyle'), value: '2,500', found: true },
    { label: pick('Perubatan ibu bapa', 'Parents’ medical'), value: '3,000', found: true },
    { label: pick('KWSP & insurans hayat', 'EPF & life insurance'), value: '7,000', found: true },
  ];

  return (
    <div className="relative mx-auto aspect-[1/1.4] w-full max-w-[520px] sm:aspect-[1/1.08]" aria-hidden="true">
      {/* Folder behind the sheet */}
      <motion.div {...drop(0.15, -4)} className="absolute left-[3%] top-[7%] h-[80%] w-[88%] rounded-[28px] bg-brand-400">
        <span className="absolute -top-5 left-8 h-8 w-32 rounded-t-2xl bg-brand-400" />
        {/* Keypad dots from the logo */}
        <div className="absolute bottom-6 left-1/2 grid -translate-x-1/2 grid-cols-3 gap-2 opacity-50">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink-950/40" />
          ))}
        </div>
      </motion.div>

      {/* Worksheet */}
      <motion.div
        {...drop(0.3, 2)}
        className="absolute left-[11%] top-[2%] w-[80%] rounded-2xl border border-ink-200 bg-white p-4 shadow-float sm:p-6"
      >
        <div className="flex items-start justify-between gap-3 border-b-2 border-ink-900 pb-3">
          <div>
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-500 sm:text-[10px]">
              LHDN · e-Filing
            </p>
            <p className="mt-1 text-[20px] font-bold leading-none tracking-tight text-ink-900 sm:text-[26px]">
              Borang B
            </p>
          </div>
          <p className="rounded-md bg-ink-100 px-2 py-1 text-[10px] font-semibold text-ink-600">
            {pick('TT', 'YA')} {ya}
          </p>
        </div>
        <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-ink-400 sm:text-[9.5px]">
          {pick('Contoh ilustrasi', 'Illustrative example')}
        </p>

        <ul className="mt-2 space-y-[6px] sm:space-y-2">
          {rows.map((r) => (
            <li key={r.label} className="flex items-baseline gap-2 text-[11px] sm:text-[13px]">
              <span className={`shrink-0 ${r.found ? 'font-semibold text-brand-700' : 'text-ink-600'}`}>
                {r.found && <span className="mr-1">+</span>}
                {r.label}
              </span>
              <span className="leader" />
              <span className={`font-semibold tabular-nums ${r.found ? 'text-brand-700' : 'text-ink-900'}`}>{r.value}</span>
            </li>
          ))}
        </ul>

        {/* Sign-off line, with the stamp landing on it */}
        <div className="relative mt-4 flex items-end gap-3 border-t border-dashed border-ink-200 pt-3 sm:mt-5">
          <span className="text-[9px] uppercase tracking-[0.12em] text-ink-400 sm:text-[9.5px]">
            {pick('Disemak oleh', 'Reviewed by')}
          </span>
          <span className="mb-1 h-px w-[38%] bg-ink-300" />
          <motion.div
            initial={{ opacity: 0, scale: 1.6, rotate: -30 }}
            animate={{ opacity: 0.92, scale: 1, rotate: -12 }}
            transition={{ duration: 0.35, delay: 1.05, ease: 'easeOut' }}
            className="absolute -bottom-11 -right-2 h-[68px] w-[68px] text-brand-700 sm:-bottom-14 sm:-right-4 sm:h-24 sm:w-24"
          >
            <ReviewedStamp label={pick('· Disemak · Profesional cukai ', '· Reviewed · Tax professional ')} />
          </motion.div>
        </div>
      </motion.div>

      {/* WhatsApp thread */}
      <motion.div
        {...drop(0.55, -2)}
        className="absolute bottom-0 left-0 w-[58%] rounded-2xl border border-ink-200 bg-[#EFEAE2] p-3 shadow-float sm:p-3.5"
      >
        <div className="mb-2.5 flex items-center gap-2 border-b border-black/5 pb-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-whatsapp text-white">
            <MessageCircle className="h-3.5 w-3.5" fill="currentColor" />
          </span>
          <span className="text-[11.5px] font-bold text-ink-900">EjenCukai</span>
        </div>
        <div className="ml-auto w-fit max-w-[92%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-2.5 py-2 text-[11px] text-ink-900 shadow-sm sm:text-[12px]">
          <span className="mb-1.5 flex items-center gap-1.5 rounded-lg bg-black/5 px-2 py-1.5 text-[10px] font-semibold">
            <FileText className="h-3.5 w-3.5 text-ink-500" /> EA_{ya}.pdf
          </span>
          {pick('Ini dokumen saya 🙏', 'Here are my documents 🙏')}
          <CheckCheck className="ml-1 inline h-3.5 w-3.5 text-brand-500" />
        </div>
        <div className="mt-2 w-fit max-w-[92%] rounded-xl rounded-tl-sm bg-white px-2.5 py-2 text-[11px] text-ink-900 shadow-sm sm:text-[12px]">
          {pick('Dah terima! Ada 3 pelepasan yang belum dituntut.', 'Got it! There are 3 reliefs you haven’t claimed.')}
        </div>
      </motion.div>

      {/* Result ticket */}
      <motion.div
        {...drop(0.8, 3)}
        className="absolute bottom-[5%] right-0 w-[39%] rounded-xl border-2 border-ink-900 bg-white p-3 shadow-paper-sm sm:p-4"
      >
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-500 sm:text-[9.5px]">
          {pick('Cukai perlu bayar', 'Tax payable')}
        </p>
        <p className="mt-1 text-[11px] text-ink-400 line-through">RM 1,980</p>
        <p className="text-[24px] font-extrabold leading-none tracking-tight text-ink-900 sm:text-[32px]">RM 640</p>
        <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-800">
          <Check className="h-3 w-3" strokeWidth={3} />
          {pick('Sedia dihantar', 'Ready to submit')}
        </p>
      </motion.div>
    </div>
  );
}

function Hero() {
  const { pick } = useLanguage();

  const facts = [
    pick('Rakan ejen berdaftar LHDN', 'Partner LHDN-registered agent'),
    pick('Sebut harga sebelum mula', 'Quote before we start'),
    pick('Balas pada hari bekerja', 'Replies on working days'),
  ];

  return (
    <section className="relative overflow-hidden bg-ink-50">
      <div className="bg-ledger-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-6">
          <motion.p {...fadeUp(0)} className="eyebrow">
            {pick('Platform pemfailan cukai Malaysia', 'Malaysian tax filing platform')}
          </motion.p>

          <motion.h1
            {...fadeUp(0.06)}
            className="mt-6 text-balance text-display-md text-ink-950 sm:text-display-lg xl:text-display-xl"
          >
            {pick(
              <>Fail cukai dengan betul, <span className="text-brand-600">tanpa pening kepala.</span></>,
              <>File your taxes right, <span className="text-brand-600">without the headache.</span></>
            )}
          </motion.h1>

          <motion.p {...fadeUp(0.12)} className="mt-6 max-w-lg text-pretty text-[17px] leading-relaxed text-ink-600 md:text-[18px]">
            {pick(
              'Hantar dokumen melalui WhatsApp. Kami susun, profesional cukai semak, dan setiap pengiraan diterangkan dalam bahasa mudah.',
              'Send your documents over WhatsApp. We organise them, a tax professional reviews, and every computation is explained in plain language.'
            )}
          </motion.p>

          <motion.div {...fadeUp(0.18)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/form" size="lg" onClick={() => trackEvent('hero_cta_click', { cta: 'consultation' })}>
              <MessageCircle className="h-[18px] w-[18px]" />
              {pick('Mula di WhatsApp', 'Start on WhatsApp')}
            </Button>
            <Button to="/#perkhidmatan" size="lg" variant="outline" onClick={() => trackEvent('hero_cta_click', { cta: 'pricing' })}>
              {pick('Lihat harga', 'See pricing')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(0.26)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-ink-200 pt-6">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[14px] font-medium text-ink-700">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-[5px] bg-ink-900 text-brand-400" aria-hidden="true">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
                {f}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="lg:col-span-6">
          <FilingDesk />
        </div>
      </div>

      <FormsStrip />
    </section>
  );
}

/**
 * The forms and filings we handle, as a row of index tabs. Tells a returning
 * visitor at a glance whether their form is covered before they scroll.
 */
function FormsStrip() {
  const { pick } = useLanguage();
  const forms = ['Borang BE', 'Borang B', 'Borang C', 'Borang P', 'Borang PT', 'CP500', 'e-Invois', pick('Cukai pegangan', 'Withholding tax'), pick('Duti setem', 'Stamp duty')];

  return (
    <div className="relative border-t border-ink-200 bg-white">
      <div className="container-x flex flex-col gap-4 py-5 md:flex-row md:items-center md:gap-8">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
          {pick('Kami uruskan', 'We handle')}
        </p>
        <ul className="flex flex-wrap gap-2">
          {forms.map((f) => (
            <li
              key={f}
              className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-1.5 text-[12px] font-semibold text-ink-700"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { Hero };
