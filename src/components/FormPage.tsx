import { BadgeCheck, Clock, ShieldCheck } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { QuickConsultForm } from './QuickConsultForm';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Free enquiry page.
 *
 * A native three-step form that branches on client type and hands off to
 * WhatsApp on submit. The side column answers "what happens next" so the
 * visitor isn't guessing while they type.
 */
function FormPage() {
  const { pick } = useLanguage();
  usePageMeta({
    title: pick('Hubungi kami', 'Contact us'),
    description: pick(
      'Beritahu kami keperluan cukai anda dalam tiga langkah. Kami biasanya balas melalui WhatsApp dalam 24 jam pada hari bekerja dengan sebut harga.',
      'Tell us what you need in three steps. We usually reply on WhatsApp within 24 hours on working days with a quote.'
    ),
  });

  const reassurance = [
    { icon: Clock, text: pick('Biasanya balas dalam 24 jam pada hari bekerja', 'Usually a reply within 24 hours on working days') },
    { icon: BadgeCheck, text: pick('Sebut harga bertulis sebelum kerja bermula', 'Written quote before any work starts') },
    { icon: ShieldCheck, text: pick('Butiran anda hanya untuk membalas pertanyaan ini', 'Your details are only used to answer this enquiry') },
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="relative min-h-screen bg-ink-50">
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-hero-glow" aria-hidden="true" />
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <span className="eyebrow">{pick('Pertanyaan percuma', 'Free enquiry')}</span>
            <h1 className="mt-4 text-balance text-display-sm text-ink-900 md:text-display-md">
              {pick('Beritahu kami keperluan anda.', 'Tell us what you need.')}
            </h1>
            <p className="mt-4 text-pretty text-[16px] leading-relaxed text-ink-600">
              {pick(
                'Tiga langkah ringkas. Anda akan dibawa ke WhatsApp dengan mesej yang sudah siap, tinggal tekan hantar.',
                'Three short steps. You’ll be taken to WhatsApp with a ready-made message, just press send.'
              )}
            </p>
            <ul className="mt-8 space-y-3">
              {reassurance.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[14.5px] text-ink-700">
                  <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-600" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="card rounded-xl3 p-6 md:p-10">
              <QuickConsultForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export { FormPage };
