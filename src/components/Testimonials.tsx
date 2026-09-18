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

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={pick('Apa kata klien', 'From clients')}
          title={pick('Klien sebenar, kata-kata mereka sendiri.', 'Real clients, in their own words.')}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <motion.figure key={t.name} {...reveal(index * 0.08)} className="card flex flex-col p-7">
              <Quote className="h-6 w-6 text-brand-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-grow text-[16px] leading-relaxed text-ink-800">“{t.quote[language]}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-[14px] font-bold text-brand-700">
                  {t.name.replace('.', '')}
                </span>
                <span>
                  <span className="block text-[14.5px] font-bold text-ink-900">{t.name}</span>
                  <span className="block text-[13px] text-ink-500">
                    {t.role[language]} · {t.service}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-6 text-center text-[12.5px] text-ink-400">
          {pick('Nama dipendekkan atas permintaan klien.', 'Names shortened at clients’ request.')}
        </p>
      </div>
    </section>
  );
}

export { Testimonials };
