import dynamic from 'next/dynamic';
import {
  AnimatedHeroSection,
  SocialProofBar,
  ValuePropositionGrid,
  EnhancedFeaturedContent,
} from '@/src/components/sections';
import { generateMetadata } from '@/src/lib/seo';
import { CONVERTKIT_TAGS } from '@/src/lib/convertkit';

// Dynamic imports for below-fold and interactive components
const SlideInEmailCapture = dynamic(
  () => import('@/src/components/conversion').then((mod) => mod.SlideInEmailCapture),
  { ssr: false }
);

const SocialProofNotification = dynamic(
  () => import('@/src/components/conversion').then((mod) => mod.SocialProofNotification),
  { ssr: false }
);

export const metadata = generateMetadata({
  url: '/',
  keywords: [
    'bitcoin retirement',
    'early retirement',
    'bitcoin investing',
    'financial independence',
    'bitcoin allocation',
    'retirement planning',
  ],
});

export default function Home() {
  return (
    <>
      <main>
        <AnimatedHeroSection />
        <SocialProofBar />
        <ValuePropositionGrid />
        <EnhancedFeaturedContent />
      </main>

      {/* Conversion Optimization Components */}
      <SlideInEmailCapture
        delay={30000}
        leadMagnet="Practical Bitcoin Retirement Guide"
        tags={[CONVERTKIT_TAGS.HOMEPAGE_SLIDE_IN, CONVERTKIT_TAGS.SLIDE_IN]}
      />
      <SocialProofNotification
        initialDelay={10000}
        displayDuration={5000}
        delayBetween={15000}
      />
    </>
  );
}
