import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

function Hero() {
  const { t, language, setLanguage } = useLanguage();
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => [
      t("hero.title.intelligent"),
      t("hero.title.automated"),
      t("hero.title.accurate"),
      t("hero.title.compliant"),
      t("hero.title.efficient"),
    ],
    [t, language]
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

  const openChatDemo = () => {
    // Navigate to the chat demo
    window.open("https://chat.ejencukai.my", "_blank");
  };

  const openCukai = () => {
    // Navigate to the chat demo
    window.open("https://firm.ejencukai.my", "_blank");
  };

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

      {/* Header with Language Toggle */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-6 pb-4"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="Ejen Cukai" className="h-20 w-auto" />
            </div>

            {/* Embedded Language Toggle */}
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
              <div className="flex items-center">
                <motion.button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    language === "en"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EN
                </motion.button>
                <motion.button
                  onClick={() => setLanguage("bm")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    language === "bm"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BM
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative container mx-auto px-4">
        <div className="flex gap-8 py-16 lg:py-24 items-center justify-center flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="secondary" size="sm" className="gap-4 shadow-lg">
              {t("hero.badge")}
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
              <span className="text-blue-900">{t("hero.title.part1")}</span>
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
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-600 max-w-3xl text-center">
              {t("hero.description")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="gap-4 shadow-lg"
              onClick={scrollToWaitlist}
            >
              {t("hero.joinWaitlist")} <MoveRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              className="gap-4"
              variant="outline"
              onClick={openChatDemo}
            >
              Chat Demo <MessageSquare className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              className="gap-4"
              variant="outline"
              onClick={openCukai}
            >
              Ejen Cukai 1.0
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
