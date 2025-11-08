# API Documentation

This document provides comprehensive documentation for all API endpoints in the Betirement website.

## Overview

The Betirement API provides endpoints for:
- Email newsletter subscriptions
- YouTube video data
- Social media integration
- Analytics and tracking

All API endpoints are located in the `app/api/` directory and follow Next.js App Router conventions.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://betirement.com/api`

## Common Features

All API endpoints include:

### Rate Limiting
- Protects against abuse and excessive requests
- Returns `429 Too Many Requests` when limit exceeded
- Includes `X-RateLimit-*` headers with limit information

### CORS Headers
- Configured for cross-origin requests
- Supports preflight OPTIONS requests
- Customizable per endpoint

### Error Handling
- Consistent error response format
- Appropriate HTTP status codes
- Detailed error messages in development

### Input Sanitization
- All inputs are sanitized to prevent XSS and SQL injection
- Email validation
- Text length limits
- Honeypot spam protection

## Endpoints

### POST /api/subscribe

Subscribe a user to the email newsletter via ConvertKit.

#### Request

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "tags": ["website-home", "bitcoin"],
  "source": "homepage-hero"
}
```

**Parameters**:
- `email` (string, required): Valid email address
- `firstName` (string, optional): Subscriber's first name
- `tags` (array, optional): Array of tags to apply (max 10)
- `source` (string, optional): Signup source for tracking

**Honeypot Fields** (for spam protection):
- `website` (string): Should be empty
- `phone_number` (string): Should be empty
- `company` (string): Should be empty

#### Response

**Success (200)**:
```json
{
  "success": true,
  "message": "Successfully subscribed to the newsletter!",
  "subscriberId": "123456789"
}
```

**Already Subscribed (409)**:
```json
{
  "error": "This email is already subscribed"
}
```

**Invalid Email (400)**:
```json
{
  "error": "Invalid email address"
}
```

**Rate Limited (429)**:
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": "2024-01-01T12:00:00.000Z"
}
```

**Server Error (500)**:
```json
{
  "error": "Failed to subscribe. Please try again later."
}
```

#### Rate Limit
- 10 requests per 10 minutes per IP address

#### Example

```javascript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    firstName: 'John',
    tags: ['website-home'],
    source: 'homepage-hero'
  }),
});

const data = await response.json();
if (data.success) {
  console.log('Subscribed successfully!');
}
```

---

### GET /api/videos

Fetch YouTube videos from the channel with optional search.

#### Request

**Method**: `GET`

**Query Parameters**:
- `maxResults` (number, optional): Number of videos to return (1-50, default: 50)
- `query` (string, optional): Search query to filter videos

#### Response

**Success (200)**:
```json
{
  "success": true,
  "videos": [
    {
      "id": "abc123",
      "youtubeId": "dQw4w9WgXcQ",
      "title": "Bitcoin Retirement Strategy",
      "description": "Learn how to retire early with Bitcoin...",
      "thumbnail": {
        "default": "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
        "medium": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        "high": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
      },
      "publishedAt": "2024-01-01T12:00:00Z",
      "duration": "PT10M30S",
      "category": "bitcoin-fundamentals",
      "tags": ["bitcoin", "retirement", "investing"],
      "viewCount": 125000,
      "likeCount": 8500
    }
  ]
}
```

**Invalid Parameters (400)**:
```json
{
  "error": "maxResults must be a number between 1 and 50"
}
```

**Rate Limited (429)**:
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": "2024-01-01T12:00:00.000Z"
}
```

#### Rate Limit
- 100 requests per 15 minutes per IP address

#### Example

```javascript
// Get all videos
const response = await fetch('/api/videos?maxResults=20');
const data = await response.json();

