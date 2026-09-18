import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { HOME_FAQ } from '../data/faq';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { Accordion } from './ui/Accordion';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

function HomeFaq() {
  const { language, pick } = useLanguage();

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            eyebrow={pick('Soalan lazim', 'FAQ')}
            title={pick('Soalan yang selalu kami terima.', 'Questions we get every week.')}
            subtitle={pick('Tak jumpa jawapan? Tanya terus, kami balas dalam 24 jam.', 'Can’t find your answer? Ask us directly, we reply within 24 hours.')}
          />
          <motion.a
            {...reveal(0.1)}
            href={buildWhatsAppUrl(pick('Hi EjenCukai! Saya ada soalan tentang cukai.', 'Hi EjenCukai! I have a question about my taxes.'))}
            onClick={() => trackEvent('whatsapp_click', { location: 'faq' })}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-ink-200 px-5 text-[14px] font-semibold text-ink-800 transition-colors hover:border-whatsapp hover:bg-emerald-50 hover:text-emerald-800"
          >
            <MessageCircle className="h-4 w-4" />
            {pick('Tanya di WhatsApp', 'Ask on WhatsApp')}
          </motion.a>
        </div>
        <motion.div {...reveal(0.05)} className="lg:col-span-8">
          <Accordion items={HOME_FAQ[language]} className="border-t border-ink-200" />
        </motion.div>
      </div>
    </section>
  );
}

export { HomeFaq };
