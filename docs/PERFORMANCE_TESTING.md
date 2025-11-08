# Performance Testing and Optimization Guide

This guide covers performance testing procedures, optimization strategies, and monitoring for the Betirement website.

## Table of Contents

1. [Performance Testing](#performance-testing)
2. [Core Web Vitals](#core-web-vitals)
3. [Bundle Optimization](#bundle-optimization)
4. [Caching Strategy](#caching-strategy)
5. [Monitoring](#monitoring)

## Performance Testing

### Lighthouse Audits

Run Lighthouse audits on all major pages to measure performance, accessibility, best practices, and SEO.

#### Running Audits

```bash
# Install dependencies (first time only)
npm install --save-dev lighthouse chrome-launcher

# Run audits on local development server
npm run dev
# In another terminal:
node scripts/lighthouse-audit.js http://localhost:3000 mobile

# Run audits on production
node scripts/lighthouse-audit.js https://betirement.com mobile

# Run desktop audits
node scripts/lighthouse-audit.js https://betirement.com desktop
```

#### Interpreting Results

Reports are saved to `lighthouse-reports/[timestamp]/`:
- Individual HTML reports for each page
- Summary JSON with all scores
- Summary markdown with recommendations

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Slow Connection Testing

Test page load times under various network conditions to ensure good performance for all users.

```bash
# Install Puppeteer (first time only)
npm install --save-dev puppeteer

# Run slow connection tests
node scripts/test-slow-connection.js http://localhost:3000
```

**Network Profiles Tested:**
- Slow 3G: 500 Kbps, 400ms latency
- Fast 3G: 1.6 Mbps, 150ms latency
- 4G: 4 Mbps, 50ms latency

**Target Load Times:**
- Slow 3G: < 10s
- Fast 3G: < 5s
- 4G: < 3s

### Bundle Analysis

Analyze JavaScript bundle size to identify optimization opportunities.

```bash
# Build the project first
npm run build

# Analyze bundle
node scripts/analyze-bundle.js
```

**Bundle Size Targets:**
- First Load JS: < 200KB
- Individual page bundles: < 100KB
- Shared chunks: < 150KB

## Core Web Vitals

### Largest Contentful Paint (LCP)

**Target:** < 2.5 seconds

**Optimization Strategies:**
1. Optimize images with Next.js Image component
2. Use priority loading for above-fold images
3. Minimize render-blocking resources
4. Use CDN for static assets
5. Implement proper caching

**Implementation:**
```tsx
// Priority loading for hero images
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  quality={85}
/>

// Lazy loading for below-fold images
<Image
  src="/images/content.jpg"
  alt="Content"
  width={800}
  height={400}
  loading="lazy"
/>
```

### First Input Delay (FID)

**Target:** < 100 milliseconds

**Optimization Strategies:**
1. Minimize JavaScript execution time
2. Use code splitting and dynamic imports
3. Defer non-critical JavaScript
4. Optimize third-party scripts
5. Use web workers for heavy computations

**Implementation:**
```tsx
// Dynamic imports for heavy components
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Defer third-party scripts
<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
/>
```

### Cumulative Layout Shift (CLS)

**Target:** < 0.1

**Optimization Strategies:**
1. Always specify image dimensions
2. Reserve space for dynamic content
3. Avoid inserting content above existing content
4. Use CSS aspect-ratio for responsive images
5. Preload fonts to prevent FOIT/FOUT

**Implementation:**
```tsx
// Always specify dimensions
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>

// Reserve space for dynamic content
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>

// Use aspect-ratio for responsive containers
<div className="aspect-video">
  <iframe src="..." />
</div>
```

## Bundle Optimization

### Code Splitting

Next.js automatically splits code by route, but you can optimize further:

#### Dynamic Imports

```tsx
// Heavy components
const Calculator = dynamic(() => import('@/components/calculators/RetirementCalculator'));
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'));
const Chart = dynamic(() => import('@/components/Chart'));

// Modal components
const EmailGateModal = dynamic(() => import('@/components/content/EmailGateModal'));
const ExitIntentPopup = dynamic(() => import('@/components/sections/ExitIntentPopup'));
```

#### Route-Based Splitting

```tsx
// app/content/videos/page.tsx
export default async function VideosPage() {
  // This page's code is automatically split
  return <VideoLibrary />;
}
```

### Tree Shaking

Ensure proper tree shaking by:

1. Using ES6 imports
2. Avoiding default exports for utilities
3. Using named imports from libraries

```tsx
// Good - tree shakeable
import { formatDate, formatCurrency } from '@/lib/utils';

// Bad - imports entire library
import _ from 'lodash';

// Good - imports only what's needed
import debounce from 'lodash/debounce';
```

### Dependency Optimization

#### Analyze Dependencies

```bash
# Check for large dependencies
npm list --depth=0

# Analyze what's in your bundle
npm run build
node scripts/analyze-bundle.js
```

#### Replace Heavy Dependencies

- Use `date-fns` instead of `moment`
- Use native browser APIs instead of `lodash` where possible
- Use `clsx` instead of `classnames`
- Use `lucide-react` instead of `react-icons` (already implemented)

### Image Optimization

All images should use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Configuration in next.config.mjs:**
```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Caching Strategy

### Static Assets

**Configuration in netlify.toml:**
```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### API Routes

```typescript
// app/api/videos/route.ts
export async function GET() {
  const videos = await fetchVideos();
  
  return NextResponse.json(videos, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### ISR (Incremental Static Regeneration)

```typescript
// app/content/videos/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function VideosPage() {
  const videos = await getVideos();
  return <VideoLibrary videos={videos} />;
}
```

### Font Optimization

Already implemented with next/font:

```typescript
// app/layout.tsx
import { Inter, Open_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

## Monitoring

### Vercel Analytics

Already integrated - monitors Core Web Vitals automatically:

```tsx
// app/layout.tsx
import { VercelAnalytics } from '@/src/components/analytics';

<VercelAnalytics />
```

### Plausible Analytics

Custom event tracking for performance monitoring:

```typescript
import { trackEvent } from '@/src/lib/analytics';

// Track slow page loads
if (loadTime > 3000) {
  trackEvent('slow_page_load', {
    page: window.location.pathname,
    loadTime,
  });
}

// Track resource errors
window.addEventListener('error', (e) => {
  if (e.target instanceof HTMLImageElement) {
    trackEvent('image_load_error', {
      src: e.target.src,
    });
  }
});
```

### Lighthouse CI

Set up continuous monitoring with Lighthouse CI:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

### Performance Budget

Set performance budgets to prevent regressions:

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }]
      }
    }
  }
}
```

## Optimization Checklist

### Pre-Launch

- [ ] Run Lighthouse audits on all major pages
- [ ] Test on slow 3G connection
- [ ] Analyze bundle size
- [ ] Verify all images use Next.js Image component
- [ ] Check for unused dependencies
- [ ] Verify caching headers are set correctly
- [ ] Test Core Web Vitals on real devices
- [ ] Set up performance monitoring
- [ ] Configure performance budgets
- [ ] Test with JavaScript disabled (progressive enhancement)

### Post-Launch

- [ ] Monitor Core Web Vitals in production
- [ ] Set up alerts for performance regressions
- [ ] Review analytics for slow pages
- [ ] Conduct monthly performance audits
- [ ] Update dependencies regularly
- [ ] Monitor bundle size with each deployment
- [ ] Review and optimize based on real user data

## Common Issues and Solutions

### Issue: High LCP

**Causes:**
- Large images above the fold
- Render-blocking resources
- Slow server response time

**Solutions:**
- Use priority loading for hero images
- Optimize image sizes
- Implement proper caching
- Use CDN for static assets

### Issue: High CLS

**Causes:**
- Images without dimensions
- Dynamic content insertion
- Web fonts causing FOUT

**Solutions:**
- Always specify image dimensions
- Reserve space for dynamic content
- Use font-display: swap
- Preload critical fonts

### Issue: Large Bundle Size

**Causes:**
- Heavy dependencies
- Lack of code splitting
- Unused code

**Solutions:**
- Use dynamic imports
- Replace heavy dependencies
- Enable tree shaking
- Remove unused code

### Issue: Slow API Responses

**Causes:**
- No caching
- Inefficient queries
- Cold starts

**Solutions:**
- Implement caching strategy
- Use ISR for semi-static content
- Optimize API queries
- Use edge functions

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Netlify Performance](https://docs.netlify.com/performance/)
