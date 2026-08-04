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
import { WhatsAppButton } from './components/WhatsAppButton';
import { EbookPage } from './components/EbookPage';
import { EbookThankYou } from './components/EbookThankYou';
import { ConsultationPage } from './components/ConsultationPage';
import { BookingThankYou } from './components/BookingThankYou';
import { NotFound } from './components/NotFound';

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
            <Route path="/ebook" element={<EbookPage />} />
            <Route path="/ebook/thank-you/be" element={<EbookThankYou ebook="be" />} />
            <Route path="/ebook/thank-you/b" element={<EbookThankYou ebook="b" />} />
            <Route path="/konsultasi-peribadi" element={<ConsultationPage />} />
            <Route path="/booking/thank-you" element={<BookingThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;