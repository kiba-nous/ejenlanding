import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';

/**
 * Catch-all route. Without it, any unmatched URL renders an entirely blank
 * page — no nav, no footer, no way back.
 */
export function NotFound() {
  const { language } = useLanguage();
  const bm = language === 'bm';

  return (
    <>
      <Navbar />

      <div className="min-h-[60vh] bg-white flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">
          <p className="text-[13px] font-medium text-apple-gray-3 tracking-wide uppercase mb-4">404</p>

          <h1 className="text-3xl md:text-4xl font-light text-apple-gray-1 mb-4">
            {bm ? 'Halaman tidak dijumpai' : 'Page not found'}
          </h1>

          <p className="text-[15px] text-apple-gray-2 leading-relaxed mb-8">
            {bm
              ? 'Pautan yang anda ikuti mungkin sudah lapuk atau tersalah taip.'
              : 'The link you followed may be out of date or mistyped.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-apple-blue hover:opacity-90 text-white text-[15px] font-medium py-3 px-6 rounded-apple-button transition-opacity duration-200"
            >
              {bm ? 'Kembali ke laman utama' : 'Back to home'}
            </Link>
            <a
              href={buildWhatsAppUrl()}
              onClick={() => trackEvent('whatsapp_click', { location: 'not_found' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-apple-gray-4 hover:bg-apple-gray-5 text-apple-gray-1 text-[15px] font-medium py-3 px-6 rounded-apple-button transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              {bm ? 'Hubungi kami' : 'Contact us'}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
