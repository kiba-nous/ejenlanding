import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { WaitlistForm } from './components/WaitlistForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Hero />
        <Features />
        <WaitlistForm />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;