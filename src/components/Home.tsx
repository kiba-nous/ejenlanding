import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { Testimonials } from './Testimonials';
import { PricingTiers } from './PricingTiers';
import { ConsultationBanner } from './ConsultationBanner';
import { EbookBanner } from './EbookBanner';
import { MobileApp } from './MobileApp';
import { Features } from './Features';
import { Footer } from './Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      {/* Renders nothing until real client quotes are added — see Testimonials.tsx */}
      <Testimonials />
      <PricingTiers />
      <ConsultationBanner />
      <EbookBanner />
      {/* The app is a nice-to-have, not the main offer — moved below the paid products. */}
      <MobileApp />
      <Features />
      <Footer />
    </>
  );
}

export { Home };