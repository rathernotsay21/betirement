import { siteConfig } from '@/src/config/site';
import type { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'video.other';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata({
  title,
  description = siteConfig.description,
  keywords = [...siteConfig.keywords],
  image = siteConfig.ogImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = siteConfig.author.name,
  noindex = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const imageUrl = image.startsWith('http')
    ? image
    : `${siteConfig.url}${image}`;

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: '@betirement',
      site: '@betirement',
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };

  return metadata;
}

/**
 * Generate Organization schema markup
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.youtube,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'Customer Service',
    },
  };
}

/**
 * Generate Person schema markup
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    description: siteConfig.author.bio,
    jobTitle: 'Bitcoin Retirement Strategist',
    sameAs: [
      siteConfig.links.youtube,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
    ],
  };
}

/**
 * Generate Article schema markup
 */
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = siteConfig.author.name,
  url,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  const imageUrl = image.startsWith('http')
    ? image
    : `${siteConfig.url}${image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${url}`,
    },
  };
}

/**
 * Generate Video schema markup
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Generate BreadcrumbList schema markup
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}


