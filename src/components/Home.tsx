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
    title: 'EjenCukai | Ejen Cukai Berdaftar LHDN | Fail Borang BE, B & Syarikat',
    description: pick(
      'Ejen cukai berdaftar LHDN dengan 30+ tahun pengalaman. Kami uruskan pemfailan Borang BE, Borang B dan cukai syarikat anda dengan tepat, patuh dan tanpa risiko denda.',
      'LHDN-registered tax agent with 30+ years of experience. We handle your Borang BE, Borang B and corporate tax filing accurately and compliantly.'
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
