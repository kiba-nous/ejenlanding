import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Building2, Check, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { WHATSAPP_DISPLAY } from '../config/site';
import { Button } from './ui/button';

/**
 * Three-step enquiry form that hands off to WhatsApp.
 *
 * Individuals are never asked for company details — the service list
 * branches on the answer to step 1 — and only two fields are ever typed.
 * `?jenis=individu|perniagaan` pre-selects step 1 so links from the footer
 * or pricing land straight on the service list.
 */

type ClientType = 'individu' | 'perniagaan';

interface ServiceOption {
  id: string;
  bm: string;
  en: string;
}

const SERVICES: Record<ClientType, ServiceOption[]> = {
  individu: [
    { id: 'be', bm: 'Fail Borang BE (makan gaji)', en: 'File Borang BE (salaried)' },
    { id: 'b', bm: 'Fail Borang B (ada perniagaan / freelance)', en: 'File Borang B (business / freelance income)' },
    { id: 'planning', bm: 'Perancangan cukai peribadi', en: 'Personal tax planning' },
    { id: 'refund', bm: 'Pulangan cukai / rayuan CP500', en: 'Tax refund / CP500 appeal' },
    { id: 'lain', bm: 'Lain-lain', en: 'Something else' },
  ],
  perniagaan: [
    { id: 'corporate', bm: 'Cukai syarikat / perniagaan', en: 'Corporate tax filing' },
    { id: 'planning-biz', bm: 'Perancangan cukai syarikat', en: 'Corporate tax planning' },
    { id: 'einvois', bm: 'e-Invois LHDN', en: 'LHDN e-Invoicing' },
    { id: 'audit', bm: 'Audit / siasatan cukai', en: 'Tax audit or investigation' },
    { id: 'lain-biz', bm: 'Lain-lain', en: 'Something else' },
  ],
};

/** Normalises Malaysian input like "012-345 6789" or "+6012..." to 60123456789. */
function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('60')) return digits;
  if (digits.startsWith('0')) return `60${digits.slice(1)}`;
  return digits;
}

/**
 * Records the lead before the WhatsApp handoff.
 *
 * Posts to Netlify Forms (the matching hidden form lives in index.html).
 * Deliberately swallows every failure: a lost record is bad, but blocking the
 * user's handoff because the storage call failed is worse.
 */
async function saveLead(fields: Record<string, string>): Promise<void> {
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'konsultasi', ...fields }).toString(),
    });
  } catch (err) {
    console.error('Lead save failed (continuing to WhatsApp):', err);
  }
}

const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.22, ease: 'easeOut' as const },
};

