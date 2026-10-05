import { motion } from 'framer-motion';
import { Building2, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SERVICES } from '../data/services';
import { FILING } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';
import { SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * One price, one card.
 *
 * Per-service prices came off the site after real engagements showed the
 * spread between cases was too wide for them to be honest. What is fixed is
 * the starting point and the promise that the quote comes before the work.
 *
 * The price card is styled as a printed receipt: it is literally the thing
 * the visitor gets before any work starts.
 */
function ServicesPricing() {
  const { language, pick } = useLanguage();

  const included = [
    pick('Semakan pendapatan, pelepasan dan rekod anda oleh profesional cukai', 'Review of your income, reliefs and records by a tax professional'),
    pick('Pengiraan dan penghantaran ke LHDN, atas nama anda atau melalui ejen', 'Computation and submission to LHDN, under your name or through the agent'),
    pick('Sebut harga bertulis sebelum kerja bermula', 'Written quote before any work starts'),
    pick('Sokongan WhatsApp untuk soalan susulan', 'WhatsApp support for follow-up questions'),
  ];

  const groups = [
    { id: 'individu', icon: User, label: pick('Individu', 'Individuals'), code: 'A' },
    { id: 'perniagaan', icon: Building2, label: pick('Perniagaan & syarikat', 'Businesses & companies'), code: 'B' },
  ] as const;

  return (
    <section id="perkhidmatan" className="scroll-mt-20 bg-ink-50 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow={pick('Harga', 'Pricing')}
          title={pick('Satu harga permulaan. Sebut harga sebelum mula.', 'One starting price. A quote before we begin.')}
          subtitle={pick(
            'Setiap kes berbeza, jadi kami tidak senaraikan harga ikut perkhidmatan. Kami semak dahulu, kemudian beri sebut harga bertulis.',
            'Every case is different, so we don’t list a price per service. We review first, then give you a written quote.'
          )}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Receipt */}
          <motion.div {...reveal()} className="lg:col-span-5">
            <div className="relative -rotate-[0.6deg] drop-shadow-[0_24px_30px_rgba(11,40,61,0.16)]">
              <div className="receipt-edge bg-white px-7 pb-12 pt-8 md:px-9">
                <div className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">EjenCukai</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-400">
                    {pick('Pemfailan & khidmat nasihat', 'Filing & advisory')}
                  </p>
                </div>

                <div className="my-6 border-t-2 border-dashed border-ink-200" />

                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14.5px] leading-snug text-ink-700">
                      <span className="mt-0.5 text-[13px] font-bold text-brand-600" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="my-6 border-t-2 border-dashed border-ink-200" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">{pick('Dari', 'From')}</p>
                    <p className="mt-1 text-[52px] font-extrabold leading-none tracking-tight text-ink-950">
                      {FILING.fromLabel}
                    </p>
                  </div>
                  <p className="pb-1 text-right text-[11.5px] leading-tight text-ink-500">
                    / {pick(FILING.unitBm, FILING.unitEn)}
                  </p>
                </div>

                <Button to="/form" size="lg" className="mt-7 w-full" onClick={() => trackEvent('pricing_cta_click', {})}>
                  <MessageCircle className="h-[18px] w-[18px]" />
                  {pick('Dapatkan sebut harga', 'Get a quote')}
                </Button>
                <p className="mt-3 text-center text-[12.5px] text-ink-500">
                  {pick('Percuma. Biasanya balas dalam 24 jam pada hari bekerja.', 'Free. Usually a reply within 24 hours on working days.')}
                </p>

                {/* Barcode flourish */}
                <div className="mt-6 flex h-9 items-stretch justify-center opacity-80" aria-hidden="true">
                  {'21131214122131112413122113121411'.split('').map((w, i) => (
                    <span key={i} className={i % 2 ? 'bg-transparent' : 'bg-ink-900'} style={{ width: `${Number(w) * 2}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* What we handle */}
          <motion.div {...reveal(0.08)} className="grid content-start gap-5 sm:grid-cols-2 lg:col-span-7">
            {groups.map((g) => (
              <div key={g.id} className="relative rounded-xl2 border border-ink-200 bg-white p-7 pt-8">
                <span className="absolute -top-3 left-6 rounded-md bg-ink-900 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-300">
                  {pick('Bahagian', 'Part')} {g.code}
                </span>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-[18px] font-bold text-ink-900">{g.label}</h3>
                </div>
                <ul className="mt-5 divide-y divide-ink-100 border-t border-ink-100">
                  {SERVICES.filter((s) => s.audience === g.id).map((s, i) => (
                    <li key={s.id} className="flex items-baseline gap-3 py-2.5 text-[14.5px] text-ink-700">
                      <span className="w-5 shrink-0 text-[11px] font-semibold text-ink-400" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s[language]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="rounded-xl2 border border-dashed border-ink-300 p-5 text-[13px] leading-relaxed text-ink-500 sm:col-span-2">
              {pick(
                'Harga akhir bergantung kepada kerumitan rekod dan bilangan sumber pendapatan. Harga tidak termasuk cukai yang perlu dibayar kepada LHDN.',
                'The final price depends on the complexity of your records and number of income sources. Fees exclude any tax payable to LHDN.'
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ServicesPricing };
