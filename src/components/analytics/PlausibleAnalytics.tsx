/**
 * Plausible Analytics Script Component
 * Privacy-focused analytics without cookies
 */

import Script from 'next/script';

interface PlausibleAnalyticsProps {
  domain?: string;
}

export function PlausibleAnalytics({ domain }: PlausibleAnalyticsProps) {
  const analyticsDomain =
    domain || process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'betirement.com';

  // Don't load in development unless explicitly enabled
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DEV
  ) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={analyticsDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
