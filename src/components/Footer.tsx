import { Mail, MapPin, MessageCircle, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { PLAY_STORE_URL, PRODUCT_URLS, WHATSAPP_DISPLAY } from '../config/site';

function Footer() {
  const { pick } = useLanguage();
  const link = 'text-[14px] text-white/65 transition-colors hover:text-white';

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
        { label: pick('Tanya AI cukai (percuma)', 'Ask the tax AI (free)'), href: PRODUCT_URLS.askAi },
        { label: pick('Aplikasi imbas resit', 'Receipt scanner app'), href: PLAY_STORE_URL },
        { label: pick('Portal MyTax LHDN', 'LHDN MyTax portal'), href: 'https://mytax.hasil.gov.my' },
      ],
    },
    {
      heading: pick('Firma & pelabur', 'Firms & investors'),
      links: [
        { label: pick('EjenCukai Agent: AI CRM firma cukai', 'EjenCukai Agent: AI CRM for tax firms'), href: PRODUCT_URLS.agent },
        { label: pick('Demo pelabur', 'Investor demo'), href: PRODUCT_URLS.investorDemo },
        { label: pick('Demo ejen AI perniagaan', 'Business AI agent demo'), href: PRODUCT_URLS.businessAgentDemo },
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
    <footer className="bg-ink-950 text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand + contact */}
          <div className="lg:col-span-3">
            <img src="/logo.png" alt="EjenCukai" width={800} height={300} className="-ml-2 h-12 w-auto" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/65">
              {pick(
                'Platform pemfailan cukai. Kami hubungkan anda dengan profesional cukai dan rakan ejen berdaftar LHDN untuk Borang BE, Borang B dan cukai syarikat.',
                'A tax filing platform. We connect you with tax professionals and a partner LHDN-registered agent for Borang BE, Borang B and corporate tax.'
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
                  <MessageCircle className="h-4 w-4 text-brand-400" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:contact@ejencukai.my`} className={`inline-flex items-center gap-2.5 ${link}`}>
                  <Mail className="h-4 w-4 text-brand-400" />
                  contact@ejencukai.my
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-[14px] text-white/65">
                <MapPin className="h-4 w-4 text-brand-400" />
                Kuala Lumpur, Malaysia
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-9 lg:pl-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/45">{col.heading}</h3>
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-white/45">
            © {new Date().getFullYear()} Employou Technologies (IP0602426-H). {pick('Hak cipta terpelihara.', 'All rights reserved.')}{' '}
            <span className="hidden sm:inline">·</span>{' '}
            <span className="block sm:inline">{pick('Pemfailan disemak oleh profesional cukai.', 'Filings reviewed by tax professionals.')}</span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/ejencukaimy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://www.threads.net/@ejencukaimy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/10"
            >
              <img src="/threads.png" alt="" width={18} height={18} className="h-[18px] w-[18px] opacity-70 invert" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
