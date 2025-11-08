# Deployment Guide

This document provides comprehensive instructions for deploying the Betirement website to Netlify.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Variables](#environment-variables)
- [Deployment Process](#deployment-process)
- [Preview Deployments](#preview-deployments)
- [Rollback Strategy](#rollback-strategy)
- [Troubleshooting](#troubleshooting)

## Overview

The Betirement website is deployed to Netlify with automatic deployments configured for:
- **Production**: Automatic deployment from the `main` branch
- **Preview**: Automatic preview deployments for all pull requests
- **CI/CD**: GitHub Actions for linting, type checking, and build verification

### Deployment Architecture

```
GitHub Repository (main branch)
    ↓
GitHub Actions (CI/CD Pipeline)
    ↓ (on success)
Netlify Build System
    ↓
Netlify CDN (Global Distribution)
    ↓
Production Site (betirement.com)
```

## Prerequisites

Before deploying, ensure you have:

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub Repository**: Code hosted on GitHub
3. **API Keys**: All required API keys (YouTube, ConvertKit, etc.)
4. **Domain**: Custom domain configured (optional but recommended)

## Initial Setup

### Step 1: Connect GitHub Repository to Netlify

1. Log in to your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the `betirement-website` repository
6. Configure build settings:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `20`

### Step 2: Install Netlify Next.js Plugin

The `netlify.toml` file already includes the Next.js plugin configuration:

```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Netlify will automatically install this plugin during the first build.

### Step 3: Configure Custom Domain (Optional)

1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain (e.g., `betirement.com`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

## Environment Variables

### Required Variables

Configure these environment variables in Netlify:

1. Go to "Site settings" → "Environment variables"
2. Click "Add a variable" for each of the following:

#### YouTube API
```
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
```

#### ConvertKit
```
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_API_SECRET=your_convertkit_secret
CONVERTKIT_FORM_ID=your_default_form_id
```

#### Analytics
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=betirement.com
```

#### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://betirement.com
```

#### Optional: Social Media APIs
```
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
```

### Environment Variable Scopes

Netlify supports different scopes for environment variables:
- **Production**: Used for production deployments (main branch)
- **Deploy previews**: Used for preview deployments (pull requests)
- **Branch deploys**: Used for specific branch deployments

For most variables, use "All scopes" unless you need different values for different environments.

### Sensitive Variables

For sensitive API keys:
1. Never commit them to the repository
2. Store them only in Netlify's environment variables
3. Use "Sensitive variable" option to hide values in the UI
4. Rotate keys periodically for security

## Deployment Process

### Automatic Deployments

Deployments are triggered automatically:

1. **Production Deployment**:
   - Push to `main` branch
   - Netlify detects the change
   - Runs build command
   - Deploys to production
   - Invalidates CDN cache
   - Site live at betirement.com

2. **Preview Deployment**:
   - Open a pull request
   - Netlify creates a preview deployment
   - Unique URL generated (e.g., `deploy-preview-123--betirement.netlify.app`)
   - Preview updates on each commit to the PR

### Manual Deployments

To trigger a manual deployment:

1. Go to "Deploys" in Netlify dashboard
2. Click "Trigger deploy" → "Deploy site"
3. Optionally clear cache: "Trigger deploy" → "Clear cache and deploy site"

### Build Process

The build process follows these steps:

1. **Install Dependencies**: `npm ci`
2. **Run Build**: `npm run build`
3. **Generate Static Pages**: Next.js generates static pages
4. **Optimize Assets**: Images, fonts, and scripts are optimized
5. **Deploy to CDN**: Files are distributed to Netlify's global CDN

### Build Time

Typical build times:
- **Initial build**: 3-5 minutes
- **Incremental builds**: 2-3 minutes
- **Cache-enabled builds**: 1-2 minutes

## Preview Deployments

Preview deployments allow you to test changes before merging to production.

### How Preview Deployments Work

1. Create a pull request on GitHub
2. Netlify automatically creates a preview deployment
3. A unique URL is generated for the preview
4. Netlify bot comments on the PR with the preview URL
5. Preview updates automatically on each commit
6. Preview is deleted when PR is closed/merged

### Accessing Preview Deployments

- **From GitHub**: Check the Netlify bot comment on your PR
- **From Netlify**: Go to "Deploys" → "Deploy Previews"
- **Direct URL**: `deploy-preview-[PR-NUMBER]--betirement.netlify.app`

### Testing Preview Deployments

Before merging a PR, test the preview deployment:

- [ ] Check all pages load correctly
- [ ] Test forms and interactive elements
- [ ] Verify mobile responsiveness
- [ ] Check console for errors
- [ ] Test video playback
- [ ] Verify analytics tracking (if enabled)

## CI/CD Pipeline

### GitHub Actions Workflows

The project includes two GitHub Actions workflows:

#### 1. CI Pipeline (`.github/workflows/ci.yml`)

Runs on every push and pull request:

- **Lint**: Runs ESLint to check code quality
- **Type Check**: Runs TypeScript compiler to check types
- **Build**: Creates a production build to verify it succeeds

#### 2. Netlify Deploy Status (`.github/workflows/netlify-deploy.yml`)

Provides deployment information:

- Shows deployment status
- Links to preview URLs
- Confirms production deployments

### Viewing CI/CD Status

- **GitHub**: Check the "Actions" tab in your repository
- **Pull Requests**: See status checks at the bottom of each PR
- **README**: Build status badge shows current status

### CI/CD Failure Handling

If CI/CD fails:

1. **Check the logs**: Click on the failed workflow in GitHub Actions
2. **Common issues**:
   - Linting errors: Run `npm run lint` locally and fix issues
   - Type errors: Run `npx tsc --noEmit` locally and fix issues
   - Build errors: Run `npm run build` locally and fix issues
3. **Fix and push**: Commit fixes and push to trigger a new run

## Rollback Strategy

If a deployment introduces issues, you can quickly rollback:

### Option 1: Rollback in Netlify (Fastest)

1. Go to "Deploys" in Netlify dashboard
2. Find the last working deployment
3. Click "..." → "Publish deploy"
4. Confirm the rollback
5. Site reverts to previous version immediately

### Option 2: Git Revert (Recommended for permanent fix)

```bash
# Revert the problematic commit
git revert <commit-hash>

# Push to main branch
git push origin main

# Netlify will automatically deploy the reverted version
```

### Option 3: Deploy Previous Branch

```bash
# Create a hotfix branch from a working commit
git checkout -b hotfix <working-commit-hash>

# Push to trigger a deployment
git push origin hotfix

# Temporarily change Netlify to deploy from hotfix branch
```

## Netlify Configuration

### Build Settings

The `netlify.toml` file configures:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20`
- **Plugins**: `@netlify/plugin-nextjs`
- **Redirects**: API routes to Netlify Functions
- **Headers**: Security headers and caching

### Forms Configuration

Netlify Forms are automatically detected when `data-netlify="true"` is present on forms.

To configure form notifications:

1. Go to "Site settings" → "Forms"
2. Click "Form notifications"
3. Add email notification with your email address
4. Configure notification settings

### Functions (Future)

Netlify Functions can be added in the `netlify/functions/` directory for serverless functionality.

## Performance Optimization

### Caching Strategy

The `netlify.toml` configures caching headers:

- **Static assets**: 1 year cache (`max-age=31536000`)
- **Images**: Immutable cache with CDN distribution
- **Next.js static files**: Immutable cache

### CDN Distribution

Netlify's global CDN ensures fast load times:

- Automatic edge caching
- Brotli compression
- HTTP/2 support
- Automatic image optimization

### Build Optimization

To optimize build times:

1. **Enable build cache**: Automatically enabled by Netlify
2. **Use incremental builds**: Next.js incremental static regeneration
3. **Optimize dependencies**: Keep `node_modules` lean

## Monitoring and Analytics

### Netlify Analytics

Enable Netlify Analytics for:
- Page views and unique visitors
- Top pages and referrers
- Bandwidth usage
- 404 errors

### Build Notifications

Configure build notifications:

1. Go to "Site settings" → "Build & deploy" → "Deploy notifications"
2. Add notifications for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed
3. Choose notification method (email, Slack, webhook)

### Uptime Monitoring

Consider using external uptime monitoring:
- UptimeRobot
- Pingdom
- StatusCake

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Module not found"
- **Solution**: Ensure all dependencies are in `package.json`, run `npm ci` locally

**Issue**: Build fails with "Out of memory"
- **Solution**: Contact Netlify support to increase build memory limit

**Issue**: Build fails with environment variable errors
- **Solution**: Check all required environment variables are set in Netlify

### Deployment Issues

**Issue**: Site shows old content after deployment
- **Solution**: Clear browser cache or use incognito mode

**Issue**: API routes return 404
- **Solution**: Check `netlify.toml` redirects configuration

**Issue**: Images not loading
- **Solution**: Verify images are in `public/` directory and paths are correct

### Performance Issues

**Issue**: Slow page load times
- **Solution**: Run Lighthouse audit, check image optimization, review bundle size

**Issue**: High bandwidth usage
- **Solution**: Optimize images, enable caching, use WebP format

### Form Submission Issues

**Issue**: Forms not submitting
- **Solution**: Verify `data-netlify="true"` attribute is present

**Issue**: Not receiving form notifications
- **Solution**: Check spam folder, verify notification settings in Netlify

## Security

### HTTPS

- Automatic HTTPS with Let's Encrypt
- Automatic certificate renewal
- HTTP to HTTPS redirect enabled

### Security Headers

Configured in `netlify.toml`:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`

### Environment Variable Security

- Never commit sensitive keys to repository
- Use Netlify's "Sensitive variable" option
- Rotate API keys periodically
- Use different keys for preview and production

## Best Practices

1. **Test locally before pushing**: Run `npm run build` locally
2. **Use preview deployments**: Test changes in preview before merging
3. **Monitor build times**: Optimize if builds take too long
4. **Keep dependencies updated**: Regular updates for security and performance
5. **Use semantic versioning**: Tag releases for easy rollback
6. **Document changes**: Update CHANGELOG.md for significant changes
7. **Review deploy logs**: Check for warnings or issues
8. **Set up monitoring**: Use uptime monitoring and error tracking

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Netlify Next.js Plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For deployment issues:
- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check this guide and official documentation
