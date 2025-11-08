# Deployment Checklist

Use this checklist to ensure a smooth deployment process for the Betirement website.

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass locally
- [ ] ESLint shows no errors: `npm run lint`
- [ ] TypeScript compiles without errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`
- [ ] No console errors in development mode
- [ ] Code is properly formatted: `npm run format`

### Content Review

- [ ] All placeholder content replaced with real content
- [ ] All images have proper alt text
- [ ] All links work (internal and external)
- [ ] Blog posts have proper frontmatter
- [ ] Resources have correct download URLs
- [ ] Legal pages are complete (Privacy, Terms, Disclaimer)

### Configuration

- [ ] `.env.example` is up to date with all required variables
- [ ] `netlify.toml` is properly configured
- [ ] `next.config.mjs` has correct settings
- [ ] Site metadata in `src/config/site.ts` is correct
- [ ] Navigation structure in `src/config/navigation.ts` is complete

### API Integration

- [ ] YouTube API key is valid and has sufficient quota
- [ ] ConvertKit API credentials are correct
- [ ] Test email signup flow works
- [ ] Video fetching works correctly
- [ ] Form submissions work

### Performance

- [ ] Lighthouse performance score is 90+ on mobile
- [ ] Lighthouse performance score is 90+ on desktop
- [ ] All images are optimized (WebP format)
- [ ] Lazy loading is implemented for below-fold images
- [ ] Font optimization is configured

### Accessibility

- [ ] Lighthouse accessibility score is 95+
- [ ] All interactive elements have proper ARIA labels
- [ ] Keyboard navigation works throughout the site
- [ ] Color contrast ratios meet WCAG 2.1 AA standards
- [ ] Screen reader testing completed

### SEO

- [ ] All pages have proper meta titles and descriptions
- [ ] Open Graph tags are configured
- [ ] Twitter Card tags are configured
- [ ] Schema markup is implemented
- [ ] Sitemap generates correctly
- [ ] robots.txt is configured

### Security

- [ ] No API keys or secrets in code
- [ ] Environment variables are properly configured
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] Form spam protection is enabled
- [ ] Rate limiting is implemented on API routes

## Netlify Setup Checklist

### Initial Configuration

- [ ] Netlify account created
- [ ] GitHub repository connected to Netlify
- [ ] Build settings configured:
  - [ ] Branch: `main`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `.next`
  - [ ] Node version: `20`

### Environment Variables

- [ ] `YOUTUBE_API_KEY` configured
- [ ] `YOUTUBE_CHANNEL_ID` configured
- [ ] `CONVERTKIT_API_KEY` configured
- [ ] `CONVERTKIT_API_SECRET` configured
- [ ] `CONVERTKIT_FORM_ID` configured
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` configured
- [ ] `NEXT_PUBLIC_SITE_URL` configured
- [ ] Optional social media variables configured (if needed)

### Domain Configuration

