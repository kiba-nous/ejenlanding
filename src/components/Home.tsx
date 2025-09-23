import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { WaitlistForm } from './WaitlistForm';
import { Footer } from './Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WaitlistForm />
      <Footer />
    </>
  );
}

export { Home };