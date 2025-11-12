import { Video, VideoCategory } from "@/src/types/video";

// YouTube API response types
interface YouTubeVideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  tags?: string[];
  categoryId: string;
}

interface YouTubeVideoContentDetails {
  duration: string;
}

interface YouTubeVideoStatistics {
  viewCount: string;
  likeCount: string;
}

interface YouTubeVideoItem {
  id: string;
  snippet: YouTubeVideoSnippet;
  contentDetails: YouTubeVideoContentDetails;
  statistics: YouTubeVideoStatistics;
}

interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: YouTubeVideoSnippet;
}

interface YouTubeApiResponse<T> {
  items: T[];
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
}

// In-memory cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Rate limiting
let requestCount = 0;
let requestWindowStart = Date.now();
const MAX_REQUESTS_PER_MINUTE = 50;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

/**
 * YouTube API Client for fetching video data
 */
export class YouTubeClient {
  private apiKey: string;
  private channelId: string;
  private baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor(apiKey?: string, channelId?: string) {
    this.apiKey = apiKey || process.env.YOUTUBE_API_KEY || "";
    this.channelId = channelId || process.env.YOUTUBE_CHANNEL_ID || "";

    if (!this.apiKey) {
      console.warn("YouTube API key not configured");
    }
    if (!this.channelId) {
      console.warn("YouTube channel ID not configured");
    }
  }

  /**
   * Detect if we're in a CI/build environment
   * Returns true if running in Netlify, CI, or with invalid/missing API keys
   */
  private isBuildTime(): boolean {
    // Check for CI environment variables
    const isCI = process.env.CI === 'true' ||
                 process.env.NETLIFY === 'true' ||
                 process.env.VERCEL === '1';

    // Check if API key is missing or looks like a placeholder
    const hasInvalidKey = !this.apiKey ||
                          this.apiKey.includes('YOUR_') ||
                          this.apiKey.includes('PLACEHOLDER') ||
                          this.apiKey === 'mock';

    return isCI || hasInvalidKey;
  }

  /**
   * Check if we're within rate limits
   */
  private checkRateLimit(): boolean {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - requestWindowStart > RATE_LIMIT_WINDOW) {
      requestCount = 0;
      requestWindowStart = now;
    }

