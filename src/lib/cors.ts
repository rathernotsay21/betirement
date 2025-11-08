/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 * 
 * Provides utilities for handling CORS in API routes
 */

export interface CorsOptions {
  /**
   * Allowed origins (use '*' for public APIs, specific domains for restricted access)
   */
  origin: string | string[];
  
  /**
   * Allowed HTTP methods
   */
  methods: string[];
  
  /**
   * Allowed headers
   */
  allowedHeaders?: string[];
  
  /**
   * Exposed headers
   */
  exposedHeaders?: string[];
  
  /**
   * Allow credentials (cookies, authorization headers)
   */
  credentials?: boolean;
  
  /**
   * Max age for preflight cache (in seconds)
   */
  maxAge?: number;
}

/**
 * Default CORS configuration for public APIs
 */
export const DEFAULT_CORS_CONFIG: CorsOptions = {
  origin: process.env.NEXT_PUBLIC_SITE_URL || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: false,
  maxAge: 86400, // 24 hours
};

/**
 * Strict CORS configuration for sensitive endpoints
 */
export const STRICT_CORS_CONFIG: CorsOptions = {
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://betirement.com',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
  maxAge: 3600, // 1 hour
};

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null, allowedOrigins: string | string[]): boolean {
  if (!origin) return false;
  
  if (allowedOrigins === '*') return true;
  
  if (Array.isArray(allowedOrigins)) {
    return allowedOrigins.includes(origin);
  }
  
  return origin === allowedOrigins;
}

/**
 * Create CORS headers for a response
 */
export function createCorsHeaders(
  request: Request,
  options: CorsOptions = DEFAULT_CORS_CONFIG
): Record<string, string> {
  const origin = request.headers.get('origin');
  const headers: Record<string, string> = {};

  // Set Access-Control-Allow-Origin
  if (options.origin === '*') {
    headers['Access-Control-Allow-Origin'] = '*';
  } else if (origin && isOriginAllowed(origin, options.origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  // Set Access-Control-Allow-Methods
  headers['Access-Control-Allow-Methods'] = options.methods.join(', ');

  // Set Access-Control-Allow-Headers
  if (options.allowedHeaders) {
    headers['Access-Control-Allow-Headers'] = options.allowedHeaders.join(', ');
  }

  // Set Access-Control-Expose-Headers
  if (options.exposedHeaders) {
    headers['Access-Control-Expose-Headers'] = options.exposedHeaders.join(', ');
  }

  // Set Access-Control-Allow-Credentials
  if (options.credentials) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  // Set Access-Control-Max-Age
  if (options.maxAge) {
    headers['Access-Control-Max-Age'] = options.maxAge.toString();
  }

  return headers;
}

/**
 * Handle CORS preflight (OPTIONS) request
 */
export function handleCorsPreflightRequest(
  request: Request,
  options: CorsOptions = DEFAULT_CORS_CONFIG
): Response {
  const headers = createCorsHeaders(request, options);
  
  return new Response(null, {
    status: 204,
    headers,
  });
}

/**
 * Validate origin for security
 */
export function validateOrigin(request: Request, allowedOrigins: string | string[]): boolean {
  const origin = request.headers.get('origin');
  
  // If no origin header, it's a same-origin request (allowed)
  if (!origin) return true;
  
  return isOriginAllowed(origin, allowedOrigins);
}
