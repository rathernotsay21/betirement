# Pre-Launch Checklist

This document provides a comprehensive checklist for final review before launching the Betirement website to production.

## Quick Start

Run the automated pre-launch checklist:

```bash
# Run all pre-launch checks
npm run pre-launch

# Or run individual checks
npm run qa:checklist
npm run qa:forms
npm run qa:links
npm run lighthouse:mobile
```

---

## 1. Content Review ✍️

### Text Content
- [ ] Review all page content for typos and grammatical errors
- [ ] Verify all headlines are compelling and clear
- [ ] Check that all CTAs are action-oriented and visible
- [ ] Ensure no placeholder text remains (Lorem ipsum, TODO, FIXME)
- [ ] Verify all dates are current and accurate
- [ ] Check author bio and contact information is correct

### Blog Posts
- [ ] At least 3-5 blog posts published
- [ ] All blog posts have proper frontmatter (title, date, excerpt, etc.)
- [ ] Blog post content is well-formatted
- [ ] All blog images are optimized
- [ ] Reading time is calculated correctly

### Legal Content
- [ ] Privacy Policy is complete and accurate
- [ ] Terms of Service are complete
- [ ] Disclaimer clearly states "not financial advice"
- [ ] Affiliate Disclosure is present and compliant
- [ ] Cookie consent banner is functional

---

## 2. Image Verification 🖼️

### Alt Text
- [ ] All images have descriptive alt text
- [ ] Alt text is meaningful (not just "image" or filename)
- [ ] Decorative images have empty alt text (alt="")
- [ ] Complex images have detailed descriptions

### Image Optimization
- [ ] All images are in WebP format (with fallbacks)
- [ ] Images are properly sized (not oversized)
- [ ] Images use Next.js Image component
- [ ] Lazy loading is enabled for below-fold images
- [ ] Image quality is set appropriately (75-85)

### Image Locations to Check
- [ ] Hero section images
- [ ] About page timeline images
- [ ] Blog post featured images
- [ ] Video thumbnails
- [ ] Resource card images
- [ ] Team/author photos
- [ ] Social media preview images (og:image)

---

## 3. Email Integration Testing 📧

### ConvertKit Integration
- [ ] API keys are set in environment variables
- [ ] Test email signup from home page
- [ ] Test email signup from blog posts
- [ ] Test email signup from resource downloads
- [ ] Test email signup from quiz completion
- [ ] Verify subscriber appears in ConvertKit dashboard
- [ ] Check that correct tags are applied
- [ ] Confirm welcome email is received
- [ ] Test unsubscribe link works
- [ ] Verify no duplicate subscribers are created

### Email Capture Forms
- [ ] Inline form on home page works
- [ ] Slide-in form triggers after 30 seconds
- [ ] Exit-intent popup works
- [ ] Resource download email gate works
- [ ] Quiz completion email capture works
- [ ] All forms have proper validation
- [ ] Success messages display correctly
- [ ] Error messages are user-friendly

### Netlify Forms
- [ ] Contact form submissions appear in Netlify dashboard
- [ ] Booking request form submissions work
- [ ] Email notifications are received
- [ ] Honeypot spam protection is active
- [ ] Form data is complete and accurate

---

## 4. YouTube API Integration 🎥

### API Configuration
- [ ] YouTube API key is set in environment variables
- [ ] Channel ID is correct
- [ ] API quota is sufficient for expected traffic
- [ ] Error handling is in place for API failures
- [ ] Caching is configured (1 hour revalidation)

### Video Library
- [ ] Videos load correctly on video library page
- [ ] Category filters work
- [ ] Search functionality works
- [ ] Video thumbnails display properly
- [ ] Video metadata is accurate (title, description, duration)
- [ ] Pagination or infinite scroll works

### Video Playback
- [ ] Individual video pages load
- [ ] YouTube embed works
- [ ] Video plays on click
- [ ] Video controls are functional
- [ ] Fullscreen mode works
- [ ] Videos play on mobile devices
- [ ] Videos play in all major browsers

---

## 5. Mobile Responsiveness 📱

### Layout Testing
- [ ] Test on iPhone SE (375px)
- [ ] Test on iPhone 12/13/14 (390px)
- [ ] Test on iPhone 14 Pro Max (430px)
- [ ] Test on iPad (768px)
- [ ] Test on iPad Pro (1024px)
- [ ] Test on Android phone (various sizes)

### Mobile Navigation
- [ ] Hamburger menu opens and closes smoothly
- [ ] Menu items are tappable (44x44px minimum)
- [ ] Dropdown menus work on mobile
- [ ] Menu closes when clicking outside
- [ ] Menu closes when selecting an item

### Mobile Forms
- [ ] Forms are easy to fill on mobile
- [ ] Input fields are large enough
- [ ] Keyboard appears for text inputs
- [ ] Number keyboard appears for phone/number fields
- [ ] Date picker works on mobile
- [ ] Submit buttons are easily tappable

