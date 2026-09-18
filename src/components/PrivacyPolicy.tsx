import { LegalLayout } from './LegalLayout';

function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="2025-09-24">
            <section>
              <h2>1. Information We Collect</h2>
              <p>
                When you use Ejen Cukai, we may collect the following types of information:
              </p>
              <ul>
                <li><strong>Google Account Information:</strong> When you sign in with Google OAuth, we collect your email address, name, and profile picture as provided by Google.</li>
                <li><strong>Tax and Financial Data:</strong> Information you provide related to SST compliance, income tax filing, and financial analytics.</li>
                <li><strong>Usage Data:</strong> Information about how you use our application, including features accessed and time spent.</li>
              </ul>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our tax compliance services</li>
                <li>Process your tax filings and compliance requirements</li>
                <li>Integrate with LHDN (Lembaga Hasil Dalam Negeri) systems</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section>
              <h2>3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul>
                <li><strong>LHDN Integration:</strong> We may share relevant tax information with LHDN as required for tax compliance and filing purposes.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation.</li>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our platform, subject to confidentiality agreements.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              </ul>
            </section>

            <section>
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
            </section>

            <section>
              <h2>5. Google OAuth Integration</h2>
              <p>
                Our application uses Google OAuth for authentication. When you sign in with Google:
              </p>
              <ul>
                <li>We only request access to your basic profile information (name, email, profile picture)</li>
                <li>We do not store your Google password</li>
                <li>You can revoke access at any time through your Google Account settings</li>
                <li>We comply with Google's API Services User Data Policy</li>
              </ul>
            </section>

            <section>
              <h2>6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Tax-related data may be retained for periods required by Malaysian tax law and regulations.
              </p>
            </section>

            <section>
              <h2>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Withdraw consent for data processing</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2>8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2>9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> contact@ejencukai.my</li>
                <li><strong>Address:</strong> Kuala Lumpur, Malaysia</li>
              </ul>
            </section>

            <section>
              <h2>11. Compliance</h2>
              <p>
                This Privacy Policy is designed to comply with:
              </p>
              <ul>
                <li>Personal Data Protection Act 2010 (PDPA) of Malaysia</li>
                <li>Google API Services User Data Policy</li>
                <li>Industry best practices for data protection</li>
              </ul>
            </section>
          
    </LegalLayout>
  );
}

export { PrivacyPolicy };
