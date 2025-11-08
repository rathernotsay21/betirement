# Social Media Integration Implementation

## Overview

This document describes the implementation of social media integration features for the Betirement website, including Instagram feeds, Twitter timelines, social sharing, follower counts, and social login preparation.

## Implemented Components

### 1. InstagramFeed Component
**Location:** `src/components/social/InstagramFeed.tsx`

**Features:**
- Grid display of recent Instagram posts
- Hover effects showing post captions
- Responsive layout (2 columns mobile, 3 columns desktop)
- Loading states and error handling
- Currently uses placeholder data

**Usage:**
```tsx
import { InstagramFeed } from '@/components/social';

<InstagramFeed maxPosts={6} />
```

**Future Implementation:**
- Set up Instagram Basic Display API
- Add `INSTAGRAM_ACCESS_TOKEN` to environment variables
- Update component to fetch from `/api/instagram` endpoint

### 2. TwitterTimeline Component
**Location:** `src/components/social/TwitterTimeline.tsx`

**Features:**
- Embeds Twitter's official timeline widget
- Customizable height and theme
- Automatically loads Twitter widgets script
- No API key required for public timelines
- **Fully functional** - ready to use

**Usage:**
```tsx
import { TwitterTimeline } from '@/components/social';

<TwitterTimeline 
  username="betirement" 
  height={600}
  theme="light"
/>
```

### 3. SocialShare Component
**Location:** `src/components/social/SocialShare.tsx`

**Features:**
- Share buttons for Twitter, LinkedIn, Facebook, Email
- Copy link to clipboard functionality
- Pre-populated share text with hashtags
- Opens in popup windows
- Visual feedback for copy action
- **Fully functional** - ready to use

**Usage:**
```tsx
import { SocialShare } from '@/components/social';

<SocialShare
  url="https://betirement.com/blog/post-slug"
  title="Blog Post Title"
  description="Post description"
  hashtags={['Bitcoin', 'Retirement']}
/>
```

### 4. SocialFollowerCount Component
**Location:** `src/components/social/SocialFollowerCount.tsx`

**Features:**
- Display follower counts for YouTube, Twitter, Instagram, LinkedIn
- Formatted numbers (125K, 1.2M format)
- Platform-specific icons and labels
- Loading states with skeleton UI
- `SocialFollowerStats` wrapper for all platforms
- Currently uses placeholder data

**Usage:**
```tsx
import { SocialFollowerCount, SocialFollowerStats } from '@/components/social';

// Single platform
<SocialFollowerCount platform="youtube" />

// All platforms
<SocialFollowerStats />
```

**Future Implementation:**
- Implement platform-specific API integrations
- Create caching strategy for follower counts
- Update counts periodically (hourly/daily)

### 5. SocialLoginButtons Component
**Location:** `src/components/social/SocialLoginButtons.tsx`

**Features:**
- Google, Facebook, Twitter login buttons
- Proper branding and styling for each platform
- Disabled state support
- Divider with "Or continue with email" text
- Currently logs to console (placeholder)

**Usage:**
```tsx
import { SocialLoginButtons } from '@/components/social';

<SocialLoginButtons
  onGoogleLogin={() => console.log('Google login')}
  onFacebookLogin={() => console.log('Facebook login')}
  onTwitterLogin={() => console.log('Twitter login')}
/>
```

**Future Implementation:**
- Install NextAuth.js
- Configure OAuth providers
- Implement callback handlers
- Set up user session management

## API Endpoints

### Instagram API
**Location:** `app/api/instagram/route.ts`

**Status:** Placeholder implementation

**Current Behavior:**
- Returns mock data for demonstration
- Includes proper error handling structure

**To Implement:**
1. Create Facebook App at developers.facebook.com
2. Add Instagram Basic Display product
3. Configure OAuth redirect URIs
4. Get Access Token
5. Add `INSTAGRAM_ACCESS_TOKEN` to `.env.local`
6. Uncomment implementation code in route handler

**API Call:**
```typescript
const response = await fetch(
  `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${accessToken}`
);
```

### Social Follower Count API
**Location:** `app/api/social/followers/route.ts`

**Status:** Placeholder implementation

**Current Behavior:**
- Returns mock follower counts
- Supports querying specific platform or all platforms

**To Implement:**

**YouTube (Already have API key):**
```typescript
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
);
const subscriberCount = response.items[0].statistics.subscriberCount;
```

