export type VideoCategory =
  | "bitcoin-fundamentals"
  | "retirement-planning"
  | "investment-strategies"
  | "market-analysis"
  | "success-stories"
  | "book-club";

export interface VideoThumbnail {
  default: string;
  medium: string;
  high: string;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: VideoThumbnail;
  publishedAt: string;
  duration: string;
  category: VideoCategory;
  tags: string[];
  viewCount: number;
  likeCount: number;
  transcript?: string;
}

export interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: VideoCategory;
  publishedAt: string;
  viewCount?: number;
}
