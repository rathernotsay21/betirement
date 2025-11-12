# Environment Variables Documentation

This document provides detailed information about all environment variables used in the Betirement website.

## Overview

Environment variables are used to configure the application for different environments (development, staging, production) and to store sensitive API keys and secrets.

## Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values in `.env.local`

3. Never commit `.env.local` to version control (it's in `.gitignore`)

## Required Variables

These variables must be set for the application to function properly.

### YouTube API

#### `YOUTUBE_API_KEY`
- **Type**: String
- **Required**: Yes
- **Description**: YouTube Data API v3 key for fetching channel videos
- **How to get**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing
  3. Enable YouTube Data API v3
  4. Create credentials (API key)
  5. Restrict the key to YouTube Data API v3
- **Example Format**: Starts with `AIza` followed by 35 alphanumeric characters

#### `YOUTUBE_CHANNEL_ID`
- **Type**: String
- **Required**: Yes
- **Description**: Your YouTube channel ID
- **How to get**:
  1. Go to your YouTube channel
  2. Click on your profile picture → Settings → Advanced settings
  3. Copy the Channel ID
- **Example**: `UCAbcDefGhiJklMnoPqrStuvWx`

### ConvertKit

#### `CONVERTKIT_API_KEY`
- **Type**: String
- **Required**: Yes
- **Description**: ConvertKit API key for managing email subscribers
- **How to get**:
  1. Log in to [ConvertKit](https://app.convertkit.com/)
  2. Go to Settings → Advanced → API Keys
  3. Copy the API Key
- **Example**: `abc123def456ghi789jkl012`

#### `CONVERTKIT_API_SECRET`
- **Type**: String
- **Required**: Yes
- **Description**: ConvertKit API secret for authentication
- **How to get**:
  1. Same location as API Key
  2. Copy the API Secret
- **Example**: `xyz789uvw456rst123opq012`
- **Security**: Keep this secret! Never expose in client-side code

#### `CONVERTKIT_FORM_ID`
- **Type**: String
- **Required**: Yes
- **Description**: Default ConvertKit form ID for subscriptions
- **How to get**:
  1. Go to Forms in ConvertKit
  2. Select your form
  3. Copy the Form ID from the URL or settings
- **Example**: `1234567`

### Analytics

#### `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- **Type**: String
- **Required**: Yes (for production)
- **Description**: Your domain for Plausible Analytics tracking
- **Note**: Prefix with `NEXT_PUBLIC_` makes it available in browser
- **Example**: `betirement.com`

#### `NEXT_PUBLIC_SITE_URL`
- **Type**: String
- **Required**: Yes
- **Description**: Full URL of your production site
- **Used for**: SEO, canonical URLs, sitemap generation
- **Example**: `https://betirement.com`
- **Development**: `http://localhost:3000`

## Optional Variables

These variables enable additional features but are not required for basic functionality.

### Analytics (Development)

#### `NEXT_PUBLIC_ENABLE_ANALYTICS_DEV`
- **Type**: Boolean (string)
- **Required**: No
- **Default**: `false`
- **Description**: Enable analytics tracking in development mode
- **Example**: `true`
- **Note**: Uncomment in `.env.local` to enable

### Instagram API

#### `INSTAGRAM_ACCESS_TOKEN`
- **Type**: String
- **Required**: No
- **Description**: Instagram Basic Display API access token
- **How to get**:
  1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com/)
  2. Add Instagram Basic Display product
  3. Configure OAuth redirect URIs
  4. Generate User Token
- **Example**: `IGQVJXabc123def456...`
- **Note**: Tokens expire and need refresh

#### `INSTAGRAM_USER_ID`
- **Type**: String
- **Required**: No (if using Instagram API)
- **Description**: Your Instagram user ID
- **Example**: `1234567890`

### Twitter API

#### `TWITTER_BEARER_TOKEN`
- **Type**: String
- **Required**: No
- **Description**: Twitter API v2 bearer token for follower counts
- **How to get**:
  1. Apply for Twitter Developer account at [developer.twitter.com](https://developer.twitter.com/)
  2. Create a new app
  3. Generate Bearer Token
- **Example**: `AAAAAAAAAAAAAAAAAAAAABcDEF...`

### OAuth (Future Implementation)

These variables are for future OAuth implementation with NextAuth.js.

#### `GOOGLE_CLIENT_ID`
- **Type**: String
- **Required**: No (future)
- **Description**: Google OAuth client ID
- **Example**: `123456789-abc.apps.googleusercontent.com`

#### `GOOGLE_CLIENT_SECRET`
- **Type**: String
- **Required**: No (future)
- **Description**: Google OAuth client secret
- **Example**: `GOCSPX-abc123def456`

#### `FACEBOOK_CLIENT_ID`
- **Type**: String
- **Required**: No (future)
- **Description**: Facebook OAuth app ID
- **Example**: `1234567890123456`

#### `FACEBOOK_CLIENT_SECRET`
- **Type**: String
- **Required**: No (future)
- **Description**: Facebook OAuth app secret
- **Example**: `abc123def456ghi789jkl012mno345pqr`

#### `TWITTER_CLIENT_ID`
- **Type**: String
- **Required**: No (future)
- **Description**: Twitter OAuth 2.0 client ID
- **Example**: `abc123def456ghi789`

#### `TWITTER_CLIENT_SECRET`
- **Type**: String
- **Required**: No (future)
- **Description**: Twitter OAuth 2.0 client secret
- **Example**: `xyz789uvw456rst123`

#### `NEXTAUTH_SECRET`
- **Type**: String
- **Required**: No (future)
- **Description**: Secret for NextAuth.js session encryption
- **How to generate**: `openssl rand -base64 32`
- **Example**: `abc123def456ghi789jkl012mno345pqr567stu890=`

#### `NEXTAUTH_URL`
- **Type**: String
- **Required**: No (future)
- **Description**: Base URL for NextAuth.js callbacks
- **Example**: `http://localhost:3000` (development)
- **Production**: `https://betirement.com`

## Environment-Specific Configuration

### Development (.env.local)

```bash
# YouTube API
YOUTUBE_API_KEY=your_dev_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# ConvertKit (use test account)
CONVERTKIT_API_KEY=your_test_api_key
CONVERTKIT_API_SECRET=your_test_api_secret
CONVERTKIT_FORM_ID=your_test_form_id

# Analytics (optional in dev)
# NEXT_PUBLIC_ENABLE_ANALYTICS_DEV=true
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Netlify)

Set these in Netlify dashboard under Site settings → Environment variables:

1. All required variables with production values
2. Use production API keys (not test keys)
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain
4. Enable optional features as needed

## Security Best Practices

### DO:
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Use different API keys for development and production
- ✅ Rotate API keys periodically
- ✅ Use environment variables for all secrets
- ✅ Prefix public variables with `NEXT_PUBLIC_`
- ✅ Document all environment variables

### DON'T:
- ❌ Commit `.env.local` to version control
- ❌ Share API keys in public repositories
- ❌ Use production keys in development
- ❌ Expose secrets in client-side code
- ❌ Hard-code API keys in source files

## Validation

The application validates required environment variables at startup. If any required variables are missing, you'll see an error message indicating which variables need to be set.

### Checking Variables

```typescript
// lib/env.ts validates environment variables
if (!process.env.YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY is required');
}
```

## Troubleshooting

### "Environment variable not found"

**Problem**: Application can't find an environment variable.

**Solutions**:
1. Check that `.env.local` exists in project root
2. Verify variable name matches exactly (case-sensitive)
3. Restart development server after adding variables
4. Check for typos in variable names

### "Invalid API key"

**Problem**: API returns authentication error.

**Solutions**:
1. Verify API key is correct (no extra spaces)
2. Check API key restrictions in provider dashboard
3. Ensure API is enabled in provider console
4. Try regenerating the API key

### "Variables not available in browser"

**Problem**: Can't access environment variable in client component.

**Solutions**:
1. Prefix variable with `NEXT_PUBLIC_`
2. Only use public variables in client components
3. Use API routes for server-side variables
4. Rebuild application after adding public variables

## References

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [ConvertKit API](https://developers.convertkit.com/)
- [Plausible Analytics](https://plausible.io/docs)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
