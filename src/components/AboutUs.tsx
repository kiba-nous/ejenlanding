import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Award, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

function AboutUs() {
  const { language } = useLanguage();

  const values = [
    {
      icon: Target,
      title: language === 'en' ? 'Our Mission' : 'Misi Kami',
      description: language === 'en'
        ? 'To revolutionize tax compliance in Malaysia by making it accessible, accurate, and automated for every business.'
        : 'Untuk merevolusikan pematuhan cukai di Malaysia dengan menjadikannya mudah diakses, tepat, dan automatik untuk setiap perniagaan.'
    },
    {
      icon: Lightbulb,
      title: language === 'en' ? 'Our Vision' : 'Visi Kami',
      description: language === 'en'
        ? 'To be Southeast Asia\'s leading AI-powered tax technology platform, empowering businesses to thrive.'
        : 'Untuk menjadi platform teknologi cukai berkuasa AI terkemuka di Asia Tenggara, memperkasakan perniagaan untuk berkembang maju.'
    },
    {
      icon: Award,
      title: language === 'en' ? 'Our Values' : 'Nilai-Nilai Kami',
      description: language === 'en'
        ? 'Excellence in technology, transparency in operations, and commitment to our clients\' success.'
        : 'Kecemerlangan dalam teknologi, ketelusan dalam operasi, dan komitmen terhadap kejayaan pelanggan kami.'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: language === 'en' ? 'AI-Powered Automation' : 'Automasi Berkuasa AI',
      description: language === 'en'
        ? 'Our advanced AI algorithms handle complex tax calculations with 99.9% accuracy, saving you time and reducing errors.'
        : 'Algoritma AI canggih kami mengendalikan pengiraan cukai yang kompleks dengan ketepatan 99.9%, menjimatkan masa anda dan mengurangkan ralat.'
    },
    {
      icon: Globe,
      title: language === 'en' ? 'Malaysian Tax Expertise' : 'Kepakaran Cukai Malaysia',
      description: language === 'en'
        ? 'Built specifically for Malaysian tax regulations including SST, income tax, and LHDN compliance requirements.'
        : 'Dibina khusus untuk peraturan cukai Malaysia termasuk SST, cukai pendapatan, dan keperluan pematuhan LHDN.'
    },
    {
      icon: Users,
      title: language === 'en' ? 'Trusted by Thousands' : 'Dipercayai oleh Ribuan',
      description: language === 'en'
        ? 'Over 10,000 Malaysian businesses and 500+ tax firms trust our platform for their tax compliance needs.'
        : 'Lebih 10,000 perniagaan Malaysia dan 500+ firma cukai mempercayai platform kami untuk keperluan pematuhan cukai mereka.'
    }
  ];

  const founders = [
    {
      name: language === 'en' ? 'Sarah Chen' : 'Sarah Chen',
      role: language === 'en' ? 'CEO & Co-Founder' : 'Ketua Pegawai Eksekutif & Pengasas Bersama',
      description: language === 'en'
        ? 'Former McKinsey consultant with 10+ years experience in fintech and tax technology. MBA from INSEAD.'
        : 'Bekas perunding McKinsey dengan pengalaman 10+ tahun dalam fintech dan teknologi cukai. MBA dari INSEAD.',
      image: '/placeholder-founder-1.jpg'
    },
    {
      name: language === 'en' ? 'Ahmad Rahman' : 'Ahmad Rahman',
      role: language === 'en' ? 'CTO & Co-Founder' : 'Ketua Pegawai Teknologi & Pengasas Bersama',
      description: language === 'en'
        ? 'Former Google engineer specializing in AI and machine learning. Computer Science PhD from MIT.'
        : 'Bekas jurutera Google yang pakar dalam AI dan pembelajaran mesin. PhD Sains Komputer dari MIT.',
      image: '/placeholder-founder-2.jpg'
    },
    {
      name: language === 'en' ? 'Priya Patel' : 'Priya Patel',
      role: language === 'en' ? 'CFO & Co-Founder' : 'Ketua Pegawai Kewangan & Pengasas Bersama',
      description: language === 'en'
        ? 'Former PwC tax director with deep expertise in Malaysian tax law and compliance. CPA with 15+ years experience.'
        : 'Bekas pengarah cukai PwC dengan kepakaran mendalam dalam undang-undang cukai dan pematuhan Malaysia. CPA dengan pengalaman 15+ tahun.',
      image: '/placeholder-founder-3.jpg'
    }
  ];

  const stats = [
    {
      number: '10,000+',
      label: language === 'en' ? 'Businesses Served' : 'Perniagaan Dilayani'
    },
    {
      number: '500+',
      label: language === 'en' ? 'Tax Firms Partnership' : 'Perkongsian Firma Cukai'
    },
    {
      number: '99.9%',
      label: language === 'en' ? 'Accuracy Rate' : 'Kadar Ketepatan'
    },
    {
      number: 'RM 2B+',
      label: language === 'en' ? 'Tax Processed' : 'Cukai Diproses'
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
      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {language === 'en' ? 'About Ejen Cukai' : 'Tentang Ejen Cukai'}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'We\'re on a mission to transform how Malaysian businesses handle tax compliance through cutting-edge AI technology and deep local expertise.'
              : 'Kami sedang dalam misi untuk mengubah cara perniagaan Malaysia mengendalikan pematuhan cukai melalui teknologi AI terkini dan kepakaran tempatan yang mendalam.'
            }
          </p>
        </motion.div>
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

      {/* Values Section */}
      <div className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Our Story' : 'Cerita Kami'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Built by Malaysians, for Malaysians. We understand the unique challenges of local tax compliance.'
                : 'Dibina oleh rakyat Malaysia, untuk rakyat Malaysia. Kami memahami cabaran unik pematuhan cukai tempatan.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="py-16 bg-white/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'What Makes Us Different' : 'Apa Yang Membezakan Kami'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Founders Section */}
      <div className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Meet Our Founders' : 'Kenali Pengasas Kami'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Three visionaries combining technology, finance, and tax expertise to revolutionize Malaysian tax compliance.'
                : 'Tiga visioner yang menggabungkan teknologi, kewangan, dan kepakaran cukai untuk merevolusikan pematuhan cukai Malaysia.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{founder.role}</p>
                <p className="text-gray-600 leading-relaxed">{founder.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export { AboutUs };