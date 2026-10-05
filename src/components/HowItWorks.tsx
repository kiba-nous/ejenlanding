import { motion } from 'framer-motion';
import { Check, FileText, Paperclip } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FILING } from '../config/site';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/* Small vignettes, one per step, so each step shows what actually happens
   rather than repeating an icon in a rounded square. Decorative only. */

function ChatVignette() {
  const { pick } = useLanguage();
  return (
    <div className="flex h-full flex-col justify-end gap-2 p-5">
      <div className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12.5px] text-ink-800 shadow-sm">
        {pick('Saya freelancer, tak pasti borang apa 😅', 'I freelance, not sure which form 😅')}
      </div>
      <div className="ml-auto flex w-fit items-center gap-2 rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 text-[12px] font-semibold text-ink-800 shadow-sm">
        <Paperclip className="h-3.5 w-3.5 text-ink-500" />
        <span>3 {pick('fail', 'files')}</span>
      </div>
    </div>
  );
}

function QuoteVignette() {
  const { pick } = useLanguage();
  return (
    <div className="flex h-full items-end p-5">
      <div className="w-full rounded-xl border border-ink-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            {pick('Sebut harga', 'Quote')} #0142
          </span>
          <FileText className="h-4 w-4 text-ink-400" />
        </div>
        <span className="mt-3 block h-1.5 w-3/5 rounded-full bg-ink-100" />
        <div className="mt-3 flex items-baseline justify-between border-t border-dashed border-ink-200 pt-2">
          <span className="text-[11px] font-medium text-ink-500">{pick('Jumlah', 'Total')}</span>
          <span className="text-[14px] font-bold text-ink-900">{FILING.fromLabel}</span>
        </div>
      </div>
    </div>
  );
}

function SubmitVignette() {
  const { pick } = useLanguage();
  return (
    <div className="flex h-full items-end p-5">
      <div className="flex w-full items-center gap-3 rounded-xl bg-ink-950 p-4 text-white shadow-sm">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-400 text-ink-950">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-bold">{pick('Penghantaran berjaya', 'Submission received')}</span>
          <span className="block truncate text-[10.5px] text-white/60">LHDN · e-Filing · {pick('Akuan', 'Ack.')}</span>
        </span>
      </div>
    </div>
  );
}

/**
 * The site never explained what happens after the visitor clicks. For a
 * first-time filer that uncertainty is the main reason not to contact us.
 */
function HowItWorks() {
  const { pick } = useLanguage();

  const steps = [
    {
      vignette: ChatVignette,
      tint: 'bg-[#EFEAE2]',
      title: pick('Hantar butiran di WhatsApp', 'Send your details on WhatsApp'),
      body: pick(
        'Beritahu kami situasi anda dan hantar dokumen yang ada. Tak lengkap pun tak apa.',
        'Tell us your situation and send whatever documents you have. Incomplete is fine.'
      ),
      meta: pick('2 minit', '2 minutes'),
    },
    {
      vignette: QuoteVignette,
      tint: 'bg-brand-100',
      title: pick('Kami semak & sebut harga', 'We review & quote'),
      body: pick(
        'Profesional cukai kami semak pendapatan dan pelepasan anda, kemudian kami beri sebut harga bertulis sebelum mula.',
        'Our tax professionals review your income and reliefs, then we give you a written quote before any work starts.'
      ),
      meta: pick('Biasanya dalam 24 jam', 'Usually within 24 hours'),
    },
    {
      vignette: SubmitVignette,
      tint: 'bg-brand-400',
      title: pick('Anda sahkan, kami hantar', 'You confirm, we submit'),
      body: pick(
        'Anda semak pengiraan dan pilih sama ada hantar atas nama sendiri atau melalui ejen. Kami kongsikan bukti penghantaran.',
        'You check the computation and choose to submit under your own name or through the agent. We share the acknowledgement.'
      ),
      meta: pick('Biasanya 1–3 hari bekerja', 'Usually 1–3 working days'),
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28" id="cara">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow={pick('Cara ia berfungsi', 'How it works')}
          title={pick('Tiga langkah. Tiada borang panjang.', 'Three steps. No long forms.')}
          subtitle={pick(
            'Semuanya berlaku di WhatsApp, jadi anda boleh uruskan cukai dalam masa rehat tengah hari.',
            'Everything happens on WhatsApp, so you can sort out your taxes over a lunch break.'
          )}
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              {...reveal(i * 0.08)}
              className="flex flex-col overflow-hidden rounded-xl2 border border-ink-200 bg-white"
            >
              <div className={`relative h-52 ${step.tint}`} aria-hidden="true">
                <span className="absolute left-5 top-4 text-[44px] font-extrabold leading-none tracking-tight text-ink-950/90">
                  0{i + 1}
                </span>
                <step.vignette />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[19px] font-bold leading-snug text-ink-900">{step.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{step.body}</p>
                <p className="mt-5 flex items-center gap-2 border-t border-ink-100 pt-4 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-ink-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {step.meta}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export { HowItWorks };
