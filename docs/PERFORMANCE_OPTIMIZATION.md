# Performance Optimization Guide

This document outlines all performance optimizations implemented in the Betirement website.

## Overview

The Betirement website is optimized for maximum performance with a target Lighthouse score of 90+ across all metrics. This guide documents the strategies and implementations used to achieve optimal performance.

## Performance Targets

- **Performance Score**: 90+ (mobile and desktop)
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## Implemented Optimizations

### 1. Font Optimization ✅

**Implementation**: Using `next/font/google` for automatic font optimization.

**Location**: `app/layout.tsx`

```typescript
import { Inter, Open_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});
```

**Benefits**:
- Automatic font subsetting
- Self-hosting of Google Fonts
- Zero layout shift with `font-display: swap`
- CSS variable approach for easy theming
- Preloading of critical fonts

### 2. Image Optimization ✅

**Implementation**: Next.js Image component with WebP/AVIF support.

**Configuration**: `next.config.mjs`

```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'i.ytimg.com',
      pathname: '/vi/**',
    },
  ],
}
```

**Utilities**: `src/lib/image-optimization.ts`

**Benefits**:
- Automatic format conversion (WebP/AVIF)
- Responsive image sizing
- Lazy loading by default
- Blur placeholders
- CDN optimization via Netlify

**Usage Examples**:

```typescript
// Hero image (above fold)
import { getImageProps } from '@/src/lib/image-optimization';

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  {...getImageProps('hero')}
/>

// Thumbnail (below fold)
<Image
  src="/images/thumb.jpg"
  alt="Thumbnail"
  width={400}
  height={300}
  {...getImageProps('thumbnail')}
/>
```

### 3. Code Splitting & Dynamic Imports ✅

**Implementation**: Dynamic imports for heavy components that are below the fold or conditionally rendered.

**Optimized Components**:

#### Home Page (`app/page.tsx`)
- `ExitIntentPopup` - Only loads when needed
- `SlideInEmailCapture` - Delayed load (30s)
- `SocialProofNotification` - Delayed load (10s)

```typescript
const ExitIntentPopup = dynamic(
  () => import('@/src/components/sections').then((mod) => mod.ExitIntentPopup),
  { ssr: false }
);
```

#### About Page (`app/about/page.tsx`)
- `InteractiveTimeline` - Heavy animation component

```typescript
const InteractiveTimeline = dynamic(
  () => import('@/src/components/sections').then((mod) => mod.InteractiveTimeline),
  {
    loading: () => <LoadingSpinner />,
  }
);
```

#### Resources Page (`app/content/resources/page.tsx`)
- `RetirementCalculator` - Complex calculation logic
- `BitcoinAllocationCalculator` - Complex calculation logic

```typescript
const RetirementCalculator = dynamic(
  () => import("@/src/components/calculators/RetirementCalculator"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);
```

#### Start Here Page (`app/start-here/page.tsx`)
- `InteractiveQuiz` - Interactive form with state management
- `LearningPathRecommendation` - Results display

#### Speaking Page (`app/speaking/page.tsx`)
- `BookingRequestForm` - Form component below the fold

#### Community Page (`app/community/page.tsx`)
- `ForumPlaceholder` - External integration
- `SuccessStoryForm` - Form component
- `InstagramFeed` - External API calls
- `TwitterTimeline` - External widget
- `SocialFollowerStats` - API calls

**Benefits**:
- Reduced initial bundle size
- Faster Time to Interactive (TTI)
- Better First Contentful Paint (FCP)
- Improved Largest Contentful Paint (LCP)
- Conditional loading saves bandwidth

### 4. Lazy Loading Strategy ✅

**Implementation**: Automatic lazy loading for below-fold images via Next.js Image component.

**Priority Loading**:
- Hero images: `priority={true}`
- Above-fold content: `priority={true}`
- Below-fold content: Default lazy loading

**Example**:

```typescript
// Above fold - load immediately
<Image src="/hero.jpg" alt="Hero" priority={true} />

// Below fold - lazy load
<Image src="/content.jpg" alt="Content" /> // priority defaults to false
```

### 5. Bundle Optimization ✅

**Configuration**: `next.config.mjs`

```javascript
swcMinify: true, // Use SWC for faster minification
output: 'standalone', // Optimized for Netlify
```

**Automatic Optimizations**:
- Tree shaking of unused code
- Minification of JavaScript and CSS
- Automatic code splitting by route
- Shared chunk optimization

### 6. Caching Strategy ✅

**Static Assets**: `next.config.mjs`

