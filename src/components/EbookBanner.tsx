import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, MoveRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function EbookBanner() {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-apple-gray-6">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-apple-gray-1 rounded-apple px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left */}
          <div className="flex items-start gap-5">
            <div className="bg-white/10 rounded-apple-sm p-3 shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-wide mb-1">
                {language === 'en' ? 'New' : 'Baru'}
              </p>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                {language === 'en'
                  ? <>Understand your taxes with our <span className="font-medium">E-Book</span></>
                  : <>Fahami cukai anda dengan <span className="font-medium">E-Book</span> kami</>
                }
              </h2>
              <p className="text-white/60 text-[15px] max-w-md">
                {language === 'en'
                  ? 'Basic tax guides for Borang BE & Borang B.'
                  : 'Panduan asas cukai untuk Borang BE & Borang B.'
                }
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link to="/ebook" className="shrink-0">
            <button className="flex items-center gap-2 bg-white hover:bg-apple-gray-5 text-apple-gray-1 text-[15px] font-medium px-6 py-3 rounded-apple-button transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
              {language === 'en' ? 'Get the E-Book' : 'Dapatkan E-Book'}
              <MoveRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export { EbookBanner };
