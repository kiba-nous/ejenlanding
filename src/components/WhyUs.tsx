import { motion } from 'framer-motion';
import { Award, MessageCircleHeart, ReceiptText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * Three reasons, each something the visitor can hold us to.
 */
function WhyUs() {
  const { pick } = useLanguage();

  const reasons = [
    {
      icon: Award,
      title: pick('Berdaftar dan bertanggungjawab', 'Registered and accountable'),
      body: pick(
        'Ejen cukai berlesen LHDN di bawah Seksyen 153. Nama kami tertera pada borang anda.',
        'LHDN-licensed under Section 153. Our name goes on your form.'
      ),
    },
    {
      icon: ReceiptText,
      title: pick('Harga tetap sebelum mula', 'A fixed price before we start'),
      body: pick(
        'Sebut harga bertulis di WhatsApp. Anda hanya bayar selepas bersetuju.',
        'A written quote on WhatsApp. You only pay after agreeing.'
      ),
    },
    {
      icon: MessageCircleHeart,
      title: pick('Bahasa mudah, bukan jargon', 'Plain language, not jargon'),
      body: pick(
        'Setiap pengiraan diterangkan supaya anda faham apa yang anda tandatangani.',
        'Every computation is explained so you understand what you are signing.'
      ),
    },
  ];

  return (
    <section className="bg-ink-50 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={pick('Kenapa EjenCukai', 'Why EjenCukai')}
          title={pick('Ejen cukai yang anda boleh pegang janjinya.', 'A tax agent you can hold to their word.')}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.li key={r.title} {...reveal(i * 0.06)} className="card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <r.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-ink-900">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{r.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { WhyUs };