```javascript
{
  source: '/images/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

**ISR (Incremental Static Regeneration)**:
- Video pages: Revalidate every hour
- Blog posts: Revalidate on demand
- Static pages: Build-time generation

### 7. CSS Optimization ✅

**Implementation**: Tailwind CSS with JIT compiler

**Configuration**: `tailwind.config.ts`

```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
```

**Benefits**:
- Only includes used CSS classes
- Minimal CSS bundle size
- Automatic purging of unused styles
- Critical CSS inlined automatically

### 8. JavaScript Optimization ✅

**Strategies**:
- Client components only when needed
- Server components by default
- Dynamic imports for heavy libraries
- Debounced search inputs
- Memoized callbacks

**Example**:

```typescript
// Debounced search
const debouncedSearch = useMemo(
  () => debounce((query: string) => {
    setSearchQuery(query);
  }, 300),
  []
);
```

## Performance Monitoring

### Analytics Integration

**Vercel Analytics**: Automatic Core Web Vitals tracking

```typescript
import { VercelAnalytics } from '@/src/components/analytics';

<VercelAnalytics />
```

**Plausible Analytics**: Privacy-focused page view tracking

```typescript
import { PlausibleAnalytics } from '@/src/components/analytics';

<PlausibleAnalytics />
```

### Custom Performance Tracking

Track custom performance metrics:

```typescript
if (typeof window !== 'undefined' && window.plausible) {
  window.plausible('Performance', {
    props: {
      metric: 'LCP',
      value: lcpValue,
    },
  });
}
```

## Testing Performance

### Lighthouse CI

Run Lighthouse audits locally:

```bash
npm run build
npm run start
# In another terminal
npx lighthouse http://localhost:3000 --view
```

### WebPageTest

Test on real devices and connections:
1. Visit https://www.webpagetest.org/
2. Enter your URL
3. Select test location and device
4. Run test and analyze results

### Chrome DevTools

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories to test
4. Click "Generate report"

## Performance Checklist

### Pre-Deployment

- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Check bundle size (`npm run build`)
- [ ] Verify image optimization (WebP/AVIF served)
- [ ] Test on slow 3G connection
- [ ] Verify lazy loading works
- [ ] Check for layout shifts (CLS)
- [ ] Test on mobile devices
- [ ] Verify font loading (no FOIT/FOUT)
- [ ] Check JavaScript bundle size
- [ ] Verify caching headers

### Post-Deployment

- [ ] Monitor Core Web Vitals in Vercel Analytics
- [ ] Check real user metrics
- [ ] Monitor error rates
- [ ] Track page load times
- [ ] Monitor API response times
- [ ] Check CDN cache hit rates

## Common Performance Issues

### Issue: High LCP

**Causes**:
- Large images above the fold
- Slow server response
- Render-blocking resources

**Solutions**:
- Use `priority={true}` for hero images
- Optimize image sizes
- Use CDN for static assets
- Implement ISR for dynamic content

### Issue: High CLS

**Causes**:
- Images without dimensions
- Dynamic content insertion
- Web fonts loading

**Solutions**:
- Always set width/height on images
- Use `font-display: swap`
- Reserve space for dynamic content
- Use skeleton loaders

### Issue: High FID

**Causes**:
- Large JavaScript bundles
- Long-running scripts
- Heavy event handlers

**Solutions**:
- Use dynamic imports
- Debounce user inputs
- Use Web Workers for heavy computation
- Optimize event handlers

### Issue: Slow TTI

**Causes**:
- Too much JavaScript
- Render-blocking resources
- Unoptimized third-party scripts

**Solutions**:
- Code splitting
- Lazy load below-fold components
- Defer non-critical scripts
- Use dynamic imports

## Best Practices

1. **Always use Next.js Image component** for images
2. **Set explicit dimensions** on all images
3. **Use dynamic imports** for heavy components
4. **Implement lazy loading** for below-fold content
5. **Optimize fonts** with next/font
6. **Monitor Core Web Vitals** continuously
7. **Test on real devices** and slow connections
8. **Use CDN** for static assets
9. **Implement caching** strategies
10. **Minimize JavaScript** bundle size

## Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Image Optimization Guide](./IMAGE_OPTIMIZATION_GUIDE.md)

## Maintenance

### Regular Tasks

- **Weekly**: Review Core Web Vitals metrics
- **Monthly**: Run full Lighthouse audit
- **Quarterly**: Review and optimize bundle sizes
- **As needed**: Update dependencies for performance improvements

### Performance Budget

Set and monitor performance budgets:

- **JavaScript**: < 200KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **Images**: < 200KB per image
- **Total Page Weight**: < 1MB
- **Requests**: < 50 per page

## Conclusion

Performance optimization is an ongoing process. Regular monitoring and testing ensure the Betirement website maintains excellent performance scores and provides a fast, smooth experience for all users.
