import { NextResponse } from "next/server";
import { youtubeClient } from "@/src/lib/youtube";
import { handleApiError, NotFoundError, BadRequestError } from "@/src/lib/api-error-handler";
import { checkRateLimit, getClientIp, RateLimitPresets, createRateLimitHeaders } from "@/lib/rate-limit";
import { createCorsHeaders, DEFAULT_CORS_CONFIG } from "@/lib/cors";
import { sanitizeText } from "@/lib/sanitization";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
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

    // Validate video ID
    if (!params.id || params.id.trim() === '') {
      throw new BadRequestError("Video ID is required");
    }

    // Sanitize video ID (YouTube IDs are alphanumeric with - and _)
    const sanitizedId = sanitizeText(params.id, 20).replace(/[^a-zA-Z0-9_-]/g, '');
    if (!sanitizedId || sanitizedId.length < 5) {
      throw new BadRequestError("Invalid video ID format");
    }

    const video = await youtubeClient.getVideoDetails(sanitizedId);

    if (!video) {
      throw new NotFoundError("Video not found");
    }

    return NextResponse.json({ video, success: true }, { headers });
  } catch (error) {
    return handleApiError(error, request.url);
  }
}

/**
 * OPTIONS /api/videos/[id]
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
