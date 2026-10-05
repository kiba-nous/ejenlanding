import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * Client testimonials.
 *
 * Real clients, shown by initial only at their request. Each quote names a
 * specific experience (clarity, a refund, trust) rather than a promise, and
 * none guarantees a refund or a tax reduction to the reader.
 */

interface Testimonial {
  /** Initial only — clients asked to stay anonymous. */
  name: string;
  role: { bm: string; en: string };
  service: string;
  quote: { bm: string; en: string };
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'M.',
    role: { bm: 'Pemilik studio rumah', en: 'Home studio owner' },
    service: 'Borang B',
    quote: {
      bm: 'Semuanya mudah difahami. Setiap pengiraan diterangkan satu persatu, jadi saya tahu apa yang saya bayar dan kenapa.',
      en: 'Everything was easy to understand. Every computation was explained step by step, so I knew what I was paying and why.',
    },
  },
  {
    name: 'N.',
    role: { bm: 'Pemilik perniagaan online', en: 'Online business owner' },
    service: 'Borang B',
    quote: {
      bm: 'Tak sangka saya dapat refund daripada LHDN. Tahun depan saya guna EjenCukai lagi, itu sudah pasti.',
      en: 'I didn’t expect to get a refund from LHDN. I’m definitely coming back next year.',
    },
  },
  {
    name: 'H.',
    role: { bm: 'Affiliate marketer', en: 'Affiliate marketer' },
    service: 'Borang B',
    quote: {
      bm: 'Prosesnya sangat mudah dan saya rasa selamat serahkan dokumen saya. Boleh dipercayai.',
      en: 'The process was so easy, and I felt safe handing over my documents. Trustworthy.',
    },
  },
];

function Testimonials() {
  const { language, pick } = useLanguage();
  const [featured, ...rest] = TESTIMONIALS;

  const caption = (t: Testimonial, inverse = false) => (
    <figcaption className={`mt-6 flex items-center gap-3 border-t pt-5 ${inverse ? 'border-ink-950/15' : 'border-ink-100'}`}>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[16px] font-bold ${
          inverse ? 'bg-ink-950 text-brand-400' : 'bg-brand-100 text-brand-800'
        }`}
      >
        {t.name.replace('.', '')}
      </span>
      <span>
        <span className="block text-[14.5px] font-bold text-ink-900">{t.name}</span>
        <span className={`block text-[13px] ${inverse ? 'text-ink-800' : 'text-ink-500'}`}>
          {t.role[language]} · <span className="text-[12px]">{t.service}</span>
        </span>
      </span>
    </figcaption>
  );

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow={pick('Apa kata klien', 'From clients')}
          title={pick('Klien sebenar, kata-kata mereka sendiri.', 'Real clients, in their own words.')}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <motion.figure
            {...reveal()}
            className="relative flex flex-col overflow-hidden rounded-xl3 bg-brand-400 p-8 md:p-10 lg:col-span-7"
          >
            <span
              className="pointer-events-none absolute -right-4 -top-16 select-none text-[260px] font-extrabold leading-none text-ink-950/10"
              aria-hidden="true"
            >
              “
            </span>
            <Quote className="h-8 w-8 text-ink-950" aria-hidden="true" />
            <blockquote className="relative mt-6 flex-grow text-balance text-[26px] font-semibold leading-[1.2] tracking-tight text-ink-950 md:text-[34px]">
              “{featured.quote[language]}”
            </blockquote>
            {caption(featured, true)}
          </motion.figure>

          <div className="grid gap-5 lg:col-span-5">
            {rest.map((t, index) => (
              <motion.figure
                key={t.name}
                {...reveal((index + 1) * 0.08)}
                className="flex flex-col rounded-xl3 border border-ink-200 bg-ink-50 p-7"
              >
                <blockquote className="flex-grow text-[16.5px] leading-relaxed text-ink-800">“{t.quote[language]}”</blockquote>
                {caption(t)}
              </motion.figure>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[11.5px] uppercase tracking-[0.1em] text-ink-400">
          {pick('Nama dipendekkan atas permintaan klien.', 'Names shortened at clients’ request.')}
        </p>
      </div>
    </section>
  );
}

export { Testimonials };
