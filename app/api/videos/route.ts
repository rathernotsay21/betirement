import { NextResponse } from "next/server";
import { youtubeClient } from "@/src/lib/youtube";
import { handleApiError, BadRequestError } from "@/src/lib/api-error-handler";
import { checkRateLimit, getClientIp, RateLimitPresets, createRateLimitHeaders } from "@/lib/rate-limit";
import { createCorsHeaders, DEFAULT_CORS_CONFIG } from "@/lib/cors";
import { sanitizeText } from "@/lib/sanitization";

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = getClientIp(request);

    // Check rate limit (100 requests per 15 minutes for public content)
    const rateLimitResult = checkRateLimit(ip, RateLimitPresets.RELAXED);
    
    // Create CORS headers
    const corsHeaders = createCorsHeaders(request, DEFAULT_CORS_CONFIG);
    const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);
    const headers = { ...corsHeaders, ...rateLimitHeaders };

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: new Date(rateLimitResult.reset).toISOString()
        },
        { status: 429, headers }
      );
    }

    const { searchParams } = new URL(request.url);
    const maxResultsParam = searchParams.get("maxResults");
    const query = searchParams.get("query");

    // Validate maxResults parameter
    const maxResults = maxResultsParam ? parseInt(maxResultsParam) : 50;
    if (isNaN(maxResults) || maxResults < 1 || maxResults > 50) {
      throw new BadRequestError("maxResults must be a number between 1 and 50");
    }

    let videos;
    
    if (query) {
      // Sanitize search query
      const sanitizedQuery = sanitizeText(query, 200);
      if (!sanitizedQuery) {
        throw new BadRequestError("Invalid search query");
      }
      videos = await youtubeClient.searchVideos(sanitizedQuery, maxResults);
    } else {
      videos = await youtubeClient.getChannelVideos(maxResults);
    }

    return NextResponse.json({ videos, success: true }, { headers });
  } catch (error) {
    return handleApiError(error, request.url);
  }
}

/**
 * OPTIONS /api/videos
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: Request) {
  const corsHeaders = createCorsHeaders(request, DEFAULT_CORS_CONFIG);
  
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: corsHeaders,
    }
  );
}
