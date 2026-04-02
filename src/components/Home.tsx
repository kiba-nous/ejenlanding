import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { MobileApp } from './MobileApp';
import { EbookBanner } from './EbookBanner';
import { Services } from './Services';
import { PricingTiers } from './PricingTiers';
import { Features } from './Features';
import { Footer } from './Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MobileApp />
      <EbookBanner />
      <Services />
      <PricingTiers />
      <Features />
      <Footer />
    </>
  );
}

export { Home };