'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/src/lib/performance-monitor';

/**
 * Performance Monitor Component
 * Initializes performance monitoring on the client side
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
  }, []);

  // This component doesn't render anything
  return null;
}
