import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

function FormPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-32 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
                {t("form.title")}
              </h1>
              <p className="text-body-lg text-apple-gray-2">
                {t("form.subtitle")}
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-apple border border-apple-gray-4 p-6 md:p-10">
              {/* Tally Form Embed */}
              <iframe
                data-tally-src="https://tally.so/embed/dWbqvd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="694"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Client form"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export { FormPage };
