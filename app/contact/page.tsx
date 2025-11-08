import { ContactForm } from '@/src/components/forms';
import { generateMetadata, generateBreadcrumbSchema } from '@/src/lib/seo';
import { JsonLd } from '@/src/components/seo';

export const metadata = generateMetadata({
  title: 'Contact Us',
  description: 'Get in touch with us. Have questions about Bitcoin retirement strategies? We\'d love to hear from you.',
  url: '/contact',
  keywords: ['contact betirement', 'bitcoin retirement questions', 'get in touch', 'consultation'],
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-bitcoin-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <a
              href="mailto:contact@betirement.com"
              className="text-bitcoin-500 hover:underline"
            >
              contact@betirement.com
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-bitcoin-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Social Media</h3>
            <p className="text-neutral-600 text-sm">
              Follow us on Twitter, Instagram, and LinkedIn
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-bitcoin-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Speaking</h3>
            <a href="/speaking" className="text-bitcoin-500 hover:underline">
              Book a speaking engagement
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <ContactForm type="general" />
        </div>

        {/* FAQ Section */}
        <div className="bg-neutral-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                How quickly will I receive a response?
              </h3>
              <p className="text-neutral-600">
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Can I schedule a consultation?
              </h3>
              <p className="text-neutral-600">
                Yes! Please mention your interest in a consultation in your message, and we'll
                send you available times and pricing information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Do you offer speaking engagements?
              </h3>
              <p className="text-neutral-600">
                Absolutely! Visit our{' '}
                <a href="/speaking" className="text-bitcoin-500 hover:underline">
                  speaking page
                </a>{' '}
                to learn more and submit a booking request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
