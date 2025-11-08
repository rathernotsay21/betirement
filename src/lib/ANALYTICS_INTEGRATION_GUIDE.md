# Analytics Integration Guide

This guide shows how to integrate analytics tracking into existing components.

## Quick Start

Import the tracking functions you need:

```tsx
import {
  trackEmailSignup,
  trackVideoPlay,
  trackResourceDownload,
  trackCTAClick,
  trackFormSubmit,
  trackCalculatorUse,
  trackSocialShare,
  trackQuizComplete,
} from '@/src/lib/analytics';
```

## Integration Examples

### 1. Email Forms (Already Integrated)

The `EmailCaptureForm` component already includes analytics tracking:

```tsx
// Tracks successful email signup
trackEmailSignup(source, tags);

// Tracks form submission
trackFormSubmit('email-capture', source, success);
```

### 2. Video Player Component

Add tracking when videos are played:

```tsx
// In VideoCard.tsx or video player component
'use client';

import { trackVideoPlay } from '@/src/lib/analytics';

export function VideoPlayer({ video }) {
  const handlePlay = () => {
    trackVideoPlay(video.id, video.title, video.category);
  };

  return (
    <iframe
      src={`https://www.youtube.com/embed/${video.youtubeId}`}
      onLoad={() => {
        // Track when video iframe loads and user can play
        const iframe = document.querySelector('iframe');
        iframe?.addEventListener('play', handlePlay);
      }}
    />
  );
}
```

### 3. Resource Download Buttons

Track when users download resources:

```tsx
// In ResourceCard.tsx
'use client';

import { trackResourceDownload } from '@/src/lib/analytics';

export function ResourceCard({ resource }) {
  const handleDownload = () => {
    trackResourceDownload(resource.id, resource.title, resource.type);
  };

  return (
    <a
      href={resource.downloadUrl}
      onClick={handleDownload}
      download
    >
      Download {resource.title}
    </a>
  );
}
```

### 4. CTA Buttons

Track CTA button clicks throughout the site:

```tsx
// In Button.tsx or any CTA component
'use client';

import { trackCTAClick } from '@/src/lib/analytics';

export function CTAButton({ label, location, href }) {
  const handleClick = () => {
    trackCTAClick(label, location, href);
  };

  return (
    <Button onClick={handleClick} href={href}>
      {label}
    </Button>
  );
}
```

### 5. Interactive Calculators

Track calculator usage with input values:

```tsx
// In RetirementCalculator.tsx
'use client';

import { trackCalculatorUse } from '@/src/lib/analytics';

export function RetirementCalculator() {
  const handleCalculate = (inputs: CalculatorInputs) => {
    // Perform calculation
    const result = calculateRetirement(inputs);

    // Track calculator usage
    trackCalculatorUse('retirement-calculator', {
      current_age: inputs.currentAge,
      target_age: inputs.targetAge,
      bitcoin_allocation: inputs.bitcoinAllocation,
    });

    return result;
  };

  return <form onSubmit={handleCalculate}>...</form>;
}
```

### 6. Quiz Components

Track quiz completions with scores:

```tsx
// In InteractiveQuiz.tsx
'use client';

import { trackQuizComplete } from '@/src/lib/analytics';

export function InteractiveQuiz() {
  const handleComplete = (answers: QuizAnswers) => {
    const score = calculateScore(answers);
    const result = determineResult(score);

    // Track quiz completion
    trackQuizComplete('start-here-quiz', score, result);

    showResults(result);
  };

  return <div>...</div>;
}
```

### 7. Social Share Buttons

Track when users share content:

```tsx
// In SocialShare.tsx
'use client';

import { trackSocialShare } from '@/src/lib/analytics';

export function SocialShareButton({ platform, contentType, contentId }) {
  const handleShare = () => {
    trackSocialShare(platform, contentType, contentId);
    
    // Open share dialog
    window.open(shareUrl, '_blank');
  };

  return (
    <button onClick={handleShare}>
      Share on {platform}
    </button>
  );
}
```

### 8. Contact Forms

Track contact form submissions:

```tsx
// In ContactForm.tsx
'use client';

import { trackFormSubmit } from '@/src/lib/analytics';

