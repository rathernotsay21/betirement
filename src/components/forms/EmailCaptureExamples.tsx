'use client';

import { useState } from 'react';
import { EmailCaptureForm, EmailCaptureModal, EmailCaptureSlideIn } from './EmailCaptureForm';
import { CONVERTKIT_TAGS } from '@/lib/convertkit';
import { Button } from '@/components/ui/Button';

/**
 * Example implementations of EmailCaptureForm variants
 * This component demonstrates the different ways to use the email capture form
 */
export function EmailCaptureExamples() {
  const [showModal, setShowModal] = useState(false);
  const [showSlideIn, setShowSlideIn] = useState(false);

  return (
    <div className="space-y-12 py-8">
      {/* Inline Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Inline Variant</h2>
        <p className="text-gray-600 mb-6">
          Basic inline form for embedding in page content
        </p>
        <div className="max-w-md">
          <EmailCaptureForm
            variant="inline"
            source={CONVERTKIT_TAGS.WEBSITE_HOME}
            tags={[CONVERTKIT_TAGS.BITCOIN, CONVERTKIT_TAGS.RETIREMENT]}
            title="Join Our Newsletter"
            description="Get weekly insights on Bitcoin and retirement planning."
            buttonText="Get Started"
          />
        </div>
      </section>

      {/* Inline with Name Field */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Inline with Name Field</h2>
        <p className="text-gray-600 mb-6">
          Form with optional first name field
        </p>
        <div className="max-w-md">
          <EmailCaptureForm
            variant="inline"
            showName={true}
            source={CONVERTKIT_TAGS.WEBSITE_BLOG}
            tags={[CONVERTKIT_TAGS.BLOG_READER]}
            title="Subscribe for Updates"
            description="Never miss a new article."
          />
        </div>
      </section>

      {/* Lead Magnet Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lead Magnet Variant</h2>
        <p className="text-gray-600 mb-6">
          Form with lead magnet offer
        </p>
        <div className="max-w-md">
          <EmailCaptureForm
            variant="inline"
            leadMagnet="Bitcoin Retirement Planning Guide (PDF)"
            source={CONVERTKIT_TAGS.LEAD_MAGNET}
            tags={[CONVERTKIT_TAGS.RESOURCE_DOWNLOADER]}
            title="Download Your Free Guide"
            buttonText="Get My Free Guide"
          />
        </div>
      </section>

      {/* Modal Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Modal Variant</h2>
        <p className="text-gray-600 mb-6">
          Form displayed in a modal dialog
        </p>
        <Button onClick={() => setShowModal(true)}>
          Open Modal Form
        </Button>
        <EmailCaptureModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          source={CONVERTKIT_TAGS.EXIT_INTENT}
          tags={[CONVERTKIT_TAGS.BITCOIN]}
          title="Before You Go..."
          description="Get our best Bitcoin retirement strategies delivered to your inbox."
          leadMagnet="5 Steps to Bitcoin-Powered Retirement"
        />
      </section>

      {/* Slide-in Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Slide-in Variant</h2>
        <p className="text-gray-600 mb-6">
          Form that slides in from the bottom-right corner
        </p>
        <Button onClick={() => setShowSlideIn(true)}>
          Show Slide-in Form
        </Button>
        <EmailCaptureSlideIn
          isVisible={showSlideIn}
          onClose={() => setShowSlideIn(false)}
          source={CONVERTKIT_TAGS.SLIDE_IN}
          tags={[CONVERTKIT_TAGS.RETIREMENT]}
          title="Stay Connected"
          description="Join 10,000+ readers getting weekly Bitcoin retirement insights."
        />
      </section>

      {/* Compact Variant */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Compact Footer Variant</h2>
        <p className="text-gray-600 mb-6">
          Minimal form for footer or sidebar
        </p>
        <div className="max-w-md bg-gray-50 p-6 rounded-lg">
          <EmailCaptureForm
            variant="inline"
            source={CONVERTKIT_TAGS.WEBSITE_HOME}
            placeholder="Your email address"
            buttonText="Subscribe"
            className="space-y-3"
          />
        </div>
      </section>
    </div>
  );
}
