import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function MobileApp() {
  const { t } = useLanguage();

  const handleDownloadApp = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=my.ejencukai.receiptscanner&pli=1",
      "_blank"
    );
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end order-2 md:order-1"
          >
            <img
              src="/app.png"
              alt="EjenCukai Mobile App"
              className="w-full max-w-md md:max-w-lg h-auto"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col justify-center order-1 md:order-2"
          >
            {/* NEW Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-2 rounded-full w-fit mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t('mobileApp.badge')}</span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
              {t('mobileApp.title')} <span className="font-medium">{t('mobileApp.ai')}</span>
            </h2>

            {/* Supporting Text */}
            <p className="text-body-lg text-apple-gray-2 mb-8 max-w-md">
              {t('mobileApp.description')}
            </p>

            {/* Download Button with Play Store Logo */}
            <button
              onClick={handleDownloadApp}
              className="group flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-200 w-fit shadow-sm hover:shadow-md"
            >
              <img
                src="/playstore.png"
                alt="Google Play Store"
                className="w-6 h-6"
              />
              <div className="flex flex-col items-start">
                <span className="text-[10px] leading-tight opacity-90">{t('mobileApp.downloadAt')}</span>
                <span className="text-[15px] font-medium leading-tight">{t('mobileApp.playStore')}</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { MobileApp };
