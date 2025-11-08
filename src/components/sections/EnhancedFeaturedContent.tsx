'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Video } from '@/src/types/video';
import { mockVideos } from '@/src/data/mock-videos';
import { VideoCardSkeleton } from '@/src/components/ui/Skeleton';

// Video card with animations
function AnimatedVideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/content/videos/${video.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Thumbnail with overlay */}
          <div className="relative aspect-video">
            <img
              src={video.thumbnail.high}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-bitcoin-500 rounded-full flex items-center justify-center shadow-xl"
              >
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </motion.div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
              {video.duration}
            </div>

            {/* Category badge */}
            <div className="absolute top-2 left-2">
              <span className="inline-block bg-bitcoin-500/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {video.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-bitcoin-500 transition-colors">
              {video.title}
            </h3>
            <p className="text-neutral-600 text-sm line-clamp-2 mb-3">
              {video.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {video.viewCount.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {video.likeCount.toLocaleString()}
                </span>
              </div>
              <span className="text-xs">
                {new Date(video.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function EnhancedFeaturedContent() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Try to fetch from YouTube API
        const response = await fetch('/api/youtube/featured');

        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos || mockVideos.slice(0, 6));
        } else {
          // Fallback to mock data
          setVideos(mockVideos.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Fallback to mock data
        setVideos(mockVideos.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const categories = [
    { id: 'all', label: 'All Videos', icon: '🎬' },
    { id: 'bitcoin-fundamentals', label: 'Bitcoin Basics', icon: '₿' },
    { id: 'retirement-planning', label: 'Retirement', icon: '🏖️' },
    { id: 'investment-strategies', label: 'Strategies', icon: '📈' },
    { id: 'success-stories', label: 'Success Stories', icon: '🌟' },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Latest from <span className="text-bitcoin-500">@Betirement</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Watch our latest videos on Bitcoin, retirement planning, and achieving financial freedom
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-bitcoin-500 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVideos.map((video, index) => (
              <AnimatedVideoCard key={video.id} video={video} index={index} />
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/content/videos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bitcoin-500 text-white rounded-lg font-semibold hover:bg-bitcoin-600 transition-colors duration-300 shadow-xl hover:shadow-2xl"
          >
            View All Videos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* YouTube Channel Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-bitcoin-100">Subscribers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-bitcoin-100">Videos</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-bitcoin-100">Total Views</div>
            </div>
            <div>
              <a
                href="https://www.youtube.com/@Betirement"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-bitcoin-600 rounded-lg font-semibold hover:bg-bitcoin-50 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}