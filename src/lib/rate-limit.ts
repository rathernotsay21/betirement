/**
 * Rate Limiting Utilities
 * 
 * Implements in-memory rate limiting for API routes.
 * For production with multiple instances, consider using Redis or Upstash.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const keysToDelete: string[] = [];
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => rateLimitStore.delete(key));
  }, 10 * 60 * 1000);
}

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number;
  
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  
  /**
   * Custom identifier (defaults to IP address)
   */
  identifier?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * 
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and metadata
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No existing entry or window expired - create new entry
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  // Increment counter
  entry.count++;
  
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Get IP address from request headers
 */
export function getClientIp(request: Request): string {
  // Check various headers that might contain the real IP
  const headers = new Headers(request.headers);
  
  return (
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') || // Cloudflare
    headers.get('x-client-ip') ||
    'unknown'
  );
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  /**
   * Strict rate limit for sensitive operations (e.g., authentication, payments)
   * 5 requests per 15 minutes
   */
  STRICT: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  },
  
  /**
   * Standard rate limit for form submissions
   * 10 requests per 10 minutes
   */
  STANDARD: {
    maxRequests: 10,
    windowMs: 10 * 60 * 1000,
  },
  
  /**
   * Relaxed rate limit for read operations
   * 100 requests per 15 minutes
   */
  RELAXED: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000,
  },
  
  /**
   * Very relaxed for public content
   * 1000 requests per hour
   */
  PUBLIC: {
    maxRequests: 1000,
    windowMs: 60 * 60 * 1000,
  },
} as const;

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}

/**
 * Reset rate limit for a specific identifier (useful for testing)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Clear all rate limit entries (useful for testing)
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear();
}