    if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
      console.warn("YouTube API rate limit reached");
      return false;
    }

    requestCount++;
    return true;
  }

  /**
   * Get data from cache if available and not expired
   */
  private getFromCache<T>(key: string): T | null {
    const entry = cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > CACHE_DURATION) {
      cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Store data in cache
   */
  private setCache<T>(key: string, data: T): void {
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Make API request with error handling
   */
  private async makeRequest<T>(url: string): Promise<T> {
    if (!this.checkRateLimit()) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("YouTube API quota exceeded or invalid API key");
        }
        if (response.status === 404) {
          throw new Error("Resource not found");
        }
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        console.error("YouTube API request failed:", error.message);
        throw error;
      }
      throw new Error("Unknown error occurred while fetching from YouTube API");
    }
  }

  /**
   * Convert ISO 8601 duration to readable format (e.g., "PT10M30S" -> "10:30")
   */
  private parseDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  /**
   * Map YouTube category ID to our VideoCategory type
   */
  private mapCategory(categoryId: string, tags: string[] = []): VideoCategory {
    // Use tags to determine category
    const tagString = tags.join(" ").toLowerCase();
    
    if (tagString.includes("fundamental") || tagString.includes("basics")) {
      return "bitcoin-fundamentals";
    }
    if (tagString.includes("retirement") || tagString.includes("retire")) {
      return "retirement-planning";
    }
    if (tagString.includes("investment") || tagString.includes("strategy")) {
      return "investment-strategies";
    }
    if (tagString.includes("market") || tagString.includes("analysis")) {
      return "market-analysis";
    }
    if (tagString.includes("success") || tagString.includes("story")) {
      return "success-stories";
    }
    if (tagString.includes("book") || tagString.includes("reading")) {
      return "book-club";
    }

    // Default category
    return "bitcoin-fundamentals";
  }

  /**
   * Transform YouTube API response to our Video type
   */
  private transformVideo(item: YouTubeVideoItem): Video {
    return {
      id: item.id,
      youtubeId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: {
        default: item.snippet.thumbnails.default.url,
        medium: item.snippet.thumbnails.medium.url,
        high: item.snippet.thumbnails.high.url,
      },
      publishedAt: item.snippet.publishedAt,
      duration: this.parseDuration(item.contentDetails.duration),
      category: this.mapCategory(item.snippet.categoryId, item.snippet.tags),
      tags: item.snippet.tags || [],
      viewCount: parseInt(item.statistics.viewCount || "0"),
      likeCount: parseInt(item.statistics.likeCount || "0"),
    };
  }

  /**
   * Get videos from a channel
   */
  async getChannelVideos(maxResults: number = 50): Promise<Video[]> {
    // Skip API calls during build time
    if (this.isBuildTime()) {
      console.log("Build time detected - skipping YouTube API call for channel videos");
      return [];
    }

    const cacheKey = `channel_videos_${this.channelId}_${maxResults}`;

    // Check cache first
    const cached = this.getFromCache<Video[]>(cacheKey);
    if (cached) {
      return cached;
    }

    if (!this.apiKey || !this.channelId) {
      console.error("YouTube API key or channel ID not configured");
      return [];
    }

    try {
      // First, search for videos from the channel
      const searchUrl = `${this.baseUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet&type=video&order=date&maxResults=${maxResults}`;
      const searchResponse = await this.makeRequest<YouTubeApiResponse<YouTubeSearchItem>>(searchUrl);

      if (!searchResponse.items || searchResponse.items.length === 0) {
        return [];
      }

      // Get video IDs
      const videoIds = searchResponse.items.map((item) => item.id.videoId).join(",");

      // Fetch detailed video information
      const videosUrl = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`;
      const videosResponse = await this.makeRequest<YouTubeApiResponse<YouTubeVideoItem>>(videosUrl);

      const videos = videosResponse.items.map((item) => this.transformVideo(item));

      // Cache the results
      this.setCache(cacheKey, videos);

      return videos;
    } catch (error) {
      console.error("Error fetching channel videos:", error);
      
      // Return cached data if available, even if expired
      const expiredCache = cache.get(cacheKey);
      if (expiredCache) {
        console.log("Returning expired cache due to API error");
        return expiredCache.data as Video[];
      }
      
      return [];
    }
  }

  /**
   * Get details for a specific video
   */
  async getVideoDetails(videoId: string): Promise<Video | null> {
    // Skip API calls during build time
    if (this.isBuildTime()) {
      console.log("Build time detected - skipping YouTube API call for video details");
      return null;
    }

    const cacheKey = `video_${videoId}`;

    // Check cache first
    const cached = this.getFromCache<Video>(cacheKey);
    if (cached) {
      return cached;
    }

    if (!this.apiKey) {
      console.error("YouTube API key not configured");
      return null;
    }

    try {
      const url = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoId}&part=snippet,contentDetails,statistics`;
      const response = await this.makeRequest<YouTubeApiResponse<YouTubeVideoItem>>(url);

      if (!response.items || response.items.length === 0) {
        return null;
      }

      const video = this.transformVideo(response.items[0]);

      // Cache the result
      this.setCache(cacheKey, video);

      return video;
    } catch (error) {
      console.error("Error fetching video details:", error);
      
      // Return cached data if available, even if expired
      const expiredCache = cache.get(cacheKey);
      if (expiredCache) {
        console.log("Returning expired cache due to API error");
        return expiredCache.data as Video;
      }
      
      return null;
    }
  }

  /**
   * Get videos from a specific playlist
   */
  async getPlaylistVideos(playlistId: string, maxResults: number = 50): Promise<Video[]> {
    // Skip API calls during build time
    if (this.isBuildTime()) {
      console.log("Build time detected - skipping YouTube API call for playlist videos");
      return [];
    }

    const cacheKey = `playlist_${playlistId}_${maxResults}`;

    // Check cache first
    const cached = this.getFromCache<Video[]>(cacheKey);
    if (cached) {
      return cached;
    }

    if (!this.apiKey) {
      console.error("YouTube API key not configured");
      return [];
    }

    try {
      // Get playlist items
      const playlistUrl = `${this.baseUrl}/playlistItems?key=${this.apiKey}&playlistId=${playlistId}&part=snippet&maxResults=${maxResults}`;
      const playlistResponse = await this.makeRequest<YouTubeApiResponse<any>>(playlistUrl);

      if (!playlistResponse.items || playlistResponse.items.length === 0) {
        return [];
      }

      // Get video IDs
      const videoIds = playlistResponse.items
        .map((item: any) => item.snippet.resourceId.videoId)
        .join(",");

      // Fetch detailed video information
      const videosUrl = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`;
      const videosResponse = await this.makeRequest<YouTubeApiResponse<YouTubeVideoItem>>(videosUrl);

      const videos = videosResponse.items.map((item) => this.transformVideo(item));

      // Cache the results
      this.setCache(cacheKey, videos);

      return videos;
    } catch (error) {
      console.error("Error fetching playlist videos:", error);
      
      // Return cached data if available, even if expired
      const expiredCache = cache.get(cacheKey);
      if (expiredCache) {
        console.log("Returning expired cache due to API error");
        return expiredCache.data as Video[];
      }
      
      return [];
    }
  }

  /**
   * Search for videos by query
   */
  async searchVideos(query: string, maxResults: number = 20): Promise<Video[]> {
    // Skip API calls during build time
    if (this.isBuildTime()) {
      console.log("Build time detected - skipping YouTube API call for video search");
      return [];
    }

    const cacheKey = `search_${query}_${maxResults}`;

    // Check cache first
    const cached = this.getFromCache<Video[]>(cacheKey);
    if (cached) {
      return cached;
    }

    if (!this.apiKey || !this.channelId) {
      console.error("YouTube API key or channel ID not configured");
      return [];
    }

    try {
      // Search within the channel
      const searchUrl = `${this.baseUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
      const searchResponse = await this.makeRequest<YouTubeApiResponse<YouTubeSearchItem>>(searchUrl);

      if (!searchResponse.items || searchResponse.items.length === 0) {
        return [];
      }

      // Get video IDs
      const videoIds = searchResponse.items.map((item) => item.id.videoId).join(",");

      // Fetch detailed video information
      const videosUrl = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`;
      const videosResponse = await this.makeRequest<YouTubeApiResponse<YouTubeVideoItem>>(videosUrl);

      const videos = videosResponse.items.map((item) => this.transformVideo(item));

      // Cache the results
      this.setCache(cacheKey, videos);

      return videos;
    } catch (error) {
      console.error("Error searching videos:", error);
      
      // Return cached data if available, even if expired
      const expiredCache = cache.get(cacheKey);
      if (expiredCache) {
        console.log("Returning expired cache due to API error");
        return expiredCache.data as Video[];
      }
      
      return [];
    }
  }

  /**
   * Clear the cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    cache.clear();
  }
}

// Export a singleton instance
export const youtubeClient = new YouTubeClient();
