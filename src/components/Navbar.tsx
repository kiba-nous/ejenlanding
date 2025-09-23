import React from 'react';
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
          <div className="flex items-center">
            <img src="/logo.png" alt="Ejen Cukai" className="h-20 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
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
          </div>

          {/* Language Toggle */}
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };