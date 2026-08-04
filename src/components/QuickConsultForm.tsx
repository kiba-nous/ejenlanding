import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { WHATSAPP_DISPLAY } from '../config/site';

/**
 * Three-step consultation form that hands off to WhatsApp.
 *
 * Replaces a 9-required-field Tally embed. Individuals are never asked for
 * company details — the service list branches on the answer to step 1 — and
 * only two fields are ever typed.
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
    { id: 'b', bm: 'Fail Borang B (ada perniagaan)', en: 'File Borang B (with business income)' },
    { id: 'planning', bm: 'Perancangan cukai peribadi', en: 'Personal tax planning' },
    { id: 'refund', bm: 'Pulangan cukai / rayuan CP500', en: 'Tax refund / CP500 appeal' },
    { id: 'lain', bm: 'Lain-lain', en: 'Something else' },
  ],
  perniagaan: [
    { id: 'corporate', bm: 'Cukai syarikat / perniagaan', en: 'Corporate tax filing' },
    { id: 'planning-biz', bm: 'Perancangan cukai syarikat', en: 'Corporate tax planning' },
    { id: 'einvois', bm: 'E-Invois LHDN', en: 'LHDN e-Invoicing' },
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

function QuickConsultForm() {
  const { language } = useLanguage();
  const bm = language === 'bm';

  const [step, setStep] = useState(1);
  const [clientType, setClientType] = useState<ClientType | null>(null);
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
      setError(bm ? 'Sila masukkan nama anda.' : 'Please enter your name.');
      return;
    }

    const normalised = normalisePhone(phone);
    if (normalised.length < 10) {
      setError(
        bm
          ? 'Nombor WhatsApp tidak sah. Contoh: 012-345 6789'
          : 'That WhatsApp number looks incomplete. Example: 012-345 6789'
      );
      return;
    }

    setError('');
    setSubmitting(true);

    const serviceLabel = service ? (bm ? service.bm : service.en) : '';
    const clientLabel = clientType === 'individu'
      ? (bm ? 'Individu' : 'Individual')
      : (bm ? 'Perniagaan / Syarikat' : 'Business / Company');

    // 1. Persist first — the record must survive a failed handoff.
    await saveLead({
      nama: name.trim(),
      whatsapp: normalised,
      jenis_klien: clientLabel,
      perkhidmatan: serviceLabel,
      nota: note.trim(),
      sumber: new URLSearchParams(window.location.search).get('sumber') ?? 'form',
    });

    trackEvent('form_submit', {
      client_type: clientType ?? '',
      service: service?.id ?? '',
    });

    const message = [
      bm ? `Hi EjenCukai! Saya ${name.trim()}.` : `Hi EjenCukai! I'm ${name.trim()}.`,
      '',
      `${bm ? 'Jenis klien' : 'Client type'}: ${clientLabel}`,
      `${bm ? 'Perkhidmatan' : 'Service'}: ${serviceLabel}`,
      ...(note.trim() ? ['', `${bm ? 'Nota' : 'Note'}: ${note.trim()}`] : []),
      '',
      bm ? 'Boleh bantu saya?' : 'Could you help me with this?',
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
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="bg-apple-blue/10 rounded-full p-4">
            <Check className="w-8 h-8 text-apple-blue" />
          </div>
        </div>
        <h3 className="text-2xl font-light text-apple-gray-1 mb-3">
          {bm ? 'Terima kasih!' : 'Thank you!'}
        </h3>
        <p className="text-[15px] text-apple-gray-2 mb-8 max-w-sm mx-auto leading-relaxed">
          {bm
            ? 'Kami sedang membuka WhatsApp untuk anda. Jika ia tidak terbuka, tekan butang di bawah.'
            : "We're opening WhatsApp for you. If it didn't open, use the button below."}
        </p>
        <a
          href={whatsappUrl}
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:opacity-90 text-white text-[15px] font-medium py-3 px-6 rounded-apple-button transition-opacity duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          {bm ? 'Buka WhatsApp' : 'Open WhatsApp'}
        </a>
        <p className="mt-6 text-[13px] text-apple-gray-3">
          {bm ? 'Atau hubungi kami terus di ' : 'Or reach us directly at '}
          <span className="text-apple-gray-1">{WHATSAPP_DISPLAY}</span>
        </p>
      </div>
    );
  }

  const options = clientType ? SERVICES[clientType] : [];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              n <= step ? 'bg-apple-blue' : 'bg-apple-gray-4'
            }`}
          />
        ))}
      </div>

      {step > 1 && (
        <button
          type="button"
          onClick={back}
          className="flex items-center gap-1.5 text-[13px] text-apple-gray-3 hover:text-apple-gray-1 transition-colors duration-150 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {bm ? 'Kembali' : 'Back'}
        </button>
      )}

      {/* Step 1 — who is this for */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h3 className="text-xl font-medium text-apple-gray-1 mb-1">
            {bm ? 'Bantuan ini untuk siapa?' : 'Who is this for?'}
          </h3>
          <p className="text-[14px] text-apple-gray-3 mb-6">
            {bm ? 'Pilih satu untuk mula.' : 'Pick one to get started.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(['individu', 'perniagaan'] as ClientType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => chooseClientType(type)}
                className="text-left border border-apple-gray-4 hover:border-apple-blue hover:bg-apple-blue/5 rounded-apple-sm p-5 transition-colors duration-150"
              >
                <span className="block text-[15px] font-medium text-apple-gray-1 mb-1">
                  {type === 'individu'
                    ? bm ? 'Diri sendiri' : 'Myself'
                    : bm ? 'Perniagaan saya' : 'My business'}
                </span>
                <span className="block text-[13px] text-apple-gray-3">
                  {type === 'individu'
                    ? bm ? 'Gaji, freelance, sewa' : 'Salary, freelance, rental'
                    : bm ? 'Sdn Bhd, enterprise, LLP' : 'Sdn Bhd, enterprise, LLP'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2 — which service */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h3 className="text-xl font-medium text-apple-gray-1 mb-1">
            {bm ? 'Anda perlukan bantuan untuk apa?' : 'What do you need help with?'}
          </h3>
          <p className="text-[14px] text-apple-gray-3 mb-6">
            {bm ? 'Tidak pasti? Pilih "Lain-lain".' : 'Not sure? Choose "Something else".'}
          </p>
          <div className="space-y-2.5">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => chooseService(option)}
                className="w-full text-left border border-apple-gray-4 hover:border-apple-blue hover:bg-apple-blue/5 rounded-apple-sm px-5 py-4 text-[15px] text-apple-gray-1 transition-colors duration-150"
              >
                {bm ? option.bm : option.en}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3 — contact details */}
      {step === 3 && (
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-medium text-apple-gray-1 mb-1">
            {bm ? 'Ke mana kami boleh balas?' : 'Where should we reply?'}
          </h3>
          <p className="text-[14px] text-apple-gray-3 mb-6">
            {bm
              ? 'Dua medan sahaja. Kami balas melalui WhatsApp dalam 24 jam.'
              : 'Just two fields. We reply on WhatsApp within 24 hours.'}
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="qcf-name" className="block text-[13px] font-medium text-apple-gray-2 mb-1.5">
                {bm ? 'Nama' : 'Name'}
              </label>
              <input
                id="qcf-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder={bm ? 'Nama penuh anda' : 'Your full name'}
                className="w-full px-4 py-3 text-[15px] border border-apple-gray-4 rounded-apple-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-150"
              />
            </div>

            <div>
              <label htmlFor="qcf-phone" className="block text-[13px] font-medium text-apple-gray-2 mb-1.5">
                {bm ? 'Nombor WhatsApp' : 'WhatsApp number'}
              </label>
              <input
                id="qcf-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="012-345 6789"
                className="w-full px-4 py-3 text-[15px] border border-apple-gray-4 rounded-apple-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-150"
              />
            </div>

            <div>
              <label htmlFor="qcf-note" className="block text-[13px] font-medium text-apple-gray-2 mb-1.5">
                {bm ? 'Nota ringkas' : 'Short note'}{' '}
                <span className="font-normal text-apple-gray-3">
                  {bm ? '(pilihan)' : '(optional)'}
                </span>
              </label>
              <textarea
                id="qcf-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder={bm ? 'Ceritakan sedikit tentang situasi anda...' : 'Tell us a bit about your situation...'}
                className="w-full px-4 py-3 text-[15px] border border-apple-gray-4 rounded-apple-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-150 resize-none"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-[13px] text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-apple-blue hover:opacity-90 disabled:opacity-60 text-white text-[15px] font-semibold py-4 px-6 rounded-apple-button transition-opacity duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            {submitting
              ? bm ? 'Sebentar...' : 'One moment...'
              : bm ? 'Hantar & buka WhatsApp' : 'Send & open WhatsApp'}
          </button>

          <p className="mt-4 text-[12px] text-apple-gray-3 text-center leading-relaxed">
            {bm
              ? 'Maklumat anda hanya digunakan untuk membalas pertanyaan ini.'
              : 'Your details are only used to respond to this enquiry.'}
          </p>
        </motion.form>
      )}
    </div>
  );
}

export { QuickConsultForm };
