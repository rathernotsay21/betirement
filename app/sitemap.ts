import { MetadataRoute } from 'next';
import { siteConfig } from '@/src/config/site';
import { getAllBlogPosts } from '@/src/lib/blog';
import { youtubeClient } from '@/src/lib/youtube';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start-here`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/speaking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/content/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/content/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/content/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/content/resources/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllBlogPosts();
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/content/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Video pages
  let videoPages: MetadataRoute.Sitemap = [];
  try {
    const videos = await youtubeClient.getChannelVideos(50);
    videoPages = videos.map((video) => ({
      url: `${baseUrl}/content/videos/${video.id}`,
      lastModified: new Date(video.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error('Error fetching videos for sitemap:', error);
  }

  return [...staticPages, ...blogPages, ...videoPages];
}
