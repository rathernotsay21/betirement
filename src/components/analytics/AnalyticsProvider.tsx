/**
 * Analytics Provider Component
 * Initializes analytics tracking on app load
 */

'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/src/lib/analytics';

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize analytics on mount
    initAnalytics();
  }, []);

  return <>{children}</>;
}
