import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'bm';
  setLanguage: (lang: 'en' | 'bm') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Hero Section
    'hero.badge': 'Revolutionizing Malaysian Tax Compliance',
    'hero.sstUpdate': 'Updated for SST scope expansion effective 1 July 2025, including services like construction, leasing, and healthcare.',
    'hero.title.part1': 'Your AI Tax Co-Pilot is',
    'hero.title.intelligent': 'intelligent',
    'hero.title.automated': 'automated',
    'hero.title.accurate': 'accurate',
    'hero.title.compliant': 'compliant',
    'hero.title.efficient': 'efficient',
    'hero.description': 'Ejen Cukai simplifies Malaysian tax compliance with AI-powered automation. From SST calculations to income tax filing, we handle the complexity so you can focus on growing your business.',
    'hero.joinWaitlist': 'Join Waitlist',
    'hero.tryDemo': 'Try Demo',
    'hero.forBusinessDemo': 'For Business (Demo)',
    'hero.forTaxFirms': 'For Tax Firms',
    'hero.trustedBy': 'Trusted by Malaysian businesses and tax firms',
    
    // Features Section
    'features.title': 'Comprehensive Tax Solutions for Malaysia',
    'features.subtitle': 'From SST compliance to income tax filing, Ejen Cukai provides everything you need to stay compliant and optimize your tax position.',
    'features.gst.title': 'Automated SST Calculations',
    'features.gst.description': 'Accurate SST calculations and reporting compliance with LHDN requirements. Handle standard rate, zero rate, and exempt supplies effortlessly.',
    'features.income.title': 'Income Tax Filing',
    'features.income.description': 'Streamlined income tax preparation for individuals and businesses. Automatic form filling and submission to LHDN with real-time status tracking.',
    'features.monitoring.title': 'Real-time Compliance Monitoring',
    'features.monitoring.description': 'Stay ahead of deadlines with automated reminders for tax submissions, payments, and regulatory changes in Malaysian tax law.',
    'features.compliance.title': 'LHDN Compliance Assurance',
    'features.compliance.description': 'Built-in compliance checks ensure all submissions meet LHDN standards. Reduce audit risks with comprehensive documentation.',
    'features.analytics.title': 'Financial Analytics',
    'features.analytics.description': 'Comprehensive financial reporting with tax implications analysis. Visualize your tax position and optimize your business strategy.',
    'features.multiuser.title': 'Multi-User Support',
    'features.multiuser.description': 'Collaborative workspace for tax firms and businesses. Role-based access control and client management system.',
    'features.ai.title': 'AI-Powered Insights',
    'features.ai.description': 'Intelligent recommendations for tax optimization and compliance improvements. Learn from patterns in your business data.',
    'features.security.title': 'Secure Data Management',
    'features.security.description': 'Enterprise-grade security with local data residency. Full audit trails and encrypted storage for sensitive financial information.',
    'features.intelligence.title': 'Business Intelligence',
    'features.intelligence.description': 'Advanced analytics and forecasting to help you make informed business decisions and optimize your tax position.',
    'features.integration.title': 'Seamless Integration',
    'features.integration.description': 'Connect with popular accounting software and banking systems. Import transactions automatically and sync data in real-time.',
    'features.alerts.title': 'Smart Alerts & Notifications',
    'features.alerts.description': 'Proactive notifications for upcoming deadlines, regulatory changes, and potential compliance issues before they become problems.',
    'features.automation.title': 'End-to-End Automation',
    'features.automation.description': 'From data entry to report generation, automate your entire tax workflow. Save time and reduce human errors significantly.',
    'features.compliant.title': 'Fully Compliant with Malaysian Tax Regulations',
    'features.compliant.description': 'Our AI is trained on the latest Malaysian tax laws and regulations, ensuring your business stays compliant with LHDN requirements.',
    
    // Waitlist Section
    'waitlist.title': 'Join the Waitlist',
    'waitlist.subtitle': 'Be among the first to experience AI-powered tax compliance. Get early access and exclusive pricing when we launch.',
    'waitlist.privacy': 'By joining, you agree to receive updates about Ejen Cukai. We respect your privacy and won\'t spam you.',
    'waitlist.businesses': 'Businesses waiting',
    'waitlist.launch': 'Expected launch',
    'waitlist.discount': 'Early bird discount',
    
    // Footer
    'footer.description': 'AI-powered tax compliance for Malaysian businesses and tax firms. Simplifying tax management with intelligent automation.',
    'footer.features': 'Features',
    'footer.company': 'Company',
    'footer.copyright': '© 2025 Ejen Cukai. All rights reserved.',
    'footer.madeWith': 'Made with ❤️ in Malaysia'
  },
  bm: {
    // Hero Section
    'hero.badge': 'Merevolusikan Pematuhan Cukai Malaysia',
    'hero.sstUpdate': 'Dikemas kini untuk pengembangan skop SST berkuat kuasa 1 Julai 2025, termasuk perkhidmatan seperti pembinaan, pajakan, dan penjagaan kesihatan.',
    'hero.title.part1': 'Pembantu Cukai Anda adalah',
    'hero.title.intelligent': 'pintar',
    'hero.title.automated': 'automatik',
    'hero.title.accurate': 'tepat',
    'hero.title.compliant': 'patuh',
    'hero.title.efficient': 'cekap',
    'hero.description': 'Ejen Cukai memudahkan pematuhan cukai Malaysia dengan automasi berkuasa AI. Dari pengiraan SST hingga pemfailan cukai pendapatan, kami mengendalikan kerumitan supaya anda boleh fokus mengembangkan perniagaan anda.',
    'hero.joinWaitlist': 'Sertai Senarai Menunggu',
    'hero.tryDemo': 'Cuba Demo',
    'hero.forBusinessDemo': 'Untuk Perniagaan (Demo)',
    'hero.forTaxFirms': 'Untuk Firma Cukai',
    'hero.trustedBy': 'Dipercayai oleh perniagaan dan firma cukai Malaysia',
    
    // Features Section
    'features.title': 'Penyelesaian Cukai Komprehensif untuk Malaysia',
    'features.subtitle': 'Dari pematuhan SST hingga pemfailan cukai pendapatan, Ejen Cukai menyediakan semua yang anda perlukan untuk kekal patuh dan mengoptimumkan kedudukan cukai anda.',
    'features.gst.title': 'Pengiraan SST Automatik',
    'features.gst.description': 'Pengiraan SST yang tepat dan pematuhan pelaporan dengan keperluan LHDN. Kendalikan kadar standard, kadar sifar, dan bekalan dikecualikan dengan mudah.',
    'features.income.title': 'Pemfailan Cukai Pendapatan',
    'features.income.description': 'Penyediaan cukai pendapatan yang diperkemas untuk individu dan perniagaan. Pengisian borang automatik dan penyerahan kepada LHDN dengan penjejakan status masa nyata.',
    'features.monitoring.title': 'Pemantauan Pematuhan Masa Nyata',
    'features.monitoring.description': 'Kekal mendahului tarikh akhir dengan peringatan automatik untuk penyerahan cukai, pembayaran, dan perubahan peraturan dalam undang-undang cukai Malaysia.',
    'features.compliance.title': 'Jaminan Pematuhan LHDN',
    'features.compliance.description': 'Pemeriksaan pematuhan terbina dalam memastikan semua penyerahan memenuhi piawaian LHDN. Kurangkan risiko audit dengan dokumentasi komprehensif.',
    'features.analytics.title': 'Analitik Kewangan',
    'features.analytics.description': 'Pelaporan kewangan komprehensif dengan analisis implikasi cukai. Visualisasikan kedudukan cukai anda dan optimumkan strategi perniagaan anda.',
    'features.multiuser.title': 'Sokongan Multi-Pengguna',
    'features.multiuser.description': 'Ruang kerja kolaboratif untuk firma cukai dan perniagaan. Kawalan akses berasaskan peranan dan sistem pengurusan klien.',
    'features.ai.title': 'Wawasan Berkuasa AI',
    'features.ai.description': 'Cadangan pintar untuk pengoptimuman cukai dan penambahbaikan pematuhan. Belajar dari corak dalam data perniagaan anda.',
    'features.security.title': 'Pengurusan Data Selamat',
    'features.security.description': 'Keselamatan gred perusahaan dengan kediaman data tempatan. Jejak audit penuh dan penyimpanan terenkripsi untuk maklumat kewangan sensitif.',
    'features.intelligence.title': 'Kecerdasan Perniagaan',
    'features.intelligence.description': 'Analitik lanjutan dan ramalan untuk membantu anda membuat keputusan perniagaan yang bermaklumat dan mengoptimumkan kedudukan cukai anda.',
    'features.integration.title': 'Integrasi Lancar',
    'features.integration.description': 'Sambung dengan perisian perakaunan popular dan sistem perbankan. Import transaksi secara automatik dan segerak data dalam masa nyata.',
    'features.alerts.title': 'Amaran & Notifikasi Pintar',
    'features.alerts.description': 'Notifikasi proaktif untuk tarikh akhir yang akan datang, perubahan peraturan, dan isu pematuhan berpotensi sebelum ia menjadi masalah.',
    'features.automation.title': 'Automasi Hujung ke Hujung',
    'features.automation.description': 'Dari kemasukan data hingga penjanaan laporan, automatikkan keseluruhan aliran kerja cukai anda. Jimat masa dan kurangkan kesilapan manusia dengan ketara.',
    'features.compliant.title': 'Patuh Sepenuhnya dengan Peraturan Cukai Malaysia',
    'features.compliant.description': 'AI kami dilatih dengan undang-undang dan peraturan cukai Malaysia terkini, memastikan perniagaan anda kekal patuh dengan keperluan LHDN.',
    
    // Waitlist Section
    'waitlist.title': 'Sertai Senarai Menunggu',
    'waitlist.subtitle': 'Jadilah antara yang pertama mengalami pematuhan cukai berkuasa AI. Dapatkan akses awal dan harga eksklusif apabila kami melancarkan.',
    'waitlist.privacy': 'Dengan menyertai, anda bersetuju untuk menerima kemas kini tentang Ejen Cukai. Kami menghormati privasi anda dan tidak akan menghantar spam.',
    'waitlist.businesses': 'Perniagaan menunggu',
    'waitlist.launch': 'Pelancaran dijangka',
    'waitlist.discount': 'Diskaun awal',
    
    // Footer
    'footer.description': 'Pematuhan cukai berkuasa AI untuk perniagaan dan firma cukai Malaysia. Memudahkan pengurusan cukai dengan automasi pintar.',
    'footer.features': 'Ciri-ciri',
    'footer.company': 'Syarikat',
    'footer.copyright': '© 2025 Ejen Cukai. Hak cipta terpelihara.',
    'footer.madeWith': 'Dibuat dengan ❤️ di Malaysia'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'bm'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};