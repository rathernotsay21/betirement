import dynamic from 'next/dynamic';
import {
  VideoIntroduction,
  CredibilitySection,
} from '@/src/components/sections';
import { generateMetadata, generatePersonSchema, generateBreadcrumbSchema } from '@/src/lib/seo';
import { JsonLd } from '@/src/components/seo';

// Dynamic import for interactive timeline (heavy component with animations)
const InteractiveTimeline = dynamic(
  () => import('@/src/components/sections').then((mod) => mod.InteractiveTimeline),
  {
    loading: () => (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bitcoin-500"></div>
      </div>
    ),
  }
);

export const metadata = generateMetadata({
  title: 'About Michael',
  description: 'Learn about Michael\'s journey from 28-year corporate career to Bitcoin-powered early retirement at 51. Real experience, proven strategies.',
  url: '/about',
  type: 'website',
  keywords: ['bitcoin retirement story', 'early retirement journey', 'bitcoin success story', 'financial independence', 'retire at 51'],
});

export default function AboutPage() {
  const personSchema = generatePersonSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <>
      <JsonLd data={personSchema} />
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
                My Story
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              From Corporate to{' '}
              <span className="text-bitcoin-500">Crypto-Retired</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto">
              How I leveraged Bitcoin to retire at 51 after 28 years in corporate America—and how you can too.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <span className="text-bitcoin-500 font-bold text-2xl">51</span>
                <span className="text-neutral-300">Retired</span>
              </div>
              <div className="h-8 w-px bg-neutral-700" />
              <div className="flex items-center gap-2">
                <span className="text-bitcoin-500 font-bold text-2xl">28</span>
                <span className="text-neutral-300">Years Career</span>
              </div>
              <div className="h-8 w-px bg-neutral-700" />
              <div className="flex items-center gap-2">
                <span className="text-bitcoin-500 font-bold text-2xl">7+</span>
                <span className="text-neutral-300">Years Bitcoin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video introduction */}
      <VideoIntroduction />

      {/* Interactive timeline */}
      <InteractiveTimeline />

      {/* Credibility section */}
      <CredibilitySection />

      {/* Call to action */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Whether you're just discovering Bitcoin or already investing, I'm here to help you build your path to financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/start-here"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-bitcoin-500 rounded-lg hover:bg-bitcoin-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </a>
              <a
                href="/content/videos"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-black bg-white border-2 border-neutral-300 rounded-lg hover:border-bitcoin-500 transition-colors"
              >
                Watch Free Videos
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
