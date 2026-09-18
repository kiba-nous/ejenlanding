import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';

// A short wa.link can't carry a message, so every chat started from here used
// to open cold. A wa.me link with pre-filled text gives us the opener.
const GREETING = {
  bm: 'Hi EjenCukai! Saya ada soalan tentang cukai.',
  en: 'Hi EjenCukai! I have a question about my taxes.',
};

export const WhatsAppButton: React.FC = () => {
  const { language, pick } = useLanguage();
  const { pathname } = useLocation();

  // The enquiry form already ends in a WhatsApp handoff; a second floating
  // button there covered the submit button on small screens.
  if (pathname === '/form') return null;

  return (
    <a
      href={buildWhatsAppUrl(GREETING[language])}
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={pick('Sembang di WhatsApp', 'Chat on WhatsApp')}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 rounded-full bg-whatsapp pl-[15px] pr-[15px] text-white shadow-float transition-all duration-300 hover:bg-whatsapp-dark hover:pr-5 md:bottom-6 md:right-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <MessageCircle className="h-7 w-7 shrink-0" fill="currentColor" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[160px] group-hover:opacity-100">
        {pick('Tanya di WhatsApp', 'Ask on WhatsApp')}
      </span>
    </a>
  );
};
