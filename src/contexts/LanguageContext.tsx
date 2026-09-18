/* eslint-disable react-refresh/only-export-components -- the hook and the
   provider are deliberately co-located; every page imports both from here. */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Language = 'en' | 'bm';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Key-based lookup, kept for the legacy pages. */
  t: (key: string) => string;
  /** Inline bilingual pick: `pick('Hantar', 'Send')`. */
  pick: <T,>(bm: T, en: T) => T;
  /** Convenience flag for the common `bm ? … : …` pattern. */
  bm: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ejc_lang';

/**
 * Key-based strings. New components pass both languages inline through
 * `pick()`; this table only backs the older `t()` call sites.
 */
const translations: Record<Language, Record<string, string>> = {
  en: {
    'form.title': 'Tell us what you need',
    'form.subtitle': 'Three quick steps. We usually reply on WhatsApp within 24 hours on working days.',

    'waitlist.title': 'Join the Waitlist',
    'waitlist.subtitle': 'Be among the first to experience AI-powered tax compliance. Get early access and exclusive pricing when we launch.',
    'waitlist.privacy': "By joining, you agree to receive updates about Ejen Cukai. We respect your privacy and won't spam you.",

    'footer.company': 'Company',
    'footer.copyright': 'EjenCukai. All rights reserved.',
  },
  bm: {
    'form.title': 'Beritahu kami keperluan anda',
    'form.subtitle': 'Tiga langkah ringkas. Kami biasanya balas melalui WhatsApp dalam 24 jam pada hari bekerja.',

    'waitlist.title': 'Sertai Senarai Menunggu',
    'waitlist.subtitle': 'Jadilah antara yang pertama merasai pematuhan cukai berkuasa AI. Dapatkan akses awal dan harga eksklusif apabila kami melancarkan.',
    'waitlist.privacy': 'Dengan menyertai, anda bersetuju untuk menerima kemas kini tentang Ejen Cukai. Kami menghormati privasi anda dan tidak akan menghantar spam.',

    'footer.company': 'Syarikat',
    'footer.copyright': 'EjenCukai. Hak cipta terpelihara.',
  },
};

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'bm') return stored;
  } catch {
    // Storage unavailable — fall through to the default.
  }
  return 'bm';
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // The choice used to reset to BM on every reload, so an English reader had
  // to toggle again on each visit. Persist it, and keep <html lang> in sync
  // so screen readers and translation tools pick the right voice.
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Private mode — the choice just won't survive a reload.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'bm' ? 'ms' : 'en';
  }, [language]);

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      bm: language === 'bm',
      t: (key) => translations[language][key] ?? key,
      pick: (bm, en) => (language === 'bm' ? bm : en),
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
