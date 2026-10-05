import { motion } from 'framer-motion';
import { Award, MessageCircleHeart, ReceiptText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
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
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-ledger opacity-60 [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div {...reveal()} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow text-white/60">{pick('Kenapa EjenCukai', 'Why EjenCukai')}</span>
            <h2 className="mt-4 text-balance text-display-sm md:text-display-md">
              {pick(
                <>Proses yang <span className="text-brand-400">jelas</span> dari mula hingga akhir.</>,
                <>A <span className="text-brand-400">clear</span> process from start to finish.</>
              )}
            </h2>
          </div>
        </motion.div>

        <ol className="lg:col-span-7">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              {...reveal(i * 0.06)}
              className="grid grid-cols-[auto,1fr] gap-x-5 gap-y-2 border-t border-white/15 py-8 first:border-t-0 first:pt-0 md:gap-x-8"
            >
              <span className="row-span-2 grid h-12 w-12 place-items-center rounded-xl bg-brand-400 text-ink-950">
                <r.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="flex items-baseline gap-3 text-[21px] font-bold leading-snug">
                <span className="text-[12px] font-semibold text-brand-300">0{i + 1}</span>
                {r.title}
              </h3>
              <p className="text-[15.5px] leading-relaxed text-white/70">{r.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export { WhyUs };
