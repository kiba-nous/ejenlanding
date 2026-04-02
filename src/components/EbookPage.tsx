import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CheckCircle, BookOpen, Shield, ArrowLeft } from 'lucide-react';

const CHIPIN_BE_URL = 'https://pay.chip-in.asia/YOUR_BE_LINK';
const CHIPIN_B_URL  = 'https://pay.chip-in.asia/YOUR_B_LINK';

const commonFeatures = [
  'Panduan langkah demi langkah yang mudah difahami',
  'Contoh pengiraan potongan & pelepasan cukai',
  'Tips mengelak kesilapan biasa semasa mengisi borang',
  'Format PDF — boleh simpan & cetak bila-bila masa',
];

export function EbookPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative w-full overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-b from-apple-gray-6 via-white to-white" />

          <div className="relative container mx-auto px-6 py-24 md:py-32 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-2 rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">E-Book EjenCukai</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-5xl md:text-hero-lg font-light text-apple-gray-1 mb-6"
            >
              Panduan Asas{' '}
              <span className="font-medium">Cukai Individu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-body-lg text-apple-gray-2 max-w-xl mx-auto"
            >
              E-book praktikal daripada pakar cukai berdaftar LHDN. Faham, isi, dan hantar borang cukai anda dengan betul — tanpa tekanan.
            </motion.p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="container mx-auto px-6 pb-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Borang BE */}
            <div className="bg-apple-gray-6 border border-apple-gray-4 rounded-apple p-8 flex flex-col hover:shadow-md transition-shadow duration-300">
              <div className="mb-6">
                <span className="inline-block text-xs font-semibold text-apple-blue bg-apple-blue/10 px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                  Borang BE
                </span>
                <h2 className="text-2xl font-medium text-apple-gray-1 mb-2">
                  Panduan Cukai Individu Bergaji
                </h2>
                <p className="text-3xl font-light text-apple-gray-1 mb-3">
                  RM25
                </p>
                <p className="text-apple-gray-2 text-[15px] leading-relaxed">
                  Sesuai untuk pekerja makan gaji. Panduan lengkap mengisi Borang BE dengan tepat dan mendapat pelepasan maksimum.
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {commonFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-apple-gray-2">
                    <CheckCircle className="w-4 h-4 text-apple-blue mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={CHIPIN_BE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-apple-blue hover:opacity-90 text-white text-[15px] font-medium py-3 px-6 rounded-apple-button transition-opacity duration-200 shadow-sm hover:shadow-md"
              >
                Beli Sekarang — Borang BE
              </a>
            </div>

            {/* Borang B */}
            <div className="bg-apple-gray-1 rounded-apple p-8 flex flex-col hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <span className="inline-block text-xs font-semibold text-white/80 bg-white/15 px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                  Borang B
                </span>
                <h2 className="text-2xl font-medium text-white mb-2">
                  Panduan Cukai Individu Berbisnes
                </h2>
                <p className="text-3xl font-light text-white mb-3">
                  RM29
                </p>
                <p className="text-white/70 text-[15px] leading-relaxed">
                  Sesuai untuk usahawan dan peniaga. Panduan mengisi Borang B termasuk pelepasan dan potongan perniagaan.
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {commonFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/80">
                    <CheckCircle className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={CHIPIN_B_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white hover:bg-apple-gray-5 text-apple-gray-1 text-[15px] font-medium py-3 px-6 rounded-apple-button transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Beli Sekarang — Borang B
              </a>
            </div>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center items-center gap-2 mt-10 text-apple-gray-3 text-sm"
          >
            <Shield className="w-4 h-4" />
            <span>
              Pembayaran selamat melalui Chip-in · E-book dihantar terus ke emel anda selepas pembayaran
            </span>
          </motion.div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 text-apple-gray-3 hover:text-apple-gray-1 text-sm transition-colors duration-150"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke laman utama
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
