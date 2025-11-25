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
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </motion.div>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Icon */}
      <div className="mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export { Services };
