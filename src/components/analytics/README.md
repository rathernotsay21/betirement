# Analytics Components

This directory contains analytics tracking components and utilities for the Betirement website.

## Overview

The analytics system uses two complementary services:

1. **Vercel Analytics** - Tracks Core Web Vitals and page performance
2. **Plausible Analytics** - Privacy-focused, cookie-free analytics for user behavior

## Components

### PlausibleAnalytics

Loads the Plausible Analytics script for privacy-focused tracking.

```tsx
import { PlausibleAnalytics } from '@/src/components/analytics';

// In layout.tsx
<head>
  <PlausibleAnalytics />
</head>
```

### VercelAnalytics

Integrates Vercel Analytics for Core Web Vitals tracking.

```tsx
import { VercelAnalytics } from '@/src/components/analytics';

// In layout.tsx
<body>
  {children}
  <VercelAnalytics />
</body>
```

### AnalyticsProvider

Client component that initializes analytics tracking on app load.

```tsx
import { AnalyticsProvider } from '@/src/components/analytics';

// Wrap your app
<AnalyticsProvider>
  {children}
</AnalyticsProvider>
```

## Analytics Utilities

The `src/lib/analytics.ts` file provides utility functions for tracking custom events:

### Email Signup Tracking

```tsx
import { trackEmailSignup } from '@/src/lib/analytics';

trackEmailSignup('homepage-hero', ['bitcoin', 'newsletter']);
```

### Video Play Tracking

```tsx
import { trackVideoPlay } from '@/src/lib/analytics';

trackVideoPlay('video-123', 'Bitcoin Basics', 'bitcoin-fundamentals');
```

### Resource Download Tracking

```tsx
import { trackResourceDownload } from '@/src/lib/analytics';

trackResourceDownload('guide-1', 'Retirement Planning Guide', 'pdf');
```

### Quiz Completion Tracking

```tsx
import { trackQuizComplete } from '@/src/lib/analytics';

trackQuizComplete('start-here-quiz', 85, 'intermediate');
```

### CTA Click Tracking

```tsx
import { trackCTAClick } from '@/src/lib/analytics';

trackCTAClick('Get Started', 'homepage-hero', '/start-here');
```

### Form Submit Tracking

```tsx
import { trackFormSubmit } from '@/src/lib/analytics';

trackFormSubmit('contact', 'contact-page', true);
```

### Calculator Usage Tracking

```tsx
import { trackCalculatorUse } from '@/src/lib/analytics';

trackCalculatorUse('retirement-calculator', {
  age: 35,
  target_age: 55,
  bitcoin_allocation: 10,
});
```

### Social Share Tracking

```tsx
import { trackSocialShare } from '@/src/lib/analytics';

trackSocialShare('twitter', 'blog-post', 'bitcoin-retirement-basics');
```

## Environment Variables

Add to your `.env.local`:

```bash
# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=betirement.com

# Enable analytics in development (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS_DEV=true
```

## Features

### Automatic Tracking

- **Page Views**: Automatically tracked by Plausible
- **External Links**: Automatically tracked when clicked
- **Core Web Vitals**: Automatically tracked by Vercel Analytics

### Custom Event Tracking

All custom events are tracked with type safety and support for custom properties:

```tsx
import { trackEvent } from '@/src/lib/analytics';

trackEvent('custom_event', {
  property1: 'value1',
  property2: 123,
  property3: true,
});
```

### Privacy-Focused

- **No Cookies**: Plausible doesn't use cookies
- **GDPR Compliant**: No personal data collected
- **Lightweight**: Minimal impact on page load

## Development

Analytics are disabled by default in development mode. To enable:

```bash
NEXT_PUBLIC_ENABLE_ANALYTICS_DEV=true npm run dev
```

Events are logged to the console in development for debugging.

## Integration Examples

### Email Capture Form

```tsx
'use client';

import { trackEmailSignup } from '@/src/lib/analytics';

export function EmailForm() {
  const handleSubmit = async (email: string) => {
    // Submit to API
    await submitEmail(email);
    
    // Track the signup
    trackEmailSignup('footer-form', ['newsletter']);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Video Player

```tsx
'use client';

import { trackVideoPlay } from '@/src/lib/analytics';

export function VideoPlayer({ video }) {
  const handlePlay = () => {
    trackVideoPlay(video.id, video.title, video.category);
  };
  
  return <video onPlay={handlePlay}>...</video>;
}
```

### Download Button

```tsx
'use client';

import { trackResourceDownload } from '@/src/lib/analytics';

export function DownloadButton({ resource }) {
  const handleDownload = () => {
    trackResourceDownload(resource.id, resource.title, resource.type);
  };
  
  return <button onClick={handleDownload}>Download</button>;
}
```

## Goal Tracking

Goals are automatically tracked in Plausible based on custom events:

1. **Email Signups**: `email_signup` event
2. **Video Plays**: `video_play` event
3. **Resource Downloads**: `resource_download` event
4. **Quiz Completions**: `quiz_complete` event
5. **CTA Clicks**: `cta_click` event
6. **Form Submissions**: `form_submit` event

Configure goals in your Plausible dashboard to track conversions.

## Best Practices

1. **Track User Intent**: Focus on meaningful interactions
2. **Use Descriptive Names**: Make event names clear and consistent
3. **Include Context**: Add relevant properties to events
4. **Respect Privacy**: Don't track personal information
5. **Test Thoroughly**: Verify tracking in development before deploying

## Troubleshooting

### Events Not Showing Up

1. Check that Plausible script is loaded (view page source)
2. Verify `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set correctly
3. Check browser console for errors
4. Ensure ad blockers aren't blocking Plausible

### Development Tracking

Events are logged to console in development:

```
[Analytics] email_signup { source: 'homepage-hero', tags: 'bitcoin,newsletter' }
```

## Resources

- [Plausible Analytics Docs](https://plausible.io/docs)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
