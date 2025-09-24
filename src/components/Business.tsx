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
              {language === 'en' ? "For Malaysian Businesses" : "Untuk Perniagaan Malaysia"}
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
                {language === 'en' ? "Tax Support Made" : "Sokongan Cukai Dibuat"}
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
                ? "Get expert tax guidance, discover knowledge resources, and connect with the right tax professionals for your Malaysian business needs."
                : "Dapatkan panduan cukai pakar, temui sumber pengetahuan, dan berhubung dengan profesional cukai yang sesuai untuk keperluan perniagaan Malaysia anda."
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
              {language === 'en' ? "Join Waitlist" : "Sertai Senarai Menunggu"}
              <MoveRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              className="gap-4"
              variant="outline"
              onClick={() => window.open("https://chat.ejencukai.my", "_blank")}
            >
              {language === 'en' ? "See Demo" : "Lihat Demo"}
            </Button>
          </motion.div>
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
              {language === 'en' ? "Tax Support Services for Your Business" : "Perkhidmatan Sokongan Cukai untuk Perniagaan Anda"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? "Comprehensive tax support services connecting you with expert guidance and qualified professionals"
                : "Perkhidmatan sokongan cukai menyeluruh yang menghubungkan anda dengan panduan pakar dan profesional berkelayakan"
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

export { Business };