/**
 * Analytics utility functions for tracking user interactions
 * Supports both Vercel Analytics and Plausible Analytics
 */

// Event types for type safety
export type AnalyticsEvent =
  | 'email_signup'
  | 'video_play'
  | 'resource_download'
  | 'quiz_complete'
  | 'cta_click'
  | 'external_link_click'
  | 'social_share'
  | 'form_submit'
  | 'calculator_use'
  | 'newsletter_subscribe'
  | 'web_vital'
  | 'performance_metric'
  | 'long_task'
  | 'resource_error'
  | 'custom_performance';

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track a custom event with Plausible Analytics
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: EventProperties
): void {
  // Only track in browser environment
  if (typeof window === 'undefined') return;

  try {
    // Plausible Analytics custom event
    if (window.plausible) {
      window.plausible(eventName, { props: properties });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, properties);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Track email signup events
 */
export function trackEmailSignup(source: string, tags?: string[]): void {
  trackEvent('email_signup', {
    source,
    tags: tags?.join(','),
  });
}

/**
 * Track video play events
 */
export function trackVideoPlay(
  videoId: string,
  videoTitle: string,
  category?: string
): void {
  trackEvent('video_play', {
    video_id: videoId,
    video_title: videoTitle,
    category,
  });
}

/**
 * Track resource download events
 */
export function trackResourceDownload(
  resourceId: string,
  resourceTitle: string,
  resourceType: string
): void {
  trackEvent('resource_download', {
    resource_id: resourceId,
    resource_title: resourceTitle,
    resource_type: resourceType,
  });
}

/**
 * Track quiz completion events
 */
export function trackQuizComplete(
  quizId: string,
  score?: number,
  result?: string
): void {
  trackEvent('quiz_complete', {
    quiz_id: quizId,
    score,
    result,
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
  ctaLabel: string,
  ctaLocation: string,
  ctaDestination?: string
): void {
  trackEvent('cta_click', {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string): void {
  trackEvent('external_link_click', {
    url,
    link_text: linkText,
  });
}

/**
 * Track social share events
 */
export function trackSocialShare(
  platform: string,
  contentType: string,
  contentId?: string
): void {
  trackEvent('social_share', {
    platform,
    content_type: contentType,
    content_id: contentId,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(
  formType: string,
  formLocation: string,
  success: boolean
): void {
  trackEvent('form_submit', {
    form_type: formType,
    form_location: formLocation,
    success,
  });
}

/**
 * Track calculator usage
 */
export function trackCalculatorUse(
  calculatorType: string,
  inputs?: Record<string, number>
): void {
  trackEvent('calculator_use', {
    calculator_type: calculatorType,
    ...inputs,
  });
}

/**
 * Track newsletter subscription
 */
export function trackNewsletterSubscribe(source: string): void {
  trackEvent('newsletter_subscribe', {
    source,
  });
}

/**
 * Track page views (automatically handled by Plausible, but can be called manually for SPAs)
 */
export function trackPageView(url?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const pageUrl = url || window.location.pathname;
    
    if (window.plausible) {
      window.plausible('pageview', { props: { url: pageUrl } });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Page view:', pageUrl);
    }
  } catch (error) {
    console.error('Page view tracking error:', error);
  }
}

/**
 * Initialize analytics (called on app load)
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Log analytics initialization in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Initialized');
  }

  // Set up any global event listeners here if needed
  // For example, tracking all external links automatically
  setupAutomaticTracking();
}

/**
 * Set up automatic tracking for common interactions
 */
function setupAutomaticTracking(): void {
  if (typeof window === 'undefined') return;

  // Track external links automatically
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');

    if (link && link.href) {
      const url = new URL(link.href, window.location.origin);
      const isExternal =
        url.hostname !== window.location.hostname &&
        !url.hostname.includes('betirement.com');

      if (isExternal) {
        trackExternalLink(link.href, link.textContent || undefined);
      }
    }
  });
}

// Type declaration for Plausible
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, any> }
    ) => void;
  }
}
