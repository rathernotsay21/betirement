'use client';

import { useState } from 'react';
import {
  SlideInEmailCapture,
  SocialProofNotification,
  UrgencyIndicator,
  ABTestProvider,
  useABTest,
  ABTestVariant,
} from '@/src/components/conversion';
import { Button } from '@/src/components/ui';
import { CONVERTKIT_TAGS } from '@/src/lib/convertkit';

// Demo component that uses A/B testing
function ABTestDemo() {
  const { getVariant, trackConversion } = useABTest();
  const ctaVariant = getVariant('demo-cta');

  const handleClick = () => {
    trackConversion('demo-cta', 'button-click');
    alert(`You clicked variant ${ctaVariant}!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-heading font-bold mb-4">A/B Test Demo</h3>
      <p className="text-neutral-600 mb-4">
        You are seeing variant: <strong>{ctaVariant}</strong>
      </p>
      
      <ABTestVariant testId="demo-cta" variant="A">
        <Button variant="primary" onClick={handleClick}>
          Get Started Now
        </Button>
      </ABTestVariant>

      <ABTestVariant testId="demo-cta" variant="B">
        <Button variant="primary" onClick={handleClick}>
          Start Your Journey
        </Button>
      </ABTestVariant>

      <p className="text-sm text-neutral-500 mt-4">
        Refresh the page to potentially see a different variant (50/50 split).
        Your assignment is saved in localStorage.
      </p>
    </div>
  );
}

export default function ConversionDemoPage() {
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(false);

  const handleResetStorage = () => {
    localStorage.removeItem('betirement_subscribed');
    sessionStorage.removeItem('slide_in_dismissed');
    sessionStorage.removeItem('social_proof_dismissed');
    localStorage.removeItem('ab_test_assignments');
    alert('Storage cleared! Refresh the page to see components again.');
  };

  const tests = [
    {
      id: 'demo-cta',
      variants: ['A', 'B'],
      weights: [0.5, 0.5],
    },
  ];

  return (
    <ABTestProvider tests={tests}>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
              Conversion Optimization Demo
            </h1>
            <p className="text-lg text-neutral-600">
              This page demonstrates all the conversion optimization features implemented for the Betirement website.
            </p>
          </div>

          {/* Controls */}
          <div className="bg-bitcoin-50 border border-bitcoin-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-heading font-bold mb-4">Demo Controls</h2>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                onClick={() => setShowSlideIn(true)}
              >
                Show Slide-In Capture
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowSocialProof(true)}
              >
                Show Social Proof
              </Button>
              <Button
                variant="outline"
                onClick={handleResetStorage}
              >
                Reset Storage
              </Button>
            </div>
            <p className="text-sm text-neutral-600 mt-4">
              Note: The slide-in normally appears after 30 seconds. Use the button to trigger it immediately.
            </p>
          </div>

          {/* Urgency Indicators */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-6">Urgency Indicators</h2>
            
            <div className="space-y-6">
              {/* Countdown Timer */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Countdown Timer</h3>
                <UrgencyIndicator
                  type="countdown"
                  endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days from now
                  message="Special Launch Offer Ends In:"
                />
              </div>

              {/* Limited Spots - High Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Limited Spots (High Availability)</h3>
                <UrgencyIndicator
                  type="limited-spots"
                  totalSpots={100}
                  remainingSpots={67}
                  message="Enrollment Spots Available"
                />
              </div>

              {/* Limited Spots - Low Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Limited Spots (Low Availability)</h3>
                <UrgencyIndicator
                  type="limited-spots"
                  totalSpots={100}
                  remainingSpots={12}
                  message="Enrollment Spots Available"
                />
              </div>

              {/* Limited Stock - High */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Limited Stock (High)</h3>
                <UrgencyIndicator
                  type="limited-stock"
                  totalStock={50}
                  remainingStock={32}
                />
              </div>

              {/* Limited Stock - Low */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Limited Stock (Low)</h3>
                <UrgencyIndicator
                  type="limited-stock"
                  totalStock={50}
                  remainingStock={5}
                />
              </div>
            </div>
          </div>

          {/* A/B Testing Demo */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-6">A/B Testing Framework</h2>
            <ABTestDemo />
          </div>

          {/* Feature Descriptions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-heading font-bold mb-3">Slide-In Email Capture</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>✓ Appears after 30 seconds (configurable)</li>
                <li>✓ Respects user preferences</li>
                <li>✓ Won't show if already subscribed</li>
                <li>✓ Session-based dismissal</li>
                <li>✓ Mobile responsive</li>
                <li>✓ Smooth animations</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-heading font-bold mb-3">Social Proof Notifications</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>✓ Shows recent user actions</li>
                <li>✓ Cycles through multiple events</li>
                <li>✓ Configurable timing</li>
                <li>✓ Can be dismissed</li>
                <li>✓ Different icons for action types</li>
                <li>✓ Time-ago formatting</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-heading font-bold mb-3">Urgency Indicators</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>✓ Three types: countdown, spots, stock</li>
                <li>✓ Real-time countdown updates</li>
                <li>✓ Visual progress bars</li>
                <li>✓ Color-coded urgency levels</li>
                <li>✓ Responsive design</li>
                <li>✓ Customizable messages</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-heading font-bold mb-3">A/B Testing Framework</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>✓ Simple React Context API</li>
                <li>✓ Persistent assignments</li>
                <li>✓ Weighted distribution support</li>
                <li>✓ Automatic tracking</li>
                <li>✓ Easy to use hooks</li>
                <li>✓ Component-based variants</li>
              </ul>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-heading font-bold mb-4">Implementation Notes</h2>
            <div className="prose max-w-none">
              <h3>Sticky Header with CTA</h3>
              <p>
                The header component already implements sticky behavior with a prominent CTA button.
                The header stays visible during scrolling and includes the "Get Started" button.
              </p>

              <h3>Analytics Integration</h3>
              <p>
                All conversion components integrate with the analytics system to track:
              </p>
              <ul>
                <li>Email signups from slide-in capture</li>
                <li>A/B test variant assignments and conversions</li>
                <li>CTA clicks and interactions</li>
                <li>Form submissions</li>
              </ul>

              <h3>Performance Considerations</h3>
              <p>
                All components are client-side only and don't impact initial page load.
                They use React hooks for state management and localStorage/sessionStorage
                for persistence.
              </p>

              <h3>Accessibility</h3>
              <p>
                All components include proper ARIA labels, keyboard navigation support,
                and semantic HTML. They follow WCAG 2.1 AA guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Conversion Components */}
        {showSlideIn && (
          <SlideInEmailCapture
            delay={0} // Show immediately for demo
            leadMagnet="Bitcoin Retirement Starter Guide"
            tags={[CONVERTKIT_TAGS.DEMO_PAGE, CONVERTKIT_TAGS.SLIDE_IN]}
          />
        )}

        {showSocialProof && (
          <SocialProofNotification
            initialDelay={0} // Show immediately for demo
            displayDuration={5000}
            delayBetween={8000}
          />
        )}
      </div>
    </ABTestProvider>
  );
}
