import { NextResponse } from "next/server";
import { youtubeClient } from "@/src/lib/youtube";
import { mockVideos } from "@/src/data/mock-videos";

/**
 * Get featured videos for homepage
 * GET /api/youtube/featured
 */
export async function GET() {
  try {
    // Try to fetch real videos from YouTube
    const videos = await youtubeClient.getChannelVideos(6);

    if (videos.length > 0) {
      return NextResponse.json({
        success: true,
        videos: videos,
        source: 'youtube',
      });
    }

    // Fallback to mock data if no videos from YouTube
    return NextResponse.json({
      success: true,
      videos: mockVideos.slice(0, 6),
      source: 'mock',
    });

  } catch (error) {
    console.error("Error fetching featured videos:", error);

    // Return mock data on error
    return NextResponse.json({
      success: true,
      videos: mockVideos.slice(0, 6),
      source: 'mock',
      error: error instanceof Error ? error.message : "Failed to fetch videos",
    });
  }
}