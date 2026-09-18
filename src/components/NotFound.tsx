import { MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { Button } from './ui/button';

/**
 * Catch-all route. Without it, any unmatched URL renders an entirely blank
 * page — no nav, no footer, no way back.
 */
export function NotFound() {
  const { pick } = useLanguage();
  usePageMeta({ title: pick('Halaman tidak dijumpai', 'Page not found'), noindex: true });

  return (
    <>
      <Navbar />

      <main id="main" className="flex min-h-[70vh] items-center justify-center bg-white px-5 py-24">
        <div className="max-w-md text-center">
          <p className="text-[64px] font-extrabold leading-none tracking-tight text-ink-200">404</p>
          <h1 className="mt-4 text-display-sm text-ink-900">{pick('Halaman tidak dijumpai', 'Page not found')}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            {pick(
              'Pautan yang anda ikuti mungkin sudah lapuk atau tersalah taip.',
              'The link you followed may be out of date or mistyped.'
            )}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" size="lg">{pick('Kembali ke laman utama', 'Back to home')}</Button>
            <Button
              href={buildWhatsAppUrl()}
              variant="outline"
              size="lg"
              onClick={() => trackEvent('whatsapp_click', { location: 'not_found' })}
            >
              <MessageCircle className="h-4 w-4" />
              {pick('Hubungi kami', 'Contact us')}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
