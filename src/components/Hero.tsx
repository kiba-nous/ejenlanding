import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { getDeadlineNotice } from "../config/site";
import { trackEvent } from "../utils/analytics";

function Hero() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const openConsultationForm = () => {
    trackEvent("hero_cta_click", { cta: "consultation" });
    navigate("/form");
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Subtle gradient background - Apple style */}
      <div className="absolute inset-0 bg-gradient-to-b from-apple-gray-6 via-white to-white"></div>

      <div className="relative container mx-auto px-6 py-32 md:py-40 lg:py-48">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-hero-lg lg:text-hero-xl font-light text-apple-gray-1">
              {t("hero.title")}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-body-lg md:text-xl text-apple-gray-2 mb-12 max-w-2xl"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* One primary, one secondary. A third equal-weight button was
                splitting attention — "Tanya AI" now sits below as a text link. */}
            <Button
              size="lg"
              className="gap-2 transition-all duration-200 ease-out text-[17px] font-medium px-8 py-3 bg-apple-blue hover:opacity-90 rounded-apple-button shadow-sm hover:shadow-md"
              onClick={openConsultationForm}
            >
              {t("hero.bookConsultation")} <MoveRight className="w-5 h-5" />
            </Button>
            <Link to="/ebook" onClick={() => trackEvent("hero_cta_click", { cta: "ebook" })}>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 transition-all duration-200 ease-out text-[17px] font-medium px-8 py-3 rounded-apple-button shadow-sm hover:shadow-md border-apple-gray-4 text-apple-gray-1 hover:border-apple-gray-1"
              >
                {t("hero.buyEbook")}
              </Button>
            </Link>
          </motion.div>

          {/* Seasonal urgency — switches to a planning message outside filing
              season so this slot never advertises a date that has passed. */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[15px] text-apple-gray-2 mb-12"
          >
            {getDeadlineNotice(language)}
          </motion.p>

          {/* Trust Indicators - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8"
          >
            <span className="text-sm text-apple-gray-3 font-normal">
              {language === "bm" ? "Ejen cukai berdaftar LHDN" : "LHDN-registered tax agent"}
            </span>
            <span className="text-sm text-apple-gray-3 font-normal">
              {language === "bm" ? "30+ tahun pengalaman" : "30+ years experience"}
            </span>
            <span className="text-sm text-apple-gray-3 font-normal">
              {language === "bm" ? "Balas dalam 24 jam" : "Reply within 24 hours"}
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => {
              trackEvent("hero_cta_click", { cta: "ask_ai" });
              window.open("https://ai.ejencukai.my", "_blank", "noopener");
            }}
            className="text-[15px] text-apple-blue hover:opacity-70 transition-opacity duration-150"
          >
            {t("hero.askAI")} →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export { Hero };
