import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, Lock, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCT_URLS } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';
import { Badge } from './ui/Section';
import { reveal } from './ui/motion';

/**
 * Chat window mock for ai.ejencukai.my. The answer shown is the same one the
 * homepage FAQ gives, so the illustration never says anything the site
 * doesn't already stand behind. Decorative; the real chat is one click away.
 */
function ChatWindow() {
  const { pick } = useLanguage();

  return (
    <div className="overflow-hidden rounded-xl3 border border-ink-200 bg-white shadow-float" aria-hidden="true">
      {/* Browser bar */}
      <div className="flex items-center gap-3 border-b border-ink-100 bg-ink-50 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        </span>
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1 text-[12px] font-medium text-ink-500">
          <Lock className="h-3 w-3" />
          ai.ejencukai.my
        </span>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {/* Question */}
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink-950 px-4 py-2.5 text-[14px] text-white">
          {pick('Saya kerja tetap tapi ada jual online. Guna borang apa?', 'I have a salaried job but also sell online. Which form do I use?')}
        </div>

        {/* Answer */}
        <div className="flex items-start gap-3">
          <img src="/favicon.png" alt="" width={64} height={64} className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-brand-50 p-1" />
          <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-ink-50 px-4 py-3 text-[14px] leading-relaxed text-ink-800">
            {pick(
              <>Anda perlu guna <strong className="text-ink-950">Borang B</strong>. Borang B untuk individu yang ada pendapatan perniagaan, termasuk jualan online, walaupun anda juga makan gaji.</>,
              <>You need <strong className="text-ink-950">Borang B</strong>. Borang B is for individuals with business income, including online sales, even if you also have a salaried job.</>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 pl-11">
          {[
            pick('Bila tarikh akhir Borang B?', 'When is the Borang B deadline?'),
            pick('Apa itu CP500?', 'What is CP500?'),
          ].map((q) => (
            <span key={q} className="rounded-lg border border-ink-200 px-3 py-1.5 text-[12.5px] font-medium text-ink-600">
              {q}
            </span>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 rounded-2xl border border-ink-200 py-2 pl-4 pr-2">
          <span className="flex-1 truncate text-[14px] text-ink-400">
            {pick('Tanya apa-apa tentang cukai…', 'Ask anything about tax…')}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-400 text-ink-950">
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Free tax chatbot at ai.ejencukai.my. Last of the self-serve tools: the
 * cheapest way in for someone who just has one question.
 */
function AskAi() {
  const { pick } = useLanguage();

  const topics = [
    pick('Borang mana perlu diisi', 'Which form to file'),
    pick('Pelepasan yang boleh dituntut', 'Reliefs you can claim'),
    pick('Tarikh akhir & penalti', 'Deadlines & penalties'),
    pick('Surat LHDN seperti CP500', 'LHDN letters like CP500'),
  ];

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <motion.div {...reveal()} className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{pick('Tanya AI cukai', 'Ask the tax AI')}</span>
            <Badge>
              <Sparkles className="h-3.5 w-3.5" />
              {pick('Percuma', 'Free')}
            </Badge>
          </div>
          <h2 className="mt-4 text-balance text-display-sm text-ink-900 md:text-display-md">
            {pick(
              <>Ada soalan cukai pukul 2 pagi? <span className="text-brand-600">Tanya AI kami.</span></>,
              <>Tax question at 2am? <span className="text-brand-600">Ask our AI.</span></>
            )}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[17px] leading-relaxed text-ink-600">
            {pick(
              'Pembantu AI EjenCukai menjawab soalan cukai pendapatan Malaysia dalam bahasa mudah. Tiada pendaftaran, tiada borang, terus taip soalan anda.',
              'The EjenCukai AI assistant answers Malaysian income tax questions in plain language. No sign-up, no forms, just type your question.'
            )}
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {topics.map((t) => (
              <li key={t} className="flex items-center gap-2.5 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-[14.5px] font-medium text-ink-800">
                <span className="h-2 w-2 shrink-0 rounded-[3px] bg-brand-400" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={PRODUCT_URLS.askAi} size="lg" onClick={() => trackEvent('ai_chat_click', { location: 'home_ai_section' })}>
              {pick('Tanya AI sekarang', 'Ask the AI now')}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="max-w-xs text-[12.5px] leading-snug text-ink-500">
              {pick(
                'Jawapan AI ialah panduan umum. Untuk kes anda, profesional cukai kami boleh semak.',
                'AI answers are general guidance. For your own case, our tax professionals can review it.'
              )}
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal(0.1)} className="relative lg:col-span-6">
          <div className="absolute -inset-2 -z-0 rotate-1 rounded-[2.25rem] bg-brand-400 sm:-inset-6 sm:rotate-2" aria-hidden="true" />
          <div className="relative">
            <ChatWindow />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { AskAi };
