import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';

// A short wa.link can't carry a message, so every chat started from here used
// to open cold. A wa.me link with pre-filled text gives us the opener.
const GREETING = 'Hi EjenCukai! Saya ada soalan tentang cukai.';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={buildWhatsAppUrl(GREETING)}
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </a>
  );
};
