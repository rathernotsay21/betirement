import dynamic from 'next/dynamic';
import { Button } from '@/src/components/ui';
import { MediaKitSection } from '@/src/components/sections/MediaKitSection';
import { PastAppearancesSection } from '@/src/components/sections/PastAppearancesSection';
import { SpeakingTopicsSection } from '@/src/components/sections/SpeakingTopicsSection';
import { SpeakingTestimonialsSection } from '@/src/components/sections/SpeakingTestimonialsSection';
import { generateMetadata, generateBreadcrumbSchema } from '@/src/lib/seo';
import { JsonLd } from '@/src/components/seo';

// Dynamic import for booking form (below the fold)
const BookingRequestForm = dynamic(
  () => import('@/src/components/forms/BookingRequestForm').then((mod) => mod.BookingRequestForm),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bitcoin-500"></div>
        <p className="mt-4 text-neutral-600">Loading form...</p>
      </div>
    ),
  }
);

export const metadata = generateMetadata({
  title: 'Speaking & Media',
  description: 'Book Michael for speaking engagements, podcasts, and media appearances. Expert insights on Bitcoin retirement strategies and financial independence.',
  url: '/speaking',
  keywords: ['bitcoin speaker', 'retirement speaker', 'cryptocurrency expert', 'financial independence speaker', 'podcast guest'],
});

export default function SpeakingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Speaking & Media', url: '/speaking' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main>
      {/* Hero section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-black via-black-light to-neutral-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(247, 147, 26) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-bitcoin-500/20 border border-bitcoin-500/50 rounded-full px-6 py-2 mb-6">
              <span className="text-bitcoin-500 font-bold text-sm uppercase tracking-wide">
                Speaking & Media
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Book Michael for Your{' '}
              <span className="text-bitcoin-500">Next Event</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto">
              Engaging speaker on Bitcoin retirement strategies, financial independence, and cryptocurrency investing. Real experience, proven strategies, actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-bitcoin-500 rounded-lg hover:bg-bitcoin-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Request Booking
              </a>
              <a
                href="#media-kit"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors"
              >
                Download Media Kit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <MediaKitSection />

      {/* Past Appearances Section */}
      <PastAppearancesSection />

      {/* Speaking Topics Section */}
      <SpeakingTopicsSection />

      {/* Testimonials Section */}
      <SpeakingTestimonialsSection />

      {/* Booking Request Form Section */}
      <section id="booking" className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Request a Booking
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Interested in having Michael speak at your event or appear on your podcast? Fill out the form below and we'll get back to you within 48 hours.
              </p>
            </div>
            <BookingRequestForm />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Whether it's a keynote, workshop, podcast interview, or media appearance, I'm here to share valuable insights that your audience will love.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-bitcoin-500 rounded-lg hover:bg-bitcoin-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors"
              >
                Learn More About Michael
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
