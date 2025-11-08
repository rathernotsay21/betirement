# Security Implementation Guide

This document outlines the security measures implemented in the Betirement website and provides guidelines for maintaining security best practices.

## Table of Contents

1. [Rate Limiting](#rate-limiting)
2. [CORS Configuration](#cors-configuration)
3. [Input Validation and Sanitization](#input-validation-and-sanitization)
4. [Content Security Policy](#content-security-policy)
5. [Environment Variables](#environment-variables)
6. [Honeypot Protection](#honeypot-protection)
7. [Security Headers](#security-headers)
8. [Best Practices](#best-practices)

## Rate Limiting

### Implementation

Rate limiting is implemented using an in-memory store with configurable presets:

```typescript
import { checkRateLimit, RateLimitPresets, getClientIp } from '@/lib/rate-limit';

// In your API route
const ip = getClientIp(request);
const rateLimitResult = checkRateLimit(ip, RateLimitPresets.STANDARD);

if (!rateLimitResult.success) {
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429 }
  );
}
```

### Presets

- **STRICT**: 5 requests per 15 minutes (authentication, payments)
- **STANDARD**: 10 requests per 10 minutes (form submissions)
- **RELAXED**: 100 requests per 15 minutes (read operations)
- **PUBLIC**: 1000 requests per hour (public content)

### Production Considerations

For production deployments with multiple instances, consider using:
- Redis for distributed rate limiting
- Upstash Rate Limit for serverless environments
- Cloudflare Rate Limiting at the edge

## CORS Configuration

### Implementation

CORS is configured per endpoint with different security levels:

```typescript
import { createCorsHeaders, STRICT_CORS_CONFIG } from '@/lib/cors';

// In your API route
const corsHeaders = createCorsHeaders(request, STRICT_CORS_CONFIG);
```

### Configurations

**DEFAULT_CORS_CONFIG** (Public APIs):
- Origin: Site URL or wildcard
- Methods: GET, POST, OPTIONS
- Credentials: false

**STRICT_CORS_CONFIG** (Sensitive endpoints):
- Origin: Site URL only
- Methods: POST, OPTIONS
- Credentials: false

### Custom Configuration

```typescript
const customCors: CorsOptions = {
  origin: ['https://betirement.com', 'https://www.betirement.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  maxAge: 3600,
};
```

## Input Validation and Sanitization

### Validation

Use validation functions from `@/lib/validation.ts`:

```typescript
import { validateEmail, validateName, validateMessage } from '@/lib/validation';

const emailResult = validateEmail(email);
if (!emailResult.isValid) {
  return { error: emailResult.error };
}
```

### Sanitization

Use sanitization functions from `@/lib/sanitization.ts`:

```typescript
import { sanitizeEmail, sanitizeName, sanitizeText } from '@/lib/sanitization';

const cleanEmail = sanitizeEmail(userInput);
const cleanName = sanitizeName(userInput);
const cleanText = sanitizeText(userInput, 5000); // max length
```

### Malicious Input Detection

```typescript
import { detectXss, detectSqlInjection } from '@/lib/sanitization';

if (detectXss(input) || detectSqlInjection(input)) {
  console.warn('Malicious input detected');
  return { error: 'Invalid input' };
}
```

### Sanitization Functions

- `sanitizeEmail()` - Email addresses
- `sanitizeName()` - Names (letters, spaces, hyphens, apostrophes)
- `sanitizePhone()` - Phone numbers
- `sanitizeUrl()` - URLs with protocol validation
- `sanitizeText()` - General text content
- `sanitizeHtml()` - HTML content (removes dangerous tags)
- `sanitizeFilename()` - Filenames (prevents path traversal)
- `sanitizeSlug()` - URL slugs

## Content Security Policy

### Configuration

CSP is configured in `next.config.mjs`:

```javascript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com ...",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    // ... more directives
  ].join('; ')
}
```

### Directives Explained

- **default-src 'self'**: Only load resources from same origin by default
- **script-src**: Allowed script sources (includes YouTube, analytics)
- **style-src**: Allowed style sources (includes Google Fonts)
- **img-src**: Allowed image sources (includes CDNs)
- **frame-src**: Allowed iframe sources (YouTube embeds)
- **object-src 'none'**: Block plugins (Flash, Java)
- **upgrade-insecure-requests**: Upgrade HTTP to HTTPS

### Testing CSP

1. Check browser console for CSP violations
2. Use [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
3. Monitor violations in production

### Updating CSP

When adding new third-party services:

1. Add domain to appropriate directive
2. Test in development
3. Monitor for violations
4. Update documentation

## Environment Variables

### Protection

Environment variables are protected through:

1. **Never expose in client code**:
   ```typescript
   // ❌ Wrong - exposed to client
   const apiKey = process.env.NEXT_PUBLIC_API_KEY;
   
   // ✅ Correct - server-side only
   const apiKey = process.env.API_KEY;
   ```

2. **Use in API routes only**:
   ```typescript
   // app/api/example/route.ts
   export async function GET() {
     const secret = process.env.SECRET_KEY; // Safe
   }
   ```

3. **Validate on startup**:
   ```typescript
   if (!process.env.YOUTUBE_API_KEY) {
     throw new Error('YOUTUBE_API_KEY is required');
   }
   ```

### Required Variables

```bash
# YouTube API
YOUTUBE_API_KEY=your_key
YOUTUBE_CHANNEL_ID=your_channel_id

# ConvertKit
CONVERTKIT_API_KEY=your_key
CONVERTKIT_API_SECRET=your_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://betirement.com
```

### Netlify Configuration

1. Go to Site Settings → Environment Variables
2. Add each variable
3. Redeploy site

## Honeypot Protection

### Implementation

Honeypot fields catch bots that auto-fill all form fields:

```typescript
// In your form component
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px' }}
  aria-hidden="true"
/>
```

```typescript
// In your API route
if (body.website || body.phone_number || body.company) {
  // Bot detected - return fake success
  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
```

### Honeypot Fields

Common honeypot field names:
- `website`
- `phone_number`
- `company`
- `url`
- `address`

### Best Practices

1. Use CSS to hide (not `display: none`)
2. Add `tabIndex={-1}` to prevent keyboard access
3. Add `aria-hidden="true"` for screen readers
4. Use realistic field names
5. Return fake success to avoid bot detection

## Security Headers

### Implemented Headers

All security headers are configured in `next.config.mjs`:

```javascript
{
  'X-DNS-Prefetch-Control': 'on',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': '...',
}
```

### Header Explanations

- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information
- **X-XSS-Protection**: Enables browser XSS filter
- **Permissions-Policy**: Restricts browser features
- **Content-Security-Policy**: Controls resource loading

### API-Specific Headers

API routes have additional headers:

```javascript
{
  'X-Frame-Options': 'DENY', // Stricter for APIs
  'Cache-Control': 'no-store, max-age=0', // No caching
}
```

## Best Practices

### Input Handling

1. **Always validate on server-side** (client validation is for UX only)
2. **Sanitize all user input** before processing
3. **Use TypeScript** for type safety
4. **Limit input sizes** to prevent DoS
5. **Check for malicious patterns** (XSS, SQL injection)

### API Security

1. **Implement rate limiting** on all endpoints
2. **Use CORS** to restrict origins
3. **Validate all parameters** (query, body, headers)
4. **Return appropriate status codes** (400, 401, 403, 429, 500)
5. **Log security events** (without exposing PII)

### Authentication (Future)

When implementing authentication:

1. Use bcrypt for password hashing (cost factor 10+)
2. Implement JWT with short expiration
3. Use HTTP-only cookies for tokens
4. Implement CSRF protection
5. Add 2FA for sensitive operations

### Data Protection

1. **Never log sensitive data** (passwords, tokens, PII)
2. **Use HTTPS everywhere** (enforced by Netlify)
3. **Sanitize error messages** (don't expose internals)
4. **Implement proper access controls**
5. **Regular security audits**

### Monitoring

1. **Monitor rate limit hits** (potential attacks)
2. **Track failed validations** (malicious input)
3. **Alert on unusual patterns** (spike in errors)
4. **Review logs regularly**
5. **Keep dependencies updated**

### Testing

1. **Test with malicious input** (XSS, SQL injection)
2. **Test rate limiting** (verify limits work)
3. **Test CORS** (verify origins are restricted)
4. **Test error handling** (no information leakage)
5. **Run security scanners** (OWASP ZAP, Burp Suite)

## Security Checklist

- [ ] Rate limiting implemented on all API routes
- [ ] CORS configured appropriately per endpoint
- [ ] All user input validated and sanitized
- [ ] CSP headers configured and tested
- [ ] Environment variables protected
- [ ] Honeypot fields added to forms
- [ ] Security headers configured
- [ ] Error messages sanitized
- [ ] Logging excludes PII
- [ ] Dependencies up to date
- [ ] Security testing completed
- [ ] Documentation updated

## Incident Response

If a security issue is discovered:

1. **Assess severity** (critical, high, medium, low)
2. **Contain the issue** (disable affected feature if needed)
3. **Fix the vulnerability** (patch and test)
4. **Deploy the fix** (emergency deployment if critical)
5. **Review logs** (check for exploitation)
6. **Notify affected users** (if data breach)
7. **Document the incident** (for future prevention)
8. **Update security measures** (prevent recurrence)

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [CSP Reference](https://content-security-policy.com/)
- [Security Headers](https://securityheaders.com/)

## Contact

For security concerns, contact: [security@betirement.com]