**Twitter API v2:**
```typescript
const response = await fetch(
  `https://api.twitter.com/2/users/by/username/betirement?user.fields=public_metrics`,
  {
    headers: {
      'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  }
);
const followersCount = response.data.public_metrics.followers_count;
```

**Instagram Graph API:**
```typescript
const response = await fetch(
  `https://graph.instagram.com/${userId}?fields=followers_count&access_token=${accessToken}`
);
const followersCount = response.followers_count;
```

## Demo Page

**Location:** `app/social-demo/page.tsx`

A comprehensive demo page showcasing all social media components with:
- Live examples of each component
- Implementation notes
- Usage code examples
- Next steps guide

**Access:** Navigate to `/social-demo` in the browser

## Environment Variables

Added to `.env.example`:

```bash
# Instagram Basic Display API
# INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
# INSTAGRAM_USER_ID=your_instagram_user_id

# Twitter API v2 (for follower counts)
# TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# OAuth (Future implementation with NextAuth.js)
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# FACEBOOK_CLIENT_ID=your_facebook_client_id
# FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
# TWITTER_CLIENT_ID=your_twitter_client_id
# TWITTER_CLIENT_SECRET=your_twitter_client_secret
# NEXTAUTH_SECRET=your_nextauth_secret
# NEXTAUTH_URL=http://localhost:3000
```

## Integration Points

### Blog Posts
Add social sharing to blog post pages:

```tsx
// app/content/blog/[slug]/page.tsx
import { SocialShare } from '@/components/social';

<SocialShare
  url={`https://betirement.com/blog/${post.slug}`}
  title={post.title}
  description={post.excerpt}
  hashtags={['Bitcoin', 'Retirement']}
/>
```

### Home Page
Add follower stats to home page:

```tsx
// app/page.tsx
import { SocialFollowerStats } from '@/components/social';

<section className="py-12">
  <h2>Join Our Growing Community</h2>
  <SocialFollowerStats />
</section>
```

### Community Page
Add social feeds to community page:

```tsx
// app/community/page.tsx
import { InstagramFeed, TwitterTimeline } from '@/components/social';

<div className="grid md:grid-cols-2 gap-8">
  <div>
    <h2>Latest from Instagram</h2>
    <InstagramFeed maxPosts={6} />
  </div>
  <div>
    <h2>Recent Tweets</h2>
    <TwitterTimeline username="betirement" height={600} />
  </div>
</div>
```

### Video Pages
Add social sharing to video detail pages:

```tsx
// app/content/videos/[id]/page.tsx
import { SocialShare } from '@/components/social';

<SocialShare
  url={`https://betirement.com/content/videos/${video.id}`}
  title={video.title}
  hashtags={['Bitcoin', 'Retirement', 'Investing']}
/>
```

### Login/Signup Pages (Future)
Add social login options:

```tsx
// app/login/page.tsx
import { SocialLoginButtons } from '@/components/social';

<SocialLoginButtons />
```

## Testing

### Manual Testing Checklist

- [x] InstagramFeed displays placeholder grid correctly
- [x] InstagramFeed shows loading state
- [x] InstagramFeed handles hover effects
- [x] TwitterTimeline loads Twitter widget script
- [x] TwitterTimeline displays timeline (requires internet)
- [x] SocialShare opens correct share URLs
- [x] SocialShare copy link functionality works
- [x] SocialShare shows visual feedback on copy
- [x] SocialFollowerCount displays formatted numbers
- [x] SocialFollowerCount shows loading states
- [x] SocialFollowerStats displays all platforms
- [x] SocialLoginButtons render correctly
- [x] SocialLoginButtons show disabled state
- [x] Demo page displays all components
- [x] All components are responsive

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Safari
- Firefox
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Accessibility Testing

- [x] All buttons have proper aria-labels
- [x] Social icons have aria-hidden="true"
- [x] Keyboard navigation works
- [x] Focus states are visible
- [x] Screen reader friendly

## Next Steps

### Phase 1: Live Data (Priority)
1. **Instagram Feed**
   - Set up Instagram Basic Display API
   - Implement OAuth flow for access token
   - Update InstagramFeed component to use live data
   - Add error handling for API failures

2. **Follower Counts**
   - Implement YouTube API integration (already have key)
   - Set up Twitter API v2 access
   - Implement Instagram Graph API
   - Add caching layer (Redis or in-memory)
   - Set up periodic updates (cron job or webhook)

### Phase 2: Social Login (Future)
1. **NextAuth.js Setup**
   ```bash
   npm install next-auth
   ```

2. **Configure Providers**
   - Create OAuth apps on each platform
   - Add credentials to environment variables
   - Set up callback URLs
   - Implement session management

3. **User Flow**
   - Create login/signup pages
   - Implement protected routes
   - Add user profile management
   - Connect to email list (ConvertKit)

### Phase 3: Advanced Features (Future)
1. **Social Media Analytics**
   - Track share counts
   - Monitor engagement metrics
   - Create analytics dashboard

2. **Social Media Scheduling**
   - Integrate with Buffer or Hootsuite
   - Schedule posts from admin panel
   - Cross-post to multiple platforms

3. **User-Generated Content**
   - Allow users to share success stories
   - Display community posts
   - Implement moderation system

## Documentation

Comprehensive documentation available in:
- `src/components/social/README.md` - Component usage and API setup
- `app/social-demo/page.tsx` - Live examples and demos
- `.env.example` - Environment variable configuration

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **19.1**: Instagram feed widget (placeholder ready for API)
- **19.2**: Twitter timeline embed (fully functional)
- **19.3**: Social sharing functionality (fully functional)
- **19.4**: Social media follower counts (placeholder ready for API)
- **19.5**: Social login preparation (structure ready for OAuth)

## Notes

- Twitter timeline is the only component that works immediately without additional setup
- Instagram and follower counts require API setup but have proper placeholder implementations
- Social login buttons are prepared for future OAuth implementation
- All components include proper error handling and loading states
- Components are fully responsive and accessible
- Demo page provides comprehensive testing and documentation

## Support

For questions or issues:
1. Check `src/components/social/README.md` for detailed documentation
2. Review demo page at `/social-demo` for examples
3. Check API endpoint comments for implementation guidance
4. Refer to platform-specific API documentation:
   - Instagram: https://developers.facebook.com/docs/instagram-basic-display-api
   - Twitter: https://developer.twitter.com/en/docs/twitter-api
   - YouTube: https://developers.google.com/youtube/v3
   - NextAuth.js: https://next-auth.js.org/
