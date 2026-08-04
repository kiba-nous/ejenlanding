import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { trackEvent, buildWhatsAppUrl } from "../utils/analytics";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "../config/site";

function Footer() {
  const { t, language } = useLanguage();
  const bm = language === 'bm';

  const linkClass = "text-[13px] text-apple-gray-2 hover:text-apple-gray-1 transition-colors duration-150";

  // Real services that link somewhere, replacing the dead SaaS feature list.
  const services = [
    { label: bm ? 'Pemfailan Cukai Individu' : 'Individual Tax Filing', to: '/form' },
    { label: bm ? 'Pemfailan Cukai Syarikat' : 'Corporate Tax Filing', to: '/form' },
    { label: bm ? 'Konsultasi Peribadi' : 'Personal Consultation', to: '/konsultasi-peribadi' },
    { label: bm ? 'E-Book Borang BE & B' : 'E-Book Borang BE & B', to: '/ebook' },
  ];

  return (
    <footer className="bg-apple-gray-5 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="text-[13px] font-medium text-apple-gray-1 mb-4">
              {bm ? 'Perkhidmatan' : 'Services'}
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.label}>
                  <Link to={service.to} className={linkClass}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-apple-gray-1 mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy-policy" className={linkClass}>
                  {bm ? 'Dasar Privasi' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className={linkClass}>
                  {bm ? 'Terma Perkhidmatan' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {bm ? 'Sokongan' : 'Support'}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="text-[13px] font-medium text-apple-gray-1 mb-4">
              {bm ? 'Hubungi' : 'Contact'}
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-apple-gray-3 mt-0.5 flex-shrink-0" />
                <span className="text-[13px] text-apple-gray-2">Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-apple-gray-3 mt-0.5 flex-shrink-0" />
                <a
                  href={buildWhatsAppUrl()}
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer_phone' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-apple-gray-3 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-apple-gray-4 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[13px] text-apple-gray-3">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/ejencukaimy" target="_blank" rel="noopener noreferrer" className="text-apple-gray-3 hover:text-apple-gray-1 transition-colors duration-150">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.threads.net/@ejencukaimy" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity duration-150">
                  <img src="/threads.png" alt="Threads" className="w-5 h-5" />
                </a>
              </div>
              <img
                src="/logo.png"
                alt="Ejen Cukai"
                className="h-6 w-auto opacity-40"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };