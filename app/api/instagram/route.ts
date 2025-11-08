import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp, RateLimitPresets, createRateLimitHeaders } from '@/lib/rate-limit';
import { createCorsHeaders, DEFAULT_CORS_CONFIG } from '@/lib/cors';

export const runtime = 'edge';

/**
 * Instagram API endpoint
 * 
 * This is a placeholder endpoint for future Instagram Basic Display API integration.
 * 
 * To implement:
 * 1. Create a Facebook App at developers.facebook.com
 * 2. Add Instagram Basic Display product
 * 3. Configure OAuth redirect URIs
 * 4. Get Access Token
 * 5. Add INSTAGRAM_ACCESS_TOKEN to environment variables
 * 6. Uncomment the implementation below
 */

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

    // TODO: Implement Instagram Basic Display API integration
    // const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    // if (!accessToken) {
    //   return NextResponse.json(
    //     { error: 'Instagram access token not configured' },
    //     { status: 500, headers }
    //   );
    // }

    // const response = await fetch(
    //   `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${accessToken}`,
    //   { next: { revalidate: 3600 } } // Cache for 1 hour
    // );

    // if (!response.ok) {
    //   throw new Error('Failed to fetch Instagram posts');
    // }

    // const data = await response.json();
    // return NextResponse.json(data, { headers });

    // Placeholder response for demonstration
    return NextResponse.json({
      data: [
        {
          id: '1',
          caption: 'Bitcoin retirement strategy #1',
          media_url: '/images/placeholder-instagram-1.jpg',
          media_type: 'IMAGE',
          permalink: 'https://instagram.com/p/placeholder1',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          caption: 'Early retirement success story',
          media_url: '/images/placeholder-instagram-2.jpg',
          media_type: 'IMAGE',
          permalink: 'https://instagram.com/p/placeholder2',
          timestamp: new Date().toISOString(),
        },
      ],
    }, { headers });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/instagram
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
