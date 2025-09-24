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
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="relative container mx-auto px-4">
        <div className="flex gap-8 py-16 lg:py-24 items-center justify-center flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="secondary" size="sm" className="gap-4 shadow-lg">
              {language === 'en' ? "Investment Opportunity" : "Peluang Pelaburan"}
              <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-4 flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-bold">
              <span className="text-blue-900">
                {language === 'en' ? "Tax Technology Platform That's" : "Platform Teknologi Cukai Yang"}
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={`${title}-${language}`}
                    className="absolute font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-600 max-w-3xl text-center">
              {language === 'en'
                ? "Connecting 1.08M Malaysian businesses with tax professionals through AI-powered platforms. Addressing the digitalization gap in Malaysia's growing FinTech ecosystem."
                : "Menghubungkan 1.08 juta perniagaan Malaysia dengan profesional cukai melalui platform berkuasa AI. Menangani jurang digitalisasi dalam ekosistem FinTech Malaysia yang berkembang."
              }
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="gap-4 shadow-lg" onClick={scrollToWaitlist}>
              {language === 'en' ? "Get Investor Deck" : "Dapatkan Dek Pelabur"}
              <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="py-16 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {metric.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Opportunities Section */}
      <div className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? "Why Invest in Ejen Cukai" : "Mengapa Melabur dalam Ejen Cukai"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? "Exceptional opportunity to invest in Malaysia's leading AI-powered tax automation platform"
                : "Peluang luar biasa untuk melabur dalam platform automasi cukai berkuasa AI terkemuka Malaysia"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <opportunity.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-gray-600">{opportunity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-16 bg-white/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? "Growth Roadmap" : "Peta Jalan Pertumbuhan"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? "Our strategic milestones toward becoming Southeast Asia's leading FinTech unicorn"
                : "Pencapaian strategik kami ke arah menjadi unicorn FinTech terkemuka Asia Tenggara"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {milestone.quarter}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-gray-600">
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