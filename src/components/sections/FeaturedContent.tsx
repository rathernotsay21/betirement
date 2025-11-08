import { Card } from '@/src/components/ui';
import Link from 'next/link';
import Image from 'next/image';

export function FeaturedContent() {
  // Placeholder data - will be replaced with real data from CMS/API
  const featuredVideo = {
    title: 'How I Retired at 51 with Bitcoin',
    description: 'My complete journey from corporate employee to early retirement using Bitcoin strategies.',
    thumbnail: '/images/placeholder-video.jpg',
    duration: '15:30',
    href: '/content/videos/how-i-retired-at-51',
  };

  const latestBlogPost = {
    title: 'Getting Started with Bitcoin for Retirement',
    excerpt: 'A comprehensive guide to understanding Bitcoin as a retirement vehicle and how to get started safely.',
    coverImage: '/images/placeholder-blog.jpg',
    publishedAt: '2024-01-15',
    readingTime: 8,
    href: '/content/blog/getting-started-bitcoin-retirement',
  };

  const productSpotlight = {
    title: 'Bitcoin Retirement Blueprint',
    description: 'Complete course on building your Bitcoin retirement strategy from scratch.',
    image: '/images/placeholder-product.jpg',
    price: '$97',
    href: '#', // Will link to product page when e-commerce is implemented
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Featured Content
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Start with our most popular resources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Video */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <Link href={featuredVideo.href}>
              <div className="relative aspect-video bg-neutral-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-bitcoin-500 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {featuredVideo.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-bitcoin-500 font-semibold mb-2 uppercase">
                  Featured Video
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {featuredVideo.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {featuredVideo.description}
                </p>
              </div>
            </Link>
          </Card>

          {/* Latest Blog Post */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <Link href={latestBlogPost.href}>
              <div className="relative aspect-video bg-neutral-200">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-bitcoin-500 font-semibold mb-2 uppercase">
                  Latest Article
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {latestBlogPost.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-3">
                  {latestBlogPost.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span>{new Date(latestBlogPost.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{latestBlogPost.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </Card>

          {/* Product Spotlight */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-gradient-to-br from-bitcoin-50 to-white border-2 border-bitcoin-500">
            <Link href={productSpotlight.href}>
              <div className="relative aspect-video bg-bitcoin-100">
                <div className="absolute inset-0 flex items-center justify-center text-bitcoin-500">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-bitcoin-600 font-semibold mb-2 uppercase">
                  Product Spotlight
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {productSpotlight.title}
                </h3>
                <p className="text-neutral-700 text-sm mb-4">
                  {productSpotlight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-bitcoin-600">
                    {productSpotlight.price}
                  </span>
                  <span className="text-sm text-bitcoin-600 font-semibold">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
