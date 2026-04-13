import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CheckCircle, ArrowLeft, Download } from 'lucide-react';

const EBOOK_CONFIG = {
  be: {
    label:    'Panduan Cukai Individu Bergaji (Borang BE)',
    driveUrl: 'https://drive.google.com/file/d/1eWCx_i9HNGjt1DxgMzqlysYllaeVVM83/view?usp=sharing',
  },
  b: {
    label:    'Panduan Cukai Individu Berbisnes (Borang B)',
    driveUrl: 'https://drive.google.com/file/d/10_uhl-2B0uhmKcKuvMGgADU78omue2oy/view?usp=sharing',
  },
} as const;

type EbookKey = keyof typeof EBOOK_CONFIG;

export function EbookThankYou({ ebook }: { ebook: EbookKey }) {
  const { label, driveUrl } = EBOOK_CONFIG[ebook];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-apple-gray-6 border border-apple-gray-4 rounded-apple p-10 max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-apple-blue/10 rounded-full p-4">
              <CheckCircle className="w-10 h-10 text-apple-blue" />
            </div>
          </div>

          <h1 className="text-3xl font-light text-apple-gray-1 mb-2">
            Terima kasih atas<br />
            <span className="font-medium">pembelian anda!</span>
          </h1>

          <p className="text-apple-gray-2 text-[15px] mt-4 mb-6 leading-relaxed">
            {label}
          </p>

          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-apple-blue hover:opacity-90 text-white text-[15px] font-medium py-3 px-6 rounded-apple-button transition-opacity duration-200 shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4" />
            Buka E-Book
          </a>

          <div className="mt-8 pt-6 border-t border-apple-gray-4 text-[13px] text-apple-gray-3 space-y-1">
            <p>Sebarang pertanyaan? Hubungi kami:</p>
            <p>
              <a
                href="mailto:contact@ejencukai.my"
                className="text-apple-blue hover:opacity-70 transition-opacity duration-150"
              >
                contact@ejencukai.my
              </a>
            </p>
            <p>
              <a
                href="https://wa.me/60103216650"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-blue hover:opacity-70 transition-opacity duration-150"
              >
                +6010 321 6650
              </a>
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 mt-6 text-apple-gray-3 hover:text-apple-gray-1 text-sm transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke laman utama
          </Link>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
