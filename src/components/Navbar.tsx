import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

function Navbar({ currentSection, onSectionChange }: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: language === 'en' ? 'Home' : 'Laman Utama', path: '/' },
    { id: 'business', label: language === 'en' ? 'Business' : 'Perniagaan', path: '/business' },
    { id: 'tax-firms', label: language === 'en' ? 'Tax Firms' : 'Firma Cukai', path: '/tax-firms' },
    { id: 'investors', label: language === 'en' ? 'Investors' : 'Pelabur', path: '/investors' }
  ];

  const getCurrentSection = () => {
    const currentPath = location.pathname;
    const section = sections.find(s => s.path === currentPath);
    return section ? section.id : 'home';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-gray-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-11 md:h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity duration-200 hover:opacity-70">
            <img src="/logo.png" alt="Ejen Cukai" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-8">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={section.path}
                  className={`text-[15px] font-normal transition-colors duration-200 ${
                    getCurrentSection() === section.id
                      ? 'text-apple-gray-1'
                      : 'text-apple-gray-2 hover:text-apple-gray-1'
                  }`}
                >
                  {section.label}
                </Link>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-apple-gray-5 rounded-apple-sm p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 text-[13px] font-medium rounded-apple-sm transition-all duration-150 ${
                  language === "en"
                    ? "bg-white text-apple-gray-1 shadow-sm"
                    : "text-apple-gray-2 hover:text-apple-gray-1"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("bm")}
                className={`px-2.5 py-1 text-[13px] font-medium rounded-apple-sm transition-all duration-150 ${
                  language === "bm"
                    ? "bg-white text-apple-gray-1 shadow-sm"
                    : "text-apple-gray-2 hover:text-apple-gray-1"
                }`}
              >
                BM
              </button>
            </div>

            {/* CTA Button */}
            <Link to="/form">
              <button className="px-4 py-1.5 text-[15px] font-medium text-white bg-apple-blue hover:opacity-90 rounded-apple-button transition-opacity duration-200">
                {language === 'en' ? 'Book Consultation' : 'Tempah Konsultasi'}
              </button>
            </Link>
          </div>

          {/* Mobile: Language Toggle & Menu button */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1 bg-apple-gray-5 rounded-apple-sm p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 text-[11px] font-medium rounded-apple-sm transition-all duration-150 ${
                  language === "en"
                    ? "bg-white text-apple-gray-1"
                    : "text-apple-gray-2"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("bm")}
                className={`px-2 py-0.5 text-[11px] font-medium rounded-apple-sm transition-all duration-150 ${
                  language === "bm"
                    ? "bg-white text-apple-gray-1"
                    : "text-apple-gray-2"
                }`}
              >
                BM
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-apple-gray-2 hover:text-apple-gray-1 transition-colors duration-150 p-1"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-apple-gray-4"
          >
            <div className="py-4 space-y-1">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={section.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 text-[15px] font-normal transition-colors duration-150 ${
                    getCurrentSection() === section.id
                      ? 'text-apple-blue bg-apple-gray-5'
                      : 'text-apple-gray-1 hover:bg-apple-gray-5'
                  }`}
                >
                  {section.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <Link to="/form" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full mt-3 mx-4 px-4 py-2.5 text-[15px] font-medium text-white bg-apple-blue hover:opacity-90 rounded-apple-sm transition-opacity duration-200">
                  {language === 'en' ? 'Book Consultation' : 'Tempah Konsultasi'}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export { Navbar };