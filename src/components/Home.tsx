import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { ServicesPricing } from './ServicesPricing';
import { Testimonials } from './Testimonials';
import { ProductsRow } from './ProductsRow';
import { WhyUs } from './WhyUs';
import { HomeFaq } from './HomeFaq';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Page order follows the visitor's questions in sequence:
 * what is this → how does it work → what does it cost → who else used it →
 * what if I'm not ready → why you → remaining doubts → act.
 */
function Home() {
  const { pick } = useLanguage();
  usePageMeta({
    title: 'EjenCukai | Platform Pemfailan Cukai Bersama Ejen Berdaftar LHDN',
    description: pick(
      'Platform pemfailan cukai Malaysia. Kami hubungkan anda dengan profesional cukai dan rakan ejen cukai berdaftar LHDN untuk Borang BE, Borang B dan cukai syarikat.',
      'A Malaysian tax filing platform. We connect you with tax professionals and a partner LHDN-registered tax agent for Borang BE, Borang B and corporate tax.'
    ),
  });

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <HowItWorks />
        <ServicesPricing />
        <Testimonials />
        <ProductsRow />
        <WhyUs />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export { Home };
