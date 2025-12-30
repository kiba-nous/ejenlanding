import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Bot, Users, Search, Zap, Calendar, Database } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "./Navbar";
import { WaitlistForm } from "./WaitlistForm";
import { Footer } from "./Footer";

function TaxFirms() {
  const { language } = useLanguage();
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => [
      language === 'en' ? "Powerful" : "Berkuasa",
      language === 'en' ? "Intelligent" : "Bijak",
      language === 'en' ? "Efficient" : "Cekap",
      language === 'en' ? "Advanced" : "Canggih",
      language === 'en' ? "Automated" : "Automatik",
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

  const features = [
    {
      icon: Bot,
      title: language === 'en' ? "AI Tax Co-Pilot" : "Co-Pilot Cukai AI",
      description: language === 'en'
        ? "Your intelligent tax assistant that helps with complex calculations, compliance checks, and provides real-time tax guidance."
        : "Pembantu cukai bijak anda yang membantu dengan pengiraan kompleks, semakan pematuhan, dan memberikan panduan cukai masa nyata."
    },
    {
      icon: Users,
      title: language === 'en' ? "AI Client Management" : "Pengurusan Klien AI",
      description: language === 'en'
        ? "Smart client management system with AI-powered insights, automated follow-ups, and personalized client communication."
        : "Sistem pengurusan klien pintar dengan wawasan berkuasa AI, susulan automatik, dan komunikasi klien yang diperibadikan."
    },
    {
      icon: Search,
      title: language === 'en' ? "Real-Time Knowledge Discovery" : "Penemuan Pengetahuan Masa Nyata",
      description: language === 'en'
        ? "Access up-to-date tax information, regulations, and best practices with intelligent search and discovery tools."
        : "Akses maklumat cukai terkini, peraturan, dan amalan terbaik dengan alat carian dan penemuan yang bijak."
    },
    {
      icon: Zap,
      title: language === 'en' ? "Automated Workflows" : "Aliran Kerja Automatik",
      description: language === 'en'
        ? "Streamline your tax processes with AI-powered automation for document processing, client onboarding, and task management."
        : "Permudahkan proses cukai anda dengan automasi berkuasa AI untuk pemprosesan dokumen, penyertaan klien, dan pengurusan tugas."
    },
    {
      icon: Database,
      title: language === 'en' ? "Smart Document Library" : "Perpustakaan Dokumen Pintar",
      description: language === 'en'
        ? "Organize and retrieve tax documents, forms, and client files with AI-powered categorization and search capabilities."
        : "Atur dan dapatkan kembali dokumen cukai, borang, dan fail klien dengan pengkategorian dan keupayaan carian berkuasa AI."
    },
    {
      icon: Calendar,
      title: language === 'en' ? "Intelligent Scheduling" : "Penjadualan Bijak",
      description: language === 'en'
        ? "AI-optimized appointment scheduling that considers client preferences, deadlines, and your availability patterns."
        : "Penjadualan janji temu dioptimumkan AI yang mengambil kira keutamaan klien, tarikh akhir, dan corak ketersediaan anda."
    }
  ];

  const stats = [
    {
      number: "500+",
      label: language === 'en' ? "Tax Firms Using AI Tools" : "Firma Cukai Menggunakan Alat AI"
    },
    {
      number: "95%",
      label: language === 'en' ? "Time Saved on Routine Tasks" : "Masa Dijimatkan untuk Tugas Rutin"
    },
    {
      number: "99.9%",
      label: language === 'en' ? "AI Accuracy Rate" : "Kadar Ketepatan AI"
    },
    {
      number: "24/7",
      label: language === 'en' ? "AI Assistant Availability" : "Ketersediaan Pembantu AI"
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
                {language === 'en' ? "For Tax Professionals" : "Untuk Profesional Cukai"}
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
              {language === 'en' ? "AI Tax Tools Made Powerful" : "Alat Cukai AI Dibuat Berkuasa"}
            </h1>

            <p className="text-body-lg md:text-xl text-apple-gray-2 max-w-2xl text-center mx-auto">
              {language === 'en'
                ? "AI-powered tools for tax professionals. From co-pilot assistance to client management."
                : "Alat berkuasa AI untuk profesional cukai. Dari bantuan co-pilot hingga pengurusan klien."
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
              onClick={() => window.open("https://agent.ejencukai.my", "_blank")}
            >
              {language === 'en' ? "Try Version 1.0" : "Cuba Versi 1.0"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-apple-gray-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-1">
                  {stat.number}
                </div>
                <div className="text-[15px] text-apple-gray-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
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
              {language === 'en' ? "AI-Powered Tools" : "Alat Berkuasa AI"}
            </h2>
            <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
              {language === 'en'
                ? "Advanced tools designed to enhance productivity, accuracy, and client service."
                : "Alat canggih yang direka untuk meningkatkan produktiviti, ketepatan, dan perkhidmatan klien."
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-apple p-10 border border-apple-gray-4/50"
              >
                <feature.icon className="w-6 h-6 text-apple-gray-2 mb-6" />
                <h3 className="text-xl font-medium text-apple-gray-1 mb-3">{feature.title}</h3>
                <p className="text-[15px] text-apple-gray-2 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <WaitlistForm />
      <Footer />
    </div>
  );
}

export { TaxFirms };