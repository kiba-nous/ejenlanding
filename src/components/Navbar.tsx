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
    // { id: 'about', label: language === 'en' ? 'About Us' : 'Tentang Kami', path: '/about' }
  ];

  const getCurrentSection = () => {
    const currentPath = location.pathname;
    const section = sections.find(s => s.path === currentPath);
    return section ? section.id : 'home';
  };

  return (
    <nav className="relative z-50 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <img src="/logo.png" alt="Ejen Cukai" className="h-20 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-8">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={section.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    getCurrentSection() === section.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {section.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link to="/form">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-md transition-all duration-200"
              >
                {language === 'en' ? 'Book Consultation' : 'Tempah Konsultasi'}
              </motion.button>
            </Link>
          </div>

          {/* Language Toggle */}
          <div className="hidden md:block bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
            <div className="flex items-center">
              <motion.button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  language === "en"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EN
              </motion.button>
              <motion.button
                onClick={() => setLanguage("bm")}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  language === "bm"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BM
              </motion.button>
            </div>
          </div>

          {/* Mobile: Language Toggle & Menu button */}
          <div className="md:hidden flex items-center gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
              <div className="flex items-center">
                <motion.button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === "en"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EN
                </motion.button>
                <motion.button
                  onClick={() => setLanguage("bm")}
                  className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === "bm"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BM
                </motion.button>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-3 space-y-2">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={section.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    getCurrentSection() === section.id
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {section.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <Link to="/form" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full mt-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md transition-all duration-200">
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