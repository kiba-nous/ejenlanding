import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function WaitlistForm() {
  const { t } = useLanguage();

  useEffect(() => {
    // Tally embed script - exactly as provided
    const d = document;
    const w = "https://tally.so/widgets/embed.js";
    const v = function() {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      } else {
        d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e) {
          e.src = e.dataset.tallySrc;
        });
      }
    };

    if (typeof window.Tally !== "undefined") {
      v();
    } else if (d.querySelector('script[src="' + w + '"]') === null) {
      const s = d.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      d.body.appendChild(s);
    }
  }, []);

  return (
    <section id="waitlist-section" className="py-24 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('waitlist.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('waitlist.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Tally Form Embed - using exact embed code provided */}
            <iframe
              data-tally-src="https://tally.so/embed/mVa8Qy?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="387"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Join the waitlist"
              className="rounded-lg"
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {t('waitlist.privacy')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">{t('waitlist.businesses')}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">Q3 2025</div>
                <div className="text-gray-600">{t('waitlist.launch')}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
                <div className="text-gray-600">{t('waitlist.discount')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { WaitlistForm };