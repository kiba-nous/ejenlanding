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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("features.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 relative z-10 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="gap-4 shadow-lg"
            onClick={openConsultationForm}
          >
            {t("features.cta")} <MoveRight className="w-4 h-4" />
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
  const getBorderClasses = (index: number) => {
    let classes =
      "flex flex-col lg:border-r py-10 relative group/feature border-gray-200";

    // Add left border for first column
    if (index === 0) {
      classes += " lg:border-l";
    }

    return classes;
  };

  return (
    <div className={getBorderClasses(index)}>
      {/* Hover gradient effect */}
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className="mb-4 relative z-10 px-10 text-gray-600">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-blue-600 group-hover/feature:scale-110 transition-transform duration-200">
          {icon}
        </div>
      </div>

      {/* Title */}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-gradient-to-b group-hover/feature:from-blue-500 group-hover/feature:to-green-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-800">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 max-w-xs relative z-10 px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export { Features };
