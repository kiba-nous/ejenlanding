import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { MobileApp } from './MobileApp';
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
      <Services />
      <PricingTiers />
      <Features />
      <Footer />
    </>
  );
}

export { Home };