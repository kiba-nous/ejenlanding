import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { PricingTiers } from './PricingTiers';
import { Features } from './Features';
import { WaitlistForm } from './WaitlistForm';
import { Footer } from './Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <PricingTiers />
      <Features />
      <WaitlistForm />
      <Footer />
    </>
  );
}

export { Home };