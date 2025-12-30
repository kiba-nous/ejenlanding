import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function WaitlistForm() {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add global CSS to hide Tally branding
    const style = document.createElement('style');
    style.id = 'tally-branding-remover-waitlist';
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
    const existingStyle = document.getElementById('tally-branding-remover-waitlist');
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('tally-branding-remover-waitlist');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <section id="waitlist-section" className="py-32 md:py-40 bg-white relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
            {t('waitlist.title')}
          </h2>
          <p className="text-body-lg text-apple-gray-2">
            {t('waitlist.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto mb-20"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="bg-white rounded-apple p-10 border border-apple-gray-4 relative z-10">
            {/* Tally Form Embed */}
            {!isLoaded && (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
                <span className="ml-3 text-[15px] text-apple-gray-2">Loading form...</span>
              </div>
            )}
            <div style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              minHeight: '450px'
            }}>
              <iframe
                src="https://tally.so/embed/mVa8Qy?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Join the waitlist"
                className="rounded-lg"
                style={{
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 20,
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  display: 'block',
                  width: '100%',
                  height: '700px',
                  border: 'none'
                }}
                onLoad={() => {
                  setTimeout(() => {
                    setIsLoaded(true);
                  }, 500);
                }}
              />
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

            <div className="mt-6 text-center">
              <p className="text-[13px] text-apple-gray-3">
                {t('waitlist.privacy')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-light text-apple-gray-1 mb-1">500+</div>
              <div className="text-[15px] text-apple-gray-2">{t('waitlist.businesses')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-apple-gray-1 mb-1">Q3 2025</div>
              <div className="text-[15px] text-apple-gray-2">{t('waitlist.launch')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-apple-gray-1 mb-1">50%</div>
              <div className="text-[15px] text-apple-gray-2">{t('waitlist.discount')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { WaitlistForm };