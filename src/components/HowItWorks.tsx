import { motion } from 'framer-motion';
import { MessageSquareText, SearchCheck, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * The site never explained what happens after the visitor clicks. For a
 * first-time filer that uncertainty is the main reason not to contact us.
 */
function HowItWorks() {
  const { pick } = useLanguage();

  const steps = [
    {
      icon: MessageSquareText,
      title: pick('Hantar butiran di WhatsApp', 'Send your details on WhatsApp'),
      body: pick(
        'Beritahu kami situasi anda dan hantar dokumen yang ada. Tak lengkap pun tak apa.',
        'Tell us your situation and send whatever documents you have. Incomplete is fine.'
      ),
      meta: pick('2 minit', '2 minutes'),
    },
    {
      icon: SearchCheck,
      title: pick('Kami semak & sebut harga', 'We review & quote'),
      body: pick(
        'Ejen kami semak pendapatan dan pelepasan anda, kemudian beri sebut harga tetap sebelum mula.',
        'Our agent reviews your income and reliefs, then gives a fixed quote before any work starts.'
      ),
      meta: pick('Dalam 24 jam', 'Within 24 hours'),
    },
    {
      icon: Send,
      title: pick('Kami failkan, anda sahkan', 'We file, you confirm'),
      body: pick(
        'Anda semak pengiraan, kami hantar ke LHDN dan kongsikan bukti penghantaran.',
        'You check the computation, we submit to LHDN and share the acknowledgement.'
      ),
      meta: pick('1–3 hari bekerja', '1–3 working days'),
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28" id="cara">
      <div className="container-x">
        <SectionHeading
          eyebrow={pick('Cara ia berfungsi', 'How it works')}
          title={pick('Tiga langkah. Tiada borang panjang.', 'Three steps. No long forms.')}
          subtitle={pick(
            'Semuanya berlaku di WhatsApp, jadi anda boleh uruskan cukai dalam masa rehat tengah hari.',
            'Everything happens on WhatsApp, so you can sort out your taxes over a lunch break.'
          )}
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {/* connector line (desktop) */}
          <div className="absolute left-[16.6%] right-[16.6%] top-9 hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent md:block" aria-hidden="true" />

          {steps.map((step, i) => (
            <motion.li key={step.title} {...reveal(i * 0.08)} className="relative flex flex-col">
              <div className="mb-5">
                <span className="relative grid h-[72px] w-[72px] place-items-center rounded-2xl border border-ink-200 bg-white shadow-card">
                  <step.icon className="h-7 w-7 text-brand-600" strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-ink-900 text-[12px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.body}</p>
              <span className="mt-4 inline-block w-fit rounded-full bg-ink-100 px-3 py-1 text-[12px] font-semibold text-ink-600">
                {step.meta}
              </span>
            </motion.li>
          ))}
        </ol>

      </div>
    </section>
  );
}

export { HowItWorks };
