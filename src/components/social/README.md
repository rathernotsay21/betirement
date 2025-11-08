# Social Media Integration Components

This directory contains components for social media integration including feeds, sharing, follower counts, and social login preparation.

## Components

### InstagramFeed
Displays a grid of recent Instagram posts from the Betirement account.

**Usage:**
```tsx
import { InstagramFeed } from '@/components/social';

<InstagramFeed maxPosts={6} />
```

**Props:**
- `maxPosts` (optional): Number of posts to display (default: 6)
- `className` (optional): Additional CSS classes

**Implementation Notes:**
- Currently uses placeholder data
- To enable live data, implement Instagram Basic Display API integration
- Add `INSTAGRAM_ACCESS_TOKEN` to environment variables
- Create `/api/instagram` endpoint to fetch posts

### TwitterTimeline
Embeds a Twitter timeline widget showing recent tweets.

**Usage:**
```tsx
import { TwitterTimeline } from '@/components/social';

<TwitterTimeline 
  username="betirement" 
  height={600}
  theme="light"
/>
```

**Props:**
- `username` (required): Twitter username (with or without @)
- `height` (optional): Timeline height in pixels (default: 600)
- `theme` (optional): 'light' or 'dark' (default: 'light')
- `className` (optional): Additional CSS classes

**Implementation Notes:**
- Uses Twitter's official widget script
- Automatically loads Twitter widgets.js
- No API key required for public timelines

### SocialShare
Provides social sharing buttons for content pages.

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

**Props:**
- `url` (required): URL to share
- `title` (required): Title for the shared content
- `description` (optional): Description for email shares
- `hashtags` (optional): Array of hashtags for Twitter
- `className` (optional): Additional CSS classes

**Features:**
- Twitter, LinkedIn, Facebook, Email sharing
- Copy link to clipboard functionality
- Pre-populated share text
- Opens in popup windows

### SocialFollowerCount
Displays follower/subscriber count for a specific platform.

**Usage:**
```tsx
import { SocialFollowerCount, SocialFollowerStats } from '@/components/social';

// Single platform
<SocialFollowerCount platform="youtube" />

// All platforms
<SocialFollowerStats />
```

**Props (SocialFollowerCount):**
- `platform` (required): 'youtube' | 'twitter' | 'instagram' | 'linkedin'
- `className` (optional): Additional CSS classes
- `showLabel` (optional): Show platform label (default: true)

**Implementation Notes:**
- Currently uses placeholder data
- To enable live data, create `/api/social/followers` endpoint
- Implement platform-specific API integrations:
  - YouTube: YouTube Data API
  - Twitter: Twitter API v2
  - Instagram: Instagram Graph API
  - LinkedIn: LinkedIn API

### SocialLoginButtons
Provides social login buttons for future OAuth implementation.

**Usage:**
```tsx
import { SocialLoginButtons } from '@/components/social';

<SocialLoginButtons
  onGoogleLogin={() => console.log('Google login')}
  onFacebookLogin={() => console.log('Facebook login')}
  onTwitterLogin={() => console.log('Twitter login')}
/>
```

**Props:**
- `onGoogleLogin` (optional): Callback for Google login
- `onFacebookLogin` (optional): Callback for Facebook login
- `onTwitterLogin` (optional): Callback for Twitter login
- `className` (optional): Additional CSS classes
- `disabled` (optional): Disable all buttons

**Implementation Notes:**
- Currently logs to console (placeholder)
- To implement OAuth:
  1. Set up OAuth apps on each platform
  2. Install NextAuth.js or similar library
  3. Configure OAuth providers
  4. Implement callback handlers
  5. Store user sessions

## API Integration Setup

### Instagram Basic Display API

1. Create a Facebook App at developers.facebook.com
2. Add Instagram Basic Display product
3. Configure OAuth redirect URIs
4. Get Access Token
5. Add to `.env.local`:
```bash
INSTAGRAM_ACCESS_TOKEN=your_access_token
INSTAGRAM_USER_ID=your_user_id
```

6. Create API route:
```typescript
// app/api/instagram/route.ts
export async function GET() {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  );
  const data = await response.json();
  return Response.json(data);
}
```

### Twitter API v2

1. Create a Twitter Developer account
2. Create a new app
3. Get API keys and tokens
4. Add to `.env.local`:
```bash
TWITTER_BEARER_TOKEN=your_bearer_token
```

5. For timeline embed, no API key needed (uses widget script)

### Social Login OAuth

For future implementation with NextAuth.js:

```bash
npm install next-auth
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## Environment Variables

Add these to `.env.local` when implementing live data:

```bash
# Instagram
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id

# Twitter (for follower counts)
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# YouTube (already configured)
YOUTUBE_API_KEY=your_youtube_api_key

# OAuth (future implementation)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Usage Examples

### Blog Post Page with Social Share
```tsx
import { SocialShare } from '@/components/social';

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <SocialShare
        url={`https://betirement.com/blog/${post.slug}`}
        title={post.title}
        description={post.excerpt}
        hashtags={['Bitcoin', 'Retirement']}
      />
      <div>{post.content}</div>
    </article>
  );
}
```

### Home Page with Social Proof
```tsx
import { SocialFollowerStats } from '@/components/social';

export default function HomePage() {
  return (
    <section>
      <h2>Join Our Growing Community</h2>
      <SocialFollowerStats />
    </section>
  );
}
```

### Community Page with Social Feeds
```tsx
import { InstagramFeed, TwitterTimeline } from '@/components/social';

export default function CommunityPage() {
  return (
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
  );
}
```

### Login Page with Social Options
```tsx
import { SocialLoginButtons } from '@/components/social';

export default function LoginPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SocialLoginButtons />
      {/* Email login form below */}
    </div>
  );
}
```

## Testing

All components include loading states and error handling. Test with:

1. **InstagramFeed**: Currently shows placeholder grid
2. **TwitterTimeline**: Loads live Twitter timeline (no API key needed)
3. **SocialShare**: Test sharing on different platforms
4. **SocialFollowerCount**: Shows placeholder counts with animations
5. **SocialLoginButtons**: Logs to console (placeholder for OAuth)

## Future Enhancements

- [ ] Implement Instagram API integration
- [ ] Add follower count API endpoints
- [ ] Implement OAuth with NextAuth.js
- [ ] Add YouTube community posts
- [ ] Add LinkedIn posts feed
- [ ] Implement social media analytics tracking
- [ ] Add social media scheduling integration
- [ ] Create admin dashboard for social metrics
