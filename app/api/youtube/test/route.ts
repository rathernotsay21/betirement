import { NextResponse } from "next/server";
import { youtubeClient } from "@/src/lib/youtube";

/**
 * Test endpoint for YouTube API connection
 * GET /api/youtube/test
 */
export async function GET() {
  try {
    // Check if environment variables are configured
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return NextResponse.json(
        {
          success: false,
          error: "YouTube API configuration missing",
          details: {
            hasApiKey: !!apiKey,
            hasChannelId: !!channelId,
          },
          instructions: {
            apiKey: "Add YOUTUBE_API_KEY to .env.local (get from Google Cloud Console)",
            channelId: "Add YOUTUBE_CHANNEL_ID to .env.local (get from YouTube channel page)",
            channelUrl: "https://www.youtube.com/@Betirement",
          },
        },
        { status: 500 }
      );
    }

    // Test fetching channel videos
    console.log("Testing YouTube API connection...");
    const videos = await youtubeClient.getChannelVideos(5);

    if (videos.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No videos found or API error",
        details: {
          apiKeyProvided: apiKey.substring(0, 8) + "...",
          channelId: channelId,
        },
      });
    }

    // Get channel statistics using the first video's data
    const channelInfo = {
      channelId: channelId,
      totalVideos: videos.length,
      latestVideo: videos[0] ? {
        title: videos[0].title,
        publishedAt: videos[0].publishedAt,
        views: videos[0].viewCount,
        likes: videos[0].likeCount,
      } : null,
      videoList: videos.map(v => ({
        title: v.title,
        id: v.youtubeId,
        views: v.viewCount,
        duration: v.duration,
        category: v.category,
      })),
    };

    return NextResponse.json({
      success: true,
      message: "YouTube API connection successful!",
      channelInfo,
    });

  } catch (error) {
    console.error("YouTube API test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        troubleshooting: {
          checkAPIKey: "Verify your API key is valid and has YouTube Data API v3 enabled",
          checkChannelId: "Ensure the channel ID is correct",
          quotaCheck: "Check if you've exceeded the API quota limit",
        },
      },
      { status: 500 }
    );
  }
}