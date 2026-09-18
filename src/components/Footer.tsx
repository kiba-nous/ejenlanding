import { Mail, MapPin, MessageCircle, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../config/site';

function Footer() {
  const { pick } = useLanguage();
  const link = 'text-[14px] text-ink-600 transition-colors hover:text-ink-900';

  const columns = [
    {
      heading: pick('Perkhidmatan', 'Services'),
      links: [
        { label: pick('Pemfailan cukai individu', 'Individual tax filing'), to: '/form?jenis=individu' },
        { label: pick('Pemfailan cukai syarikat', 'Corporate tax filing'), to: '/form?jenis=perniagaan' },
        { label: pick('Perkhidmatan & harga', 'Services & pricing'), to: '/#perkhidmatan' },
        { label: pick('Konsultasi peribadi RM149', 'Personal consultation RM149'), to: '/konsultasi-peribadi' },
        { label: 'E-Book Borang BE & B', to: '/ebook' },
      ],
    },
    {
      heading: pick('Sumber', 'Resources'),
      links: [
        { label: pick('Soalan lazim', 'FAQ'), to: '/#faq' },
        { label: pick('Tanya AI cukai (percuma)', 'Ask the tax AI (free)'), href: 'https://ai.ejencukai.my' },
        { label: pick('Aplikasi imbas resit', 'Receipt scanner app'), href: 'https://play.google.com/store/apps/details?id=my.ejencukai.receiptscanner' },
        { label: pick('Portal MyTax LHDN', 'LHDN MyTax portal'), href: 'https://mytax.hasil.gov.my' },
      ],
    },
    {
      heading: pick('Syarikat', 'Company'),
      links: [
        { label: pick('Dasar privasi', 'Privacy policy'), to: '/privacy-policy' },
        { label: pick('Terma perkhidmatan', 'Terms of service'), to: '/terms-of-service' },
      ],
    },
  ];

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-4">
            <img src="/logo.png" alt="EjenCukai" width={800} height={300} className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-600">
              {pick(
                'Ejen cukai berdaftar LHDN. Kami uruskan Borang BE, Borang B dan cukai syarikat supaya anda tak perlu risau.',
                'LHDN-registered tax agent. We handle Borang BE, Borang B and corporate tax so you don’t have to worry.'
              )}
            </p>
            <ul className="mt-6 space-y-2.5">
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer_phone' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 ${link}`}
                >
                  <MessageCircle className="h-4 w-4 text-ink-400" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`inline-flex items-center gap-2.5 ${link}`}>
                  <Mail className="h-4 w-4 text-ink-400" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[14px] text-ink-600">
                <MapPin className="h-4 w-4 text-ink-400" />
                Kuala Lumpur, Malaysia
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:pl-6">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-900">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) =>
                  'href' in l && l.href ? (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link to={l.to!} className={link}>
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-200 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-ink-500">
            © {new Date().getFullYear()} EjenCukai. {pick('Hak cipta terpelihara.', 'All rights reserved.')}{' '}
            <span className="hidden sm:inline">·</span>{' '}
            <span className="block sm:inline">{pick('Ejen cukai berdaftar LHDN, Seksyen 153 ACP 1967.', 'LHDN-registered tax agent, Section 153 ITA 1967.')}</span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/ejencukaimy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-200 hover:text-ink-900"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://www.threads.net/@ejencukaimy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-opacity hover:bg-ink-200"
            >
              <img src="/threads.png" alt="" width={18} height={18} className="h-[18px] w-[18px] opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
