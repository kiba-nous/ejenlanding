import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONSULTATION } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';
import { Badge, CheckItem, SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/** 60-minute dial for the consultation card. Decorative. */
function ClockDial({ minutes }: { minutes: number }) {
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 md:h-32 md:w-32" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="60"
          y1="8"
          x2="60"
          y2={i % 3 === 0 ? 18 : 14}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 60 60)`}
        />
      ))}
      <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        stroke="#61C0F5"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${(minutes / 60) * 251.3 - 6} 251.3`}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="64" textAnchor="middle" className="fill-white text-[22px] font-bold">
        {minutes}′
      </text>
    </svg>
  );
}

/** Two stacked e-book covers. Decorative. */
function BookStack() {
  return (
    <div className="relative h-32 w-32 md:h-36 md:w-36" aria-hidden="true">
      <div className="absolute right-0 top-0 flex h-28 w-20 rotate-[8deg] flex-col justify-end rounded-l-sm rounded-r-lg bg-ink-900 p-2.5 shadow-float md:h-32 md:w-24">
        <span className="text-[20px] font-extrabold leading-none text-white">B</span>
        <span className="mt-1 h-1 w-8 rounded-full bg-brand-400" />
      </div>
      <div className="absolute bottom-0 left-0 flex h-28 w-20 -rotate-[6deg] flex-col justify-end rounded-l-sm rounded-r-lg bg-brand-400 p-2.5 shadow-float md:h-32 md:w-24">
        <span className="absolute inset-y-0 left-1.5 w-px bg-ink-950/20" />
        <span className="text-[20px] font-extrabold leading-none text-ink-950">BE</span>
        <span className="mt-1 h-1 w-8 rounded-full bg-ink-950/60" />
      </div>
    </div>
  );
}

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
          align="split"
          eyebrow={pick('Bantuan segera', 'Instant help')}
          title={pick('Belum sedia serahkan pemfailan? Mula di sini.', 'Not ready to hand over your filing? Start here.')}
          subtitle={pick('Dua cara untuk faham cukai anda sendiri.', 'Two ways to understand your own taxes.')}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Consultation */}
          <motion.article
            {...reveal(0)}
            className="relative flex flex-col overflow-hidden rounded-xl3 bg-ink-950 p-8 text-white md:p-10"
          >
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                  <UserCheck className="h-5 w-5" />
                </span>
                <Badge tone="inverse">
                  <Clock className="h-3.5 w-3.5" />
                  {CONSULTATION.durationMinutes} {pick('minit', 'min')}
                </Badge>
              </div>
              <ClockDial minutes={CONSULTATION.durationMinutes} />
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
            <ul className="relative mt-6 space-y-2.5 text-white/85 [&_li]:text-white/85 [&_span:first-child]:bg-brand-400 [&_span:first-child]:text-ink-950">
              <CheckItem>{pick('Senarai pelepasan yang anda layak', 'A list of reliefs you qualify for')}</CheckItem>
              <CheckItem>{pick('Pilih slot anda sendiri selepas bayar', 'Pick your own slot after payment')}</CheckItem>
            </ul>
            <div className="relative mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{pick('Harga', 'Price')}</p>
                <p className="text-[34px] font-extrabold tracking-tight">
                  {CONSULTATION.priceLabel}
                  <span className="text-[15px] font-medium text-white/60"> / {pick(CONSULTATION.unitBm, CONSULTATION.unitEn)}</span>
                </p>
              </div>
              <Button to="/konsultasi-peribadi" size="lg" onClick={() => trackEvent('product_click', { product: 'consultation' })}>
                {pick('Tempah sesi', 'Book a session')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.article>

          {/* E-book */}
          <motion.article
            {...reveal(0.08)}
            className="relative flex flex-col overflow-hidden rounded-xl3 border border-ink-200 bg-ink-50 p-8 md:p-10"
          >
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <BookOpen className="h-5 w-5" />
                </span>
                <Badge>PDF · {pick('Akses selamanya', 'Lifetime access')}</Badge>
              </div>
              <BookStack />
            </div>
            <h3 className="relative mt-6 text-[26px] font-bold leading-tight text-ink-900 md:text-[30px]">
              {pick('E-Book: Isi Borang BE & B sendiri', 'E-Book: File Borang BE & B yourself')}
            </h3>
            <p className="relative mt-3 text-[15px] leading-relaxed text-ink-600">
              {pick(
                'Panduan langkah demi langkah dalam bahasa mudah. Bahagian demi bahagian, senarai pelepasan dan contoh pengiraan penuh.',
                'A step-by-step guide in plain language. Section by section, a relief checklist and full worked examples.'
              )}
            </p>
            <ul className="relative mt-6 space-y-2.5">
              <CheckItem>{pick('Borang BE untuk pekerja bergaji · RM25', 'Borang BE for salaried workers · RM25')}</CheckItem>
              <CheckItem>{pick('Borang B untuk usahawan & freelancer · RM29', 'Borang B for business owners & freelancers · RM29')}</CheckItem>
            </ul>
            <div className="relative mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-ink-200 pt-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">{pick('Dari', 'From')}</p>
                <p className="text-[34px] font-extrabold tracking-tight text-ink-900">RM25</p>
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