- [ ] Custom domain added to Netlify
- [ ] DNS records configured correctly
- [ ] HTTPS enabled (automatic with Let's Encrypt)
- [ ] HTTP to HTTPS redirect enabled
- [ ] www redirect configured (if applicable)

### Forms Configuration

- [ ] Netlify Forms enabled
- [ ] Form notifications configured
- [ ] Notification email address verified
- [ ] Spam protection enabled (honeypot)
- [ ] Test form submission successful

### Notifications

- [ ] Deploy success notifications configured
- [ ] Deploy failure notifications configured
- [ ] Form submission notifications configured
- [ ] Notification channels tested (email/Slack)

## GitHub Configuration Checklist

### Repository Setup

- [ ] Repository is public or Netlify has access
- [ ] Branch protection rules configured for `main`
- [ ] Required status checks enabled
- [ ] GitHub Actions workflows are present:
  - [ ] `.github/workflows/ci.yml`
  - [ ] `.github/workflows/netlify-deploy.yml`

### README Updates

- [ ] GitHub Actions badge URL updated with correct username
- [ ] Netlify status badge URL updated with correct site ID
- [ ] Deployment section updated with site-specific information
- [ ] All documentation links work

### Secrets (if needed)

- [ ] GitHub Actions secrets configured (if using)
- [ ] Netlify deploy key configured (if using)

## First Deployment Checklist

### Pre-Deploy

- [ ] All pre-deployment checks completed
- [ ] Team notified of upcoming deployment
- [ ] Backup of current site taken (if replacing existing site)
- [ ] Maintenance window scheduled (if needed)

### Deploy

- [ ] Push to `main` branch or trigger manual deploy
- [ ] Monitor build logs in Netlify dashboard
- [ ] Build completes successfully
- [ ] No errors in build logs
- [ ] Deployment completes successfully

### Post-Deploy Verification

- [ ] Site loads at production URL
- [ ] All pages are accessible
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Videos load and play
- [ ] Images display correctly
- [ ] Analytics tracking works
- [ ] Email signup flow works end-to-end
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed:
  - [ ] Chrome
  - [ ] Safari
  - [ ] Firefox
  - [ ] Edge
- [ ] Mobile device testing completed:
  - [ ] iOS Safari
  - [ ] Android Chrome

### Performance Verification

- [ ] Run Lighthouse audit on production site
- [ ] Performance score: 90+ ✓
- [ ] Accessibility score: 95+ ✓
- [ ] Best Practices score: 95+ ✓
- [ ] SEO score: 95+ ✓
- [ ] Core Web Vitals are green
- [ ] Page load time is acceptable (<3 seconds)

### SEO Verification

- [ ] Site appears in Google Search Console
- [ ] Sitemap submitted to Google
- [ ] robots.txt is accessible
- [ ] Meta tags display correctly in social media previews
- [ ] Schema markup validates (use Google Rich Results Test)

### Monitoring Setup

- [ ] Uptime monitoring configured
- [ ] Error tracking configured (if using Sentry)
- [ ] Analytics dashboard accessible
- [ ] Performance monitoring active
- [ ] Alert thresholds configured

## Preview Deployment Checklist

For testing pull requests before merging:

- [ ] Pull request created
- [ ] Preview deployment triggered automatically
- [ ] Preview URL accessible
- [ ] Changes visible in preview
- [ ] No build errors
- [ ] No console errors
- [ ] Functionality tested in preview
- [ ] Mobile responsiveness checked
- [ ] Performance acceptable
- [ ] Ready to merge

## Rollback Checklist

If issues are discovered after deployment:

### Immediate Actions

- [ ] Identify the issue and severity
- [ ] Decide if rollback is necessary
- [ ] Notify team of rollback decision

### Rollback Process

- [ ] Go to Netlify dashboard → Deploys
- [ ] Find last working deployment
- [ ] Click "Publish deploy" on that deployment
- [ ] Verify rollback successful
- [ ] Confirm site is working correctly

### Post-Rollback

- [ ] Document the issue
- [ ] Create GitHub issue for the problem
- [ ] Fix the issue in a new branch
- [ ] Test thoroughly before redeploying
- [ ] Notify team when issue is resolved

## Ongoing Maintenance Checklist

### Weekly

- [ ] Check Netlify build logs for warnings
- [ ] Review analytics for unusual patterns
- [ ] Check form submissions
- [ ] Monitor uptime reports
- [ ] Review error logs

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Review and optimize performance
- [ ] Check for broken links
- [ ] Review and update content
- [ ] Backup environment variables

### Quarterly

- [ ] Major dependency updates
- [ ] Comprehensive security review
- [ ] Performance optimization review
- [ ] SEO audit and optimization
- [ ] Accessibility audit
- [ ] Content audit and refresh

## Emergency Procedures

### Site Down

1. Check Netlify status page
2. Check build logs for errors
3. Verify DNS configuration
4. Check SSL certificate status
5. Rollback if necessary
6. Contact Netlify support if needed

### Build Failures

1. Check build logs for specific error
2. Verify environment variables
3. Test build locally
4. Check for dependency issues
5. Rollback to last working commit if needed
6. Fix issue and redeploy

### Performance Issues

1. Run Lighthouse audit
2. Check CDN status
3. Review recent changes
4. Check for large assets
5. Optimize or rollback as needed

## Notes

- Keep this checklist updated as the deployment process evolves
- Document any issues encountered and their solutions
- Share learnings with the team
- Automate checklist items where possible

## Resources

- [Deployment Guide](./DEPLOYMENT.md)
- [Netlify Setup Guide](./NETLIFY_SETUP.md)
- [Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)
- [Security Guide](./SECURITY.md)
