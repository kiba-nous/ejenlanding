import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarCheck, Clock, Lock, MessageCircle, ShieldCheck, UserCheck, Video } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { CHIPIN, CONSULTATION, BOOKING_STORAGE_KEY, CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../config/site';
import { Accordion } from './ui/Accordion';
import { Button } from './ui/button';
import { Badge, CheckItem, SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * Paid personal tax consultation — RM149 / hour.
 *
 * Fills the gap between the RM25 e-books and the full filing service. Payment
 * comes before scheduling: paying is the qualification step, which is what
 * keeps the calendar free of no-shows.
 *
 * Flow: this page → Chip-in checkout → /booking/thank-you → Calendly.
 *
 * This page used to be Malay-only regardless of the language toggle; all
 * copy now follows it.
 */

function BookingForm() {
  const { pick } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const checkoutReady = CHIPIN.consultation.length > 0;
  const unit = pick(CONSULTATION.unitBm, CONSULTATION.unitEn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError(pick('Sila masukkan nama anda.', 'Please enter your name.'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(pick('Sila masukkan alamat emel yang sah.', 'Please enter a valid email address.'));
      return;
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setError(pick('Sila masukkan nombor WhatsApp yang sah.', 'Please enter a valid WhatsApp number.'));
      return;
    }

    setError('');

    const details = { name: name.trim(), email: email.trim(), phone: phone.trim() };

    // Stash for prefill on the way back from Chip-in. sessionStorage survives
    // the round trip because checkout navigates in this same tab — which is
    // why this is a same-tab redirect and not a new window.
    try {
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(details));
    } catch {
      // Private mode or storage disabled — Calendly will just ask again.
    }

    trackEvent('consultation_checkout_click', {
      value: CONSULTATION.priceMYR,
      currency: 'MYR',
      checkout_ready: checkoutReady,
    });

    if (checkoutReady) {
      window.location.href = CHIPIN.consultation;
      return;
    }

    // Chip-in product not created yet — route the lead to WhatsApp rather
    // than dropping it. Setting CHIPIN.consultation is all that's needed to
    // switch this over.
    window.location.href = buildWhatsAppUrl(
      [
        pick(`Hi EjenCukai! Saya ${details.name}.`, `Hi EjenCukai! I'm ${details.name}.`),
        '',
        pick(
          `Saya ingin tempah Konsultasi Cukai Peribadi (${CONSULTATION.priceLabel} / ${CONSULTATION.unitBm}).`,
          `I'd like to book a Personal Tax Consultation (${CONSULTATION.priceLabel} / ${CONSULTATION.unitEn}).`
        ),
        `${pick('Emel', 'Email')}: ${details.email}`,
        '',
        pick('Boleh bantu saya aturkan masa dan pembayaran?', 'Could you help me arrange a time and payment?'),
      ].join('\n')
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card rounded-xl3 p-7 md:p-8">
      <div className="flex items-baseline gap-2">
        <span className="text-[40px] font-extrabold tracking-tight text-ink-900">{CONSULTATION.priceLabel}</span>
        <span className="text-[15px] font-medium text-ink-500">/ {unit}</span>
      </div>
      <p className="mt-1 text-[14px] text-ink-500">
        {pick(
          `Sesi ${CONSULTATION.durationMinutes} minit · Bayar dahulu, pilih masa selepas itu`,
          `${CONSULTATION.durationMinutes}-minute session · Pay first, then pick a time`
        )}
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="bk-name" className="field-label">{pick('Nama', 'Name')}</label>
          <input id="bk-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
            placeholder={pick('Nama penuh anda', 'Your full name')} className="field" />
        </div>
        <div>
          <label htmlFor="bk-email" className="field-label">{pick('Emel', 'Email')}</label>
          <input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
            placeholder="nama@emel.com" className="field" />
        </div>
        <div>
          <label htmlFor="bk-phone" className="field-label">{pick('Nombor WhatsApp', 'WhatsApp number')}</label>
          <input id="bk-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel"
            placeholder="012-345 6789" className="field" />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-[13.5px] font-medium text-red-700">{error}</p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full">
        {checkoutReady
          ? pick(`Bayar ${CONSULTATION.priceLabel} & pilih masa`, `Pay ${CONSULTATION.priceLabel} & pick a time`)
          : pick(`Tempah sesi ${CONSULTATION.priceLabel}`, `Book a ${CONSULTATION.priceLabel} session`)}
      </Button>

      <ul className="mt-5 space-y-2 text-[12.5px] text-ink-500">
        <li className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          {checkoutReady
            ? pick('Pembayaran selamat melalui Chip-in', 'Secure payment via Chip-in')
            : pick('Kami akan hubungi anda untuk sahkan masa dan pembayaran', 'We’ll contact you to confirm the time and payment')}
        </li>
        <li className="flex items-center gap-2">
          <CalendarCheck className="h-3.5 w-3.5 shrink-0" />
          {pick('Pilih slot anda sendiri selepas pembayaran', 'Pick your own slot after payment')}
        </li>
      </ul>
    </form>
  );
}

export function ConsultationPage() {
  const { pick } = useLanguage();
  usePageMeta({
    title: pick('Konsultasi Cukai Peribadi RM149', 'Personal Tax Consultation RM149'),
    description: pick(
      'Sesi 60 minit satu-dengan-satu bersama ejen cukai berdaftar LHDN. Semak pelepasan, jawab soalan, rancang langkah seterusnya. RM149 sejam.',
      'A 60-minute one-on-one with an LHDN-registered tax agent. Review reliefs, get answers, plan next steps. RM149 per hour.'
    ),
  });

  const included = [
    pick('Semakan situasi cukai anda bersama ejen cukai', 'A review of your tax situation with a tax agent'),
    pick('Senarai pelepasan dan potongan yang anda layak tuntut', 'A list of reliefs and deductions you can claim'),
    pick('Jawapan kepada soalan khusus tentang borang, resit dan rekod', 'Answers to your specific questions on forms, receipts and records'),
    pick('Cadangan langkah seterusnya untuk tahun taksiran semasa', 'Recommended next steps for the current assessment year'),
  ];

  const forWho = [
    pick('Anda baru mula bekerja dan tidak pernah fail cukai', 'You’ve just started working and have never filed'),
    pick('Anda ada pendapatan sampingan atau freelance dan tidak pasti cara isytihar', 'You have side or freelance income and aren’t sure how to declare it'),
    pick('Anda rasa terlebih bayar cukai tetapi tidak tahu di mana silapnya', 'You think you’ve overpaid but can’t see where'),
    pick('Anda dapat surat LHDN dan tidak faham maksudnya', 'You received an LHDN letter and don’t understand it'),
  ];

  const notForWho = [
    pick(
      'Anda mahu kami terus failkan borang untuk anda. Itu perkhidmatan pemfailan, bukan sesi ini',
      'You want us to file the form for you. That’s the filing service, not this session'
    ),
    pick(
      'Anda perlukan audit atau perwakilan siasatan LHDN. Hubungi kami untuk sebut harga berasingan',
      'You need audit or LHDN investigation representation. Contact us for a separate quote'
    ),
  ];

  const faqs = [
    {
      q: pick('Berapa lama sesi ini?', 'How long is the session?'),
      a: pick(
        'Satu jam penuh melalui panggilan video atau telefon. Jika kes anda memerlukan masa tambahan, anda boleh tempah sesi susulan pada kadar yang sama.',
        'A full hour by video or phone call. If your case needs more time, you can book a follow-up at the same rate.'
      ),
    },
    {
      q: pick('Apa yang perlu saya sediakan sebelum sesi?', 'What should I prepare?'),
      a: pick(
        'Penyata EA (jika makan gaji), rekod pendapatan sampingan, dan resit-resit pelepasan yang anda ada. Tidak lengkap pun tidak mengapa, kami akan bantu susun.',
        'Your EA statement (if salaried), records of any side income, and whatever relief receipts you have. Incomplete is fine, we’ll help you organise them.'
      ),
    },
    {
      q: pick('Bagaimana saya tempah masa selepas bayar?', 'How do I pick a time after paying?'),
      a: pick(
        'Selepas pembayaran berjaya, anda akan dibawa terus ke kalendar kami untuk pilih tarikh dan masa yang sesuai. Pengesahan akan dihantar ke emel anda.',
        'After payment you’re taken straight to our calendar to choose a date and time. A confirmation is sent to your email.'
      ),
    },
    {
      q: pick('Boleh saya tukar tarikh?', 'Can I reschedule?'),
      a: pick(
        'Boleh. Emel pengesahan mengandungi pautan untuk menjadualkan semula. Kami hargai pemberitahuan sekurang-kurangnya 12 jam lebih awal.',
        'Yes. The confirmation email has a reschedule link. We appreciate at least 12 hours’ notice.'
      ),
    },
    {
      q: pick('Adakah ini termasuk pemfailan borang saya?', 'Does this include filing my form?'),
      a: pick(
        'Tidak. Sesi ini adalah nasihat dan semakan. Jika anda mahu kami uruskan pemfailan, kami akan berikan sebut harga berasingan semasa sesi.',
        'No. This session is advice and review. If you’d like us to handle the filing, we’ll give you a separate quote during the session.'
      ),
    },
  ];

  const format = [
    { icon: Video, text: pick('Video atau telefon', 'Video or phone') },
    { icon: Clock, text: `${CONSULTATION.durationMinutes} ${pick('minit', 'minutes')}` },
    { icon: ShieldCheck, text: pick('Ejen berdaftar LHDN', 'LHDN-registered agent') },
  ];

  return (
    <>
      <Navbar />

      <main id="main" className="bg-white">
        {/* Hero + booking form */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-hero-glow" aria-hidden="true" />
          <div className="container-x grid items-start gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <motion.div {...reveal(0)}>
                <Badge>
                  <UserCheck className="h-3.5 w-3.5" />
                  {pick('Konsultasi cukai peribadi', 'Personal tax consultation')}
                </Badge>
              </motion.div>

              <motion.h1 {...reveal(0.05)} className="mt-5 text-balance text-display-sm text-ink-900 md:text-display-lg">
                {pick(
                  <>Cakap terus dengan <span className="bg-brand-gradient bg-clip-text text-transparent">pakar cukai.</span></>,
                  <>Talk directly to a <span className="bg-brand-gradient bg-clip-text text-transparent">tax expert.</span></>
                )}
              </motion.h1>

              <motion.p {...reveal(0.1)} className="mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-ink-600">
                {pick(
                  'Satu jam, satu-dengan-satu. Kami semak situasi cukai anda, kenal pasti pelepasan yang anda terlepas, dan jawab setiap soalan dalam bahasa yang mudah difahami.',
                  'One hour, one-on-one. We review your tax situation, spot the reliefs you’ve missed, and answer every question in plain language.'
                )}
              </motion.p>

              <motion.ul {...reveal(0.15)} className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {format.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-[13.5px] font-medium text-ink-700">
                    <Icon className="h-4 w-4 text-brand-600" />
                    {text}
                  </li>
                ))}
              </motion.ul>

              <motion.div {...reveal(0.2)} className="mt-8 border-t border-ink-100 pt-6">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink-500">{pick('Apa yang anda dapat', 'What you get')}</p>
                <ul className="mt-4 space-y-3">
                  {included.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div {...reveal(0.1)} className="lg:col-span-5">
              <BookingForm />
            </motion.div>
          </div>
        </section>

        {/* Who it's for / not for */}
        <section className="bg-ink-50 py-16 md:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow={pick('Sesuai untuk siapa', 'Who it’s for')}
              title={pick('Kebanyakan orang bayar lebih bukan sebab tidak layak, tapi sebab tiada siapa terangkan.', 'Most people overpay not because they don’t qualify, but because nobody explained it.')}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <motion.div {...reveal(0)} className="card p-8">
                <h3 className="text-[18px] font-bold text-ink-900">{pick('Sesuai untuk anda jika', 'This is for you if')}</h3>
                <ul className="mt-5 space-y-3">
                  {forWho.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...reveal(0.06)} className="rounded-xl2 border border-dashed border-ink-300 p-8">
                <h3 className="text-[18px] font-bold text-ink-900">{pick('Mungkin tidak sesuai jika', 'Probably not for you if')}</h3>
                <ul className="mt-5 space-y-3">
                  {notForWho.map((item) => (
                    <CheckItem key={item} muted>{item}</CheckItem>
                  ))}
                </ul>
                <p className="mt-6 text-[13.5px] text-ink-500">
                  {pick('Tidak pasti?', 'Not sure?')}{' '}
                  <Link to="/form" className="font-semibold text-brand-700 hover:underline">
                    {pick('Tanya kami dahulu', 'Ask us first')}
                  </Link>
                  , {pick('percuma.', 'it’s free.')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading align="left" eyebrow={pick('Soalan lazim', 'FAQ')} title={pick('Sebelum anda tempah.', 'Before you book.')} />
              <p className="mt-6 text-[14px] text-ink-500">
                {pick('Ada soalan lain?', 'Other questions?')}{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-700 hover:underline">{CONTACT_EMAIL}</a>
                {' '}·{' '}
                <a
                  href={buildWhatsAppUrl()}
                  onClick={() => trackEvent('whatsapp_click', { location: 'consultation_faq' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
            </div>
            <motion.div {...reveal(0.05)} className="lg:col-span-8">
              <Accordion items={faqs} className="border-t border-ink-200" />
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-20">
          <div className="container-x">
            <motion.div {...reveal()} className="relative overflow-hidden rounded-xl3 bg-ink-950 px-6 py-12 text-center text-white md:px-16 md:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(79,179,255,0.28),transparent_70%)]" aria-hidden="true" />
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-balance text-display-sm">
                  {pick('Selesaikan keraguan cukai anda dalam satu jam.', 'Clear up your tax doubts in one hour.')}
                </h2>
                <p className="mt-3 text-[15px] text-white/70">
                  {CONSULTATION.priceLabel} / {pick(CONSULTATION.unitBm, CONSULTATION.unitEn)} · {pick('Pilih slot anda sendiri selepas pembayaran', 'Pick your own slot after payment')}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    variant="white"
                    size="lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {pick('Tempah sesi anda', 'Book your session')}
                  </Button>
                  <Button
                    href={buildWhatsAppUrl()}
                    variant="ghost"
                    size="lg"
                    className="text-white hover:bg-white/10 hover:text-white"
                    onClick={() => trackEvent('whatsapp_click', { location: 'consultation_cta' })}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {pick('Tanya dulu di WhatsApp', 'Ask first on WhatsApp')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
