/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and custom performance metrics
 */

import { trackEvent } from './analytics';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

/**
 * Get rating based on metric value and thresholds
 */
function getRating(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(metric: PerformanceMetric) {
  // Track in analytics
  trackEvent('web_vital', {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }

  // Send to monitoring service (if configured)
  if (typeof window !== 'undefined' && window.performance) {
    // Could integrate with services like Sentry, DataDog, etc.
  }
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;

      if (lastEntry) {
        const value = lastEntry.renderTime || lastEntry.loadTime;
        const rating = getRating(value, THRESHOLDS.LCP);

        reportWebVitals({
          name: 'LCP',
          value,
          rating,
        });
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as any;

      if (firstEntry) {
        const value = firstEntry.processingStart - firstEntry.startTime;
        const rating = getRating(value, THRESHOLDS.FID);

        reportWebVitals({
          name: 'FID',
          value,
          rating,
        });
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    let clsValue = 0;
    let clsEntries: any[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report CLS when page is hidden
    const reportCLS = () => {
      const rating = getRating(clsValue, THRESHOLDS.CLS);

      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        rating,
      });
    };

    // Report on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportCLS();
      }
    });

    // Report on page unload
    window.addEventListener('pagehide', reportCLS);
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as any;

      if (firstEntry) {
        const value = firstEntry.startTime;
        const rating = getRating(value, THRESHOLDS.FCP);

        reportWebVitals({
          name: 'FCP',
          value,
          rating,
        });
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('Error measuring FCP:', error);
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB() {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as any;

    if (navigation) {
      const value = navigation.responseStart - navigation.requestStart;
      const rating = getRating(value, THRESHOLDS.TTFB);

      reportWebVitals({
        name: 'TTFB',
        value,
        rating,
      });
    }
  } catch (error) {
    console.error('Error measuring TTFB:', error);
  }
}

/**
 * Measure custom performance metrics
 */
export function measureCustomMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as any;

    if (navigation) {
      // DOM Content Loaded
      const domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;

      trackEvent('performance_metric', {
        metric_name: 'DOM_Content_Loaded',
        metric_value: domContentLoaded,
      });

      // Load Complete
      const loadComplete = navigation.loadEventEnd - navigation.loadEventStart;

      trackEvent('performance_metric', {
        metric_name: 'Load_Complete',
        metric_value: loadComplete,
      });

      // DOM Interactive
      const domInteractive = navigation.domInteractive - navigation.fetchStart;

      trackEvent('performance_metric', {
        metric_name: 'DOM_Interactive',
        metric_value: domInteractive,
      });
    }

    // Resource timing
    const resources = performance.getEntriesByType('resource');
    const totalResourceSize = resources.reduce(
      (sum, resource: any) => sum + (resource.transferSize || 0),
      0
    );

    trackEvent('performance_metric', {
      metric_name: 'Total_Resource_Size',
      metric_value: totalResourceSize,
    });

    // Count resources by type
    const resourceTypes = resources.reduce((acc: any, resource: any) => {
      const type = resource.initiatorType || 'other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    trackEvent('performance_metric', {
      metric_name: 'Resource_Counts',
      metric_value: JSON.stringify(resourceTypes),
    });
  } catch (error) {
    console.error('Error measuring custom metrics:', error);
  }
}

/**
 * Initialize all performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') {
    return;
  }

  // Wait for page to be fully loaded
  if (document.readyState === 'complete') {
    startMonitoring();
  } else {
    window.addEventListener('load', startMonitoring);
  }
}

function startMonitoring() {
  measureLCP();
  measureFID();
  measureCLS();
  measureFCP();
  measureTTFB();
  measureCustomMetrics();

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            trackEvent('long_task', {
              duration: entry.duration,
              start_time: entry.startTime,
            });
          }
        }
      });

      observer.observe({ type: 'longtask', buffered: true });
    } catch (error) {
      // Long task API not supported
    }
  }

  // Monitor resource errors
  window.addEventListener('error', (event) => {
    if (event.target instanceof HTMLImageElement) {
      trackEvent('resource_error', {
        type: 'image',
        src: event.target.src,
      });
    } else if (event.target instanceof HTMLScriptElement) {
      trackEvent('resource_error', {
        type: 'script',
        src: event.target.src,
      });
    }
  }, true);
}

/**
 * Mark custom performance timing
 */
export function markPerformance(name: string) {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(name);
  }
}

/**
 * Measure time between two marks
 */
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];

      trackEvent('custom_performance', {
        metric_name: name,
        metric_value: measure.duration,
      });

      return measure.duration;
    } catch (error) {
      console.error('Error measuring performance:', error);
    }
  }
  return 0;
}
