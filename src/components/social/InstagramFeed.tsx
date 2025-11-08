'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: string;
}

interface InstagramFeedProps {
  maxPosts?: number;
  className?: string;
}

export function InstagramFeed({ maxPosts = 6, className = '' }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we'll use placeholder data
    // In production, this would fetch from Instagram Basic Display API
    const fetchInstagramPosts = async () => {
      try {
        // TODO: Replace with actual Instagram API call
        // const response = await fetch('/api/instagram');
        // const data = await response.json();
        
        // Placeholder data for demonstration
        const placeholderPosts: InstagramPost[] = Array.from({ length: maxPosts }, (_, i) => ({
          id: `post-${i}`,
          caption: `Bitcoin retirement strategy #${i + 1}`,
          media_url: `/images/placeholder-instagram-${i % 3}.jpg`,
          media_type: 'IMAGE' as const,
          permalink: `https://instagram.com/p/placeholder${i}`,
          timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        }));
        
        setPosts(placeholderPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Instagram posts');
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [maxPosts]);

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {Array.from({ length: maxPosts }).map((_, i) => (
          <div key={i} className="aspect-square bg-neutral-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-neutral-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
        >
          <div className="relative w-full h-full">
            {/* Placeholder for actual image */}
            <div className="w-full h-full bg-gradient-to-br from-bitcoin-500 to-bitcoin-700 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
              {post.caption}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
