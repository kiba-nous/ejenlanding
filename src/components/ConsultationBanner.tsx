import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserCheck, MoveRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONSULTATION } from '../config/site';

/**
 * Homepage entry point for the paid consultation.
 *
 * Sits between the RM25 e-books and the RM500 filing service so a reader who
 * wants help but isn't ready to hand over their whole filing has somewhere
 * to go.
 */
function ConsultationBanner() {
  const { language } = useLanguage();
  const bm = language === 'bm';

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="border border-apple-gray-4 rounded-apple px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-start gap-5">
            <div className="bg-apple-blue/10 rounded-apple-sm p-3 shrink-0">
              <UserCheck className="w-7 h-7 text-apple-blue" />
            </div>
            <div>
              <p className="text-apple-blue text-sm font-medium uppercase tracking-wide mb-1">
                {bm ? 'Konsultasi Peribadi' : 'Personal Consultation'}
              </p>
              <h2 className="text-2xl md:text-3xl font-light text-apple-gray-1 mb-2">
                {bm ? (
                  <>Ada soalan cukai? <span className="font-medium">Tanya pakar terus.</span></>
                ) : (
                  <>Tax questions? <span className="font-medium">Ask an expert directly.</span></>
                )}
              </h2>
              <p className="text-apple-gray-2 text-[15px] max-w-md">
                {bm
                  ? `Sesi ${CONSULTATION.durationMinutes} minit satu-dengan-satu bersama pakar cukai. ${CONSULTATION.priceLabel} / ${CONSULTATION.unitBm}.`
                  : `A ${CONSULTATION.durationMinutes}-minute one-on-one with a tax expert. ${CONSULTATION.priceLabel} / ${CONSULTATION.unitEn}.`}
              </p>
            </div>
          </div>

          <Link to="/konsultasi-peribadi" className="shrink-0">
            <button className="flex items-center gap-2 bg-apple-blue hover:opacity-90 text-white text-[15px] font-medium px-6 py-3 rounded-apple-button transition-opacity duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
              {bm ? 'Tempah sesi' : 'Book a session'}
              <MoveRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export { ConsultationBanner };
