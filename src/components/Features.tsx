import { motion } from "framer-motion";
import {
  Award,
  Zap,
  TrendingUp,
  MoveRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

function Features() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const openConsultationForm = () => {
    navigate("/form");
  };

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: t("features.experienced.title"),
      description: t("features.experienced.description"),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t("features.efficient.title"),
      description: t("features.efficient.description"),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t("features.bestDeals.title"),
      description: t("features.bestDeals.description"),
    },
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
            {t("features.title")}
          </h2>
          <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto mb-20">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="gap-2 px-8 py-3 text-[17px] font-medium bg-apple-blue hover:opacity-90 rounded-apple-button shadow-sm transition-opacity duration-200"
            onClick={openConsultationForm}
          >
            {t("features.cta")} <MoveRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      {/* Icon */}
      <div className="mb-6 text-apple-gray-2">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-medium text-apple-gray-1 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[15px] text-apple-gray-2 max-w-xs leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export { Features };
