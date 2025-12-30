import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, TrendingUp, DollarSign, Globe, Target, Rocket, PieChart } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "./Navbar";
import { InvestorForm } from "./InvestorForm";
import { Footer } from "./Footer";

function Investors() {
  const { language } = useLanguage();
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => [
      language === 'en' ? "Promising" : "Menjanjikan",
      language === 'en' ? "Scalable" : "Berskala",
      language === 'en' ? "Profitable" : "Menguntungkan",
      language === 'en' ? "Innovative" : "Inovatif",
      language === 'en' ? "Disruptive" : "Mengganggu",
    ],
    [language]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist-section");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const opportunities = [
    {
      icon: TrendingUp,
      title: language === 'en' ? "Growing F&A Market" : "Pasaran F&A Berkembang",
      description: language === 'en'
        ? "Malaysian F&A BPO market at $1.39B (2024) growing 12% CAGR, driven by digitalization and business growth."
        : "Pasaran BPO F&A Malaysia pada $1.39B (2024) berkembang 12% CAGR, didorong oleh digitalisasi dan pertumbuhan perniagaan."
    },
    {
      icon: Target,
      title: language === 'en' ? "Large Underserved Market" : "Pasaran Besar Kurang Dilayani",
      description: language === 'en'
        ? "1.08M businesses (96.1% SMEs) seek tax guidance, but struggle to find and connect with qualified tax professionals."
        : "1.08M perniagaan (96.1% PKS) mencari panduan cukai, tetapi bergelut untuk mencari dan berhubung dengan profesional cukai berkelayakan."
    },
    {
      icon: Rocket,
      title: language === 'en' ? "First-Mover in AI Tax Tools" : "Penggerak Pertama dalam Alat Cukai AI",
      description: language === 'en'
        ? "Early mover in Malaysian AI tax co-pilot and knowledge discovery tools for tax professionals."
        : "Penggerak awal dalam co-pilot cukai AI Malaysia dan alat penemuan pengetahuan untuk profesional cukai."
    },
    {
      icon: Globe,
      title: language === 'en' ? "Regional Expansion Opportunity" : "Peluang Pengembangan Serantau",
      description: language === 'en'
        ? "ASEAN market with similar tax complexity offers expansion potential after establishing Malaysian market presence."
        : "Pasaran ASEAN dengan kerumitan cukai yang serupa menawarkan potensi pengembangan selepas mewujudkan kehadiran pasaran Malaysia."
    },
    {
      icon: DollarSign,
      title: language === 'en' ? "Dual Revenue Streams" : "Aliran Hasil Dwi",
      description: language === 'en'
        ? "Marketplace commissions from business-tax firm connections plus SaaS subscriptions for AI tools."
        : "Komisen marketplace dari sambungan perniagaan-firma cukai tambah langganan SaaS untuk alat AI."
    },
    {
      icon: PieChart,
      title: language === 'en' ? "Pre-Launch Validation" : "Pengesahan Pra-Pelancaran",
      description: language === 'en'
        ? "Strong interest from target market during development phase, preparing for Q4 2025 commercial launch."
        : "Minat yang kuat dari pasaran sasaran semasa fasa pembangunan, bersiap untuk pelancaran komersial S4 2025."
    }
  ];

  const metrics = [
    {
      number: "$1.39B",
      label: language === 'en' ? "TAM - Malaysian F&A Services" : "TAM - Perkhidmatan F&A Malaysia"
    },
    {
      number: "1.08M",
      label: language === 'en' ? "Registered Businesses in Malaysia" : "Perniagaan Berdaftar di Malaysia"
    },
    {
      number: "12%",
      label: language === 'en' ? "Market CAGR (2025-2030)" : "CAGR Pasaran (2025-2030)"
    },
    {
      number: "96.1%",
      label: language === 'en' ? "SMEs of Total Businesses" : "PKS daripada Jumlah Perniagaan"
    }
  ];

  const milestones = [
    {
      quarter: language === 'en' ? "Q4 2025" : "S4 2025",
      title: language === 'en' ? "Platform Launch with AI Co-Pilot" : "Pelancaran Platform dengan Co-Pilot AI",
      description: language === 'en' ? "Launch platform with AI tax co-pilot, connecting businesses with tax professionals" : "Lancar platform dengan co-pilot cukai AI, menghubungkan perniagaan dengan profesional cukai"
    },
    {
      quarter: language === 'en' ? "Q2 2026" : "S2 2026",
      title: language === 'en' ? "Advanced AI Features" : "Ciri AI Lanjutan",
      description: language === 'en' ? "Enhance AI client management, knowledge discovery, and automated workflows" : "Tingkatkan pengurusan klien AI, penemuan pengetahuan, dan aliran kerja automatik"
    },
    {
      quarter: language === 'en' ? "Q4 2026" : "S4 2026",
      title: language === 'en' ? "Market Expansion" : "Pengembangan Pasaran",
      description: language === 'en' ? "Scale to 1000+ businesses and 100+ tax firms on platform" : "Skala kepada 1000+ perniagaan dan 100+ firma cukai di platform"
    },
    {
      quarter: language === 'en' ? "Q2 2027" : "S2 2027",
      title: language === 'en' ? "Series A Funding" : "Pembiayaan Siri A",
      description: language === 'en' ? "Raise Series A to accelerate growth and regional expansion" : "Kumpul Siri A untuk mempercepatkan pertumbuhan dan pengembangan serantau"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative container mx-auto px-6">
        <div className="flex gap-10 py-32 md:py-40 items-center justify-center flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-apple-gray-5 rounded-apple-button">
              <span className="text-[13px] font-medium text-apple-gray-1">
                {language === 'en' ? "Investment Opportunity" : "Peluang Pelaburan"}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-6 flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-hero-lg lg:text-hero-xl max-w-4xl text-center font-light text-apple-gray-1">
              {language === 'en' ? "Tax Technology Platform That's Promising" : "Platform Teknologi Cukai Yang Menjanjikan"}
            </h1>

            <p className="text-body-lg md:text-xl text-apple-gray-2 max-w-2xl text-center mx-auto">
              {language === 'en'
                ? "Connecting 1.08M Malaysian businesses with tax professionals through AI-powered platforms."
                : "Menghubungkan 1.08 juta perniagaan Malaysia dengan profesional cukai melalui platform berkuasa AI."
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <button
              className="px-6 py-3 text-[17px] font-medium text-white bg-apple-blue hover:opacity-90 rounded-apple-button transition-opacity duration-200"
              onClick={scrollToWaitlist}
            >
              {language === 'en' ? "Get Investor Deck" : "Dapatkan Dek Pelabur"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="py-20 bg-apple-gray-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-12 md:gap-16 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center flex-shrink-0"
              >
                <div className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-1">
                  {metric.number}
                </div>
                <div className="text-[13px] text-apple-gray-2 max-w-[200px]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Opportunities Section */}
      <div className="py-32 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
              {language === 'en' ? "Why Invest" : "Mengapa Melabur"}
            </h2>
            <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
              {language === 'en'
                ? "Exceptional opportunity in Malaysia's AI-powered tax automation platform."
                : "Peluang luar biasa dalam platform automasi cukai berkuasa AI Malaysia."
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-apple p-10 border border-apple-gray-4/50"
              >
                <opportunity.icon className="w-6 h-6 text-apple-gray-2 mb-6" />
                <h3 className="text-xl font-medium text-apple-gray-1 mb-3">{opportunity.title}</h3>
                <p className="text-[15px] text-apple-gray-2 leading-relaxed">{opportunity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-32 md:py-40 bg-apple-gray-6">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
              {language === 'en' ? "Growth Roadmap" : "Peta Jalan Pertumbuhan"}
            </h2>
            <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
              {language === 'en'
                ? "Strategic milestones toward becoming Southeast Asia's leading FinTech."
                : "Pencapaian strategik ke arah menjadi FinTech terkemuka Asia Tenggara."
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-apple p-8 border border-apple-gray-4/50"
              >
                <div className="text-[13px] font-medium text-apple-blue mb-3">
                  {milestone.quarter}
                </div>
                <h3 className="text-lg font-medium text-apple-gray-1 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-[15px] text-apple-gray-2 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <InvestorForm />
      <Footer />
    </div>
  );
}

export { Investors };