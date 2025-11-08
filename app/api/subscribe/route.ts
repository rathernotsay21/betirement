import { NextRequest, NextResponse } from 'next/server';
import { createConvertKitClient } from '@/lib/convertkit';
import { isValidEmail } from '@/lib/utils';
import { checkRateLimit, getClientIp, RateLimitPresets, createRateLimitHeaders } from '@/lib/rate-limit';
import { createCorsHeaders, STRICT_CORS_CONFIG } from '@/lib/cors';
import { sanitizeEmail, sanitizeName, sanitizeText, detectXss, detectSqlInjection } from '@/lib/sanitization';

/**
 * POST /api/subscribe
 * Subscribe a user to the email list via ConvertKit
 */
export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = getClientIp(request);

    // Check rate limit (10 requests per 10 minutes)
    const rateLimitResult = checkRateLimit(ip, RateLimitPresets.STANDARD);
    
    // Create CORS headers
    const corsHeaders = createCorsHeaders(request, STRICT_CORS_CONFIG);
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

    // Parse request body with size limit
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10000) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413, headers }
      );
    }

    const body = await request.json();
    const { email, firstName, tags = [], source } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400, headers }
      );
    }

    // Check for malicious input
    if (detectXss(email) || detectSqlInjection(email)) {
      console.warn('Malicious input detected in email:', { ip, email: email.substring(0, 20) });
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400, headers }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedFirstName = firstName ? sanitizeName(firstName) : undefined;
    const sanitizedSource = source ? sanitizeText(source, 100) : undefined;

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400, headers }
      );
    }

    // Honeypot check (if honeypot field is filled, it's a bot)
    if (body.website || body.phone_number || body.company) {
      console.log('Bot detected via honeypot:', { ip });
      return NextResponse.json(
        { success: true, message: 'Subscription successful' },
        { status: 200, headers }
      );
    }

    // Validate tags array
    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Invalid tags format' },
        { status: 400, headers }
      );
    }

    // Sanitize and limit tags
    const sanitizedTags = tags
      .filter((tag): tag is string => typeof tag === 'string')
      .map(tag => sanitizeText(tag, 50))
      .slice(0, 10); // Limit to 10 tags

    // Add source tag if provided
    const allTags = [...sanitizedTags];
    if (sanitizedSource) {
      allTags.push(sanitizedSource);
    }

    // Subscribe to ConvertKit
    const convertKit = createConvertKitClient();
    const subscriber = await convertKit.addSubscriber(
      sanitizedEmail,
      allTags,
      sanitizedFirstName
    );

    // Log successful subscription (without PII in production)
    console.log('New subscriber:', {
      id: subscriber.id,
      emailDomain: sanitizedEmail.split('@')[1],
      tags: allTags,
      source: sanitizedSource,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the newsletter!',
        subscriberId: subscriber.id,
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Subscription error:', error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('already subscribed')) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/subscribe
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  const corsHeaders = createCorsHeaders(request, STRICT_CORS_CONFIG);
  
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: corsHeaders,
    }
  );
}
