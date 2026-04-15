import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import {
  CheckCircle, BookOpen, Shield, ArrowLeft,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import { useState } from 'react';

const CHIPIN_BE_URL = 'https://pay.chip-in.asia/borangbe';
const CHIPIN_B_URL  = 'https://pay.chip-in.asia/borangb';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

const beFeatures = [
  'Panduan bahagian demi bahagian Borang BE',
  'Senarai pelepasan cukai: EPF, insurans, perubatan, pendidikan dan lebih',
  'Contoh pengiraan cukai penuh',
  'Kesilapan lazim dan cara elak',
];

const bFeatures = [
  'Cara isytihar pendapatan perniagaan dengan betul',
  'Perbelanjaan perniagaan yang boleh ditolak',
  'Cara handle pendapatan campuran (gaji dan perniagaan)',
  'Contoh kes usahawan dan pengiraan cukai penuh',
];

const faqs = [
  {
    q: 'Apa beza Borang BE dan Borang B?',
    a: 'Borang BE untuk pekerja makan gaji sahaja. Borang B untuk individu yang ada pendapatan perniagaan, sama ada sepenuh masa atau sampingan. Jika ada kedua-dua, anda perlu Borang B.',
  },
  {
    q: 'Macam mana saya terima e-book selepas beli?',
    a: 'Pautan Ebook di website Ejen Cukai akan muncul setelah anda membayar. Hubungi kami jika anda perlukan bantuan untuk akses e-book.',
  },
  {
    q: 'Saya langsung tidak faham tentang cukai. Sesuai ke?',
    a: 'Ya, itulah sebabnya e-book ini ditulis. Setiap langkah dijelaskan dengan bahasa biasa, disertakan contoh pengiraan supaya mudah difahami.',
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-apple-gray-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-apple-gray-1">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-apple-gray-3 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-apple-gray-3 shrink-0" />
        }
      </button>
      {open && (
        <p className="pb-5 text-[14px] text-apple-gray-2 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export function EbookPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-apple-gray-6 via-white to-white" />
          <div className="relative container mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center max-w-3xl">

            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-1.5 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">E-Book EjenCukai · Tahun Taksiran 2025</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-5 leading-tight">
              Isi Borang Cukai Anda{' '}
              <span className="font-semibold">Dengan Betul.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.14)} className="text-[17px] text-apple-gray-2 leading-relaxed mb-8 max-w-xl mx-auto">
              Panduan praktikal ditulis oleh <strong className="text-apple-gray-1 font-medium">pakar cukai</strong>, khusus untuk pekerja bergaji dan usahawan Malaysia. Bahasa mudah, langkah demi langkah, selesai dalam satu petang.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <a
                href={CHIPIN_BE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-apple-blue hover:opacity-90 text-white text-[15px] font-semibold py-3.5 px-6 rounded-apple-button transition-opacity duration-200 shadow-sm"
              >
                Borang BE · RM25
              </a>
              <a
                href={CHIPIN_B_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-apple-gray-1 hover:opacity-80 text-white text-[15px] font-semibold py-3.5 px-6 rounded-apple-button transition-opacity duration-200 shadow-sm"
              >
                Borang B · RM29
              </a>
            </motion.div>

            <motion.p {...fadeUp(0.26)} className="mt-4 text-[13px] text-apple-gray-3">
              Pembayaran selamat melalui Chip-in. E-book dihantar ke emel anda serta-merta.
            </motion.p>
          </div>
        </div>

        {/* Pain Points */}
        <div className="bg-apple-gray-6 border-y border-apple-gray-4">
          <div className="container mx-auto px-6 py-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-medium text-apple-gray-1 mb-5">
                Ramai yang terlepas pelepasan cukai bukan sebab tidak layak, tapi sebab tidak tahu cara tuntutnya.
              </h2>
              <ul className="space-y-2.5">
                {[
                  'Tidak tahu pelepasan apa yang boleh dituntut',
                  'Risau buat kesilapan dan kena audit LHDN',
                  'Terpaksa bayar lebih cukai setiap tahun',
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

        {/* Product Cards */}
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-light text-apple-gray-1">
              Pilih panduan yang <span className="font-semibold">sesuai untuk anda</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* BE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-apple-gray-6 border border-apple-gray-4 rounded-apple p-8 flex flex-col"
            >
              <span className="inline-block text-xs font-semibold text-apple-blue bg-apple-blue/10 px-3 py-1 rounded-full uppercase tracking-wide mb-4 self-start">
                Borang BE
              </span>
              <h3 className="text-xl font-semibold text-apple-gray-1 mb-1">Panduan Cukai Individu Bergaji</h3>
              <p className="text-[14px] text-apple-gray-3 mb-5">Untuk pekerja makan gaji</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {beFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-apple-gray-2">
                    <CheckCircle className="w-4 h-4 text-apple-blue mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-3xl font-light text-apple-gray-1 mb-1">RM25</p>
              <p className="text-[13px] text-apple-gray-3 mb-5">Bayar sekali · Akses selamanya</p>
              <a
                href={CHIPIN_BE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-apple-blue hover:opacity-90 text-white text-[15px] font-semibold py-4 px-6 rounded-apple-button transition-opacity duration-200"
              >
                Dapatkan Borang BE · RM25
              </a>
            </motion.div>

            {/* B */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-apple-gray-1 rounded-apple p-8 flex flex-col"
            >
              <span className="inline-block text-xs font-semibold text-white/80 bg-white/15 px-3 py-1 rounded-full uppercase tracking-wide mb-4 self-start">
                Borang B
              </span>
              <h3 className="text-xl font-semibold text-white mb-1">Panduan Cukai Individu Berbisnes</h3>
              <p className="text-[14px] text-white/50 mb-5">Untuk usahawan dan peniaga</p>
              <ul className="space-y-2.5 mb-6 flex-grow">
                {bFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/80">
                    <CheckCircle className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-3xl font-light text-white mb-1">RM29</p>
              <p className="text-[13px] text-white/50 mb-5">Bayar sekali · Akses selamanya</p>
              <a
                href={CHIPIN_B_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white hover:bg-apple-gray-5 text-apple-gray-1 text-[15px] font-semibold py-4 px-6 rounded-apple-button transition-colors duration-200"
              >
                Dapatkan Borang B · RM29
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-[13px] text-apple-gray-3"
          >
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Pembayaran selamat via Chip-in</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> E-book dihantar ke emel serta-merta</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Format PDF, akses Google Drive selamanya</span>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="bg-apple-gray-6 border-y border-apple-gray-4">
          <div className="container mx-auto px-6 py-14 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-medium text-apple-gray-1 mb-6">Soalan lazim</h2>
              <div className="border-t border-apple-gray-4">
                {faqs.map((faq) => (
                  <FAQ key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
              <div className="mt-6 text-[14px] text-apple-gray-3 space-y-1">
                <p>Ada soalan lain? Hubungi kami:</p>
                <p>
                  <a href="mailto:contact@ejencukai.my" className="text-apple-blue hover:opacity-70 transition-opacity duration-150">
                    contact@ejencukai.my
                  </a>
                  {' '}·{' '}
                  <a href="https://wa.me/60103216650" target="_blank" rel="noopener noreferrer" className="text-apple-blue hover:opacity-70 transition-opacity duration-150">
                    +6010 321 6650
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-apple-gray-1">
          <div className="container mx-auto px-6 py-14 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-light text-white mb-2">
                Jangan terlepas pelepasan anda <span className="font-semibold">lagi tahun ini</span>
              </h2>
              <p className="text-[14px] text-white/50 mb-8">
                E-book dihantar ke emel anda serta-merta selepas pembayaran.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <a
                  href={CHIPIN_BE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-white hover:bg-apple-gray-5 text-apple-gray-1 text-[15px] font-semibold py-4 px-6 rounded-apple-button transition-colors duration-200"
                >
                  Borang BE · RM25
                </a>
                <a
                  href={CHIPIN_B_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-apple-blue hover:opacity-90 text-white text-[15px] font-semibold py-4 px-6 rounded-apple-button transition-opacity duration-200"
                >
                  Borang B · RM29
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back link */}
        <div className="flex justify-center py-8">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-apple-gray-3 hover:text-apple-gray-1 text-sm transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke laman utama
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
}
