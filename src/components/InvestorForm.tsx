import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function InvestorForm() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add global CSS to hide Tally branding
    const style = document.createElement('style');
    style.id = 'tally-branding-remover';
    style.textContent = `
      /* Hide Tally branding more aggressively */
      iframe[src*="tally.so"] + * {
        display: none !important;
      }

      /* Target the branding container */
      .tally-embed-wrapper .tally-branding,
      [data-tally-branding],
      div[style*="font-size: 11px"],
      div[style*="Made with Tally"],
      a[href="https://tally.so"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        overflow: hidden !important;
      }

      /* Hide parent containers of branding */
      .tally-embed-wrapper div:last-child {
        display: none !important;
      }

      /* Additional targeting */
      iframe[src*="tally.so"] {
        margin-bottom: -30px !important;
      }
    `;

    // Remove any existing style with the same ID
    const existingStyle = document.getElementById('tally-branding-remover');
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('tally-branding-remover');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <section id="waitlist-section" className="py-24 bg-gradient-to-br from-blue-50 to-green-50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? "Interested in Investing?" : "Berminat untuk Melabur?"}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'en'
              ? "Connect with us to learn more about investment opportunities and access our investor deck."
              : "Berhubung dengan kami untuk mengetahui lebih lanjut tentang peluang pelaburan dan mengakses dek pelabur kami."
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
          style={{ position: 'relative', zIndex: 50 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 relative z-10">
            {!isLoaded && (
              <div className="flex items-center justify-center h-80">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading form...</span>
              </div>
            )}
            <div style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              minHeight: '420px'
            }}>
              <iframe
                src="https://tally.so/embed/3q6YNG?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="I'm interested to invest."
                style={{
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 20,
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  display: 'block',
                  width: '100%',
                  height: '420px', // Adjusted height to fit the form content better
                  border: 'none'
                }}
                onLoad={() => {
                  setTimeout(() => {
                    setIsLoaded(true);
                  }, 500);
                }}
              />
              {/* Cover the bottom area where branding appears */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40px',
                backgroundColor: 'white',
                zIndex: 25
              }}></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            {language === 'en'
              ? "By submitting your interest, you agree to receive investment-related communications from Ejen Cukai."
              : "Dengan menyerahkan minat anda, anda bersetuju untuk menerima komunikasi berkaitan pelaburan daripada Ejen Cukai."
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export { InvestorForm };