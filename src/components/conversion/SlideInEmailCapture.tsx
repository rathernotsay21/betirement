'use client';

import { useState, useEffect } from 'react';
import { EmailCaptureForm } from '@/src/components/forms';
import { Button } from '@/src/components/ui';
import { ConvertKitTag } from '@/src/lib/convertkit';
import { safeGetItem, safeSetItem } from '@/src/lib/storage';

interface SlideInEmailCaptureProps {
  delay?: number; // Delay in milliseconds before showing (default: 30000ms = 30s)
  leadMagnet?: string;
  tags?: ConvertKitTag[];
}

export function SlideInEmailCapture({
  delay = 30000,
  leadMagnet = 'Bitcoin Retirement Starter Guide',
  tags = ['slide-in-capture'],
}: SlideInEmailCaptureProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or subscribed (with Safari-safe storage access)
    const hasSubscribed = safeGetItem('betirement_subscribed');
    const hasDismissed = safeGetItem('slide_in_dismissed', 'session');

    if (hasSubscribed || hasDismissed) {
      return;
    }

    // Show slide-in after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    safeSetItem('slide_in_dismissed', 'true', 'session');
  };

  const handleSuccess = () => {
    setIsVisible(false);
    safeSetItem('betirement_subscribed', 'true');
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        className="fixed bottom-0 right-0 md:right-8 md:bottom-8 w-full md:w-96 bg-white rounded-t-2xl md:rounded-2xl shadow-2xl z-50 animate-slide-in-bottom md:animate-slide-in-right"
        role="dialog"
        aria-labelledby="slide-in-title"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-bitcoin-100 rounded-full mb-4">
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
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
            </div>
            <h3
              id="slide-in-title"
              className="text-2xl font-heading font-bold text-neutral-900 mb-2"
            >
              Wait! Before You Go...
            </h3>
            <p className="text-neutral-600">
              Get your free <strong>{leadMagnet}</strong> and join 15,000+ readers learning how to retire early with Bitcoin.
            </p>
          </div>

          <EmailCaptureForm
            variant="inline"
            leadMagnet={leadMagnet}
            tags={tags}
            onSuccess={handleSuccess}
          />

          <p className="text-xs text-neutral-500 mt-4 text-center">
            No spam. Unsubscribe anytime. Your privacy is protected.
          </p>
        </div>
      </div>
    </>
  );
}
