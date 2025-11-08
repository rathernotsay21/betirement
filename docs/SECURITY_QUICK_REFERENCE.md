# Security Quick Reference

Quick reference for implementing security measures in the Betirement website.

## Rate Limiting

```typescript
import { checkRateLimit, RateLimitPresets, getClientIp, createRateLimitHeaders } from '@/lib/rate-limit';

const ip = getClientIp(request);
const result = checkRateLimit(ip, RateLimitPresets.STANDARD);

if (!result.success) {
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429, headers: createRateLimitHeaders(result) }
  );
}
```

**Presets:**
- `STRICT`: 5 req/15min (auth, payments)
- `STANDARD`: 10 req/10min (forms)
- `RELAXED`: 100 req/15min (reads)
- `PUBLIC`: 1000 req/hour (public)

## CORS

```typescript
import { createCorsHeaders, STRICT_CORS_CONFIG, DEFAULT_CORS_CONFIG } from '@/lib/cors';

// For sensitive endpoints
const headers = createCorsHeaders(request, STRICT_CORS_CONFIG);

// For public APIs
const headers = createCorsHeaders(request, DEFAULT_CORS_CONFIG);

// OPTIONS handler
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, {
    status: 204,
    headers: createCorsHeaders(request, DEFAULT_CORS_CONFIG)
  });
}
```

## Input Validation

```typescript
import { validateEmail, validateName, validateMessage } from '@/lib/validation';

const emailResult = validateEmail(email);
if (!emailResult.isValid) {
  return NextResponse.json(
    { error: emailResult.error },
    { status: 400 }
  );
}
```

## Input Sanitization

```typescript
import { 
  sanitizeEmail, 
  sanitizeName, 
  sanitizeText,
  detectXss,
  detectSqlInjection 
} from '@/lib/sanitization';

// Check for malicious input
if (detectXss(input) || detectSqlInjection(input)) {
  return NextResponse.json(
    { error: 'Invalid input' },
    { status: 400 }
  );
}

// Sanitize inputs
const cleanEmail = sanitizeEmail(email);
const cleanName = sanitizeName(name);
const cleanText = sanitizeText(message, 5000);
```

## Honeypot Protection

**In Form Component:**
```tsx
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px' }}
  aria-hidden="true"
/>
```

**In API Route:**
```typescript
if (body.website || body.phone_number || body.company) {
  // Bot detected - return fake success
  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
```

## Complete API Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp, RateLimitPresets, createRateLimitHeaders } from '@/lib/rate-limit';
import { createCorsHeaders, STRICT_CORS_CONFIG } from '@/lib/cors';
import { sanitizeEmail, sanitizeText, detectXss, detectSqlInjection } from '@/lib/sanitization';
import { validateEmail } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const rateLimitResult = checkRateLimit(ip, RateLimitPresets.STANDARD);
    
    // Headers
    const corsHeaders = createCorsHeaders(request, STRICT_CORS_CONFIG);
    const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);
    const headers = { ...corsHeaders, ...rateLimitHeaders };

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers }
      );
    }

    // Body size check
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10000) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413, headers }
      );
    }

    // Parse body
    const body = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400, headers }
      );
    }

    // Check for malicious input
    if (detectXss(email) || detectSqlInjection(email)) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400, headers }
      );
    }

    // Sanitize inputs
    const cleanEmail = sanitizeEmail(email);
    const cleanName = name ? sanitizeName(name) : undefined;

    // Validate
    const emailResult = validateEmail(cleanEmail);
    if (!emailResult.isValid) {
      return NextResponse.json(
        { error: emailResult.error },
        { status: 400, headers }
      );
    }

    // Honeypot check
    if (body.website) {
      return NextResponse.json(
        { success: true },
        { status: 200, headers }
      );
    }

    // Process request
    // ... your business logic here

    return NextResponse.json(
      { success: true },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const corsHeaders = createCorsHeaders(request, STRICT_CORS_CONFIG);
  return NextResponse.json({}, { status: 204, headers: corsHeaders });
}
```

## Environment Variables

**Never expose secrets:**
```typescript
// ❌ Wrong - exposed to client
const key = process.env.NEXT_PUBLIC_SECRET_KEY;

// ✅ Correct - server-side only
const key = process.env.SECRET_KEY;
```

**Validate on startup:**
```typescript
if (!process.env.REQUIRED_VAR) {
  throw new Error('REQUIRED_VAR is missing');
}
```

## Security Headers (next.config.mjs)

Already configured in the project. Key headers:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy: ...`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Common Patterns

### Email Signup
```typescript
const cleanEmail = sanitizeEmail(email);
const emailResult = validateEmail(cleanEmail);
if (!emailResult.isValid) return error;
if (body.website) return fakeSuccess; // Honeypot
```

### Search Query
```typescript
const cleanQuery = sanitizeText(query, 200);
if (!cleanQuery) return error;
```

### User Name
```typescript
const cleanName = sanitizeName(name);
const nameResult = validateName(cleanName);
if (!nameResult.isValid) return error;
```

### File Upload (Future)
```typescript
const cleanFilename = sanitizeFilename(filename);
// Check file type, size, scan for malware
```

## Testing Security

```bash
# Test rate limiting
for i in {1..15}; do curl http://localhost:3000/api/subscribe; done

# Test XSS
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"<script>alert(1)</script>@test.com"}'

# Test SQL injection
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com OR 1=1"}'
```

## Checklist

- [ ] Rate limiting added
- [ ] CORS configured
- [ ] Input validated
- [ ] Input sanitized
- [ ] Honeypot added (forms)
- [ ] Malicious input detected
- [ ] Body size limited
- [ ] Headers configured
- [ ] OPTIONS handler added
- [ ] Error messages sanitized
- [ ] Logging excludes PII
