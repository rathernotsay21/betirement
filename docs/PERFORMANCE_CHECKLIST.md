# Performance Optimization Checklist

Use this checklist to ensure all performance optimizations are implemented and maintained.

## Pre-Launch Performance Audit

### Images
- [ ] All images use Next.js Image component
- [ ] Images are optimized and compressed (< 200KB each)
- [ ] WebP format is used with fallbacks
- [ ] Above-fold images use `priority` prop
- [ ] Below-fold images use lazy loading
- [ ] All images have proper width and height attributes
- [ ] Responsive images with appropriate sizes
- [ ] Alt text provided for all images

### Fonts
- [ ] Fonts loaded using next/font
- [ ] Font display set to 'swap'
- [ ] Only necessary font weights included
- [ ] Font subsetting enabled
- [ ] Preconnect to font CDN if using external fonts

### JavaScript
- [ ] Bundle size analyzed and optimized
- [ ] Heavy components use dynamic imports
- [ ] Unused dependencies removed
- [ ] Tree shaking enabled
- [ ] Code splitting implemented
- [ ] Third-party scripts deferred or lazy loaded
- [ ] No console.log statements in production

### CSS
- [ ] Unused CSS removed
- [ ] Critical CSS inlined (if applicable)
- [ ] CSS minified in production
- [ ] Tailwind CSS purged properly
- [ ] No large CSS frameworks unless necessary

### Caching
- [ ] Static assets have long-term caching (1 year)
- [ ] HTML pages have appropriate cache headers
- [ ] API routes have proper cache control
- [ ] ISR configured for semi-static pages
- [ ] CDN configured and working

### Core Web Vitals
- [ ] LCP < 2.5s on mobile
- [ ] LCP < 2.5s on desktop
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] No layout shifts on page load
- [ ] Space reserved for dynamic content

### Lighthouse Scores
- [ ] Performance score ≥ 90 (mobile)
- [ ] Performance score ≥ 90 (desktop)
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 95
- [ ] SEO score ≥ 95

### Network
- [ ] Tested on slow 3G connection
- [ ] Tested on fast 3G connection
- [ ] Tested on 4G connection
- [ ] Page loads in < 10s on slow 3G
- [ ] Page loads in < 5s on fast 3G
- [ ] Page loads in < 3s on 4G

### Rendering
- [ ] Server components used where possible
- [ ] Client components minimized
- [ ] Hydration errors resolved
- [ ] No render-blocking resources
- [ ] Critical rendering path optimized

## Post-Launch Monitoring

### Analytics Setup
- [ ] Vercel Analytics configured
- [ ] Plausible Analytics configured
- [ ] Performance monitoring active
- [ ] Core Web Vitals tracked
- [ ] Custom events tracked
- [ ] Error tracking configured

### Regular Audits
- [ ] Weekly Lighthouse audits scheduled
- [ ] Monthly performance reviews scheduled
- [ ] Bundle size monitored with each deployment
- [ ] Performance budgets set
- [ ] Alerts configured for regressions

### Continuous Optimization
- [ ] Dependencies updated regularly
- [ ] Performance issues prioritized
- [ ] User feedback reviewed
- [ ] Real user metrics analyzed
- [ ] Optimization opportunities identified

## Performance Budget

### JavaScript
- First Load JS: < 200KB
- Page-specific JS: < 100KB
- Shared chunks: < 150KB

### Images
- Hero images: < 200KB
- Content images: < 100KB
- Thumbnails: < 50KB

### Fonts
- Total font size: < 100KB
- Font files: < 50KB each

### Total Page Weight
- Home page: < 1MB
- Content pages: < 800KB
- Landing pages: < 600KB

### Timing Metrics
- TTFB: < 800ms
- FCP: < 1.8s
- LCP: < 2.5s
- TTI: < 3.5s
- TBT: < 300ms

## Common Performance Issues

### Issue: Slow LCP
**Check:**
- [ ] Large images above the fold
- [ ] Missing priority prop on hero images
- [ ] Render-blocking resources
- [ ] Slow server response time
- [ ] Missing image dimensions

**Fix:**
- Optimize and compress images
- Add priority prop to above-fold images
- Defer non-critical resources
- Implement caching
- Specify image dimensions

### Issue: High CLS
**Check:**
- [ ] Images without dimensions
- [ ] Dynamic content insertion
- [ ] Web fonts causing FOUT
- [ ] Ads or embeds without reserved space
- [ ] Late-loading stylesheets

**Fix:**
- Always specify image dimensions
- Reserve space for dynamic content
- Use font-display: swap
- Set min-height for dynamic areas
- Inline critical CSS

### Issue: Large Bundle
**Check:**
- [ ] Heavy dependencies
- [ ] Lack of code splitting
- [ ] Unused code
- [ ] Large libraries
- [ ] Duplicate dependencies

**Fix:**
- Use dynamic imports
- Replace heavy dependencies
- Remove unused code
- Use tree shaking
- Analyze and optimize bundle

### Issue: Slow API Responses
**Check:**
- [ ] No caching
- [ ] Inefficient queries
- [ ] Cold starts
- [ ] Missing indexes
- [ ] N+1 queries

**Fix:**
- Implement caching strategy
- Optimize queries
- Use ISR for semi-static content
- Add database indexes
- Batch requests

## Testing Commands

```bash
# Run full performance audit
npm run perf

# Run Lighthouse audit (mobile)
npm run lighthouse:mobile

# Run Lighthouse audit (desktop)
npm run lighthouse:desktop

# Analyze bundle size
npm run analyze

# Test slow connections
npm run test:performance

# Build and check for errors
npm run build
```

## Performance Monitoring Dashboard

### Key Metrics to Track
1. **Core Web Vitals**
   - LCP trend over time
   - FID/INP trend over time
   - CLS trend over time

2. **Page Load Times**
   - Average load time by page
   - 95th percentile load time
   - Load time by device type
   - Load time by connection speed

3. **Bundle Size**
   - Total bundle size trend
   - First Load JS trend
   - Largest chunks
   - Bundle size by route

4. **Resource Metrics**
   - Total page weight
   - Number of requests
   - Resource types breakdown
   - Failed resource loads

5. **User Experience**
   - Bounce rate by load time
   - Conversion rate by performance
   - User satisfaction scores
   - Error rates

## Optimization Priorities

### High Priority (Do First)
1. Optimize images (biggest impact)
2. Implement code splitting
3. Configure caching properly
4. Fix layout shifts
5. Optimize fonts

### Medium Priority (Do Next)
1. Defer third-party scripts
2. Optimize API responses
3. Implement service worker
4. Optimize CSS delivery
5. Add performance monitoring

### Low Priority (Nice to Have)
1. Implement prefetching
2. Add resource hints
3. Optimize animations
4. Implement progressive enhancement
5. Add offline support

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Performance Budget Calculator](https://www.performancebudget.io/)

## Notes

- Run performance audits before each major release
- Monitor Core Web Vitals in production
- Set up alerts for performance regressions
- Review performance metrics weekly
- Prioritize user-facing performance improvements
- Document all optimization decisions
- Share performance wins with the team
