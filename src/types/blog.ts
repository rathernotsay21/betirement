export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or MDX
  coverImage: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  category: string;
  seo: BlogSEO;
  featured: boolean;
}

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}