### Mobile Content
- [ ] Text is readable without zooming
- [ ] No horizontal scrolling
- [ ] Images scale properly
- [ ] Videos play on mobile
- [ ] CTAs are visible and tappable
- [ ] Touch targets are adequate size

### Mobile Performance
- [ ] Page loads quickly on 3G connection
- [ ] Images load progressively
- [ ] No layout shifts during load
- [ ] Fonts load without flash

---

## 6. Lighthouse Audit 🔍

### Performance
- [ ] Mobile performance score: 90+
- [ ] Desktop performance score: 90+
- [ ] First Contentful Paint (FCP): < 1.8s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Total Blocking Time (TBT): < 200ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Speed Index: < 3.4s

### Accessibility
- [ ] Accessibility score: 95+
- [ ] All images have alt text
- [ ] Color contrast ratios meet WCAG AA
- [ ] Form elements have labels
- [ ] Buttons have accessible names
- [ ] Heading hierarchy is logical
- [ ] ARIA attributes are used correctly

### Best Practices
- [ ] Best practices score: 95+
- [ ] HTTPS is used
- [ ] No console errors
- [ ] Images have correct aspect ratios
- [ ] No deprecated APIs used
- [ ] Browser errors are handled

### SEO
- [ ] SEO score: 95+
- [ ] Meta description is present
- [ ] Page has title tag
- [ ] Links have descriptive text
- [ ] Page is mobile-friendly
- [ ] Robots.txt is valid
- [ ] Sitemap is accessible

---

## 7. Environment Variables 🔐

### Required Variables (Production)
- [ ] `YOUTUBE_API_KEY` is set
- [ ] `YOUTUBE_CHANNEL_ID` is set
- [ ] `CONVERTKIT_API_KEY` is set
- [ ] `CONVERTKIT_API_SECRET` is set
- [ ] `NEXT_PUBLIC_SITE_URL` is set to production URL
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set (if using Plausible)

### Optional Variables
- [ ] Instagram API credentials (if using live feed)
- [ ] Twitter API credentials (if using live follower count)
- [ ] Any other third-party API keys

### Security
- [ ] No API keys in client-side code
- [ ] No sensitive data in Git repository
- [ ] `.env.local` is in `.gitignore`
- [ ] Environment variables are documented in `.env.example`
- [ ] Production environment variables are set in Netlify dashboard

---

## 8. Deployment Testing 🚀

### Build Process
- [ ] `npm run build` completes without errors
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build output is optimized
- [ ] Static pages are generated correctly

### Netlify Configuration
- [ ] Netlify project is connected to GitHub repository
- [ ] Build command is set: `npm run build`
- [ ] Publish directory is set: `.next`
- [ ] Node version is specified: `20`
- [ ] Environment variables are set in Netlify
- [ ] Deploy previews are enabled for pull requests

### Deployment
- [ ] Test deployment to Netlify succeeds
- [ ] Site is accessible at production URL
- [ ] SSL certificate is valid
- [ ] HTTPS redirect works (HTTP → HTTPS)
- [ ] Custom domain is configured (if applicable)
- [ ] DNS records are correct

### Post-Deployment
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] API routes work
- [ ] Images load from CDN
- [ ] Analytics tracking works
- [ ] No console errors in production

---

## 9. Content Backup 💾

### Backup Strategy
- [ ] All blog posts are backed up
- [ ] All images are backed up
- [ ] Configuration files are backed up
- [ ] Database backup (if applicable)
- [ ] Environment variables are documented

### Backup Locations
- [ ] GitHub repository (code and content)
- [ ] Local backup of images and assets
- [ ] ConvertKit subscriber list export
- [ ] Netlify deployment history
- [ ] Documentation of all third-party integrations

### Backup Verification
- [ ] Backup files are accessible
- [ ] Backup files are complete
- [ ] Restoration process is documented
- [ ] Backup schedule is established (weekly/monthly)

---

## 10. Cross-Browser Testing 🌐

### Desktop Browsers
- [ ] Chrome (latest) - All features work
- [ ] Safari (latest) - All features work
- [ ] Firefox (latest) - All features work
- [ ] Edge (latest) - All features work

### Mobile Browsers
- [ ] Safari iOS (latest) - All features work
- [ ] Chrome iOS (latest) - All features work
- [ ] Chrome Android (latest) - All features work
- [ ] Samsung Internet (latest) - All features work

### Features to Test in Each Browser
- [ ] Page loads correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Videos play
- [ ] Images load
- [ ] Animations work
- [ ] Modal dialogs work
- [ ] No console errors

---

## 11. Security Verification 🔒

### SSL/HTTPS
- [ ] SSL certificate is valid
- [ ] Certificate is not expired
- [ ] HTTPS is enforced
- [ ] No mixed content warnings
- [ ] Security headers are set

### Form Security
- [ ] Honeypot fields are in place
- [ ] Rate limiting is active on API routes
- [ ] Input validation is implemented
- [ ] XSS protection is in place
- [ ] CSRF protection is in place (if needed)

