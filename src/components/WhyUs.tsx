import { motion } from 'framer-motion';
import { Award, MessageCircleHeart, ReceiptText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * Three reasons, each something we can actually stand behind: EjenCukai is
 * the platform; review is done by tax professionals, with complex cases
 * handled alongside a partner LHDN-registered agent.
 */
function WhyUs() {
  const { pick } = useLanguage();

  const reasons = [
    {
      icon: Award,
      title: pick('Disemak profesional cukai', 'Reviewed by tax professionals'),
      body: pick(
        'Setiap pemfailan disemak oleh profesional cukai. Kes yang lebih kompleks dikendalikan bersama rakan ejen cukai berdaftar LHDN. EjenCukai ialah platform yang menguruskan prosesnya.',
        'Every filing is reviewed by a tax professional. More complex cases are handled together with a partner LHDN-registered tax agent. EjenCukai is the platform that runs the process.'
      ),
    },
    {
      icon: ReceiptText,
      title: pick('Sebut harga sebelum mula', 'A quote before we start'),
      body: pick(
        'Sebut harga bertulis di WhatsApp berdasarkan kes anda. Anda hanya bayar selepas bersetuju.',
        'A written quote on WhatsApp based on your case. You only pay after agreeing.'
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
          title={pick('Proses yang jelas dari mula hingga akhir.', 'A clear process from start to finish.')}
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
