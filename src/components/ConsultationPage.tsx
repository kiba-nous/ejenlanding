import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Clock, Shield, ArrowLeft, ChevronDown, ChevronUp, UserCheck,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import {
  CHIPIN, CONSULTATION, BOOKING_STORAGE_KEY, CONTACT_EMAIL, WHATSAPP_DISPLAY,
} from '../config/site';

/**
 * Paid personal tax consultation — RM149 / hour.
 *
 * Fills the gap between the RM25 e-books and RM500 filing service. Payment
 * comes before scheduling: paying is the qualification step, which is what
 * keeps the calendar free of no-shows.
 *
 * Flow: this page → Chip-in checkout → /booking/thank-you → Calendly.
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
});

const included = [
  'Semakan situasi cukai anda bersama pakar cukai',
  'Senarai pelepasan dan potongan yang anda layak tuntut',
  'Jawapan kepada soalan khusus anda tentang borang, resit dan rekod',
  'Cadangan langkah seterusnya untuk tahun taksiran semasa',
];

const forWho = [
  'Anda baru mula bekerja dan tidak pernah fail cukai',
  'Anda ada pendapatan sampingan atau freelance dan tidak pasti cara isytihar',
  'Anda rasa terlebih bayar cukai tetapi tidak tahu di mana silapnya',
  'Anda dapat surat LHDN dan tidak faham maksudnya',
];

const notForWho = [
  'Anda mahu kami terus failkan borang untuk anda. Itu perkhidmatan pemfailan, bukan sesi ini',
  'Anda perlukan audit atau perwakilan siasatan LHDN. Hubungi kami untuk sebut harga berasingan',
];

const faqs = [
  {
    q: 'Berapa lama sesi ini?',
    a: `Satu jam penuh melalui panggilan video atau telefon. Jika kes anda memerlukan masa tambahan, anda boleh tempah sesi susulan pada kadar yang sama.`,
  },
  {
    q: 'Apa yang perlu saya sediakan sebelum sesi?',
    a: 'Penyata EA (jika makan gaji), rekod pendapatan sampingan, dan resit-resit pelepasan yang anda ada. Tidak lengkap pun tidak mengapa, kami akan bantu susun.',
  },
  {
    q: 'Bagaimana saya tempah masa selepas bayar?',
    a: 'Selepas pembayaran berjaya, anda akan dibawa terus ke kalendar kami untuk pilih tarikh dan masa yang sesuai. Pengesahan akan dihantar ke emel anda.',
  },
  {
    q: 'Boleh saya tukar tarikh?',
    a: 'Boleh. Emel pengesahan mengandungi pautan untuk menjadualkan semula. Kami hargai pemberitahuan sekurang-kurangnya 12 jam lebih awal.',
  },
  {
    q: 'Adakah ini termasuk pemfailan borang saya?',
    a: 'Tidak. Sesi ini adalah nasihat dan semakan. Jika anda mahu kami uruskan pemfailan, kami akan berikan sebut harga berasingan semasa sesi.',
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = q.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="border-b border-apple-gray-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${id}`}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-apple-gray-1">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-apple-gray-3 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-apple-gray-3 shrink-0" />}
      </button>
      {open && (
        <p id={`faq-${id}`} className="pb-5 text-[14px] text-apple-gray-2 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const checkoutReady = CHIPIN.consultation.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError('Sila masukkan nama anda.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Sila masukkan alamat emel yang sah.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setError('Sila masukkan nombor WhatsApp yang sah.');
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
    // than dropping it. Remove nothing here once the link is live; setting
    // CHIPIN.consultation is all that's needed to switch this over.
    window.location.href = buildWhatsAppUrl(
      [
        `Hi EjenCukai! Saya ${details.name}.`,
        '',
        `Saya ingin tempah Konsultasi Cukai Peribadi (${CONSULTATION.priceLabel} / ${CONSULTATION.unitBm}).`,
        `Emel: ${details.email}`,
        '',
        'Boleh bantu saya aturkan masa dan pembayaran?',
      ].join('\n')
    );
  };

  const field =
    'w-full px-4 py-3 text-[15px] border border-apple-gray-4 rounded-apple-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-150';

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-apple-gray-4 rounded-apple p-8">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-light text-apple-gray-1">{CONSULTATION.priceLabel}</span>
        <span className="text-[15px] text-apple-gray-3">/ {CONSULTATION.unitBm}</span>
      </div>
      <p className="text-[14px] text-apple-gray-3 mb-6">
        Sesi {CONSULTATION.durationMinutes} minit · Bayar dahulu, pilih masa selepas itu
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="bk-name" className="block text-[13px] font-medium text-apple-gray-2 mb-1.5">Nama</label>
          <input id="bk-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            autoComplete="name" placeholder="Nama penuh anda" className={field} />
        </div>
        <div>
          <label htmlFor="bk-email" className="block text-[13px] font-medium text-apple-gray-2 mb-1.5">Emel</label>
          <input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" placeholder="nama@emel.com" className={field} />
        </div>
        <div>
          <label htmlFor="bk-phone" className="block text-[13px] font-medium text-apple-gray-2 mb-1.5">Nombor WhatsApp</label>
          <input id="bk-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel" placeholder="012-345 6789" className={field} />
        </div>
      </div>

      {error && <p role="alert" className="mt-4 text-[13px] text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full mt-6 bg-apple-blue hover:opacity-90 text-white text-[15px] font-semibold py-4 px-6 rounded-apple-button transition-opacity duration-200"
      >
        {checkoutReady
          ? `Bayar ${CONSULTATION.priceLabel} & pilih masa`
          : `Tempah sesi ${CONSULTATION.priceLabel}`}
      </button>

      <div className="mt-5 space-y-1.5 text-[12px] text-apple-gray-3">
        <p className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          {checkoutReady ? 'Pembayaran selamat melalui Chip-in' : 'Kami akan hubungi anda untuk sahkan masa dan pembayaran'}
        </p>
        <p className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          Pilih slot anda sendiri selepas pembayaran
        </p>
      </div>
    </form>
  );
}

export function ConsultationPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero + booking form */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-apple-gray-6 via-white to-white" />
          <div className="relative container mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-20 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
              <div>
                <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-1.5 rounded-full mb-6">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Konsultasi Cukai Peribadi</span>
                </motion.div>

                <motion.h1 {...fadeUp(0.06)} className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-5 leading-tight">
                  Cakap terus dengan{' '}
                  <span className="font-semibold">pakar cukai.</span>
                </motion.h1>

                <motion.p {...fadeUp(0.12)} className="text-[17px] text-apple-gray-2 leading-relaxed mb-8">
                  Satu jam, satu-dengan-satu. Kami semak situasi cukai anda, kenal pasti pelepasan yang anda terlepas,
                  dan jawab setiap soalan anda dalam bahasa yang mudah difahami.
                </motion.p>

                <motion.ul {...fadeUp(0.18)} className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-apple-gray-2">
                      <CheckCircle className="w-4 h-4 text-apple-blue mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </div>

              <motion.div {...fadeUp(0.1)}>
                <BookingForm />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Pain points */}
        <div className="bg-apple-gray-6 border-y border-apple-gray-4">
          <div className="container mx-auto px-6 py-14 max-w-2xl">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-xl font-medium text-apple-gray-1 mb-5">
                Kebanyakan orang bayar cukai lebih daripada sepatutnya, bukan sebab tidak layak, tapi sebab tiada siapa terangkan.
              </h2>
              <ul className="space-y-2.5">
                {[
                  'Tidak tahu pelepasan apa yang boleh dituntut',
                  'Risau buat kesilapan dan kena audit LHDN',
                  'Baca panduan online tapi masih tak pasti untuk kes sendiri',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-apple-gray-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-apple-blue shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Who it's for / not for */}
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0)} className="bg-apple-gray-6 border border-apple-gray-4 rounded-apple p-8">
              <h3 className="text-lg font-semibold text-apple-gray-1 mb-4">Sesuai untuk anda jika</h3>
              <ul className="space-y-2.5">
                {forWho.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-apple-gray-2">
                    <CheckCircle className="w-4 h-4 text-apple-blue mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.06)} className="bg-white border border-apple-gray-4 rounded-apple p-8">
              <h3 className="text-lg font-semibold text-apple-gray-1 mb-4">Mungkin tidak sesuai jika</h3>
              <ul className="space-y-2.5">
                {notForWho.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-apple-gray-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-apple-gray-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] text-apple-gray-3">
                Tidak pasti? <Link to="/form" className="text-apple-blue hover:opacity-70 transition-opacity duration-150">Tanya kami dahulu</Link>, percuma.
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-apple-gray-6 border-y border-apple-gray-4">
          <div className="container mx-auto px-6 py-14 max-w-2xl">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-2xl font-medium text-apple-gray-1 mb-6">Soalan lazim</h2>
              <div className="border-t border-apple-gray-4">
                {faqs.map((faq) => <FAQ key={faq.q} {...faq} />)}
              </div>
              <div className="mt-6 text-[14px] text-apple-gray-3 space-y-1">
                <p>Ada soalan lain? Hubungi kami:</p>
                <p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-apple-blue hover:opacity-70 transition-opacity duration-150">
                    {CONTACT_EMAIL}
                  </a>
                  {' '}·{' '}
                  <a
                    href={buildWhatsAppUrl()}
                    onClick={() => trackEvent('whatsapp_click', { location: 'consultation_faq' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apple-blue hover:opacity-70 transition-opacity duration-150"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-apple-gray-1">
          <div className="container mx-auto px-6 py-14 max-w-2xl text-center">
            <motion.div {...fadeUp(0)}>
              <h2 className="text-2xl font-light text-white mb-2">
                Selesaikan keraguan cukai anda <span className="font-semibold">dalam satu jam</span>
              </h2>
              <p className="text-[14px] text-white/50 mb-8">
                {CONSULTATION.priceLabel} / {CONSULTATION.unitBm} · Pilih slot anda sendiri selepas pembayaran
              </p>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block bg-white hover:bg-apple-gray-5 text-apple-gray-1 text-[15px] font-semibold py-4 px-8 rounded-apple-button transition-colors duration-200"
              >
                Tempah sesi anda
              </a>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center py-8">
          <Link to="/" className="flex items-center gap-1.5 text-apple-gray-3 hover:text-apple-gray-1 text-sm transition-colors duration-150">
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke laman utama
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
