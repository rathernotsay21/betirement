# QA Testing Checklist

## Quick Reference

This checklist provides a quick reference for testing the Betirement website before launch or after major updates.

## Automated Tests

Run these automated tests first:

```bash
# Run all automated QA tests
npm run qa:all

# Check all links
npm run qa:links

# Run performance tests
npm run perf
```

### Automated Test Results

- [ ] All form validation tests pass (`npm run qa:forms`)
- [ ] QA checklist passes (`npm run qa:checklist`)
- [ ] No broken links found (`npm run qa:links`)
- [ ] Lighthouse performance score 90+ (`npm run lighthouse:mobile`)
- [ ] Lighthouse accessibility score 95+
- [ ] No console errors in browser DevTools

---

## Manual Testing Checklist

### Browser Testing

Test on these browsers (latest versions):

#### Desktop
- [ ] Chrome - All features work
- [ ] Safari - All features work
- [ ] Firefox - All features work
- [ ] Edge - All features work

#### Mobile
- [ ] Safari (iOS) - All features work
- [ ] Chrome (iOS) - All features work
- [ ] Chrome (Android) - All features work
- [ ] Samsung Internet (Android) - All features work

### Device Testing

Test on these device types:

- [ ] Small phone (320px-374px)
- [ ] Standard phone (375px-413px)
- [ ] Large phone (414px+)
- [ ] Tablet portrait (768px)
- [ ] Tablet landscape (1024px)
- [ ] Desktop (1280px+)

### Page Testing

Test all critical pages:

- [ ] Home page (`/`)
- [ ] About page (`/about`)
- [ ] Start Here page (`/start-here`)
- [ ] Speaking page (`/speaking`)
- [ ] Video Library (`/content/videos`)
- [ ] Individual video page
- [ ] Blog page (`/content/blog`)
- [ ] Individual blog post
- [ ] Resources page (`/content/resources`)
- [ ] Community page (`/community`)
- [ ] Contact page (`/contact`)
- [ ] 404 page (test with invalid URL)
- [ ] Legal pages (Privacy, Terms, Disclaimer, Affiliate)

### Form Testing

Test all forms on multiple devices:

#### Email Capture Forms
- [ ] Home page inline form
- [ ] Slide-in email capture (after 30s)
- [ ] Exit-intent popup
- [ ] Resource download email gate
- [ ] Quiz completion email capture

**For each form:**
- [ ] Valid email submits successfully
- [ ] Invalid email shows error
- [ ] Empty field shows error
- [ ] Success message displays
- [ ] Form is accessible via keyboard
- [ ] Error messages are announced by screen reader

#### Contact Form
- [ ] All fields validate correctly
- [ ] Required fields show errors when empty
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Submission appears in Netlify dashboard
- [ ] Email notification received

#### Booking Request Form (Speaking Page)
- [ ] All fields validate correctly
- [ ] Date picker works
- [ ] Form submits successfully
- [ ] Submission appears in Netlify dashboard

#### Quiz Form (Start Here)
- [ ] All questions can be answered
- [ ] Progress indicator updates
- [ ] Results page displays
- [ ] Personalized recommendations show
- [ ] Email capture works after quiz

### Video Testing

Test video functionality:

- [ ] Video library loads correctly
- [ ] Category filters work
- [ ] Search functionality works
- [ ] Videos play on click
- [ ] Video player controls work
- [ ] Fullscreen mode works
- [ ] Videos play on mobile devices
- [ ] Videos play in all browsers

### Navigation Testing

- [ ] Desktop menu works
- [ ] Mobile hamburger menu opens/closes
- [ ] All menu links work
- [ ] Dropdown menus work (if applicable)
- [ ] Footer links work
- [ ] Breadcrumbs work (if applicable)
- [ ] Back button works correctly
- [ ] Internal links work
- [ ] External links open in new tab

### Email Integration Testing

#### ConvertKit Integration
- [ ] Email subscription adds to ConvertKit
- [ ] Correct tags are applied
- [ ] Welcome email is received
- [ ] Email content is correct
- [ ] Unsubscribe link works
- [ ] No duplicate subscribers created

#### Netlify Forms
- [ ] Form submissions appear in dashboard
- [ ] Email notifications are received
- [ ] All form data is captured
- [ ] Spam protection works (honeypot)

### Analytics Testing

- [ ] Vercel Analytics tracking works
- [ ] Plausible Analytics tracking works (if configured)
- [ ] Page views are tracked
- [ ] Custom events fire correctly:
  - [ ] Email signups
  - [ ] Video plays
  - [ ] Resource downloads
  - [ ] External link clicks
- [ ] No analytics errors in console

### Performance Testing

- [ ] Home page loads in < 2 seconds (fast connection)
- [ ] Home page is usable in < 5 seconds (slow connection)
- [ ] Images load progressively
- [ ] No layout shifts during load (CLS < 0.1)
- [ ] Fonts load without flash
- [ ] Videos don't autoplay
- [ ] Lazy loading works for below-fold images

### Accessibility Testing

#### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Enter key submits forms
- [ ] Escape key closes modals
- [ ] Skip to content link works

#### Screen Reader Testing
- [ ] Page title is announced
- [ ] Headings are announced correctly
- [ ] Heading hierarchy is logical
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Images have alt text
- [ ] Links have descriptive text

#### Visual Accessibility
- [ ] Text contrast ratio is 4.5:1 minimum
- [ ] Large text contrast is 3:1 minimum
- [ ] Color is not the only indicator
- [ ] Text is readable at 200% zoom
- [ ] No horizontal scrolling at 200% zoom

### Security Testing

