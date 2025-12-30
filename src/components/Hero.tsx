import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const openConsultationForm = () => {
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

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mb-20"
          >
            <Button
              size="lg"
              className="gap-2 transition-all duration-200 ease-out text-[17px] font-medium px-8 py-3 bg-apple-blue hover:opacity-90 rounded-apple-button shadow-sm hover:shadow-md"
              onClick={openConsultationForm}
            >
              {t("hero.bookConsultation")} <MoveRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Trust Indicators - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            <span className="text-sm text-apple-gray-3 font-normal">LHDN Registered</span>
            <span className="text-sm text-apple-gray-3 font-normal">30+ Years Experience</span>
            <span className="text-sm text-apple-gray-3 font-normal">100% Compliant</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
