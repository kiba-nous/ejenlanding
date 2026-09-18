import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONSULTATION } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';
import { Badge, CheckItem, SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * The two self-serve products, side by side.
 *
 * Previously two full-width banners stacked on top of each other, which read
 * as two separate adverts. Together they answer one question: "I'm not ready
 * to hand over my filing, what can I get right now?"
 */
function ProductsRow() {
  const { pick } = useLanguage();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={pick('Bantuan segera', 'Instant help')}
          title={pick('Belum sedia serahkan pemfailan? Mula di sini.', 'Not ready to hand over your filing? Start here.')}
          subtitle={pick('Dua cara untuk faham cukai anda sendiri.', 'Two ways to understand your own taxes.')}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Consultation */}
          <motion.article
            {...reveal(0)}
            className="relative flex flex-col overflow-hidden rounded-xl3 bg-ink-900 p-8 text-white md:p-10"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-30 blur-3xl" aria-hidden="true" />
            <div className="relative flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                <UserCheck className="h-5 w-5" />
              </span>
              <Badge tone="inverse">
                <Clock className="h-3.5 w-3.5" />
                {CONSULTATION.durationMinutes} {pick('minit', 'min')}
              </Badge>
            </div>
            <h3 className="relative mt-6 text-[26px] font-bold leading-tight md:text-[30px]">
              {pick('Konsultasi cukai peribadi', 'Personal tax consultation')}
            </h3>
            <p className="relative mt-3 text-[15px] leading-relaxed text-white/70">
              {pick(
                'Satu jam, satu-dengan-satu dengan pakar cukai. Kami semak situasi anda dan jawab setiap soalan dalam bahasa mudah.',
                'One hour, one-on-one with a tax expert. We review your situation and answer every question in plain language.'
              )}
            </p>
            <ul className="relative mt-6 space-y-2.5 text-white/85 [&_li]:text-white/85 [&_span:first-child]:bg-white/10 [&_span:first-child]:text-brand-300">
              <CheckItem>{pick('Senarai pelepasan yang anda layak', 'A list of reliefs you qualify for')}</CheckItem>
              <CheckItem>{pick('Pilih slot anda sendiri selepas bayar', 'Pick your own slot after payment')}</CheckItem>
            </ul>
            <div className="relative mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-white/50">{pick('Harga', 'Price')}</p>
                <p className="text-[30px] font-extrabold tracking-tight">
                  {CONSULTATION.priceLabel}
                  <span className="text-[15px] font-medium text-white/60"> / {pick(CONSULTATION.unitBm, CONSULTATION.unitEn)}</span>
                </p>
              </div>
              <Button to="/konsultasi-peribadi" variant="white" size="lg" onClick={() => trackEvent('product_click', { product: 'consultation' })}>
                {pick('Tempah sesi', 'Book a session')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.article>

          {/* E-book */}
          <motion.article {...reveal(0.08)} className="card relative flex flex-col overflow-hidden rounded-xl3 p-8 md:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-100 opacity-70 blur-3xl" aria-hidden="true" />
            <div className="relative flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <BookOpen className="h-5 w-5" />
              </span>
              <Badge>PDF · {pick('Akses selamanya', 'Lifetime access')}</Badge>
            </div>
            <h3 className="relative mt-6 text-[26px] font-bold leading-tight text-ink-900 md:text-[30px]">
              {pick('E-Book: Isi Borang BE & B sendiri', 'E-Book: File Borang BE & B yourself')}
            </h3>
            <p className="relative mt-3 text-[15px] leading-relaxed text-ink-600">
              {pick(
                'Panduan langkah demi langkah ditulis oleh ejen cukai. Bahagian demi bahagian, senarai pelepasan dan contoh pengiraan penuh.',
                'A step-by-step guide written by a tax agent. Section by section, a relief checklist and full worked examples.'
              )}
            </p>
            <ul className="relative mt-6 space-y-2.5">
              <CheckItem>{pick('Borang BE untuk pekerja bergaji · RM25', 'Borang BE for salaried workers · RM25')}</CheckItem>
              <CheckItem>{pick('Borang B untuk usahawan & freelancer · RM29', 'Borang B for business owners & freelancers · RM29')}</CheckItem>
            </ul>
            <div className="relative mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-ink-100 pt-6">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-ink-400">{pick('Dari', 'From')}</p>
                <p className="text-[30px] font-extrabold tracking-tight text-ink-900">RM25</p>
              </div>
              <Button to="/ebook" size="lg" onClick={() => trackEvent('product_click', { product: 'ebook' })}>
                {pick('Dapatkan e-book', 'Get the e-book')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export { ProductsRow };