export function ContactForm() {
  const handleSubmit = async (data: FormData) => {
    try {
      await submitForm(data);
      
      // Track successful submission
      trackFormSubmit('contact', 'contact-page', true);
      
      showSuccess();
    } catch (error) {
      // Track failed submission
      trackFormSubmit('contact', 'contact-page', false);
      
      showError();
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 9. Navigation Links

Track important navigation clicks:

```tsx
// In Header.tsx or navigation components
'use client';

import { trackCTAClick } from '@/src/lib/analytics';

export function Navigation() {
  const handleNavClick = (label: string, href: string) => {
    trackCTAClick(label, 'main-navigation', href);
  };

  return (
    <nav>
      <Link
        href="/start-here"
        onClick={() => handleNavClick('Start Here', '/start-here')}
      >
        Start Here
      </Link>
    </nav>
  );
}
```

### 10. Exit Intent Popup

Track when exit intent popups are shown and interacted with:

```tsx
// In ExitIntentPopup.tsx
'use client';

import { trackEvent } from '@/src/lib/analytics';

export function ExitIntentPopup() {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        // Track exit intent trigger
        trackEvent('exit_intent_shown', {
          page: window.location.pathname,
        });
        
        showPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return <Modal>...</Modal>;
}
```

## Best Practices

### 1. Track User Intent, Not Just Clicks

```tsx
// ❌ Don't track every button click
<button onClick={() => trackEvent('button_click')}>Click</button>

// ✅ Track meaningful interactions
<button onClick={() => trackCTAClick('Get Started', 'hero', '/start-here')}>
  Get Started
</button>
```

### 2. Include Relevant Context

```tsx
// ❌ Minimal context
trackVideoPlay(videoId);

// ✅ Rich context
trackVideoPlay(videoId, videoTitle, category);
```

### 3. Track Both Success and Failure

```tsx
try {
  await submitForm(data);
  trackFormSubmit('contact', 'contact-page', true);
} catch (error) {
  trackFormSubmit('contact', 'contact-page', false);
}
```

### 4. Use Consistent Naming

```tsx
// Use kebab-case for event sources
trackEmailSignup('homepage-hero', tags);
trackEmailSignup('footer-form', tags);
trackEmailSignup('exit-intent-popup', tags);
```

### 5. Don't Track Personal Information

```tsx
// ❌ Don't track PII
trackEvent('form_submit', { email: user.email });

// ✅ Track anonymized data
trackEvent('form_submit', { form_type: 'contact' });
```

## Testing Analytics

### Development Mode

Analytics are logged to console in development:

```bash
npm run dev
```

Look for console logs like:
```
[Analytics] email_signup { source: 'homepage-hero', tags: 'bitcoin,newsletter' }
```

### Enable Analytics in Development

Set environment variable:

```bash
NEXT_PUBLIC_ENABLE_ANALYTICS_DEV=true npm run dev
```

### Verify in Production

1. Deploy to staging/production
2. Open browser DevTools → Network tab
3. Look for requests to `plausible.io`
4. Check Plausible dashboard for events

## Common Issues

### Events Not Tracking

**Problem**: Events aren't showing up in Plausible

**Solutions**:
1. Check that Plausible script is loaded (view page source)
2. Verify `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` matches your domain
3. Disable ad blockers
4. Check browser console for errors
5. Wait a few minutes (Plausible has a slight delay)

### TypeScript Errors

**Problem**: TypeScript complains about event names

**Solution**: Use the predefined `AnalyticsEvent` type:

```tsx
import { trackEvent, type AnalyticsEvent } from '@/src/lib/analytics';

const eventName: AnalyticsEvent = 'email_signup';
trackEvent(eventName, { source: 'homepage' });
```

### Client Component Required

**Problem**: `window is not defined` error

**Solution**: Analytics must be used in client components:

```tsx
'use client';  // Add this directive

import { trackEvent } from '@/src/lib/analytics';
```

## Goal Configuration

Configure these goals in your Plausible dashboard:

1. **Email Signups**: `email_signup`
2. **Video Plays**: `video_play`
3. **Resource Downloads**: `resource_download`
4. **Quiz Completions**: `quiz_complete`
5. **CTA Clicks**: `cta_click`
6. **Form Submissions**: `form_submit`
7. **Calculator Usage**: `calculator_use`
8. **Social Shares**: `social_share`

## Next Steps

1. Review existing components
2. Add tracking to high-value interactions
3. Test in development
4. Deploy and verify in production
5. Configure goals in Plausible dashboard
6. Monitor analytics and optimize

## Resources

- [Analytics README](../components/analytics/README.md)
- [Plausible Events API](https://plausible.io/docs/custom-event-goals)
- [Vercel Analytics](https://vercel.com/docs/analytics)
