import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogAuthor } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'src/data/blog');

// Default author information
const DEFAULT_AUTHOR: BlogAuthor = {
  name: 'Michael',
  avatar: '/images/author/michael.jpg',
  bio: 'Retired at 51 using Bitcoin strategies. Sharing my journey to help others achieve financial freedom.',
};

/**
 * Get all blog post slugs
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => (file.endsWith('.md') || file.endsWith('.mdx')) && !file.toUpperCase().includes('README'))
    .map((file) => file.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);
    
    // Try .md first, then .mdx
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        fileContents = fs.readFileSync(mdxPath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content,
      coverImage: data.coverImage || '/images/blog/default.jpg',
      author: data.author || DEFAULT_AUTHOR,
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      readingTime: Math.ceil(stats.minutes),
      tags: data.tags || [],
      category: data.category || 'Uncategorized',
      seo: {
        title: data.seo?.title || data.title || '',
        description: data.seo?.description || data.excerpt || '',
        keywords: data.seo?.keywords || data.tags || [],
        ogImage: data.seo?.ogImage || data.coverImage || '/images/blog/default.jpg',
      },
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return posts;
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tags = new Set(allPosts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit?: number): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const featured = allPosts.filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Search blog posts by query
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery)
  );
}
