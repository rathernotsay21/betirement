# Deployment Quick Start

Get the Betirement website deployed to Netlify in 10 minutes.

## Prerequisites

- [ ] GitHub repository with the code
- [ ] Netlify account (free tier works)
- [ ] YouTube API key and channel ID
- [ ] ConvertKit API credentials

## Step 1: Connect to Netlify (2 minutes)

1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** and authorize Netlify
4. Select **betirement-website** repository
5. Verify build settings:
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **"Deploy site"**

## Step 2: Configure Environment Variables (3 minutes)

Go to **Site settings** → **Environment variables** and add:

```bash
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_API_SECRET=your_convertkit_secret
CONVERTKIT_FORM_ID=your_form_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=betirement.com
NEXT_PUBLIC_SITE_URL=https://betirement.com
```

Click **"Trigger deploy"** to rebuild with environment variables.

## Step 3: Configure Custom Domain (2 minutes)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter `betirement.com`
4. Follow DNS instructions
5. HTTPS is automatic (Let's Encrypt)

## Step 4: Update README Badges (1 minute)

1. Get your Netlify Site ID from **Site settings** → **General**
2. Update README.md:
   - Replace `YOUR_USERNAME` with your GitHub username
   - Replace `YOUR_SITE_ID` with your Netlify site ID
   - Replace `YOUR_SITE_NAME` with your Netlify site name

## Step 5: Verify Deployment (2 minutes)

- [ ] Site loads at your domain
- [ ] All pages are accessible
- [ ] Forms work
- [ ] Videos load
- [ ] No console errors

## Done! 🎉

Your site is now live with:
- ✅ Automatic deployments from `main` branch
- ✅ Preview deployments for pull requests
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Global CDN distribution
- ✅ Automatic HTTPS

## Next Steps

- [ ] Set up form notifications: **Site settings** → **Forms**
- [ ] Configure deploy notifications: **Site settings** → **Build & deploy**
- [ ] Run Lighthouse audit to verify performance
- [ ] Submit sitemap to Google Search Console
- [ ] Set up uptime monitoring

## Need Help?

- [Full Deployment Guide](../docs/DEPLOYMENT.md)
- [Netlify Setup Guide](../docs/NETLIFY_SETUP.md)
- [Deployment Checklist](../docs/DEPLOYMENT_CHECKLIST.md)
- [CI/CD Guide](../docs/CI_CD_GUIDE.md)
