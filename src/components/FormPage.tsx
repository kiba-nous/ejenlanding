import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { QuickConsultForm } from './QuickConsultForm';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Free enquiry page.
 *
 * Previously a Tally iframe with nine required fields — including company
 * name, type and industry, which made it unanswerable for individual clients.
 * Now a native three-step form that branches on client type and hands off to
 * WhatsApp on submit.
 */
function FormPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-apple-gray-1 mb-4">
                {t('form.title')}
              </h1>
              <p className="text-body-lg text-apple-gray-2">
                {t('form.subtitle')}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-apple border border-apple-gray-4 p-6 md:p-10">
              <QuickConsultForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export { FormPage };