### Data Protection
- [ ] No sensitive data in client-side code
- [ ] API keys are not exposed
- [ ] User data is handled securely
- [ ] Privacy policy is compliant
- [ ] Cookie consent is implemented

---

## 12. Analytics Verification 📊

### Tracking Setup
- [ ] Vercel Analytics is installed
- [ ] Plausible Analytics is configured (if using)
- [ ] Page views are tracked
- [ ] Custom events are tracked
- [ ] Goal conversions are tracked

### Events to Verify
- [ ] Email signup events fire
- [ ] Video play events fire
- [ ] Resource download events fire
- [ ] External link click events fire
- [ ] Quiz completion events fire

### Analytics Dashboard
- [ ] Access to analytics dashboard
- [ ] Real-time tracking works
- [ ] Historical data is available
- [ ] Reports are configured
- [ ] Alerts are set up (if needed)

---

## 13. SEO Final Checks 🔍

### On-Page SEO
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] URLs are SEO-friendly
- [ ] Internal linking is implemented
- [ ] Canonical URLs are set

### Technical SEO
- [ ] Sitemap is generated and accessible
- [ ] Robots.txt is configured
- [ ] Schema markup is implemented
- [ ] Open Graph tags are present
- [ ] Twitter Card tags are present
- [ ] 404 page is SEO-friendly

### Content SEO
- [ ] Target keywords are used naturally
- [ ] Content is high-quality and original
- [ ] Images have descriptive filenames
- [ ] Alt text includes relevant keywords
- [ ] Meta descriptions are compelling

---

## 14. Performance Optimization ⚡

### Code Optimization
- [ ] Code splitting is implemented
- [ ] Dynamic imports are used for heavy components
- [ ] Bundle size is optimized
- [ ] Unused code is removed
- [ ] Dependencies are up to date

### Asset Optimization
- [ ] Images are compressed
- [ ] Images are in modern formats (WebP)
- [ ] Fonts are optimized
- [ ] CSS is minified
- [ ] JavaScript is minified

### Caching
- [ ] Static assets have cache headers
- [ ] API responses are cached appropriately
- [ ] ISR is configured for semi-dynamic pages
- [ ] CDN caching is enabled

---

## 15. Accessibility Final Check ♿

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Skip to content link works
- [ ] Escape key closes modals

### Screen Reader Testing
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with NVDA (Windows)
- [ ] Page structure is announced correctly
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Images have meaningful alt text

### Visual Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Text is readable at 200% zoom
- [ ] No horizontal scrolling at 200% zoom
- [ ] Color is not the only indicator
- [ ] Focus indicators are visible

---

## Final Sign-Off ✅

### Pre-Launch Approval

**All critical checks completed:** [ ]

**All high-priority issues resolved:** [ ]

**Medium/low issues documented:** [ ]

**Backup created:** [ ]

**Team notified:** [ ]

---

**Reviewed by:** ___________________

**Date:** ___________________

**Approved for launch:** [ ] Yes [ ] No

**Launch date/time:** ___________________

---

## Post-Launch Monitoring 📈

### Immediate (First 24 Hours)
- [ ] Monitor uptime
- [ ] Check error logs
- [ ] Verify form submissions
- [ ] Monitor analytics for traffic
- [ ] Check email deliverability

### First Week
- [ ] Daily analytics review
- [ ] Monitor performance metrics
- [ ] Check for broken links
- [ ] Review form submissions
- [ ] Monitor social media mentions

### First Month
- [ ] Weekly analytics review
- [ ] Performance optimization based on data
- [ ] Content updates based on feedback
- [ ] SEO ranking monitoring
- [ ] User feedback collection

---

## Emergency Contacts 🆘

**Technical Issues:**
- Netlify Support: support@netlify.com
- GitHub Support: support@github.com

**Third-Party Services:**
- ConvertKit Support: help@convertkit.com
- YouTube API Support: Google Cloud Console

**Internal Team:**
- Developer: [Contact Info]
- Content Manager: [Contact Info]
- Project Manager: [Contact Info]

---

## Rollback Plan 🔄

If critical issues are discovered after launch:

1. **Immediate:** Revert to previous deployment in Netlify (one-click rollback)
2. **Investigate:** Review error logs and identify the issue
3. **Fix:** Implement fix in development environment
4. **Test:** Thoroughly test the fix
5. **Deploy:** Deploy fix to production
6. **Monitor:** Watch for any additional issues

---

## Resources 📚

- **Detailed QA Guide:** `docs/QA_TESTING_GUIDE.md`
- **Deployment Guide:** `docs/DEPLOYMENT.md`
- **Environment Variables:** `docs/ENVIRONMENT_VARIABLES.md`
- **Performance Guide:** `docs/PERFORMANCE_OPTIMIZATION.md`
- **Accessibility Guide:** `docs/ACCESSIBILITY.md`
- **Security Guide:** `docs/SECURITY.md`
