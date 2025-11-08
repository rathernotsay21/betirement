import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Betirement',
  description: 'Terms of Service for Betirement - Read our terms and conditions for using our website and services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-black">Terms of Service</h1>
        <p className="text-neutral-500 mb-8">Last Updated: November 8, 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. Agreement to Terms</h2>
            <p className="text-neutral-700 mb-4">
              By accessing or using the Betirement website ("Site"), you agree to be bound by these Terms of Service ("Terms"). 
              If you do not agree to these Terms, please do not use the Site.
            </p>
            <p className="text-neutral-700">
              We reserve the right to modify these Terms at any time. Your continued use of the Site after changes are posted 
              constitutes your acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. Use of the Site</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">2.1 Permitted Use</h3>
            <p className="text-neutral-700 mb-4">
              You may use the Site for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to the Site or its systems</li>
              <li>Interfere with or disrupt the Site's operation</li>
              <li>Use automated systems to access the Site without permission</li>
              <li>Collect or harvest information from the Site without consent</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-black">2.2 Account Responsibility</h3>
            <p className="text-neutral-700">
              If you create an account on the Site, you are responsible for maintaining the confidentiality of your account 
              credentials and for all activities that occur under your account. You agree to notify us immediately of any 
              unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">3.1 Our Content</h3>
            <p className="text-neutral-700 mb-4">
              All content on the Site, including text, graphics, logos, images, videos, audio clips, and software, is the property 
              of Betirement or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">3.2 Limited License</h3>
            <p className="text-neutral-700 mb-4">
              We grant you a limited, non-exclusive, non-transferable license to access and use the Site for personal, 
              non-commercial purposes. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Reproduce, distribute, or publicly display our content without permission</li>
              <li>Modify or create derivative works from our content</li>
              <li>Use our content for commercial purposes without authorization</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-black">3.3 User-Generated Content</h3>
            <p className="text-neutral-700">
              If you submit content to the Site (such as comments, testimonials, or forum posts), you grant us a worldwide, 
              royalty-free, perpetual license to use, reproduce, modify, and display that content in connection with the Site 
              and our business operations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. Products and Services</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">4.1 Product Descriptions</h3>
            <p className="text-neutral-700 mb-4">
              We strive to provide accurate descriptions of our products and services. However, we do not warrant that product 
              descriptions, pricing, or other content on the Site is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">4.2 Pricing and Payment</h3>
            <p className="text-neutral-700 mb-4">
              All prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, 
              including pricing errors, product availability, or suspected fraudulent activity.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">4.3 Digital Products</h3>
            <p className="text-neutral-700 mb-4">
              Digital products are delivered electronically and are non-refundable unless otherwise stated. You are responsible 
              for ensuring you have the necessary equipment and software to access digital products.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">4.4 Refund Policy</h3>
            <p className="text-neutral-700">
              Our refund policy varies by product. Please refer to the specific product page or contact us for details. 
              Generally, digital products are non-refundable, while physical products may be returned within a specified period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. Third-Party Links and Services</h2>
            <p className="text-neutral-700 mb-4">
              The Site may contain links to third-party websites or services that are not owned or controlled by Betirement. 
              We have no control over and assume no responsibility for the content, privacy policies, or practices of any 
              third-party websites or services.
            </p>
            <p className="text-neutral-700">
              You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use 
              of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. Disclaimers and Limitations of Liability</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">6.1 No Warranties</h3>
            <p className="text-neutral-700 mb-4">
              THE SITE AND ALL CONTENT, PRODUCTS, AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES 
              OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">6.2 Limitation of Liability</h3>
            <p className="text-neutral-700 mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, BETIREMENT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, 
              OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">6.3 Maximum Liability</h3>
            <p className="text-neutral-700">
              In no event shall our total liability to you for all damages exceed the amount you paid to us in the twelve (12) 
              months preceding the event giving rise to the liability, or $100, whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. Indemnification</h2>
            <p className="text-neutral-700">
              You agree to indemnify, defend, and hold harmless Betirement and its officers, directors, employees, and agents 
              from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of 
              or in any way connected with your access to or use of the Site, your violation of these Terms, or your violation 
              of any rights of another person or entity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">8. Termination</h2>
            <p className="text-neutral-700">
              We may terminate or suspend your access to the Site immediately, without prior notice or liability, for any reason, 
              including if you breach these Terms. Upon termination, your right to use the Site will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">9. Governing Law and Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">9.1 Governing Law</h3>
            <p className="text-neutral-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              Betirement operates, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">9.2 Dispute Resolution</h3>
            <p className="text-neutral-700">
              Any disputes arising out of or relating to these Terms or the Site shall be resolved through binding arbitration 
              in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive 
              relief in court to prevent infringement of intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">10. Severability</h2>
            <p className="text-neutral-700">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
              eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">11. Entire Agreement</h2>
            <p className="text-neutral-700">
              These Terms, together with our Privacy Policy and any other legal notices published on the Site, constitute the 
              entire agreement between you and Betirement regarding your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">12. Contact Information</h2>
            <p className="text-neutral-700 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-neutral-700">
              Email: <a href="mailto:legal@betirement.com" className="text-bitcoin-500 hover:underline">legal@betirement.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
