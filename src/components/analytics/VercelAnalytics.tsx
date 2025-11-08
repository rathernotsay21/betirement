/**
 * Vercel Analytics Component
 * Tracks Core Web Vitals and page performance
 */

import { Analytics } from '@vercel/analytics/react';

export function VercelAnalytics() {
  // Don't load in development unless explicitly enabled
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DEV
  ) {
    return null;
  }

  return <Analytics />;
}
