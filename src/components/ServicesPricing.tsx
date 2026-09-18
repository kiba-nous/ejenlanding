import { motion } from 'framer-motion';
import { Building2, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SERVICES } from '../data/services';
import { FILING } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';
import { CheckItem, SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * One price, one card.
 *
 * Per-service prices came off the site after real engagements showed the
 * spread between cases was too wide for them to be honest. What is fixed is
 * the starting point and the promise that the quote comes before the work.
 */
function ServicesPricing() {
  const { language, pick } = useLanguage();

  const included = [
    pick('Semakan penuh pendapatan, pelepasan dan rekod anda', 'Full review of your income, reliefs and records'),
    pick('Pengiraan dan pemfailan ke LHDN, dengan bukti penghantaran', 'Computation and submission to LHDN, with acknowledgement'),
    pick('Sebut harga bertulis sebelum kerja bermula', 'Written quote before any work starts'),
    pick('Sokongan WhatsApp sepanjang tahun taksiran', 'WhatsApp support throughout the year of assessment'),
  ];

  const groups = [
    { id: 'individu', icon: User, label: pick('Individu', 'Individuals') },
    { id: 'perniagaan', icon: Building2, label: pick('Perniagaan & syarikat', 'Businesses & companies') },
  ] as const;

  return (
    <section id="perkhidmatan" className="scroll-mt-20 bg-ink-50 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={pick('Harga', 'Pricing')}
          title={pick('Satu harga permulaan. Sebut harga sebelum mula.', 'One starting price. A quote before we begin.')}
          subtitle={pick(
            'Setiap kes berbeza, jadi kami tidak senaraikan harga ikut perkhidmatan. Kami semak dahulu, kemudian beri harga tetap.',
            'Every case is different, so we don’t list a price per service. We review first, then give you a fixed price.'
          )}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Price card */}
          <motion.div {...reveal()} className="card flex flex-col rounded-xl3 p-8 lg:col-span-5 md:p-10">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
              {pick('Pemfailan & khidmat nasihat', 'Filing & advisory')}
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[15px] font-medium text-ink-500">{pick('dari', 'from')}</span>
              <span className="text-[44px] font-extrabold leading-none tracking-tight text-ink-900">{FILING.fromLabel}</span>
            </div>
            <p className="mt-2 text-[14px] text-ink-500">
              {pick(`setiap ${FILING.unitBm}`, `per ${FILING.unitEn}`)}
            </p>

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>

            <div className="mt-8 border-t border-ink-100 pt-6">
              <Button to="/form" size="lg" className="w-full" onClick={() => trackEvent('pricing_cta_click', {})}>
                <MessageCircle className="h-[18px] w-[18px]" />
                {pick('Dapatkan sebut harga', 'Get a quote')}
              </Button>
              <p className="mt-3 text-center text-[12.5px] text-ink-500">
                {pick('Percuma. Balas dalam 24 jam.', 'Free. Reply within 24 hours.')}
              </p>
            </div>
          </motion.div>

          {/* What we handle */}
          <motion.div {...reveal(0.08)} className="grid items-start gap-6 sm:grid-cols-2 lg:col-span-7">
            {groups.map((g) => (
              <div key={g.id} className="rounded-xl2 border border-ink-200/80 bg-white/60 p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-[16px] font-bold text-ink-900">{g.label}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {SERVICES.filter((s) => s.audience === g.id).map((s) => (
                    <li key={s.id} className="flex items-start gap-2.5 text-[14.5px] text-ink-700">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                      {s[language]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p {...reveal(0.1)} className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-ink-500">
          {pick(
            'Harga akhir bergantung kepada kerumitan rekod dan bilangan sumber pendapatan. Harga tidak termasuk cukai yang perlu dibayar kepada LHDN.',
            'The final price depends on the complexity of your records and number of income sources. Fees exclude any tax payable to LHDN.'
          )}
        </motion.p>
      </div>
    </section>
  );
}

export { ServicesPricing };
