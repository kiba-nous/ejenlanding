import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Headphones, Search, UserCheck, BookOpen, Clock, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "./Navbar";
import { WaitlistForm } from "./WaitlistForm";
import { Footer } from "./Footer";

function Business() {
  const { language } = useLanguage();
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => [
      language === 'en' ? "Simple" : "Mudah",
      language === 'en' ? "Accessible" : "Boleh Dicapai",
      language === 'en' ? "Reliable" : "Boleh Dipercayai",
      language === 'en' ? "Professional" : "Profesional",
      language === 'en' ? "Efficient" : "Cekap",
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
      icon: Headphones,
      title: language === 'en' ? "Tax Help Desk" : "Meja Bantuan Cukai",
      description: language === 'en'
        ? "Get instant support and guidance on Malaysian tax matters from our expert help desk available 24/7."
        : "Dapatkan sokongan dan panduan segera mengenai perkara cukai Malaysia dari meja bantuan pakar kami yang tersedia 24/7."
    },
    {
      icon: Search,
      title: language === 'en' ? "Knowledge Discovery" : "Penemuan Pengetahuan",
      description: language === 'en'
        ? "Access comprehensive tax information, guides, and resources tailored to your business needs and industry."
        : "Akses maklumat cukai yang menyeluruh, panduan, dan sumber yang disesuaikan dengan keperluan perniagaan dan industri anda."
    },
    {
      icon: UserCheck,
      title: language === 'en' ? "Tax Agent Matching" : "Pemadanan Ejen Cukai",
      description: language === 'en'
        ? "Connect with qualified tax agents and firms that specialize in your business type and requirements."
        : "Berhubung dengan ejen cukai dan firma berkelayakan yang pakar dalam jenis perniagaan dan keperluan anda."
    },
    {
      icon: BookOpen,
      title: language === 'en' ? "Tax Resources Library" : "Perpustakaan Sumber Cukai",
      description: language === 'en'
        ? "Browse our extensive library of tax forms, templates, and educational materials for Malaysian businesses."
        : "Layari perpustakaan luas kami yang mengandungi borang cukai, templat, dan bahan pendidikan untuk perniagaan Malaysia."
    },
    {
      icon: Clock,
      title: language === 'en' ? "Appointment Booking" : "Tempahan Janji Temu",
      description: language === 'en'
        ? "Easily schedule consultations with tax professionals through our integrated booking system."
        : "Mudah jadualkan perundingan dengan profesional cukai melalui sistem tempahan bersepadu kami."
    },
    {
      icon: Users,
      title: language === 'en' ? "Expert Network" : "Rangkaian Pakar",
      description: language === 'en'
        ? "Access our curated network of certified tax professionals and accounting firms across Malaysia."
        : "Akses rangkaian terpilih kami yang terdiri daripada profesional cukai bertauliah dan firma perakaunan di seluruh Malaysia."
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
                {language === 'en' ? "For Malaysian Businesses" : "Untuk Perniagaan Malaysia"}
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
              {language === 'en' ? "Tax Support Made Simple" : "Sokongan Cukai Dibuat Mudah"}
            </h1>

            <p className="text-body-lg md:text-xl text-apple-gray-2 max-w-2xl text-center mx-auto">
              {language === 'en'
                ? "Expert tax guidance, knowledge resources, and qualified professionals for your Malaysian business."
                : "Panduan cukai pakar, sumber pengetahuan, dan profesional berkelayakan untuk perniagaan Malaysia anda."
              }
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <button
              className="px-6 py-3 text-[17px] font-medium text-white bg-apple-blue hover:opacity-90 rounded-apple-button transition-opacity duration-200"
              onClick={scrollToWaitlist}
            >
              {language === 'en' ? "Join Waitlist" : "Sertai Senarai Menunggu"}
            </button>
            <button
              className="px-6 py-3 text-[17px] font-medium text-apple-gray-1 bg-white border border-apple-gray-4 hover:bg-apple-gray-5 rounded-apple-button transition-colors duration-200"
              onClick={() => window.open("https://chat.ejencukai.my", "_blank")}
            >
              {language === 'en' ? "See Demo" : "Lihat Demo"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
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
              {language === 'en' ? "Tax Support Services" : "Perkhidmatan Sokongan Cukai"}
            </h2>
            <p className="text-body-lg text-apple-gray-2 max-w-2xl mx-auto">
              {language === 'en'
                ? "Comprehensive services connecting you with expert guidance and qualified professionals."
                : "Perkhidmatan menyeluruh yang menghubungkan anda dengan panduan pakar dan profesional berkelayakan."
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

export { Business };