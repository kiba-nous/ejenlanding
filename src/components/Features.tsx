import { motion } from "framer-motion";
import { 
  Calculator, 
  FileText, 
  Clock, 
  Shield, 
  BarChart3, 
  Users, 
  Zap, 
  CheckCircle,
  TrendingUp,
  Database,
  Building2,
  AlertTriangle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: t('features.gst.title'),
      description: t('features.gst.description')
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: t('features.income.title'),
      description: t('features.income.description')
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('features.monitoring.title'),
      description: t('features.monitoring.description')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('features.compliance.title'),
      description: t('features.compliance.description')
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('features.multiuser.title'),
      description: t('features.multiuser.description')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('features.ai.title'),
      description: t('features.ai.description')
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('features.intelligence.title'),
      description: t('features.intelligence.description')
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: t('features.integration.title'),
      description: t('features.integration.description')
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: t('features.alerts.title'),
      description: t('features.alerts.description')
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t('features.automation.title'),
      description: t('features.automation.description')
    }
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
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto"
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
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('features.compliant.title')}
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('features.compliant.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-white px-4 py-2 rounded-full">Income Tax Act 1967</span>
              <span className="bg-white px-4 py-2 rounded-full">SST Act 2018</span>
              <span className="bg-white px-4 py-2 rounded-full">LHDN Guidelines</span>
            </div>
          </div>
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
    let classes = "flex flex-col lg:border-r py-10 relative group/feature border-gray-200";
    
    // Add left border for first column items
    if (index % 4 === 0) {
      classes += " lg:border-l";
    }
    
    // Add bottom border for top two rows (first 8 items)
    if (index < 8) {
      classes += " lg:border-b";
    }
    
    return classes;
  };

  return (
    <div className={getBorderClasses(index)}>
      {/* Hover gradient effect for top row */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50 to-transparent pointer-events-none" />
      )}
      {/* Hover gradient effect for middle row */}
      {index >= 4 && index < 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      )}
      {/* Hover gradient effect for bottom row */}
      {index >= 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-green-50 to-transparent pointer-events-none" />
      )}
      
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