- [ ] SSL certificate is valid
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] No mixed content warnings
- [ ] Security headers are set:
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Referrer-Policy
  - [ ] Strict-Transport-Security (production)
- [ ] Form spam protection works
- [ ] Rate limiting works on API routes
- [ ] No sensitive data in client-side code
- [ ] Environment variables are secure

### SEO Testing

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Open Graph tags are present
- [ ] Twitter Card tags are present
- [ ] Canonical URLs are set
- [ ] Sitemap is accessible (`/sitemap.xml`)
- [ ] Robots.txt is accessible (`/robots.txt`)
- [ ] Schema markup is present:
  - [ ] Organization schema
  - [ ] Person schema (About page)
  - [ ] Article schema (Blog posts)
  - [ ] Video schema (Video pages)
- [ ] Images have alt text
- [ ] Heading hierarchy is correct (H1 → H2 → H3)

### Mobile-Specific Testing

- [ ] Touch targets are 44x44px minimum
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming
- [ ] Forms are easy to fill on mobile
- [ ] Keyboard appears for inputs
- [ ] Pinch-to-zoom works (if enabled)
- [ ] Orientation changes work
- [ ] Mobile menu works smoothly
- [ ] Videos play on mobile
- [ ] Modal dialogs work on mobile

### Error Handling Testing

- [ ] 404 page displays for invalid URLs
- [ ] 404 page has helpful content
- [ ] 404 page has link to home
- [ ] Error page displays for server errors
- [ ] Error boundary catches client errors
- [ ] Form validation errors are clear
- [ ] API errors show user-friendly messages
- [ ] Network errors are handled gracefully

### Content Testing

- [ ] All text is free of typos
- [ ] All images load correctly
- [ ] All images are optimized (WebP)
- [ ] All videos are embedded correctly
- [ ] All links go to correct destinations
- [ ] All CTAs are clear and working
- [ ] All dates are current
- [ ] All contact information is correct

### Cross-Browser Issues

Check for these common issues:

#### Safari-Specific
- [ ] Date inputs render correctly
- [ ] Videos play without autoplay
- [ ] Fixed positioning works during scroll
- [ ] Flexbox and Grid layouts work

#### Firefox-Specific
- [ ] Custom scrollbar styling works
- [ ] Form validation messages display
- [ ] Grid layouts work correctly

#### iOS Safari-Specific
- [ ] Input zoom doesn't occur (font-size 16px+)
- [ ] Fixed elements work during scroll
- [ ] Momentum scrolling works
- [ ] Address bar height changes handled

#### Android Chrome-Specific
- [ ] Back button navigates correctly
- [ ] Address bar height changes handled
- [ ] Touch interactions work

---

## Pre-Launch Final Checks

Before launching to production:

### Technical Checks
- [ ] All automated tests pass
- [ ] All manual tests complete
- [ ] No console errors
- [ ] No broken links
- [ ] Performance scores meet targets
- [ ] Accessibility scores meet targets
- [ ] SSL certificate valid
- [ ] DNS configured correctly
- [ ] Environment variables set in production

### Content Checks
- [ ] All placeholder content replaced
- [ ] All images have proper alt text
- [ ] All links tested
- [ ] Legal pages complete
- [ ] Contact information correct
- [ ] Social media links correct
- [ ] Analytics tracking verified

### Integration Checks
- [ ] Email integration working
- [ ] Form submissions working
- [ ] YouTube API working
- [ ] Analytics tracking working
- [ ] Netlify Forms configured
- [ ] ConvertKit configured

### Documentation Checks
- [ ] README is up to date
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Known issues documented
- [ ] Contact information for support

---

## Post-Launch Monitoring

After launch, monitor these:

### Daily (First Week)
- [ ] Check analytics for traffic
- [ ] Monitor error logs
- [ ] Check form submissions
- [ ] Verify email deliverability
- [ ] Monitor uptime

### Weekly
- [ ] Review analytics data
- [ ] Check for broken links
- [ ] Monitor performance metrics
- [ ] Review form submissions
- [ ] Check email integration

### Monthly
- [ ] Run full QA checklist
- [ ] Update dependencies
- [ ] Review security
- [ ] Check SSL certificate expiration
- [ ] Analyze user feedback

---

## Issue Severity Levels

When issues are found, classify them:

### Critical (Fix Immediately)
- Site is down or inaccessible
- Forms don't submit
- Payment processing broken (future)
- Security vulnerability
- Data loss risk

### High (Fix Within 24 Hours)
- Major feature doesn't work
- Broken links on main pages
- Email integration broken
- Performance severely degraded
- Accessibility blocker

### Medium (Fix Within 1 Week)
- Minor feature doesn't work
- Cosmetic issues on main pages
- Performance slightly degraded
- Accessibility issue (non-blocker)
- Browser-specific issue

### Low (Fix When Possible)
- Minor cosmetic issues
- Enhancement requests
- Nice-to-have features
- Documentation updates

---

## Sign-Off

### QA Testing Complete

- [ ] All automated tests pass
- [ ] All manual tests complete
- [ ] All critical issues resolved
- [ ] All high-priority issues resolved
- [ ] Medium/low issues documented
- [ ] Testing documentation complete

**Tested By:** ___________________

**Date:** ___________________

**Approved By:** ___________________

**Date:** ___________________

---

## Resources

- **Detailed Testing Guide:** `docs/QA_TESTING_GUIDE.md`
- **Browser Compatibility:** `docs/BROWSER_COMPATIBILITY_MATRIX.md`
- **Performance Testing:** `docs/PERFORMANCE_TESTING.md`
- **Accessibility Guide:** `docs/ACCESSIBILITY.md`
- **Security Guide:** `docs/SECURITY.md`
