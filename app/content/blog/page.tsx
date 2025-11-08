import { Suspense } from 'react';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/src/lib/blog';
import BlogCard from '@/src/components/content/BlogCard';
import BlogFilters from '@/src/components/content/BlogFilters';
import { generateMetadata } from '@/src/lib/seo';

export const metadata = generateMetadata({
  title: 'Blog',
  description:
    'In-depth articles about Bitcoin retirement strategies, investment insights, and financial freedom. Learn from real experience and proven strategies.',
  url: '/content/blog',
  keywords: [
    'bitcoin blog',
    'retirement strategies',
    'bitcoin investing articles',
    'financial freedom blog',
    'cryptocurrency retirement',
  ],
});

interface BlogPageProps {
  searchParams: {
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  // Filter posts based on search params
  let filteredPosts = allPosts;

  if (searchParams.category) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.category.toLowerCase() === searchParams.category?.toLowerCase()
    );
  }

  if (searchParams.tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some(
        (tag) => tag.toLowerCase() === searchParams.tag?.toLowerCase()
      )
    );
  }

  if (searchParams.search) {
    const query = searchParams.search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Separate featured posts
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-neutral-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Blog & Articles
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            In-depth insights on Bitcoin retirement strategies, investment
            analysis, and the path to financial freedom.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <BlogFilters
                categories={categories}
                tags={tags}
                currentCategory={searchParams.category}
                currentTag={searchParams.tag}
              />
            </Suspense>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            {(searchParams.category || searchParams.tag || searchParams.search) && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-neutral-600">Filtered by:</span>
                {searchParams.category && (
                  <span className="bg-bitcoin-100 text-bitcoin-700 px-3 py-1 rounded-full text-sm">
                    Category: {searchParams.category}
                  </span>
                )}
                {searchParams.tag && (
                  <span className="bg-bitcoin-100 text-bitcoin-700 px-3 py-1 rounded-full text-sm">
                    Tag: {searchParams.tag}
                  </span>
                )}
                {searchParams.search && (
                  <span className="bg-bitcoin-100 text-bitcoin-700 px-3 py-1 rounded-full text-sm">
                    Search: {searchParams.search}
                  </span>
                )}
                <a
                  href="/content/blog"
                  className="text-bitcoin-500 hover:text-bitcoin-600 text-sm underline"
                >
                  Clear filters
                </a>
              </div>
            )}

            {/* Results Count */}
            <p className="text-neutral-600 mb-6">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && !searchParams.category && !searchParams.tag && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-black font-heading">
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      coverImage={post.coverImage}
                      author={post.author.name}
                      publishedAt={post.publishedAt}
                      readingTime={post.readingTime}
                      tags={post.tags}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 ? (
              <div>
                {featuredPosts.length > 0 && !searchParams.category && !searchParams.tag && (
                  <h2 className="text-2xl font-bold mb-6 text-black font-heading">
                    All Articles
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      coverImage={post.coverImage}
                      author={post.author.name}
                      publishedAt={post.publishedAt}
                      readingTime={post.readingTime}
                      tags={post.tags}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">
                  No articles found matching your criteria.
                </p>
                <a
                  href="/content/blog"
                  className="text-bitcoin-500 hover:text-bitcoin-600 underline mt-4 inline-block"
                >
                  View all articles
                </a>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