function QuickConsultForm() {
  const { bm, pick } = useLanguage();
  const [params] = useSearchParams();

  const preset = params.get('jenis');
  const presetType: ClientType | null = preset === 'individu' || preset === 'perniagaan' ? preset : null;

  const [step, setStep] = useState(presetType ? 2 : 1);
  const [clientType, setClientType] = useState<ClientType | null>(presetType);
  const [service, setService] = useState<ServiceOption | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [handedOff, setHandedOff] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const chooseClientType = (type: ClientType) => {
    setClientType(type);
    setService(null);
    setStep(2);
    trackEvent('form_start', { client_type: type });
  };

  const chooseService = (option: ServiceOption) => {
    setService(option);
    setStep(3);
  };

  const back = () => {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (name.trim().length < 2) {
      setError(pick('Sila masukkan nama anda.', 'Please enter your name.'));
      return;
    }

    const normalised = normalisePhone(phone);
    if (normalised.length < 10) {
      setError(pick('Nombor WhatsApp tidak sah. Contoh: 012-345 6789', 'That WhatsApp number looks incomplete. Example: 012-345 6789'));
      return;
    }

    setError('');
    setSubmitting(true);

    const serviceLabel = service ? (bm ? service.bm : service.en) : '';
    const clientLabel = clientType === 'individu' ? pick('Individu', 'Individual') : pick('Perniagaan / Syarikat', 'Business / Company');

    // 1. Persist first — the record must survive a failed handoff.
    await saveLead({
      nama: name.trim(),
      whatsapp: normalised,
      jenis_klien: clientLabel,
      perkhidmatan: serviceLabel,
      nota: note.trim(),
      sumber: params.get('sumber') ?? 'form',
    });

    trackEvent('form_submit', { client_type: clientType ?? '', service: service?.id ?? '' });

    const message = [
      bm ? `Hi EjenCukai! Saya ${name.trim()}.` : `Hi EjenCukai! I'm ${name.trim()}.`,
      '',
      `${pick('Jenis klien', 'Client type')}: ${clientLabel}`,
      `${pick('Perkhidmatan', 'Service')}: ${serviceLabel}`,
      ...(note.trim() ? ['', `${pick('Nota', 'Note')}: ${note.trim()}`] : []),
      '',
      pick('Boleh bantu saya?', 'Could you help me with this?'),
    ].join('\n');

    const url = buildWhatsAppUrl(message);
    setWhatsappUrl(url);

    // 2. Render the fallback screen, then hand off. If the browser stays on
    //    the page (desktop without WhatsApp, blocked navigation), the user
    //    still sees a working button and the number.
    setHandedOff(true);
    window.location.href = url;
  };

  if (handedOff) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </div>
        <h2 className="text-[24px] font-bold text-ink-900">{pick('Terima kasih!', 'Thank you!')}</h2>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-600">
          {pick(
            'Kami sedang membuka WhatsApp untuk anda. Jika ia tidak terbuka, tekan butang di bawah.',
            "We're opening WhatsApp for you. If it didn't open, use the button below."
          )}
        </p>
        <div className="mt-8">
          <Button href={whatsappUrl} variant="whatsapp" size="lg">
            <MessageCircle className="h-[18px] w-[18px]" />
            {pick('Buka WhatsApp', 'Open WhatsApp')}
          </Button>
        </div>
        <p className="mt-6 text-[13px] text-ink-500">
          {pick('Atau hubungi kami terus di ', 'Or reach us directly at ')}
          <span className="font-semibold text-ink-900">{WHATSAPP_DISPLAY}</span>
        </p>
      </div>
    );
  }

  const options = clientType ? SERVICES[clientType] : [];
  const stepTitles = [pick('Untuk siapa', 'Who for'), pick('Perkhidmatan', 'Service'), pick('Hubungi', 'Contact')];

  return (
    <div>
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label={pick('Langkah', 'Steps')}>
        {stepTitles.map((label, i) => {
          const n = i + 1;
          const state = n < step ? 'done' : n === step ? 'current' : 'todo';
          return (
            <li key={label} className="flex flex-1 flex-col gap-2" aria-current={state === 'current' ? 'step' : undefined}>
              <span
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  state === 'todo' ? 'bg-ink-200' : 'bg-brand-600'
                }`}
              />
              <span className={`text-[12px] font-semibold ${state === 'current' ? 'text-ink-900' : 'text-ink-400'}`}>
                {n}. {label}
              </span>
            </li>
          );
        })}
      </ol>

      {step > 1 && (
        <button
          type="button"
          onClick={back}
          className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-500 transition-colors hover:text-ink-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {pick('Kembali', 'Back')}
        </button>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {/* Step 1 — who is this for */}
        {step === 1 && (
          <motion.div key="s1" {...stepMotion}>
            <h2 className="text-[22px] font-bold text-ink-900">{pick('Bantuan ini untuk siapa?', 'Who is this for?')}</h2>
            <p className="mt-1 text-[14px] text-ink-500">{pick('Pilih satu untuk mula.', 'Pick one to get started.')}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { type: 'individu', icon: User, title: pick('Diri sendiri', 'Myself'), hint: pick('Gaji, freelance, sewa', 'Salary, freelance, rental') },
                  { type: 'perniagaan', icon: Building2, title: pick('Perniagaan saya', 'My business'), hint: 'Sdn Bhd, enterprise, LLP' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => chooseClientType(opt.type)}
                  className="group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 text-left transition-all hover:border-brand-400 hover:bg-brand-50/50 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-100 text-ink-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <opt.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold text-ink-900">{opt.title}</span>
                    <span className="mt-0.5 block text-[13px] text-ink-500">{opt.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 — which service */}
        {step === 2 && (
          <motion.div key="s2" {...stepMotion}>
            <h2 className="text-[22px] font-bold text-ink-900">{pick('Anda perlukan bantuan untuk apa?', 'What do you need help with?')}</h2>
            <p className="mt-1 text-[14px] text-ink-500">
              {pick('Tidak pasti? Pilih "Lain-lain".', 'Not sure? Choose "Something else".')}
            </p>
            <div className="mt-6 space-y-2.5">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => chooseService(option)}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white px-5 py-4 text-left text-[15px] font-medium text-ink-800 transition-all hover:border-brand-400 hover:bg-brand-50/50"
                >
                  {bm ? option.bm : option.en}
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink-200 text-transparent transition-all group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3 — contact details */}
        {step === 3 && (
          <motion.form key="s3" {...stepMotion} onSubmit={handleSubmit} noValidate>
            <h2 className="text-[22px] font-bold text-ink-900">{pick('Ke mana kami boleh balas?', 'Where should we reply?')}</h2>
            <p className="mt-1 text-[14px] text-ink-500">
              {pick('Dua medan sahaja. Kami balas melalui WhatsApp dalam 24 jam.', 'Just two fields. We reply on WhatsApp within 24 hours.')}
            </p>

            {service && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-700">
                <Check className="h-3.5 w-3.5" />
                {bm ? service.bm : service.en}
              </p>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="qcf-name" className="field-label">{pick('Nama', 'Name')}</label>
                <input
                  id="qcf-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder={pick('Nama penuh anda', 'Your full name')}
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="qcf-phone" className="field-label">{pick('Nombor WhatsApp', 'WhatsApp number')}</label>
                <input
                  id="qcf-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="012-345 6789"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="qcf-note" className="field-label">
                  {pick('Nota ringkas', 'Short note')}{' '}
                  <span className="font-normal text-ink-400">{pick('(pilihan)', '(optional)')}</span>
                </label>
                <textarea
                  id="qcf-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder={pick('Ceritakan sedikit tentang situasi anda...', 'Tell us a bit about your situation...')}
                  className="field resize-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-[13.5px] font-medium text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" variant="whatsapp" size="lg" disabled={submitting} className="mt-6 w-full">
              <MessageCircle className="h-[18px] w-[18px]" />
              {submitting ? pick('Sebentar...', 'One moment...') : pick('Hantar & buka WhatsApp', 'Send & open WhatsApp')}
            </Button>

            <p className="mt-4 text-center text-[12.5px] leading-relaxed text-ink-500">
              {pick(
                'Maklumat anda hanya digunakan untuk membalas pertanyaan ini.',
                'Your details are only used to respond to this enquiry.'
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export { QuickConsultForm };
