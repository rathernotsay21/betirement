# Launch Quick Reference Card

Quick reference for launching the Betirement website to production.

## Pre-Launch Commands

```bash
# 1. Create backup
npm run backup

# 2. Run all tests
npm run qa:all

# 3. Run pre-launch checklist
npm run pre-launch

# 4. Test production build
npm run build
npm run start

# 5. Run performance audit
npm run perf
```

## Required Environment Variables

Set these in Netlify dashboard before deployment:

```
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_API_SECRET=your_convertkit_secret
NEXT_PUBLIC_SITE_URL=https://betirement.com
```

## Deployment Steps

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production launch"
   git push origin main
   ```

2. **Monitor Netlify deployment:**
   - Go to Netlify dashboard
   - Watch build logs
   - Wait for deployment to complete

3. **Verify production:**
   ```bash
   npm run pre-launch:prod
   ```

## Post-Launch Verification

### Immediate Checks (First Hour)
- [ ] Site loads at https://betirement.com
- [ ] SSL certificate is valid
- [ ] Test email signup
- [ ] Test contact form
- [ ] Check analytics tracking
- [ ] Test on mobile device

### Critical User Flows
- [ ] Home → Email signup → Success
- [ ] Home → Videos → Play video
- [ ] Home → Blog → Read post
- [ ] Contact form → Submit → Success
- [ ] Mobile menu → Navigate → Works

## Troubleshooting

### Build Fails
```bash
# Check build locally
npm run build

# Check logs in Netlify dashboard
# Verify environment variables are set
```

### Forms Not Working
- Check Netlify Forms are enabled
- Verify email notifications configured
- Test with different email address

### Videos Not Loading
- Verify YouTube API key is set
- Check API quota in Google Console
- Check browser console for errors

## Rollback Procedure

If critical issues found:

1. **Quick rollback (Netlify):**
   - Go to Netlify → Deploys
   - Find last working deployment
   - Click "Publish deploy"

2. **Git rollback:**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Monitoring

### Daily (First Week)
- Check analytics for traffic
- Monitor error logs
- Verify form submissions
- Check email deliverability

### Weekly
- Review analytics data
- Check for broken links
- Monitor performance metrics
- Review user feedback

## Performance Targets

- **Lighthouse Performance:** 90+
- **Lighthouse Accessibility:** 95+
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

## Support Contacts

- **Netlify:** support@netlify.com
- **ConvertKit:** help@convertkit.com
- **GitHub:** [Your repo URL]/issues

## Success Metrics

### Week 1
- 100+ unique visitors
- 10+ email signups
- 50+ video views
- 0 critical errors

### Month 1
- 1,000+ unique visitors
- 100+ email signups
- 500+ video views
- 90+ Lighthouse scores

## Documentation

- **Full Launch Guide:** `docs/FINAL_LAUNCH_GUIDE.md`
- **Pre-Launch Checklist:** `docs/PRE_LAUNCH_CHECKLIST.md`
- **QA Testing Guide:** `docs/QA_TESTING_GUIDE.md`
- **Deployment Guide:** `docs/DEPLOYMENT.md`

## Emergency Contacts

**Technical Lead:** [Name/Email]
**Project Manager:** [Name/Email]
**Content Manager:** [Name/Email]

---

**Last Updated:** 2025-11-08
**Version:** 1.0
