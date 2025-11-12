'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { safeGetItem, safeSetItem } from '@/src/lib/storage';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented (with Safari-safe storage access)
    const consent = safeGetItem('cookie-consent');
    if (!consent) {
      // Delay showing banner slightly for better UX
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    safeSetItem('cookie-consent', 'accepted');
    safeSetItem('cookie-consent-date', new Date().toISOString());
    closeBanner();
  };

  const handleDecline = () => {
    safeSetItem('cookie-consent', 'declined');
    safeSetItem('cookie-consent-date', new Date().toISOString());
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div className="bg-black text-white shadow-lg border-t border-neutral-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Cookie Notice</h2>
              <p className="text-sm text-neutral-300 mb-2">
                We use minimal cookies and tracking technologies to improve your experience. 
                Our analytics services (Plausible and Vercel) are privacy-focused and don't use cookies. 
                However, third-party services like YouTube may set cookies when you interact with embedded content.
              </p>
              <p className="text-sm text-neutral-300">
                By clicking "Accept", you consent to the use of cookies by third-party services. 
                Learn more in our{' '}
                <Link 
                  href="/legal/privacy" 
                  className="text-bitcoin-500 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                size="md"
                onClick={handleDecline}
                className="w-full sm:w-auto border-neutral-600 text-white hover:bg-neutral-800"
              >
                Decline
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleAccept}
                className="w-full sm:w-auto"
              >
                Accept Cookies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