// Search videos
const searchResponse = await fetch('/api/videos?query=bitcoin&maxResults=10');
const searchData = await searchResponse.json();
```

---

### GET /api/videos/[id]

Get detailed information for a specific video.

#### Request

**Method**: `GET`

**Path Parameters**:
- `id` (string, required): YouTube video ID

#### Response

**Success (200)**:
```json
{
  "success": true,
  "video": {
    "id": "abc123",
    "youtubeId": "dQw4w9WgXcQ",
    "title": "Bitcoin Retirement Strategy",
    "description": "Full description...",
    "thumbnail": { /* ... */ },
    "publishedAt": "2024-01-01T12:00:00Z",
    "duration": "PT10M30S",
    "category": "bitcoin-fundamentals",
    "tags": ["bitcoin", "retirement"],
    "viewCount": 125000,
    "likeCount": 8500,
    "transcript": "Video transcript if available..."
  }
}
```

**Not Found (404)**:
```json
{
  "error": "Video not found"
}
```

#### Rate Limit
- 100 requests per 15 minutes per IP address

#### Example

```javascript
const response = await fetch('/api/videos/dQw4w9WgXcQ');
const data = await response.json();
console.log(data.video.title);
```

---

### GET /api/instagram

Fetch Instagram posts (placeholder for future implementation).

#### Request

**Method**: `GET`

#### Response

**Success (200)**:
```json
{
  "data": [
    {
      "id": "1",
      "caption": "Bitcoin retirement strategy #1",
      "media_url": "/images/placeholder-instagram-1.jpg",
      "media_type": "IMAGE",
      "permalink": "https://instagram.com/p/placeholder1",
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

#### Rate Limit
- 100 requests per 15 minutes per IP address

#### Implementation Notes

To implement live Instagram integration:

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com/)
2. Add Instagram Basic Display product
3. Configure OAuth redirect URIs
4. Generate User Access Token
5. Add `INSTAGRAM_ACCESS_TOKEN` to environment variables
6. Update the endpoint implementation in `app/api/instagram/route.ts`

---

### GET /api/social/followers

Get social media follower counts (placeholder for future implementation).

#### Request

**Method**: `GET`

**Query Parameters**:
- `platform` (string, optional): Specific platform (youtube, twitter, instagram, linkedin)

#### Response

**All Platforms (200)**:
```json
{
  "counts": {
    "youtube": 125000,
    "twitter": 45000,
    "instagram": 32000,
    "linkedin": 18000
  },
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

**Single Platform (200)**:
```json
{
  "platform": "youtube",
  "count": 125000,
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

#### Rate Limit
- 100 requests per 15 minutes per IP address

#### Implementation Notes

To implement live follower counts:

**YouTube**:
- Use existing `YOUTUBE_API_KEY`
- Endpoint: `https://www.googleapis.com/youtube/v3/channels`
- Get `statistics.subscriberCount`

**Twitter**:
- Get Bearer Token from [developer.twitter.com](https://developer.twitter.com/)
- Add `TWITTER_BEARER_TOKEN` to environment variables
- Endpoint: `https://api.twitter.com/2/users/by/username/:username`
- Get `public_metrics.followers_count`

**Instagram**:
- Requires Facebook App with Instagram Graph API
- Add `INSTAGRAM_ACCESS_TOKEN` to environment variables
- Endpoint: `https://graph.instagram.com/{user-id}?fields=followers_count`

**LinkedIn**:
- Requires OAuth 2.0 authentication
- More complex setup, consider manual updates

---

## Rate Limiting

### Presets

The API uses three rate limit presets:

**STRICT** (10 requests per 10 minutes):
- Used for: Email subscriptions
- Prevents: Spam and abuse

**STANDARD** (50 requests per 10 minutes):
- Used for: Form submissions
- Balances: Protection and usability

**RELAXED** (100 requests per 15 minutes):
- Used for: Public content (videos, social data)
- Allows: Frequent browsing

### Headers

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1704110400000
```

### Handling Rate Limits

When rate limited (429 response):

1. Check `retryAfter` in response body
2. Wait until the specified time
3. Implement exponential backoff
4. Show user-friendly error message

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const data = await response.json();
      const retryAfter = new Date(data.retryAfter);
      const waitTime = retryAfter.getTime() - Date.now();
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
    }
    
    return response;
  }
}
```

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": { /* Additional context */ }
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid auth)
- `404` - Not Found
- `409` - Conflict (e.g., already subscribed)
- `413` - Payload Too Large
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

### Client-Side Error Handling

```javascript
async function apiCall(endpoint, options) {
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Show user-friendly error message
    throw error;
  }
}
```

## Security

### Input Validation

All inputs are validated and sanitized:

- **Email**: RFC 5322 compliant validation
- **Text**: Length limits, XSS prevention
- **Numbers**: Range validation
- **Arrays**: Type checking, length limits

### Spam Protection

Multiple layers of spam protection:

1. **Honeypot Fields**: Hidden fields that bots fill
2. **Rate Limiting**: Prevents automated abuse
3. **Input Sanitization**: Removes malicious content
4. **IP Tracking**: Monitors suspicious activity

### CORS Configuration

CORS is configured per endpoint:

**Strict** (subscribe endpoint):
- Allowed origins: Same origin only
- Credentials: Not allowed
- Methods: POST, OPTIONS

**Default** (public endpoints):
- Allowed origins: All
- Credentials: Not allowed
- Methods: GET, OPTIONS

## Testing

### Development Testing

```bash
# Start development server
npm run dev

# Test subscribe endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test videos endpoint
curl http://localhost:3000/api/videos?maxResults=5
```

### Production Testing

```bash
# Test production endpoints
curl https://betirement.com/api/videos

# Test with authentication
curl -X POST https://betirement.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Monitoring

### Logging

API calls are logged with:
- Timestamp
- Endpoint
- IP address (hashed in production)
- Response status
- Error details (if any)

### Analytics

Track API usage:
- Request count per endpoint
- Error rates
- Response times
- Rate limit hits

## Future Enhancements

Planned API improvements:

- [ ] GraphQL endpoint for flexible queries
- [ ] WebSocket support for real-time updates
- [ ] API versioning (v1, v2)
- [ ] OAuth authentication
- [ ] Webhook support
- [ ] Batch operations
- [ ] API documentation UI (Swagger/OpenAPI)

## Support

For API issues or questions:

1. Check this documentation
2. Review error messages and status codes
3. Check environment variables configuration
4. Review API provider documentation (YouTube, ConvertKit)
5. Check rate limit status

## References

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [ConvertKit API](https://developers.convertkit.com/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
