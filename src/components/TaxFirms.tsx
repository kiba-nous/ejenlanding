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
              {language === 'en' ? "For Tax Professionals" : "Untuk Profesional Cukai"}
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
                {language === 'en' ? "AI Tax Tools Made" : "Alat Cukai AI Dibuat"}
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
                ? "Enhance your tax practice with AI-powered tools. From tax co-pilot assistance to client management and real-time knowledge discovery - everything you need in one platform."
                : "Tingkatkan amalan cukai anda dengan alat berkuasa AI. Dari bantuan co-pilot cukai hingga pengurusan klien dan penemuan pengetahuan masa nyata - segala yang anda perlukan dalam satu platform."
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
              {language === 'en' ? "Get AI Tax Tools" : "Dapatkan Alat Cukai AI"}
              <MoveRight className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4" variant="outline">
              {language === 'en' ? "See Demo" : "Lihat Demo"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? "AI-Powered Tools for Tax Professionals" : "Alat Berkuasa AI untuk Profesional Cukai"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? "Advanced AI tools designed to enhance productivity, accuracy, and client service for tax firms"
                : "Alat AI canggih yang direka untuk meningkatkan produktiviti, ketepatan, dan perkhidmatan klien untuk firma cukai"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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