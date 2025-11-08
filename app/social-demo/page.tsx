import { 
  InstagramFeed, 
  TwitterTimeline, 
  SocialShare, 
  SocialFollowerStats,
  SocialLoginButtons 
} from '@/components/social';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Social Media Integration Demo - Betirement',
  description: 'Demonstration of social media integration components',
};

export default function SocialDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Social Media Integration
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Demonstration of all social media components including feeds, sharing, 
            follower counts, and social login preparation.
          </p>
        </div>

        {/* Social Follower Stats */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Social Media Follower Counts
            </h2>
            <p className="text-neutral-600 mb-6">
              Display real-time follower counts across all platforms. Currently showing 
              placeholder data - implement API integrations for live counts.
            </p>
            <SocialFollowerStats />
          </Card>
        </section>

        {/* Social Share */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Social Sharing Buttons
            </h2>
            <p className="text-neutral-600 mb-6">
              Share content across multiple platforms with pre-populated text. 
              Includes Twitter, LinkedIn, Facebook, Email, and copy link functionality.
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <SocialShare
                url="https://betirement.com/blog/bitcoin-retirement-basics"
                title="Bitcoin Retirement Basics - Your Complete Guide"
                description="Learn the fundamentals of using Bitcoin for early retirement planning."
                hashtags={['Bitcoin', 'Retirement', 'FinancialFreedom']}
              />
            </div>
          </Card>
        </section>

        {/* Instagram Feed */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Instagram Feed
            </h2>
            <p className="text-neutral-600 mb-6">
              Display recent Instagram posts in a grid layout. Currently showing 
              placeholder content - implement Instagram Basic Display API for live posts.
            </p>
            <InstagramFeed maxPosts={6} />
          </Card>
        </section>

        {/* Twitter Timeline */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Twitter Timeline
            </h2>
            <p className="text-neutral-600 mb-6">
              Embed live Twitter timeline using Twitter's official widget. 
              No API key required for public timelines.
            </p>
            <div className="max-w-xl mx-auto">
              <TwitterTimeline 
                username="betirement" 
                height={500}
                theme="light"
              />
            </div>
          </Card>
        </section>

        {/* Social Login */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Social Login Buttons
            </h2>
            <p className="text-neutral-600 mb-6">
              Prepared structure for future OAuth implementation. Currently logs to 
              console - implement NextAuth.js for full OAuth functionality.
            </p>
            <div className="max-w-md mx-auto">
              <SocialLoginButtons />
            </div>
          </Card>
        </section>

        {/* Implementation Guide */}
        <section className="mb-16">
          <Card className="p-8 bg-bitcoin-50 border-bitcoin-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Implementation Guide
            </h2>
            <div className="prose prose-neutral max-w-none">
              <h3 className="text-lg font-semibold mb-2">Next Steps for Live Data:</h3>
              <ol className="space-y-2 text-neutral-700">
                <li>
                  <strong>Instagram Feed:</strong> Set up Instagram Basic Display API, 
                  add access token to environment variables, create /api/instagram endpoint
                </li>
                <li>
                  <strong>Follower Counts:</strong> Implement platform-specific APIs 
                  (YouTube Data API, Twitter API v2, Instagram Graph API, LinkedIn API)
                </li>
                <li>
                  <strong>Social Login:</strong> Install NextAuth.js, configure OAuth 
                  providers, set up callback handlers
                </li>
                <li>
                  <strong>Twitter Timeline:</strong> Already functional with Twitter's 
                  widget script (no additional setup needed)
                </li>
              </ol>
              <p className="mt-4 text-sm text-neutral-600">
                See <code className="bg-white px-2 py-1 rounded">src/components/social/README.md</code> for 
                detailed implementation instructions and API setup guides.
              </p>
            </div>
          </Card>
        </section>

        {/* Usage Examples */}
        <section>
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Usage Examples
            </h2>
            <div className="space-y-4">
              <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`// Blog post with social sharing
import { SocialShare } from '@/components/social';

<SocialShare
  url="https://betirement.com/blog/post-slug"
  title="Post Title"
  hashtags={['Bitcoin', 'Retirement']}
/>

// Home page with follower stats
import { SocialFollowerStats } from '@/components/social';

<SocialFollowerStats />

// Community page with feeds
import { InstagramFeed, TwitterTimeline } from '@/components/social';

<InstagramFeed maxPosts={6} />
<TwitterTimeline username="betirement" height={600} />`}
                </pre>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
