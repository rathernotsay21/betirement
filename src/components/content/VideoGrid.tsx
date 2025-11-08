"use client";

import { Video } from "@/src/types/video";
import VideoCard from "./VideoCard";

interface VideoGridProps {
  videos: Video[];
  emptyMessage?: string;
}

export default function VideoGrid({
  videos,
  emptyMessage = "No videos found.",
}: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          thumbnail={video.thumbnail.medium}
          duration={video.duration}
          category={video.category}
          publishedAt={video.publishedAt}
          viewCount={video.viewCount}
        />
      ))}
    </div>
  );
}
