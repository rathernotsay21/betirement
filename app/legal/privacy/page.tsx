import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Betirement',
  description: 'Privacy Policy for Betirement - Learn how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-black">Privacy Policy</h1>
        <p className="text-neutral-500 mb-8">Last Updated: November 8, 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. Introduction</h2>
            <p className="text-neutral-700 mb-4">
              Welcome to Betirement ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              betirement.com (the "Site").
            </p>
            <p className="text-neutral-700">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">2.1 Personal Information</h3>
            <p className="text-neutral-700 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Subscribe to our newsletter or email list</li>
              <li>Fill out a contact form or booking request</li>
              <li>Download resources or lead magnets</li>
              <li>Submit a quiz or survey</li>
              <li>Participate in our community</li>
            </ul>
            <p className="text-neutral-700 mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (if provided)</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-black">2.2 Automatically Collected Information</h3>
            <p className="text-neutral-700 mb-4">
              When you visit our Site, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Pages viewed and time spent on pages</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. How We Use Your Information</h2>
            <p className="text-neutral-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Send you newsletters, marketing communications, and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Deliver resources, guides, and content you request</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website usage and trends</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. Third-Party Service Providers</h2>
            <p className="text-neutral-700 mb-4">
              We may share your information with third-party service providers who perform services on our behalf, including:
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-black">4.1 Email Marketing</h3>
            <p className="text-neutral-700 mb-4">
              We use ConvertKit to manage our email list and send newsletters. Your email address and any information you provide 
              will be stored on ConvertKit's servers. ConvertKit's privacy policy can be found at 
              <a href="https://convertkit.com/privacy" className="text-bitcoin-500 hover:underline" target="_blank" rel="noopener noreferrer"> convertkit.com/privacy</a>.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">4.2 Analytics</h3>
            <p className="text-neutral-700 mb-4">
              We use privacy-focused analytics services (Plausible Analytics and Vercel Analytics) to understand how visitors use our Site. 
              These services do not use cookies and do not collect personal information.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">4.3 Hosting</h3>
            <p className="text-neutral-700 mb-4">
              Our website is hosted on Netlify. Your information may be stored on Netlify's servers. 
              Netlify's privacy policy can be found at 
              <a href="https://www.netlify.com/privacy" className="text-bitcoin-500 hover:underline" target="_blank" rel="noopener noreferrer"> netlify.com/privacy</a>.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">4.4 Video Content</h3>
            <p className="text-neutral-700 mb-4">
              We embed videos from YouTube. When you watch embedded videos, YouTube may collect information about you. 
              YouTube's privacy policy can be found at 
              <a href="https://policies.google.com/privacy" className="text-bitcoin-500 hover:underline" target="_blank" rel="noopener noreferrer"> policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. Cookies and Tracking Technologies</h2>
            <p className="text-neutral-700 mb-4">
              We use minimal cookies and tracking technologies. Our analytics services (Plausible and Vercel) do not use cookies. 
              However, third-party services like YouTube may set cookies when you interact with embedded content.
            </p>
            <p className="text-neutral-700">
              You can control cookies through your browser settings. Please note that disabling cookies may affect the functionality of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. Your Rights and Choices</h2>
            <p className="text-neutral-700 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails at any time using the unsubscribe link</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>
            <p className="text-neutral-700">
              To exercise these rights, please contact us at the email address provided in the Contact section below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. Data Security</h2>
            <p className="text-neutral-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. 
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to 
              protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">8. Data Retention</h2>
            <p className="text-neutral-700">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, 
              unless a longer retention period is required or permitted by law. When you unsubscribe from our email list, we will remove 
              your information from our active database but may retain certain information for legal or administrative purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">9. Children's Privacy</h2>
            <p className="text-neutral-700">
              Our Site is not intended for children under the age of 18. We do not knowingly collect personal information from children. 
              If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">10. International Data Transfers</h2>
            <p className="text-neutral-700">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have data protection laws that are different from the laws of your country. 
              By using our Site, you consent to the transfer of your information to these countries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">11. Changes to This Privacy Policy</h2>
            <p className="text-neutral-700">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy 
              on this page and updating the "Last Updated" date. You are advised to review this privacy policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">12. Contact Us</h2>
            <p className="text-neutral-700 mb-4">
              If you have questions or concerns about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="text-neutral-700">
              Email: <a href="mailto:privacy@betirement.com" className="text-bitcoin-500 hover:underline">privacy@betirement.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
