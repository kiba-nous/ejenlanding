import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

function PricingTiers() {
  const { language } = useLanguage();

  const individualServices = [
    {
      titleEn: "Individual Income Tax Filing",
      titleBm: "Penyediaan Cukai Pendapatan Individu",
      price: "RM500",
      descriptionEn: "Calculate, review, and submit individual tax returns for salary, business, or freelance income.",
      descriptionBm: "Mengira, menyemak, dan mengemukakan penyata cukai individu untuk pendapatan gaji, perniagaan, atau bebas."
    },
    {
      titleEn: "Individual Tax Planning",
      titleBm: "Perancangan Cukai Individu",
      price: "RM500",
      descriptionEn: "Plan your tax legally to reduce future tax exposure.",
      descriptionBm: "Merancang cukai anda secara sah untuk mengurangkan pendedahan cukai masa hadapan."
    },
    {
      titleEn: "Individual Tax Refund Application",
      titleBm: "Permohonan Pulangan Cukai Individu",
      price: "RM200",
      descriptionEn: "Assist in applying for tax refunds due to overpaid tax or missed claims.",
      descriptionBm: "Membantu memohon bayaran balik cukai akibat terlebih bayar atau tuntutan yang terlepas."
    },
    {
      titleEn: "CP500 Appeal & Review",
      titleBm: "Rayuan & Semakan CP500",
      price: "RM800",
      descriptionEn: "Review and appeal estimated tax instalments with LHDN.",
      descriptionBm: "Menyemak dan merayu ansuran cukai anggaran dengan LHDN."
    }
  ];

  const businessServices = [
    {
      titleEn: "Corporate Income Tax Filing",
      titleBm: "Penyediaan Cukai Pendapatan Syarikat",
      price: "RM1,800",
      descriptionEn: "Prepare and submit corporate income tax returns accurately and compliantly.",
      descriptionBm: "Menyediakan dan mengemukakan penyata cukai pendapatan syarikat dengan tepat dan mematuhi peraturan."
    },
    {
      titleEn: "Corporate Tax Planning",
      titleBm: "Perancangan Cukai Syarikat",
      price: "RM1,000",
      descriptionEn: "Structure business tax efficiently and reduce risks.",
      descriptionBm: "Menyusun cukai perniagaan dengan cekap dan mengurangkan risiko."
    },
    {
      titleEn: "Tax Advisory (Case-Based)",
      titleBm: "Nasihat Cukai (Ikut Kes)",
      price: "RM800",
      descriptionEn: "Provide professional advice for specific or complex tax issues.",
      descriptionBm: "Memberikan nasihat profesional untuk isu cukai khusus atau kompleks."
    },
    {
      titleEn: "Tax Audit & Investigation Support",
      titleBm: "Sokongan Audit & Siasatan Cukai",
      price: "RM2,000",
      descriptionEn: "Assist and represent clients during tax audits or investigations.",
      descriptionBm: "Membantu dan mewakili klien semasa audit atau siasatan cukai."
    },
    {
      titleEn: "E-Invoicing Setup (LHDN Portal)",
      titleBm: "Penyediaan E-Invois (Portal LHDN)",
      price: "RM800",
      descriptionEn: "Set up and guide businesses on e-Invoicing compliance.",
      descriptionBm: "Menyediakan dan membimbing perniagaan mengenai pematuhan e-Invois."
    },
    {
      titleEn: "Withholding Tax Services",
      titleBm: "Urusan Cukai Pegangan",
      price: "RM300",
      descriptionEn: "Calculate, submit, and manage withholding tax obligations.",
      descriptionBm: "Mengira, mengemukakan, dan menguruskan kewajipan cukai pegangan."
    },
    {
      titleEn: "Stamp Duty Services",
      titleBm: "Urusan Duti Setem",
      price: "RM200",
      descriptionEn: "Handle stamping of agreements and documents.",
      descriptionBm: "Menguruskan setem perjanjian dan dokumen."
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        {/* Individual Tax Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
              {language === 'en' ? "Individual Tax Services" : "Perkhidmatan Cukai Individu"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {individualServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-apple p-8 border border-apple-gray-4/50"
              >
                <h3 className="text-xl font-medium text-apple-gray-1 mb-3">
                  {language === 'en' ? service.titleEn : service.titleBm}
                </h3>
                <div className="mb-4">
                  <span className="text-[15px] text-apple-gray-3 mr-2">
                    {language === 'en' ? "Starting from" : "Bermula dari"}
                  </span>
                  <span className="text-3xl font-light text-apple-gray-1">
                    {service.price}
                  </span>
                </div>
                <p className="text-[15px] text-apple-gray-2 leading-relaxed">
                  {language === 'en' ? service.descriptionEn : service.descriptionBm}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business & Corporate Tax Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
              {language === 'en' ? "Business & Corporate Tax Services" : "Perkhidmatan Cukai Bisnes & Syarikat"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
            {businessServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-apple p-8 border border-apple-gray-4/50"
              >
                <h3 className="text-xl font-medium text-apple-gray-1 mb-3">
                  {language === 'en' ? service.titleEn : service.titleBm}
                </h3>
                <div className="mb-4">
                  <span className="text-[15px] text-apple-gray-3 mr-2">
                    {language === 'en' ? "Starting from" : "Bermula dari"}
                  </span>
                  <span className="text-3xl font-light text-apple-gray-1">
                    {service.price}
                  </span>
                </div>
                <p className="text-[15px] text-apple-gray-2 leading-relaxed">
                  {language === 'en' ? service.descriptionEn : service.descriptionBm}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-[13px] text-apple-gray-3 leading-relaxed">
              {language === 'en'
                ? "All fees shown are starting fees. Final charges depend on case complexity and will be agreed before proceeding."
                : "Semua yuran yang dipaparkan adalah yuran permulaan. Caj akhir tertakluk kepada kompleksiti kes dan akan dipersetujui sebelum diteruskan."
              }
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { PricingTiers };
