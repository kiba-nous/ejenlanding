import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Button } from './ui/button';

interface NavItem {
  label: string;
  to: string;
  /** Match on pathname only; hash links stay unhighlighted. */
  path?: string;
}

function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const options: Language[] = ['bm', 'en'];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center rounded-full bg-ink-100 p-0.5 ${compact ? 'text-[11px]' : 'text-[12px]'}`}
    >
      {options.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded-full font-semibold uppercase tracking-wide transition-all duration-150 ${
            compact ? 'px-2 py-1' : 'px-2.5 py-1'
          } ${language === lang ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-900'}`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const { pick } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items: NavItem[] = [
    { label: pick('Perkhidmatan', 'Services'), to: '/#perkhidmatan' },
    { label: pick('Konsultasi', 'Consultation'), to: '/konsultasi-peribadi', path: '/konsultasi-peribadi' },
    { label: 'E-Book', to: '/ebook', path: '/ebook' },
    { label: pick('Soalan Lazim', 'FAQ'), to: '/#faq' },
  ];

  // Close the sheet on navigation and on Escape; lock page scroll while open.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (item: NavItem) => item.path && location.pathname === item.path;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${
        scrolled ? 'border-ink-200/80 shadow-[0_1px_0_rgba(19,26,37,0.02),0_8px_24px_-16px_rgba(19,26,37,0.18)]' : 'border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {pick('Langkau ke kandungan', 'Skip to content')}
      </a>

      <nav className="container-x flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link to="/" className="flex shrink-0 items-center transition-opacity hover:opacity-80" aria-label="EjenCukai home">
          <img src="/logo.png" alt="EjenCukai" width={800} height={300} className="h-9 w-auto md:h-10" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item) ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                isActive(item) ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Button to="/form" size="sm" className="px-5">
            <MessageCircle className="h-4 w-4" />
            {pick('Hubungi kami', 'Contact us')}
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle compact />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? pick('Tutup menu', 'Close menu') : pick('Buka menu', 'Open menu')}
            className="grid h-10 w-10 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-b border-ink-200 bg-white shadow-card-hover md:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-[16px] font-medium transition-colors ${
                    isActive(item) ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-ink-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-ink-100 pt-4">
                <Button to="/form" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  {pick('Hubungi kami di WhatsApp', 'Contact us on WhatsApp')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Navbar };
