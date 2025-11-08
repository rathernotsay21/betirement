# Error Handling Quick Reference

## Quick Links
- **Full Guide:** `src/lib/ERROR_HANDLING_GUIDE.md`
- **Demo Page:** `/error-demo`
- **Test 404:** Navigate to any non-existent route

## Common Patterns

### 1. Wrap Components with Error Boundary
```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### 2. API Route Error Handling
```typescript
import { handleApiError, BadRequestError } from '@/lib/api-error-handler';

export async function GET(request: Request) {
  try {
    if (!param) throw new BadRequestError('Param required');
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, request.url);
  }
}
```

### 3. Form Validation
```typescript
import { validateEmail } from '@/lib/validation';

const result = validateEmail(email);
if (!result.isValid) {
  setError(result.error);
}
```

### 4. Use ValidatedForm Component
```tsx
import { ValidatedForm } from '@/components/forms/ValidatedForm';

<ValidatedForm
  fields={[
    { name: 'email', label: 'Email', type: 'email', required: true }
  ]}
  onSubmit={async (data) => await submitForm(data)}
/>
```

## Error Classes

| Class | Status | Use Case |
|-------|--------|----------|
| `BadRequestError` | 400 | Invalid input |
| `UnauthorizedError` | 401 | Auth required |
| `ForbiddenError` | 403 | No permission |
| `NotFoundError` | 404 | Resource not found |
| `ConflictError` | 409 | Duplicate/conflict |
| `TooManyRequestsError` | 429 | Rate limit |
| `InternalServerError` | 500 | Server error |

## Validators

| Function | Purpose |
|----------|---------|
| `validateEmail()` | Email with typo detection |
| `validateName()` | Name with character rules |
| `validatePhone()` | Phone number |
| `validateMessage()` | Text with length limits |
| `validateUrl()` | URL format |
| `validateRequired()` | Required field |
| `sanitizeInput()` | XSS prevention |

## Files

| File | Purpose |
|------|---------|
| `app/not-found.tsx` | 404 page |
| `app/error.tsx` | Error page |
| `app/global-error.tsx` | Global error |
| `src/components/ui/ErrorBoundary.tsx` | Error boundary |
| `src/lib/api-error-handler.ts` | API errors |
| `src/lib/validation.ts` | Validation |
| `src/components/forms/ValidatedForm.tsx` | Form component |

## Testing

```bash
# Test 404
curl http://localhost:3000/does-not-exist

# Test API error
curl http://localhost:3000/api/videos?maxResults=invalid

# Test demo page
open http://localhost:3000/error-demo
```
