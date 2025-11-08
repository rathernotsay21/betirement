# YouTube API Integration

This document describes the YouTube API integration for the Betirement website.

## Overview

The YouTube API client (`youtube.ts`) provides functionality to fetch and display videos from the Betirement YouTube channel with built-in caching, error handling, and rate limiting.

## Features

- **Automatic Caching**: All API responses are cached for 1 hour to minimize API quota usage
- **Rate Limiting**: Built-in protection against exceeding YouTube API rate limits (50 requests/minute)
- **Error Handling**: Graceful fallback to cached data when API errors occur
- **ISR Support**: Video pages use Incremental Static Regeneration with 1-hour revalidation

## Setup

### 1. Get YouTube API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Find your YouTube Channel ID from your channel URL or settings

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=your_channel_id_here
```

## Usage

### Server-Side (Recommended)

Use the YouTube client in Server Components or API routes:

```typescript
import { youtubeClient } from "@/src/lib/youtube";

// Get all channel videos
const videos = await youtubeClient.getChannelVideos(50);

// Get specific video details
const video = await youtubeClient.getVideoDetails("video_id");

// Search videos
const results = await youtubeClient.searchVideos("bitcoin retirement", 20);

// Get playlist videos
const playlistVideos = await youtubeClient.getPlaylistVideos("playlist_id", 50);
```

### API Routes

Two API routes are available for client-side fetching:

**Get all videos:**
```
GET /api/videos?maxResults=50
GET /api/videos?query=bitcoin&maxResults=20
```

**Get specific video:**
```
GET /api/videos/[videoId]
```

### Pages with ISR

Video pages are configured with ISR (Incremental Static Regeneration):

- **Revalidation**: Every 1 hour (3600 seconds)
- **Static Generation**: Top 10 videos are pre-generated at build time
- **On-Demand**: Other videos are generated on first request

## API Methods

### `getChannelVideos(maxResults?: number): Promise<Video[]>`

Fetches videos from the configured YouTube channel.

- **Parameters**: 
  - `maxResults` (optional): Number of videos to fetch (default: 50)
- **Returns**: Array of Video objects
- **Caching**: Results cached for 1 hour

### `getVideoDetails(videoId: string): Promise<Video | null>`

Fetches detailed information for a specific video.

- **Parameters**: 
  - `videoId`: YouTube video ID
- **Returns**: Video object or null if not found
- **Caching**: Results cached for 1 hour

### `getPlaylistVideos(playlistId: string, maxResults?: number): Promise<Video[]>`

Fetches videos from a specific playlist.

- **Parameters**: 
  - `playlistId`: YouTube playlist ID
  - `maxResults` (optional): Number of videos to fetch (default: 50)
- **Returns**: Array of Video objects
- **Caching**: Results cached for 1 hour

### `searchVideos(query: string, maxResults?: number): Promise<Video[]>`

Searches for videos within the channel.

- **Parameters**: 
  - `query`: Search query string
  - `maxResults` (optional): Number of results (default: 20)
- **Returns**: Array of Video objects
- **Caching**: Results cached for 1 hour

### `clearCache(): void`

Clears all cached data. Useful for testing or manual refresh.

## Rate Limiting

The client implements rate limiting to protect against quota exhaustion:

- **Limit**: 50 requests per minute
- **Behavior**: Returns cached data when limit is reached
- **Reset**: Counter resets every minute

## Error Handling

The client handles errors gracefully:

1. **API Errors**: Logs error and returns cached data if available
2. **Network Errors**: Falls back to expired cache if available
3. **Missing Credentials**: Returns empty array and logs warning
4. **Rate Limit Exceeded**: Returns cached data and logs warning

## Caching Strategy

- **Duration**: 1 hour (3600 seconds)
- **Storage**: In-memory cache (Map)
- **Invalidation**: Automatic after expiration
- **Fallback**: Expired cache used when API fails

## YouTube API Quota

The YouTube Data API has a daily quota limit:

- **Default Quota**: 10,000 units per day
- **Cost per Request**:
  - Search: 100 units
  - Videos list: 1 unit
  - Playlist items: 1 unit

**Optimization Tips**:
- Use caching aggressively (already implemented)
- Limit `maxResults` to only what you need
- Use ISR to reduce build-time API calls
- Consider storing video data in a database for high-traffic sites

## Video Category Mapping

Videos are automatically categorized based on tags:

- `bitcoin-fundamentals`: Tags include "fundamental", "basics"
- `retirement-planning`: Tags include "retirement", "retire"
- `investment-strategies`: Tags include "investment", "strategy"
- `market-analysis`: Tags include "market", "analysis"
- `success-stories`: Tags include "success", "story"
- `book-club`: Tags include "book", "reading"

Default category is `bitcoin-fundamentals` if no matching tags found.

## Troubleshooting

### "YouTube API key not configured"

- Ensure `YOUTUBE_API_KEY` is set in `.env.local`
- Restart the development server after adding environment variables

### "YouTube API quota exceeded"

- Check your quota usage in Google Cloud Console
- Cached data will be used automatically
- Consider implementing a database cache for production

### "Rate limit exceeded"

- The client will automatically use cached data
- Wait 1 minute for the rate limit to reset
- Consider reducing the frequency of API calls

### Videos not updating

- Cache duration is 1 hour
- Use `youtubeClient.clearCache()` to force refresh
- ISR pages revalidate every hour automatically

## Production Considerations

1. **Database Caching**: For high-traffic sites, consider storing video data in a database
2. **Webhook Updates**: Use YouTube webhook notifications to update cache in real-time
3. **CDN**: Leverage Netlify CDN for static video pages
4. **Monitoring**: Track API quota usage in Google Cloud Console
5. **Backup Data**: Store video metadata locally as fallback

## Testing

To test the YouTube integration without API credentials:

1. The client will log warnings but won't crash
2. Empty arrays are returned when credentials are missing
3. Pages will display "No videos available" message
4. Add mock data for development if needed

## Future Enhancements

- [ ] Add video transcript fetching
- [ ] Implement webhook-based cache invalidation
- [ ] Add database persistence layer
- [ ] Support for multiple channels
- [ ] Advanced filtering and sorting options
- [ ] Video analytics integration
