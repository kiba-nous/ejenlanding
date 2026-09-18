import { motion } from 'framer-motion';
import { BookOpen, Briefcase, CheckCircle2, FileText, Lock, MessageCircle, Zap } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { CHIPIN, CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../config/site';
import { Accordion } from './ui/Accordion';
import { Button } from './ui/button';
import { Badge, CheckItem, SectionHeading } from './ui/Section';
import { reveal } from './ui/motion';

const PRODUCTS = {
  be: { price: 25, url: CHIPIN.ebookBE },
  b: { price: 29, url: CHIPIN.ebookB },
} as const;

type ProductKey = keyof typeof PRODUCTS;

/**
 * Stylised book cover. Pure CSS so it stays sharp and themed; the e-books
 * have no cover artwork of their own.
 */
function BookCover({ variant, title, subtitle }: { variant: ProductKey; title: string; subtitle: string }) {
  const dark = variant === 'b';
  return (
    <div
      className={`relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-r-xl rounded-l-md shadow-float sm:w-44 ${
        dark ? 'bg-ink-900 text-white' : 'bg-brand-gradient text-white'
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-2 bg-black/20" />
      <div className="absolute inset-y-0 left-2 w-px bg-white/30" />
      <div className="flex h-full flex-col justify-between p-5 pl-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">EjenCukai</p>
          <p className="mt-6 text-[26px] font-extrabold leading-none tracking-tight">{title}</p>
          <p className="mt-2 text-[11px] leading-snug opacity-80">{subtitle}</p>
        </div>
        <FileText className="h-7 w-7 opacity-70" />
      </div>
    </div>
  );
}

function checkout(product: ProductKey) {
  trackEvent('ebook_checkout_click', { product, value: PRODUCTS[product].price, currency: 'MYR' });
}

export function EbookPage() {
  const { pick } = useLanguage();
  const year = new Date().getFullYear() - 1;

  usePageMeta({
    title: pick('E-Book Panduan Borang BE & B', 'E-Book: Borang BE & B Guides'),
    description: pick(
      'Panduan langkah demi langkah untuk isi Borang BE dan Borang B sendiri, ditulis oleh ejen cukai berdaftar. Dari RM25, akses selamanya.',
      'Step-by-step guides to filing Borang BE and Borang B yourself, written by a registered tax agent. From RM25, lifetime access.'
    ),
  });

  const beFeatures = [
    pick('Panduan bahagian demi bahagian Borang BE', 'Section-by-section walkthrough of Borang BE'),
    pick('Senarai pelepasan: KWSP, insurans, perubatan, pendidikan dan lebih', 'Relief checklist: EPF, insurance, medical, education and more'),
    pick('Contoh pengiraan cukai penuh', 'A full worked tax computation'),
    pick('Kesilapan lazim dan cara elak', 'Common mistakes and how to avoid them'),
  ];

  const bFeatures = [
    pick('Cara isytihar pendapatan perniagaan dengan betul', 'How to declare business income correctly'),
    pick('Perbelanjaan perniagaan yang boleh ditolak', 'Which business expenses are deductible'),
    pick('Cara handle pendapatan campuran (gaji + perniagaan)', 'Handling mixed income (salary + business)'),
    pick('Contoh kes usahawan dan pengiraan penuh', 'Entrepreneur case study with full computation'),
  ];

  const faqs = [
    {
      q: pick('Apa beza Borang BE dan Borang B?', 'What’s the difference between Borang BE and B?'),
      a: pick(
        'Borang BE untuk pekerja makan gaji sahaja. Borang B untuk individu yang ada pendapatan perniagaan, sama ada sepenuh masa atau sampingan. Jika ada kedua-dua, anda perlu Borang B.',
        'Borang BE is for salaried employees only. Borang B is for individuals with business income, full-time or on the side. If you have both, you need Borang B.'
      ),
    },
    {
      q: pick('Macam mana saya terima e-book selepas beli?', 'How do I receive the e-book after paying?'),
      a: pick(
        'Selepas pembayaran berjaya di Chip-in, anda akan dibawa ke halaman dengan pautan e-book serta-merta. Hubungi kami jika anda perlukan bantuan untuk akses.',
        'After a successful Chip-in payment you’re taken to a page with the e-book link immediately. Contact us if you need help accessing it.'
      ),
    },
    {
      q: pick('Saya langsung tidak faham tentang cukai. Sesuai ke?', 'I know nothing about tax. Is this for me?'),
      a: pick(
        'Ya, itulah sebabnya e-book ini ditulis. Setiap langkah dijelaskan dengan bahasa biasa, disertakan contoh pengiraan supaya mudah difahami.',
        'Yes, that’s exactly who it’s written for. Every step is explained in plain language with worked examples.'
      ),
    },
    {
      q: pick('Boleh saya minta bantuan lepas baca?', 'Can I get help after reading?'),
      a: pick(
        'Boleh. Jika anda masih tidak pasti untuk kes sendiri, tempah konsultasi 60 minit (RM149) atau serahkan pemfailan kepada kami.',
        'Yes. If you’re still unsure about your own case, book a 60-minute consultation (RM149) or hand the filing over to us.'
      ),
    },
  ];

  const pains = [
    pick('Tidak tahu pelepasan apa yang boleh dituntut', 'Not knowing which reliefs you can claim'),
    pick('Risau buat kesilapan dan kena audit LHDN', 'Worrying about mistakes and an LHDN audit'),
    pick('Terpaksa bayar lebih cukai setiap tahun', 'Paying more tax than necessary every year'),
  ];

  return (
    <>
      <Navbar />

      <main id="main" className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-hero-glow" aria-hidden="true" />
          <div className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div {...reveal(0)}>
                <Badge>
                  <BookOpen className="h-3.5 w-3.5" />
                  E-Book · {pick('Tahun Taksiran', 'Year of Assessment')} {year}
                </Badge>
              </motion.div>
              <motion.h1 {...reveal(0.05)} className="mt-5 text-balance text-display-sm text-ink-900 md:text-display-lg">
                {pick(
                  <>Isi borang cukai anda <span className="bg-brand-gradient bg-clip-text text-transparent">dengan betul.</span></>,
                  <>Fill in your tax form <span className="bg-brand-gradient bg-clip-text text-transparent">the right way.</span></>
                )}
              </motion.h1>
              <motion.p {...reveal(0.1)} className="mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-ink-600">
                {pick(
                  'Panduan praktikal ditulis oleh ejen cukai berdaftar, khusus untuk pekerja bergaji dan usahawan Malaysia. Bahasa mudah, langkah demi langkah, selesai dalam satu petang.',
                  'A practical guide written by a registered tax agent, for salaried workers and business owners in Malaysia. Plain language, step by step, done in an afternoon.'
                )}
              </motion.p>

              <motion.div {...reveal(0.15)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={PRODUCTS.be.url} external={false} size="lg" onClick={() => checkout('be')}>
                  Borang BE · RM{PRODUCTS.be.price}
                </Button>
                <Button href={PRODUCTS.b.url} external={false} size="lg" variant="dark" onClick={() => checkout('b')}>
                  Borang B · RM{PRODUCTS.b.price}
                </Button>
              </motion.div>

              <motion.ul {...reveal(0.2)} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-500">
                <li className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> {pick('Bayar selamat via Chip-in', 'Secure payment via Chip-in')}</li>
                <li className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> {pick('Pautan muncul serta-merta', 'Link appears instantly')}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> {pick('PDF, akses selamanya', 'PDF, lifetime access')}</li>
              </motion.ul>
            </div>

            <motion.div {...reveal(0.2)} className="flex justify-center gap-5 lg:col-span-5 lg:justify-end">
              <div className="translate-y-6 -rotate-6">
                <BookCover variant="be" title="Borang BE" subtitle={pick('Panduan cukai individu bergaji', 'Salaried individual tax guide')} />
              </div>
              <div className="rotate-6">
                <BookCover variant="b" title="Borang B" subtitle={pick('Panduan cukai individu berbisnes', 'Business individual tax guide')} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pain points */}
        <section className="border-y border-ink-100 bg-ink-50">
          <div className="container-x grid items-center gap-8 py-12 md:grid-cols-12">
            <motion.h2 {...reveal()} className="text-balance text-[22px] font-bold leading-snug text-ink-900 md:col-span-6 md:text-[26px]">
              {pick(
                'Ramai terlepas pelepasan bukan sebab tidak layak, tapi sebab tidak tahu cara tuntut.',
                'Most people miss reliefs not because they don’t qualify, but because they don’t know how to claim.'
              )}
            </motion.h2>
            <motion.ul {...reveal(0.08)} className="space-y-2.5 md:col-span-6">
              {pains.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Product cards */}
        <section className="py-16 md:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow={pick('Pilih panduan anda', 'Pick your guide')}
              title={pick('Yang mana satu untuk saya?', 'Which one is for me?')}
              subtitle={pick(
                'Makan gaji sahaja: Borang BE. Ada pendapatan perniagaan atau freelance, walaupun sampingan: Borang B.',
                'Salary only: Borang BE. Any business or freelance income, even on the side: Borang B.'
              )}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <motion.article {...reveal(0)} className="card flex flex-col rounded-xl3 p-8">
                <div className="flex items-center justify-between">
                  <Badge>Borang BE</Badge>
                  <FileText className="h-5 w-5 text-ink-300" />
                </div>
                <h3 className="mt-5 text-[22px] font-bold text-ink-900">{pick('Panduan Cukai Individu Bergaji', 'Salaried Individual Tax Guide')}</h3>
                <p className="mt-1 text-[14px] text-ink-500">{pick('Untuk pekerja makan gaji', 'For salaried employees')}</p>
                <ul className="mt-6 flex-grow space-y-2.5">
                  {beFeatures.map((f) => <CheckItem key={f}>{f}</CheckItem>)}
                </ul>
                <div className="mt-8 flex items-end justify-between border-t border-ink-100 pt-6">
                  <div>
                    <p className="text-[30px] font-extrabold tracking-tight text-ink-900">RM{PRODUCTS.be.price}</p>
                    <p className="text-[12.5px] text-ink-500">{pick('Bayar sekali · Akses selamanya', 'One-time · Lifetime access')}</p>
                  </div>
                  <Button href={PRODUCTS.be.url} external={false} size="lg" onClick={() => checkout('be')}>
                    {pick('Dapatkan', 'Get it')}
                  </Button>
                </div>
              </motion.article>

              <motion.article {...reveal(0.08)} className="relative flex flex-col overflow-hidden rounded-xl3 bg-ink-900 p-8 text-white">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gradient opacity-30 blur-3xl" aria-hidden="true" />
                <div className="relative flex items-center justify-between">
                  <Badge tone="inverse">Borang B</Badge>
                  <Briefcase className="h-5 w-5 text-white/40" />
                </div>
                <h3 className="relative mt-5 text-[22px] font-bold">{pick('Panduan Cukai Individu Berbisnes', 'Business Individual Tax Guide')}</h3>
                <p className="relative mt-1 text-[14px] text-white/60">{pick('Untuk usahawan, peniaga dan freelancer', 'For entrepreneurs, traders and freelancers')}</p>
                <ul className="relative mt-6 flex-grow space-y-2.5 [&_li]:text-white/85 [&_span:first-child]:bg-white/10 [&_span:first-child]:text-brand-300">
                  {bFeatures.map((f) => <CheckItem key={f}>{f}</CheckItem>)}
                </ul>
                <div className="relative mt-8 flex items-end justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[30px] font-extrabold tracking-tight">RM{PRODUCTS.b.price}</p>
                    <p className="text-[12.5px] text-white/60">{pick('Bayar sekali · Akses selamanya', 'One-time · Lifetime access')}</p>
                  </div>
                  <Button href={PRODUCTS.b.url} external={false} size="lg" variant="white" onClick={() => checkout('b')}>
                    {pick('Dapatkan', 'Get it')}
                  </Button>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-ink-100 bg-ink-50 py-16 md:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading align="left" eyebrow={pick('Soalan lazim', 'FAQ')} title={pick('Sebelum anda beli.', 'Before you buy.')} />
              <p className="mt-6 text-[14px] text-ink-500">
                {pick('Ada soalan lain?', 'Other questions?')}{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-700 hover:underline">{CONTACT_EMAIL}</a>
                {' '}·{' '}
                <a
                  href={buildWhatsAppUrl(pick('Hi EjenCukai! Saya ada soalan tentang E-Book cukai.', 'Hi EjenCukai! I have a question about the tax e-book.'))}
                  onClick={() => trackEvent('whatsapp_click', { location: 'ebook_faq' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
            </div>
            <motion.div {...reveal(0.05)} className="lg:col-span-8">
              <Accordion items={faqs} className="border-t border-ink-200" />
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20">
          <div className="container-x">
            <motion.div {...reveal()} className="relative overflow-hidden rounded-xl3 bg-ink-950 px-6 py-12 text-center text-white md:px-16 md:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(79,179,255,0.28),transparent_70%)]" aria-hidden="true" />
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-balance text-display-sm">
                  {pick('Jangan terlepas pelepasan anda lagi tahun ini.', 'Don’t miss your reliefs again this year.')}
                </h2>
                <p className="mt-3 text-[15px] text-white/70">
                  {pick('Pautan e-book muncul serta-merta selepas pembayaran.', 'The e-book link appears immediately after payment.')}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button href={PRODUCTS.be.url} external={false} size="lg" variant="white" onClick={() => checkout('be')}>
                    Borang BE · RM{PRODUCTS.be.price}
                  </Button>
                  <Button href={PRODUCTS.b.url} external={false} size="lg" onClick={() => checkout('b')}>
                    Borang B · RM{PRODUCTS.b.price}
                  </Button>
                </div>
                <p className="mt-6 text-[13px] text-white/50">
                  <MessageCircle className="mr-1 inline h-3.5 w-3.5" />
                  {pick('Masih tak pasti borang mana? Tanya kami di WhatsApp.', 'Still unsure which form? Ask us on WhatsApp.')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
