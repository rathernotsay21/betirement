import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/src/lib/blog';
import SocialShare from '@/src/components/content/SocialShare';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/src/lib/seo';
import { JsonLd } from '@/src/components/seo';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [post.seo.ogImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [post.seo.ogImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: post.author.name,
    url: `/content/blog/${post.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/content/blog' },
    { name: post.title, url: `/content/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[400px] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href={`/content/blog?category=${encodeURIComponent(post.category)}`}
                className="bg-bitcoin-500 text-white px-3 py-1 rounded-full text-sm hover:bg-bitcoin-600 transition-colors"
              >
                {post.category}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-200">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-black">{post.author.name}</p>
            <p className="text-neutral-600 text-sm">{post.author.bio}</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Render markdown content */}
          <div
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>

        {/* Updated Date */}
        {updatedDate && (
          <p className="text-sm text-neutral-500 mt-8 italic">
            Last updated: {updatedDate}
          </p>
        )}

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <h3 className="font-semibold text-black mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/content/blog?tag=${encodeURIComponent(tag)}`}
                className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm hover:bg-bitcoin-50 hover:text-bitcoin-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <h3 className="font-semibold text-black mb-3">Share this article:</h3>
          <SocialShare
            url={`https://betirement.com/content/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
          />
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/content/blog"
            className="inline-flex items-center gap-2 text-bitcoin-500 hover:text-bitcoin-600 font-semibold transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </article>
    </>
  );
}

// Simple markdown to HTML converter (basic implementation)
// For production, consider using a proper markdown parser
function renderMarkdown(content: string): string {
  // This is a simplified version. In production, use a proper markdown parser
  // or MDX rendering. For now, we'll use basic replacements.
  let html = content;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mb-3 mt-6 text-black font-heading">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-4 mt-8 text-black font-heading">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-6 text-black font-heading">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-bitcoin-500 hover:text-bitcoin-600 underline">$1</a>');

  // Lists - handle line by line
  const lines = html.split('\n');
  let inList = false;
  const processedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\- /)) {
      if (!inList) {
        processedLines.push('<ul class="list-disc list-inside mb-4 space-y-2 text-neutral-700">');
        inList = true;
      }
      processedLines.push(`<li class="ml-4">${line.replace(/^\- /, '')}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  }
  if (inList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');

  // Paragraphs
  html = html.split('\n\n').map((para: string) => {
    if (!para.startsWith('<') && para.trim()) {
      return `<p class="mb-4 text-neutral-700 leading-relaxed">${para}</p>`;
    }
    return para;
  }).join('\n');

  return html;
}
