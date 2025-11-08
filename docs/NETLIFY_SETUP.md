# Netlify Setup Guide

Quick reference guide for setting up the Betirement website on Netlify.

## Prerequisites

- GitHub repository with the code
- Netlify account (free tier is sufficient to start)
- All required API keys (YouTube, ConvertKit, etc.)

## Step-by-Step Setup

### 1. Create Netlify Site

1. Log in to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** as your Git provider
4. Authorize Netlify to access your GitHub account (if not already done)
5. Select the **betirement-website** repository

### 2. Configure Build Settings

Netlify will auto-detect Next.js, but verify these settings:

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |
| **Node version** | `20` (set in netlify.toml) |

Click **"Deploy site"** to create the site.

### 3. Configure Environment Variables

Go to **Site settings** → **Environment variables** and add:

#### Required Variables

```bash
# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# ConvertKit
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_API_SECRET=your_convertkit_secret
CONVERTKIT_FORM_ID=your_default_form_id

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=betirement.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://betirement.com
```

#### Optional Variables (for social media features)

```bash
# Instagram
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id

# Twitter
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
```

**Important**: 
- Use "All scopes" for most variables
- Mark sensitive variables as "Sensitive" to hide values
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser

### 4. Configure Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain: `betirement.com`
4. Follow DNS configuration instructions:
   - Add A record pointing to Netlify's load balancer
   - Or add CNAME record for subdomain
5. Wait for DNS propagation (can take up to 48 hours)
6. HTTPS is automatically enabled with Let's Encrypt

### 5. Configure Form Notifications

1. Go to **Site settings** → **Forms**
2. Click **"Form notifications"**
3. Add email notification:
   - **Email to notify**: your-email@example.com
   - **Event to listen for**: New form submission
4. Save settings

### 6. Enable Deploy Notifications (Optional)

1. Go to **Site settings** → **Build & deploy** → **Deploy notifications**
2. Add notifications for:
   - **Deploy started**: Get notified when build starts
   - **Deploy succeeded**: Get notified on successful deployment
   - **Deploy failed**: Get notified on build failures
3. Choose notification method:
   - Email
   - Slack webhook
   - Custom webhook

### 7. Configure Build Hooks (Optional)

Build hooks allow you to trigger deployments from external services:

1. Go to **Site settings** → **Build & deploy** → **Build hooks**
2. Click **"Add build hook"**
3. Name it (e.g., "Manual Deploy" or "CMS Trigger")
4. Select branch to build: `main`
5. Save and copy the webhook URL
6. Use this URL to trigger builds via POST request

### 8. Update README Badges

After deployment, update the badges in README.md:

1. **GitHub Actions Badge**:
   - Replace `YOUR_USERNAME` with your GitHub username
   - URL: `https://github.com/YOUR_USERNAME/betirement-website/actions/workflows/ci.yml/badge.svg`

2. **Netlify Status Badge**:
   - Go to **Site settings** → **General** → **Site information**
   - Copy your **Site ID** (e.g., `abc123def-456g-789h-012i-345jklmnopqr`)
   - Copy your **Site name** (e.g., `betirement` or `betirement-website`)
   - Replace in README:
     - `YOUR_SITE_ID` with your Site ID
     - `YOUR_SITE_NAME` with your Site name

Example:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/abc123def-456g-789h-012i-345jklmnopqr/deploy-status)](https://app.netlify.com/sites/betirement/deploys)
```

## Verification Checklist

After setup, verify everything works:

- [ ] Site deploys successfully
- [ ] Custom domain works (if configured)
- [ ] HTTPS is enabled
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Email notifications work
- [ ] YouTube videos load
- [ ] Analytics tracking works
- [ ] Preview deployments work for PRs
- [ ] Build badges display correctly in README

## Common Issues

### Build Fails

**Issue**: "Module not found" error
- **Solution**: Ensure all dependencies are in `package.json`
- Run `npm ci` locally to verify

**Issue**: Environment variable not found
- **Solution**: Check all required variables are set in Netlify
- Verify variable names match exactly (case-sensitive)

**Issue**: Build timeout
- **Solution**: Contact Netlify support to increase build time limit
- Optimize build process if possible

### Domain Issues

**Issue**: Domain not working
- **Solution**: Check DNS settings are correct
- Wait for DNS propagation (up to 48 hours)
- Use [DNS Checker](https://dnschecker.org) to verify

**Issue**: HTTPS not working
- **Solution**: Wait for certificate provisioning (can take a few minutes)
- Ensure domain is properly configured
- Check Netlify's HTTPS settings

### Form Issues

**Issue**: Forms not submitting
- **Solution**: Verify `data-netlify="true"` attribute is present
- Check form has a `name` attribute
- Ensure honeypot field is included

**Issue**: Not receiving notifications
- **Solution**: Check spam folder
- Verify email address in notification settings
- Test with a form submission

## Next Steps

After successful setup:

1. **Test thoroughly**: Submit forms, check all pages, test on mobile
2. **Monitor performance**: Use Lighthouse to check scores
3. **Set up monitoring**: Configure uptime monitoring
4. **Document**: Update team documentation with site details
5. **Backup**: Export site settings and environment variables

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/)
- [Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## Support

Need help?
- [Netlify Support](https://support.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Full Deployment Guide](./DEPLOYMENT.md)
