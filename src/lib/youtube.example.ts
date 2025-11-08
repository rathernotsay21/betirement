/**
 * Example usage of the YouTube API client
 * 
 * This file demonstrates how to use the YouTube client in different contexts.
 */

import { youtubeClient } from "./youtube";

// Example 1: Fetch channel videos in a Server Component
export async function exampleServerComponent() {
  try {
    const videos = await youtubeClient.getChannelVideos(20);
    console.log(`Fetched ${videos.length} videos`);
    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

// Example 2: Get specific video details
export async function exampleGetVideoDetails(videoId: string) {
  try {
    const video = await youtubeClient.getVideoDetails(videoId);
    if (video) {
      console.log(`Video: ${video.title}`);
      console.log(`Views: ${video.viewCount}`);
      console.log(`Duration: ${video.duration}`);
      return video;
    }
    return null;
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}

// Example 3: Search videos
export async function exampleSearchVideos(query: string) {
  try {
    const results = await youtubeClient.searchVideos(query, 10);
    console.log(`Found ${results.length} videos matching "${query}"`);
    return results;
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
}

// Example 4: Get playlist videos
export async function exampleGetPlaylistVideos(playlistId: string) {
  try {
    const videos = await youtubeClient.getPlaylistVideos(playlistId, 30);
    console.log(`Fetched ${videos.length} videos from playlist`);
    return videos;
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
    return [];
  }
}

// Example 5: Filter videos by category
export async function exampleFilterByCategory(category: string) {
  try {
    const allVideos = await youtubeClient.getChannelVideos(50);
    const filtered = allVideos.filter(video => video.category === category);
    console.log(`Found ${filtered.length} videos in category "${category}"`);
    return filtered;
  } catch (error) {
    console.error("Error filtering videos:", error);
    return [];
  }
}

// Example 6: Get recent videos
export async function exampleGetRecentVideos(count: number = 10) {
  try {
    const videos = await youtubeClient.getChannelVideos(count);
    // Videos are already sorted by date (newest first)
    return videos;
  } catch (error) {
    console.error("Error fetching recent videos:", error);
    return [];
  }
}

// Example 7: Clear cache manually
export function exampleClearCache() {
  youtubeClient.clearCache();
  console.log("Cache cleared successfully");
}

// Example 8: Usage in API route
export async function exampleApiRoute(searchQuery?: string) {
  try {
    let videos;
    
    if (searchQuery) {
      videos = await youtubeClient.searchVideos(searchQuery, 20);
    } else {
      videos = await youtubeClient.getChannelVideos(50);
    }

    return {
      success: true,
      videos,
      count: videos.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      videos: [],
      count: 0,
    };
  }
}
