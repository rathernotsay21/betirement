# QA Testing Guide

## Overview

This guide provides comprehensive testing procedures for the Betirement website, covering automated tests, manual testing workflows, and quality assurance checklists.

## Table of Contents

1. [Automated Testing](#automated-testing)
2. [Manual Testing Procedures](#manual-testing-procedures)
3. [Browser Compatibility Testing](#browser-compatibility-testing)
4. [Device Testing](#device-testing)
5. [Form Testing](#form-testing)
6. [Video Playback Testing](#video-playback-testing)
7. [Email Integration Testing](#email-integration-testing)
8. [Analytics Verification](#analytics-verification)
9. [Performance Testing](#performance-testing)
10. [Accessibility Testing](#accessibility-testing)

---

## Automated Testing

### Running Automated Tests

```bash
# Run all QA checks
npm run qa:all

# Individual test suites
npm run qa:links        # Check all links
npm run qa:forms        # Test form validation
npm run qa:checklist    # Run full QA checklist

# Performance tests
npm run lighthouse      # Run Lighthouse audit
npm run test:performance # Test slow connection performance
```

### Automated Test Coverage

- ✅ Link validation (internal and external)
- ✅ Form validation logic
- ✅ SSL certificate verification
- ✅ Error page accessibility
- ✅ Analytics script presence
- ✅ Meta tags validation
- ✅ Security headers
- ✅ Responsive design checks
- ✅ Accessibility features
- ✅ Performance optimizations

---

## Manual Testing Procedures

### Pre-Testing Setup

1. **Environment Preparation**
   - [ ] Clear browser cache and cookies
   - [ ] Disable browser extensions (test in incognito/private mode)
   - [ ] Ensure stable internet connection
   - [ ] Have test email addresses ready
   - [ ] Prepare test data for forms

2. **Testing Tools**
   - Browser DevTools (Console, Network, Performance tabs)
   - Lighthouse (built into Chrome DevTools)
   - axe DevTools extension for accessibility
   - Responsive design mode in browser
   - Screen reader (NVDA, JAWS, or VoiceOver)

---

## Browser Compatibility Testing

### Desktop Browsers

Test on the following browsers with latest versions:

#### Google Chrome
- [ ] Home page loads correctly
- [ ] Navigation works smoothly
- [ ] Forms submit successfully
- [ ] Videos play without issues
- [ ] No console errors
- [ ] Responsive design works
- [ ] Animations render properly

#### Safari
- [ ] Home page loads correctly
- [ ] Navigation works smoothly
- [ ] Forms submit successfully
- [ ] Videos play without issues
- [ ] No console errors
- [ ] Responsive design works
- [ ] Animations render properly
- [ ] Test on macOS Safari specifically

#### Firefox
- [ ] Home page loads correctly
- [ ] Navigation works smoothly
- [ ] Forms submit successfully
- [ ] Videos play without issues
- [ ] No console errors
- [ ] Responsive design works
- [ ] Animations render properly

#### Microsoft Edge
- [ ] Home page loads correctly
- [ ] Navigation works smoothly
- [ ] Forms submit successfully
- [ ] Videos play without issues
- [ ] No console errors
- [ ] Responsive design works
- [ ] Animations render properly

### Browser-Specific Issues to Check

**Safari-specific:**
- Date input fields rendering
- Video autoplay policies
- Flexbox and Grid layouts
- CSS backdrop-filter support

**Firefox-specific:**
- Scrollbar styling
- CSS Grid gaps
- Form validation messages

**Edge-specific:**
- Legacy Edge vs. Chromium Edge differences
- Windows-specific font rendering

---

## Device Testing

### Mobile Devices

#### iOS Testing (iPhone)

**iPhone 12/13/14 (or similar)**
- [ ] Test in Safari browser
- [ ] Test in Chrome browser
- [ ] Portrait orientation works
- [ ] Landscape orientation works
- [ ] Touch targets are adequate (44x44px minimum)
- [ ] Hamburger menu opens/closes smoothly
- [ ] Forms are easy to fill on mobile
- [ ] Videos play in fullscreen
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming
- [ ] CTAs are easily tappable
- [ ] Modal dialogs work properly
- [ ] Swipe gestures don't interfere

**iPad (Tablet)**
- [ ] Test in Safari browser
- [ ] Portrait orientation works
- [ ] Landscape orientation works
- [ ] Layout adapts appropriately
- [ ] Touch interactions work
- [ ] Split-screen mode (if applicable)

#### Android Testing

**Android Phone (Samsung, Pixel, etc.)**
- [ ] Test in Chrome browser
- [ ] Test in Samsung Internet (if Samsung device)
- [ ] Portrait orientation works
- [ ] Landscape orientation works
- [ ] Touch targets are adequate
- [ ] Hamburger menu works
- [ ] Forms work properly
- [ ] Videos play correctly
- [ ] No horizontal scrolling
- [ ] Text is readable
- [ ] CTAs work properly
- [ ] Back button behavior is correct

**Android Tablet**
- [ ] Test in Chrome browser
- [ ] Portrait orientation works
- [ ] Landscape orientation works
- [ ] Layout adapts appropriately
- [ ] Touch interactions work

### Responsive Breakpoints to Test

Test at these specific viewport widths:
- [ ] 320px (Small mobile)
- [ ] 375px (iPhone SE)
- [ ] 414px (iPhone Plus)
- [ ] 768px (Tablet portrait)
- [ ] 1024px (Tablet landscape / Small desktop)
- [ ] 1280px (Desktop)
- [ ] 1920px (Large desktop)

---

## Form Testing

### Email Capture Forms

Test all email capture form variants:

#### Inline Email Capture (Home Page)
1. **Valid Email Submission**
   - [ ] Enter valid email: `test@example.com`
   - [ ] Click submit button
   - [ ] Verify success message appears
   - [ ] Verify form clears or shows confirmation
   - [ ] Check email received in ConvertKit

2. **Invalid Email Validation**
   - [ ] Enter invalid email: `notanemail`
   - [ ] Click submit button
   - [ ] Verify error message appears
   - [ ] Verify form doesn't submit
   - [ ] Error message is clear and helpful

3. **Empty Field Validation**
   - [ ] Leave email field empty
   - [ ] Click submit button
   - [ ] Verify required field error appears
   - [ ] Form doesn't submit

4. **Accessibility**
   - [ ] Tab to email field
   - [ ] Tab to submit button
   - [ ] Press Enter to submit
   - [ ] Error messages are announced by screen reader
   - [ ] Success messages are announced

#### Slide-in Email Capture
- [ ] Appears after 30 seconds on page
- [ ] Can be dismissed with X button
- [ ] Doesn't reappear after dismissal
- [ ] Form validation works
- [ ] Submission works correctly
- [ ] Mobile-friendly design

#### Modal Email Capture (Exit Intent)
- [ ] Triggers on exit intent (move mouse to top)
- [ ] Can be dismissed with X or outside click
- [ ] Form validation works
- [ ] Submission works correctly
- [ ] Doesn't show again after submission

### Contact Form

**Location:** `/contact` page

1. **Complete Form Submission**
   - [ ] Fill all required fields:
     - Name: `John Doe`
     - Email: `john@example.com`
     - Subject: `General Inquiry`
     - Message: `This is a test message`
   - [ ] Click submit button
   - [ ] Verify success message
   - [ ] Check Netlify Forms dashboard for submission
   - [ ] Verify email notification received

2. **Field Validation**
   - [ ] Test each required field individually
   - [ ] Verify error messages for empty fields
   - [ ] Test invalid email format
   - [ ] Test message length limits (if any)

3. **Spam Protection**
   - [ ] Verify honeypot field is hidden
   - [ ] Verify form has Netlify attribute
   - [ ] Test rate limiting (multiple rapid submissions)

### Booking Request Form (Speaking Page)

**Location:** `/speaking` page

1. **Complete Booking Request**
   - [ ] Fill all fields:
     - Name
     - Email
     - Organization
     - Event Date
     - Event Type
     - Message
   - [ ] Submit form
   - [ ] Verify success message
   - [ ] Check Netlify Forms dashboard

2. **Date Field Validation**
   - [ ] Test date picker functionality
   - [ ] Verify past dates are handled appropriately
   - [ ] Test date format

3. **Accessibility**
   - [ ] All fields have labels
   - [ ] Tab order is logical
   - [ ] Error messages are clear
   - [ ] Can submit with keyboard only

### Quiz Form (Start Here Page)

**Location:** `/start-here` page

1. **Quiz Completion Flow**
   - [ ] Answer all 5 questions
   - [ ] Click submit/next buttons
   - [ ] Verify progress indicator updates
   - [ ] Complete quiz
   - [ ] Verify results page appears
   - [ ] Verify personalized recommendations

2. **Quiz Validation**
   - [ ] Try to proceed without answering
   - [ ] Verify validation messages
   - [ ] Test back button functionality
   - [ ] Test quiz restart

3. **Email Capture After Quiz**
   - [ ] Complete quiz
   - [ ] Enter email for results
   - [ ] Verify email submission
   - [ ] Verify results are shown

---

## Video Playback Testing

### YouTube Video Integration

#### Video Library Page (`/content/videos`)

1. **Video Grid Display**
   - [ ] Videos load and display correctly
   - [ ] Thumbnails are sharp and properly sized
   - [ ] Video titles are readable
   - [ ] Metadata (duration, views) displays correctly
   - [ ] Category badges show correctly

2. **Video Filtering**
   - [ ] Category filter buttons work
   - [ ] Clicking category filters videos
   - [ ] "All" button shows all videos
   - [ ] Filter state is visually indicated

3. **Video Search**
   - [ ] Search input is functional
   - [ ] Search filters videos by title
   - [ ] Search results update in real-time
   - [ ] Clear search button works

4. **Pagination/Infinite Scroll**
   - [ ] Pagination controls work (if implemented)
   - [ ] Infinite scroll loads more videos (if implemented)
   - [ ] Loading states are shown

#### Individual Video Page (`/content/videos/[id]`)

1. **Video Player**
   - [ ] Video loads and plays
   - [ ] Player controls work (play, pause, volume)
   - [ ] Fullscreen mode works
   - [ ] Video quality selection works
   - [ ] Captions/subtitles work (if available)

2. **Video Information**
   - [ ] Title displays correctly
   - [ ] Description is readable
   - [ ] Published date shows
   - [ ] View count displays
   - [ ] Category/tags show

3. **Related Content**
   - [ ] Related videos display
   - [ ] Links to related videos work
   - [ ] Recommendations are relevant

### Cross-Browser Video Testing

Test video playback on:
- [ ] Chrome (desktop)
- [ ] Safari (desktop)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

**Check for:**
- Video loads without errors
- Autoplay behavior (should not autoplay)
- Controls are accessible
- Fullscreen works
- No audio/video sync issues

---

## Email Integration Testing

### ConvertKit Integration

#### Email Subscription Flow

1. **New Subscriber**
   - [ ] Submit email via any form
   - [ ] Check ConvertKit dashboard
   - [ ] Verify subscriber was added
   - [ ] Verify correct tags were applied
   - [ ] Check subscriber source is tracked

2. **Welcome Email Sequence**
   - [ ] Subscribe with test email
   - [ ] Verify welcome email received
   - [ ] Check email content and formatting
   - [ ] Verify links in email work
   - [ ] Verify unsubscribe link works

3. **Tag Assignment**
   - [ ] Subscribe from home page → verify `website-home` tag
   - [ ] Subscribe from blog → verify `website-blog` tag
   - [ ] Download resource → verify `resource-downloader` tag
   - [ ] Complete quiz → verify `quiz-completed` tag

4. **Duplicate Handling**
   - [ ] Subscribe with same email twice
   - [ ] Verify no duplicate created
   - [ ] Verify appropriate message shown

#### Email Deliverability

1. **Test Email Addresses**
   - [ ] Gmail account
   - [ ] Outlook/Hotmail account
   - [ ] Yahoo account
   - [ ] Custom domain email

2. **Spam Testing**
   - [ ] Check emails don't go to spam
   - [ ] Verify SPF/DKIM records (if applicable)
   - [ ] Check email content for spam triggers

### Netlify Forms Integration

1. **Form Submission Notifications**
   - [ ] Submit contact form
   - [ ] Verify email notification received
   - [ ] Check notification contains all form data
   - [ ] Verify notification is formatted correctly

2. **Netlify Dashboard**
   - [ ] Log into Netlify dashboard
   - [ ] Navigate to Forms section
   - [ ] Verify submissions are recorded
   - [ ] Check submission data is complete
   - [ ] Test export functionality

---

## Analytics Verification

### Vercel Analytics

1. **Page View Tracking**
   - [ ] Visit multiple pages
   - [ ] Check Vercel Analytics dashboard
   - [ ] Verify page views are recorded
   - [ ] Verify unique visitors count

2. **Core Web Vitals**
   - [ ] Check LCP (Largest Contentful Paint)
   - [ ] Check FID (First Input Delay)
   - [ ] Check CLS (Cumulative Layout Shift)
   - [ ] Verify all metrics are in "Good" range

### Plausible Analytics (if configured)

1. **Basic Tracking**
   - [ ] Visit website
   - [ ] Check Plausible dashboard
   - [ ] Verify page views recorded
   - [ ] Verify real-time data updates

2. **Goal Tracking**
   - [ ] Submit email form
   - [ ] Download resource
   - [ ] Play video
   - [ ] Verify goals are tracked in dashboard

### Custom Event Tracking

Test these custom events:

1. **Email Signup Events**
   - [ ] Subscribe via home page form
   - [ ] Subscribe via blog page
   - [ ] Subscribe via resource download
   - [ ] Verify events in analytics dashboard

2. **Video Events**
   - [ ] Play video
   - [ ] Complete video (watch to end)
   - [ ] Verify events tracked

3. **Download Events**
   - [ ] Download PDF resource
   - [ ] Download media kit
   - [ ] Verify download events tracked

4. **External Link Clicks**
   - [ ] Click YouTube link
   - [ ] Click social media link
   - [ ] Click affiliate link
   - [ ] Verify outbound clicks tracked

### Analytics Testing Checklist

- [ ] Analytics scripts load on all pages
- [ ] No console errors related to analytics
- [ ] Events fire at correct times
- [ ] Event data is accurate
- [ ] Privacy settings are respected
- [ ] Analytics don't slow down page load

---

## Performance Testing

### Lighthouse Audits

Run Lighthouse audits on key pages:

1. **Home Page**
   ```bash
   npm run lighthouse:mobile
   npm run lighthouse:desktop
   ```
   - [ ] Performance score: 90+
   - [ ] Accessibility score: 95+
   - [ ] Best Practices score: 95+
   - [ ] SEO score: 95+

2. **Other Key Pages**
   - [ ] About page
   - [ ] Video library page
   - [ ] Blog page
   - [ ] Individual blog post
   - [ ] Resources page

### Page Load Testing

1. **Fast Connection (4G)**
   - [ ] Home page loads in < 2 seconds
   - [ ] Images load progressively
   - [ ] No layout shifts during load
   - [ ] Interactive elements work immediately

2. **Slow Connection (3G)**
   ```bash
   npm run test:performance
   ```
   - [ ] Page is usable within 5 seconds
   - [ ] Critical content loads first
   - [ ] Loading states are shown
   - [ ] No timeout errors

### Core Web Vitals

Monitor these metrics:

1. **LCP (Largest Contentful Paint)**
   - Target: < 2.5 seconds
   - [ ] Home page
   - [ ] Blog posts
   - [ ] Video pages

2. **FID (First Input Delay)**
   - Target: < 100 milliseconds
   - [ ] Button clicks respond quickly
   - [ ] Form inputs are responsive
   - [ ] Navigation is immediate

3. **CLS (Cumulative Layout Shift)**
   - Target: < 0.1
   - [ ] No layout shifts during load
   - [ ] Images have dimensions
   - [ ] Fonts load without FOUT

### Bundle Size Analysis

```bash
npm run analyze
```

- [ ] Check bundle size report
- [ ] Verify no unnecessary dependencies
- [ ] Check for code splitting
- [ ] Verify lazy loading is working

---

## Accessibility Testing

### Automated Accessibility Testing

1. **Lighthouse Accessibility Audit**
   - [ ] Run Lighthouse audit
   - [ ] Score should be 95+
   - [ ] Fix any reported issues

2. **axe DevTools**
   - [ ] Install axe DevTools extension
   - [ ] Run scan on each page
   - [ ] Fix critical and serious issues
   - [ ] Document moderate issues

### Keyboard Navigation Testing

1. **Tab Navigation**
   - [ ] Tab through entire page
   - [ ] All interactive elements are reachable
   - [ ] Tab order is logical
   - [ ] Focus indicators are visible
   - [ ] No keyboard traps

2. **Keyboard Shortcuts**
   - [ ] Enter key submits forms
   - [ ] Escape key closes modals
   - [ ] Arrow keys work in menus (if applicable)
   - [ ] Space bar activates buttons

3. **Skip Links**
   - [ ] Tab to "Skip to content" link
   - [ ] Activate skip link
   - [ ] Verify focus moves to main content

### Screen Reader Testing

Test with at least one screen reader:
- **Windows:** NVDA (free) or JAWS
- **Mac:** VoiceOver (built-in)
- **Mobile:** TalkBack (Android) or VoiceOver (iOS)

1. **Page Structure**
   - [ ] Page title is announced
   - [ ] Headings are announced correctly
   - [ ] Heading hierarchy is logical (H1 → H2 → H3)
   - [ ] Landmarks are identified (header, nav, main, footer)

2. **Images**
   - [ ] All images have alt text
   - [ ] Alt text is descriptive
   - [ ] Decorative images have empty alt=""

3. **Forms**
   - [ ] Form labels are announced
   - [ ] Required fields are indicated
   - [ ] Error messages are announced
   - [ ] Success messages are announced

4. **Links and Buttons**
   - [ ] Link text is descriptive
   - [ ] Button purpose is clear
   - [ ] External links are indicated

### Color Contrast Testing

1. **Text Contrast**
   - [ ] Body text has 4.5:1 contrast ratio
   - [ ] Large text has 3:1 contrast ratio
   - [ ] Link text is distinguishable

2. **Interactive Elements**
   - [ ] Button text has sufficient contrast
   - [ ] Form labels are readable
   - [ ] Error messages are visible

3. **Testing Tools**
   - Use browser DevTools color picker
   - Use WebAIM Contrast Checker
   - Use axe DevTools

---

## SSL Certificate Verification

### Production Environment

1. **Certificate Validity**
   - [ ] Visit https://betirement.com
   - [ ] Click padlock icon in browser
   - [ ] Verify certificate is valid
   - [ ] Check expiration date
   - [ ] Verify issued by trusted CA

2. **HTTPS Enforcement**
   - [ ] Visit http://betirement.com
   - [ ] Verify redirect to HTTPS
   - [ ] Check all resources load over HTTPS
   - [ ] No mixed content warnings

3. **Security Headers**
   - [ ] Check for HSTS header
   - [ ] Verify X-Frame-Options
   - [ ] Check Content-Security-Policy
   - [ ] Verify X-Content-Type-Options

### SSL Testing Tools

Use these online tools:
- [ ] SSL Labs (https://www.ssllabs.com/ssltest/)
- [ ] Security Headers (https://securityheaders.com/)
- [ ] Mozilla Observatory (https://observatory.mozilla.org/)

---

## Error Page Testing

### 404 Not Found Page

1. **Access 404 Page**
   - [ ] Visit non-existent URL: `/this-page-does-not-exist`
   - [ ] Verify 404 status code returned
   - [ ] Page displays custom 404 design

2. **404 Page Content**
   - [ ] Helpful error message displayed
   - [ ] Link to home page present
   - [ ] Search functionality (if applicable)
   - [ ] Suggested pages or sitemap
   - [ ] Header and footer are present

3. **404 Page Functionality**
   - [ ] Navigation works
   - [ ] Home link works
   - [ ] No broken images or styles
   - [ ] Analytics tracks 404 errors

### 500 Error Page

1. **Trigger Error (if possible)**
   - [ ] Visit `/error-demo` (if exists)
   - [ ] Or trigger server error in dev

2. **Error Page Content**
   - [ ] User-friendly error message
   - [ ] No technical error details exposed
   - [ ] Link to home page
   - [ ] Contact information (if appropriate)

3. **Error Handling**
   - [ ] Error is logged (check logs)
   - [ ] User can recover gracefully
   - [ ] No sensitive information exposed

### Global Error Boundary

1. **Client-Side Errors**
   - [ ] Trigger JavaScript error (if test page exists)
   - [ ] Verify error boundary catches error
   - [ ] User sees friendly error message
   - [ ] Option to reload or go home

---

## Testing Checklist Summary

### Pre-Launch Critical Tests

- [ ] All automated tests pass
- [ ] All forms tested and working
- [ ] Email integration verified end-to-end
- [ ] All links checked (no broken links)
- [ ] Video playback tested on multiple browsers
- [ ] Analytics tracking verified
- [ ] SSL certificate valid
- [ ] 404 and error pages functional
- [ ] Mobile responsive on real devices
- [ ] Accessibility score 95+
- [ ] Performance score 90+
- [ ] Cross-browser testing complete

### Post-Launch Monitoring

- [ ] Monitor analytics for errors
- [ ] Check form submissions daily
- [ ] Verify email deliverability
- [ ] Monitor Core Web Vitals
- [ ] Check for broken links weekly
- [ ] Review user feedback
- [ ] Monitor uptime
- [ ] Check SSL certificate expiration

---

## Reporting Issues

### Issue Template

When reporting issues found during testing:

```markdown
**Issue Title:** Brief description

**Severity:** Critical / High / Medium / Low

**Page/Component:** Where the issue occurs

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Browser/Device:**
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop

**Screenshots:**
[Attach screenshots if applicable]

**Additional Notes:**
Any other relevant information
```

### Severity Levels

- **Critical:** Site is broken, major functionality doesn't work
- **High:** Important feature doesn't work, affects many users
- **Medium:** Feature works but has issues, affects some users
- **Low:** Minor cosmetic issue, doesn't affect functionality

---

## Conclusion

This QA testing guide provides comprehensive coverage of all testing requirements for the Betirement website. Follow this guide systematically to ensure high quality and reliability before launch.

For questions or clarifications, refer to the main project documentation or contact the development team.
