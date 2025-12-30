import { motion } from "framer-motion";
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t("services.accounting.title"),
      description: t("services.accounting.description"),
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: t("services.taxComputation.title"),
      description: t("services.taxComputation.description"),
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: t("services.audit.title"),
      description: t("services.audit.description"),
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: t("services.advisory.title"),
      description: t("services.advisory.description"),
    },
  ];

  return (
    <section className="py-32 md:py-40 bg-apple-gray-6">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ServiceCard = ({
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
      className="bg-white rounded-apple p-10 border border-apple-gray-4/50"
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
      <p className="text-[15px] text-apple-gray-2 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export { Services };
