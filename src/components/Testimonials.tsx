import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Client testimonials.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  This section is intentionally EMPTY and renders nothing until you fill in
 *  `TESTIMONIALS` with real quotes from real clients. Do not populate it with
 *  invented or sample quotes — fabricated social proof is both a legal risk
 *  and, once noticed, more damaging to trust than having no testimonials.
 *
 *  What makes these convert:
 *    • A specific outcome, ideally with a number.
 *    • First name + surname initial + role + state. (Full anonymity reads as
 *      fake; full names create PDPA/consent work.)
 *    • Which form or service it was, so readers can self-identify.
 *
 *  Get written consent before publishing, and never publish a quote that
 *  promises a guaranteed refund or guaranteed tax reduction.
 * ─────────────────────────────────────────────────────────────────────────
 */

interface Testimonial {
  /** The quote itself, in the client's own words. */
  quote: string;
  /** e.g. "Aiman R." */
  name: string;
  /** e.g. "Jurutera Perisian, Selangor" */
  role: string;
  /** e.g. "Borang BE 2024" */
  service: string;
}

const TESTIMONIALS: Testimonial[] = [];

function Testimonials() {
  const { language } = useLanguage();
  const bm = language === 'bm';

  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-apple-gray-6">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
            {bm ? 'Apa kata klien kami' : 'What our clients say'}
          </h2>
          <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
            {bm
              ? 'Pengalaman sebenar daripada individu dan perniagaan yang kami bantu.'
              : 'Real experiences from the individuals and businesses we work with.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-white rounded-apple p-8 border border-apple-gray-4/50 flex flex-col"
            >
              <Quote className="w-6 h-6 text-apple-gray-4 mb-5" />

              <blockquote className="text-[15px] text-apple-gray-2 leading-relaxed flex-grow">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-apple-gray-4/60">
                <span className="block text-[15px] font-medium text-apple-gray-1">
                  {testimonial.name}
                </span>
                <span className="block text-[13px] text-apple-gray-3">
                  {testimonial.role}
                </span>
                <span className="block text-[13px] text-apple-gray-3 mt-1">
                  {testimonial.service}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Testimonials };
