import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';

export function EbookThankYou() {
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

          <p className="text-apple-gray-2 text-[15px] mt-4 mb-2 leading-relaxed">
            E-book akan dihantar ke emel anda dalam masa beberapa minit.
          </p>

          <div className="flex justify-center items-center gap-2 text-apple-gray-3 text-sm mt-4">
            <Mail className="w-4 h-4 shrink-0" />
            <span>Semak folder <strong className="text-apple-gray-2">Spam</strong> atau <strong className="text-apple-gray-2">Promotions</strong> jika tidak menerima dalam 5 minit.</span>
          </div>

          <div className="mt-8 pt-6 border-t border-apple-gray-4 text-[13px] text-apple-gray-3">
            Sebarang pertanyaan?{' '}
            <a
              href="mailto:contact@ejencukai.my"
              className="text-apple-blue hover:opacity-70 transition-opacity duration-150"
            >
              contact@ejencukai.my
            </a>
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
