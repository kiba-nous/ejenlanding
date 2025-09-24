import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

function TermsOfService() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Ejen Cukai ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Ejen Cukai is a comprehensive tax compliance platform that provides:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>SST (Sales and Service Tax) compliance management</li>
                <li>Income tax filing assistance</li>
                <li>Financial analytics and reporting</li>
                <li>LHDN (Lembaga Hasil Dalam Negeri) integration</li>
                <li>Multi-user collaboration features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="mb-4">
                To access certain features of the Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Submit false, inaccurate, or misleading tax information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated scripts to access the Service without permission</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Tax Compliance and Professional Advice</h2>
              <p className="mb-4">
                While Ejen Cukai provides tools and assistance for tax compliance:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The Service is not a substitute for professional tax advice</li>
                <li>You remain solely responsible for the accuracy of your tax filings</li>
                <li>We recommend consulting with qualified tax professionals for complex matters</li>
                <li>You are responsible for ensuring compliance with all applicable tax laws</li>
                <li>We do not guarantee the accuracy of tax calculations or submissions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data and Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="mb-4">
                The Service and its original content, features, and functionality are owned by Ejen Cukai and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Payment and Billing</h2>
              <p className="mb-4">
                If you purchase any paid services:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>You agree to pay all charges incurred by your account</li>
                <li>Prices are subject to change with notice</li>
                <li>Payments are non-refundable unless otherwise stated</li>
                <li>You authorize us to charge your payment method for recurring subscriptions</li>
                <li>You are responsible for any taxes applicable to your purchases</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Service Availability</h2>
              <p className="mb-4">
                We strive to maintain high availability but do not guarantee uninterrupted service. We may:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Perform scheduled maintenance that may temporarily interrupt service</li>
                <li>Experience unexpected downtime due to technical issues</li>
                <li>Modify or discontinue features with appropriate notice</li>
                <li>Suspend accounts that violate these Terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by law, Ejen Cukai shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from tax penalties or interest charges</li>
                <li>Third-party actions or government decisions</li>
                <li>Technical failures or security breaches beyond our control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless Ejen Cukai from any claims, damages, or expenses arising from:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Inaccurate information you provide</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account and access to the Service:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Immediately for violations of these Terms</li>
                <li>For non-payment of fees</li>
                <li>If required by law or government request</li>
                <li>At our discretion with reasonable notice</li>
              </ul>
              <p className="mb-4">
                Upon termination, your right to use the Service ceases immediately, but these Terms remain in effect for applicable provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="mb-4">
                These Terms are governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of Malaysian courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Posting updated Terms on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying notifications within the Service</li>
              </ul>
              <p className="mb-4">
                Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Email:</strong> contact@ejencukai.my</li>
                <li><strong>Address:</strong> Kuala Lumpur, Malaysia</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Severability</h2>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>
          </div>
        </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export { TermsOfService };