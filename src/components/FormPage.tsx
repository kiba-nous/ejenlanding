import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

function FormPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t("form.title")}
              </h1>
              <p className="text-xl text-gray-600">
                {t("form.subtitle")}
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center text-gray-500">
                {/* Placeholder for Tally form embed */}
                <p className="mb-4">{t("form.placeholder")}</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-16">
                  <p className="text-sm text-gray-400">
                    {t("form.embedInstructions")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export { FormPage };
