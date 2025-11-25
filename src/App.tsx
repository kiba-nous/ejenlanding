import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home } from './components/Home';
import { FormPage } from './components/FormPage';
import { Business } from './components/Business';
import { TaxFirms } from './components/TaxFirms';
import { Investors } from './components/Investors';
// import { AboutUs } from './components/AboutUs';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/business" element={<Business />} />
            <Route path="/tax-firms" element={<TaxFirms />} />
            <Route path="/investors" element={<Investors />} />
            {/* <Route path="/about" element={<AboutUs />} /> */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;