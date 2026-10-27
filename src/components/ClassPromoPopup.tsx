import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import { Button } from './ui/button';

const FORM_URL = 'https://forms.gle/TcEBUjxSXuFgNEKg8';

// The popup retires itself once the class starts (Sun 1 Nov, 8.30 pm MYT), so
// nobody signs up for a session they can no longer join.
const CLASS_STARTS = new Date('2026-11-01T20:30:00+08:00');

// Keyed to this class, so the next promo can reuse the component and still
// reach visitors who already dismissed this one.
const SEEN_KEY = 'promo-seen:kelas-cukai-bisnes-2026-11';

const SHOW_DELAY_MS = 1500;

// Conversion flows and legal pages: a popup there costs more than it earns.
const HIDDEN_ON = ['/form', '/konsultasi-peribadi', '/ebook', '/booking', '/privacy-policy', '/terms-of-service'];

function hasSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) !== null;
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, new Date().toISOString());
  } catch {
    // Private mode or blocked storage: the popup may show again, which is fine.
  }
}

/**
 * One-time popup for the Kelas Asas Percukaian Bisnes poster.
 *
 * Shown once per browser, on first visit, after a short delay so it doesn't
 * land before the page has painted.
 */
export function ClassPromoPopup() {
  const { pick } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const hiddenHere = HIDDEN_ON.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  useEffect(() => {
    if (hiddenHere || hasSeen() || Date.now() >= CLASS_STARTS.getTime()) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      markSeen();
      trackEvent('class_popup_view', { page: pathname });
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [hiddenHere, pathname]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss('escape');
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  function dismiss(via: string) {
    setOpen(false);
    trackEvent('class_popup_dismiss', { via });
  }

  function register(via: string) {
    trackEvent('class_popup_click', { via });
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/60 p-4 backdrop-blur-sm"
          onClick={() => dismiss('backdrop')}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-promo-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            // Width follows the viewport height too, so the 4:5 poster plus
            // the close and register buttons never overflow a short screen.
            style={{
              width: 'min(440px, calc((100dvh - 11.5rem) * 0.8), calc(100vw - 2rem))',
            }}
            className="relative mt-11"
          >
            <h2 id="class-promo-title" className="sr-only">
              Kelas Asas Percukaian Bisnes
            </h2>

            {/* Sits above the card: inside it would cover the poster's badge. */}
            <button
              ref={closeRef}
              type="button"
              onClick={() => dismiss('close_button')}
              aria-label={pick('Tutup', 'Close')}
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-2xl bg-white shadow-float">
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => register('poster')}>
                <img
                  src="/kelas-cukai-bisnes.webp"
                  alt="Kelas Asas Percukaian Bisnes bersama Cik Afiqah Aqilah. Ahad, 1 November, 8.30–10.30 pm di Google Meet. Kelas sahaja RM55; Bundle Lengkap RM68 (kelas, rakaman, eBook dan template)."
                  width={1080}
                  height={1350}
                  className="block aspect-[4/5] w-full"
                />
              </a>

              <div className="flex items-center gap-2 p-3">
                <Button href={FORM_URL} onClick={() => register('button')} className="flex-1">
                  {pick('Daftar sekarang', 'Register now')}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => dismiss('later_button')}>
                  {pick('Lain kali', 'Maybe later')}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
