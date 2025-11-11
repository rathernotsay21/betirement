import { youtubeClient } from "@/src/lib/youtube";
import { Video, VideoCategory } from "@/src/types/video";
import { mockVideos } from "@/src/data/mock-videos";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, generateVideoSchema, generateBreadcrumbSchema } from "@/src/lib/seo";
import { JsonLd } from "@/src/components/seo";
import type { Metadata } from "next";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

interface VideoPageProps {
  params: {
    id: string;
  };
}

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

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  try {
    let video = await youtubeClient.getVideoDetails(params.id);

    // Try mock data if YouTube fails
    if (!video) {
      video = mockVideos.find(v => v.id === params.id || v.youtubeId === params.id) || null;
    }

    if (!video) {
      return {
        title: 'Video Not Found',
      };
    }

    return generateSEOMetadata({
      title: video.title,
      description: video.description.slice(0, 160),
      url: `/content/videos/${params.id}`,
      type: 'video.other',
      image: video.thumbnail.high,
      keywords: video.tags || ['bitcoin', 'retirement', 'investing'],
    });
  } catch (error) {
    // Try mock data on error
    const video = mockVideos.find(v => v.id === params.id || v.youtubeId === params.id);

    if (video) {
      return generateSEOMetadata({
        title: video.title,
        description: video.description.slice(0, 160),
        url: `/content/videos/${params.id}`,
        type: 'video.other',
        image: video.thumbnail.high,
        keywords: video.tags || ['bitcoin', 'retirement', 'investing'],
      });
    }

    return {
      title: 'Video Not Found',
    };
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  let video: Video | null = null;
  let relatedVideos: Video[] = [];
  let error: string | null = null;
  let isUsingMockData = false;

  try {
    video = await youtubeClient.getVideoDetails(params.id);

    // Fetch related videos from the same category
    if (video) {
      const allVideos = await youtubeClient.getChannelVideos(50);
      const currentVideo = video; // Create a const reference for the filter
      relatedVideos = allVideos
        .filter((v) => v.id !== currentVideo.id && v.category === currentVideo.category)
        .slice(0, 3);
    } else {
      // Try to find in mock data
      video = mockVideos.find(v => v.id === params.id || v.youtubeId === params.id) || null;
      if (video) {
        isUsingMockData = true;
        relatedVideos = mockVideos
          .filter((v) => v.id !== video!.id && v.category === video!.category)
          .slice(0, 3);
      }
    }
  } catch (err) {
    console.error("Error loading video from YouTube:", err);

    // Fall back to mock data
    video = mockVideos.find(v => v.id === params.id || v.youtubeId === params.id) || null;
    if (video) {
      isUsingMockData = true;
      relatedVideos = mockVideos
        .filter((v) => v.id !== video!.id && v.category === video!.category)
        .slice(0, 3);
      error = null; // Clear error since we have fallback data
    } else {
      error = err instanceof Error ? err.message : "Failed to load video";
    }
  }

  if (!video && !error) {
    notFound();
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold text-lg">Error loading video</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <Link
            href="/content/videos"
            className="inline-flex items-center text-bitcoin-500 hover:text-bitcoin-600 font-medium mt-6 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to videos
          </Link>
        </div>
      </div>
    );
  }

  if (!video) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const videoSchema = generateVideoSchema({
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail.high,
    uploadDate: video.publishedAt,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Videos', url: '/content/videos' },
    { name: video.title, url: `/content/videos/${video.id}` },
  ]);

  return (
    <>
      <JsonLd data={videoSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/content/videos"
          className="inline-flex items-center text-bitcoin-500 hover:text-bitcoin-600 font-medium mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to videos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden shadow-xl mb-6">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <span
                  className={`inline-block text-sm font-semibold px-3 py-1 rounded ${
                    categoryColors[video.category]
                  }`}
                >
                  {categoryLabels[video.category]}
                </span>
              </div>

              <h1 className="font-heading text-3xl font-bold mb-4">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(video.publishedAt)}
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {formatNumber(video.viewCount)} views
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  {formatNumber(video.likeCount)} likes
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {video.duration}
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-neutral-200 pt-6">
                <h2 className="font-heading text-xl font-semibold mb-3">
                  Description
                </h2>
                <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="border-t border-neutral-200 pt-6 mt-6">
                  <h2 className="font-heading text-xl font-semibold mb-3">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-neutral-100 text-neutral-700 text-sm px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcript */}
              {video.transcript && (
                <div className="border-t border-neutral-200 pt-6 mt-6">
                  <h2 className="font-heading text-xl font-semibold mb-3">
                    Transcript
                  </h2>
                  <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
                    {video.transcript}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="font-heading text-xl font-semibold mb-4">
                Related Videos
              </h2>
              {relatedVideos.length > 0 ? (
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <Link
                      key={relatedVideo.id}
                      href={`/content/videos/${relatedVideo.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-40 aspect-video flex-shrink-0 bg-neutral-100 rounded overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={relatedVideo.thumbnail.medium}
                            alt={relatedVideo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                            {relatedVideo.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-bitcoin-500 transition-colors mb-1">
                            {relatedVideo.title}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            {formatNumber(relatedVideo.viewCount)} views
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">
                  No related videos available.
                </p>
              )}

              <Link
                href="/content/videos"
                className="block mt-6 text-center py-2 px-4 bg-bitcoin-500 text-white rounded-lg hover:bg-bitcoin-600 transition-colors font-medium"
              >
                View All Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// Generate static params for popular videos (optional optimization)
export async function generateStaticParams() {
  try {
    const videos = await youtubeClient.getChannelVideos(10);
    if (videos.length > 0) {
      return videos.map((video) => ({
        id: video.youtubeId,
      }));
    }
    // Fallback to mock videos if YouTube API fails or returns no videos
    return mockVideos.slice(0, 10).map((video) => ({
      id: video.id,
    }));
  } catch (error) {
    console.error("Error generating static params (using mock data):", error);
    // Fallback to mock videos on error
    return mockVideos.slice(0, 10).map((video) => ({
      id: video.id,
    }));
  }
}
