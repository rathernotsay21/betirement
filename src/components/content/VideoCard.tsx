"use client";

import Link from "next/link";
import Image from "next/image";
import { VideoCardProps, VideoCategory } from "@/src/types/video";

const categoryLabels: Record<VideoCategory, string> = {
  "bitcoin-fundamentals": "Bitcoin Fundamentals",
  "retirement-planning": "Retirement Planning",
  "investment-strategies": "Investment Strategies",
  "market-analysis": "Market Analysis",
  "success-stories": "Success Stories",
  "book-club": "Book Club",
};

const categoryColors: Record<VideoCategory, string> = {
  "bitcoin-fundamentals": "bg-bitcoin-500 text-white",
  "retirement-planning": "bg-trust-500 text-white",
  "investment-strategies": "bg-success text-white",
  "market-analysis": "bg-neutral-700 text-white",
  "success-stories": "bg-bitcoin-600 text-white",
  "book-club": "bg-trust-600 text-white",
};

export default function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  category,
  publishedAt,
  viewCount,
}: VideoCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatViews = (views?: number) => {
    if (!views) return "0 views";
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  return (
    <Link
      href={`/content/videos/${id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[44px]"
    >
      <div className="relative aspect-video bg-neutral-100">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs sm:text-sm px-2 py-1 rounded font-medium">
          {duration}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-2">
          <span
            className={`inline-block text-xs font-semibold px-2 py-1 rounded ${categoryColors[category]}`}
          >
            {categoryLabels[category]}
          </span>
        </div>
        <h3 className="font-heading font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-bitcoin-500 transition-colors">
          {title}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm text-neutral-500">
          <span>{formatDate(publishedAt)}</span>
          {viewCount !== undefined && <span>{formatViews(viewCount)}</span>}
        </div>
      </div>
    </Link>
  );
}
