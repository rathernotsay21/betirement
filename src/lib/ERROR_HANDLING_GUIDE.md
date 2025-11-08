# Error Handling Guide

This guide explains the comprehensive error handling system implemented in the Betirement website.

## Overview

The error handling system includes:
- Custom error pages (404, 500, global errors)
- Client-side error boundaries
- API error handling utilities
- Form validation with detailed error messages
- Consistent error response formats

## Error Pages

### 404 Not Found Page
**Location:** `app/not-found.tsx`

Automatically displayed when a user navigates to a non-existent route.

Features:
- Friendly error message
- Links to popular pages
- Call-to-action buttons to return home or browse content

### 500 Error Page
**Location:** `app/error.tsx`

Catches runtime errors in the application.

Features:
- User-friendly error message
- "Try Again" button to reset the error boundary
- Error details in development mode
- Automatic error logging

### Global Error Boundary
**Location:** `app/global-error.tsx`

Last resort error handler for critical errors in the root layout.

Features:
- Minimal inline styles (no external dependencies)
- Basic error recovery options
- Works even when the entire app fails

## Client-Side Error Boundaries

### ErrorBoundary Component
**Location:** `src/components/ui/ErrorBoundary.tsx`

Reusable React error boundary for catching errors in component trees.

**Usage:**

```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Wrap any component tree
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorUI />}>
  <MyComponent />
</ErrorBoundary>

// With error callback
<ErrorBoundary onError={(error, errorInfo) => logError(error)}>
  <MyComponent />
</ErrorBoundary>
```

**HOC Pattern:**

```tsx
import { withErrorBoundary } from '@/components/ui/ErrorBoundary';

const SafeComponent = withErrorBoundary(MyComponent, <CustomFallback />);
```

## API Error Handling

### API Error Handler Utilities
**Location:** `src/lib/api-error-handler.ts`

Provides consistent error handling for API routes.

**Error Classes:**

```typescript
import {
  ApiError,
  BadRequestError,      // 400
  UnauthorizedError,    // 401
  ForbiddenError,       // 403
  NotFoundError,        // 404
  ConflictError,        // 409
  TooManyRequestsError, // 429
  InternalServerError,  // 500
} from '@/lib/api-error-handler';
```

**Usage in API Routes:**

```typescript
import { handleApiError, BadRequestError, NotFoundError } from '@/lib/api-error-handler';

export async function GET(request: Request) {
  try {
    // Validate input
    if (!someParam) {
      throw new BadRequestError('Parameter is required');
    }

    // Fetch data
    const data = await fetchData();

    if (!data) {
      throw new NotFoundError('Resource not found');
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    return handleApiError(error, request.url);
  }
}
```

**Error Handler Wrapper:**

```typescript
import { withErrorHandler } from '@/lib/api-error-handler';

export const GET = withErrorHandler(async (request: Request) => {
  // Your handler code
  // Errors are automatically caught and formatted
  return NextResponse.json({ success: true });
});
```

**Request Body Validation:**

```typescript
import { validateRequestBody } from '@/lib/api-error-handler';

interface RequestBody {
  email: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Throws BadRequestError if validation fails
    validateRequestBody<RequestBody>(body, ['email', 'name']);
    
    // body is now typed as RequestBody
    const { email, name } = body;
    
    // Process request...
  } catch (error) {
    return handleApiError(error);
  }
}
```

## Form Validation

### Validation Utilities
**Location:** `src/lib/validation.ts`

Comprehensive validation functions with detailed error messages.

**Available Validators:**

```typescript
import {
  validateEmail,
  validateName,
  validatePhone,
  validateMessage,
  validateUrl,
  validateRequired,
  validateFields,
  validateForm,
  sanitizeInput,
  isHoneypotFilled,
} from '@/lib/validation';

// Email validation
const emailResult = validateEmail('user@example.com');
if (!emailResult.isValid) {
  console.error(emailResult.error);
}

// Name validation
const nameResult = validateName('John Doe', 'First Name');

// Phone validation
const phoneResult = validatePhone('+1234567890');

// Message validation (with min/max length)
const messageResult = validateMessage('Hello world', 10, 5000);

// URL validation
const urlResult = validateUrl('https://example.com');

// Required field validation
const requiredResult = validateRequired(value, 'Email Address');

// Sanitize user input
const clean = sanitizeInput(userInput);

// Check honeypot
if (isHoneypotFilled(honeypotValue)) {
  // Likely a bot
}
```

**Validate Multiple Fields:**

```typescript
const errors = validateFields([
  { value: email, validator: validateEmail, fieldName: 'email' },
  { value: name, validator: (v) => validateName(v, 'Name'), fieldName: 'name' },
  { value: message, validator: validateMessage, fieldName: 'message' },
]);

if (Object.keys(errors).length > 0) {
  // Handle errors
}
```

**Validate Form Object:**

```typescript
const { isValid, errors } = validateForm(
  formData,
  [
    { field: 'email', validator: validateEmail, required: true },
    { field: 'name', validator: (v) => validateName(v, 'Name'), required: true },
    { field: 'phone', validator: validatePhone, required: false },
  ]
);
```

### ValidatedForm Component
**Location:** `src/components/forms/ValidatedForm.tsx`

Reusable form component with built-in validation and error handling.

**Usage:**

```tsx
import { ValidatedForm } from '@/components/forms/ValidatedForm';
import { validateEmail, validateMessage } from '@/lib/validation';

<ValidatedForm
  fields={[
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com',
      required: true,
      validator: validateEmail,
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      rows: 6,
      required: true,
      validator: validateMessage,
    },
  ]}
  onSubmit={async (data) => {
    await submitForm(data);
  }}
  submitButtonText="Send Message"
  successMessage="Message sent successfully!"
  errorMessage="Failed to send message. Please try again."
/>
```

## Error Response Format

All API errors follow a consistent format:

```typescript
{
  error: string;        // Error message
  success: false;       // Always false for errors
  statusCode?: number;  // HTTP status code
  timestamp?: string;   // ISO timestamp
  path?: string;        // Request path
}
```

## Best Practices

### 1. Always Use Try-Catch in API Routes

```typescript
export async function GET(request: Request) {
  try {
    // Your code
  } catch (error) {
    return handleApiError(error, request.url);
  }
}
```

### 2. Throw Specific Error Types

```typescript
// Good
throw new NotFoundError('User not found');

// Avoid
throw new Error('Not found'); // Generic, no status code
```

### 3. Validate Input Early

```typescript
// Validate at the start of your handler
if (!email || !isValidEmail(email)) {
  throw new BadRequestError('Valid email is required');
}
```

### 4. Use Error Boundaries for Client Components

```tsx
// Wrap components that might error
<ErrorBoundary>
  <ComplexComponent />
</ErrorBoundary>
```

### 5. Provide User-Friendly Error Messages

```typescript
// Good
throw new BadRequestError('Email address is required');

// Avoid
throw new BadRequestError('Missing param: email');
```

### 6. Log Errors for Debugging

```typescript
catch (error) {
  console.error('Detailed error for debugging:', error);
  return handleApiError(error); // User sees friendly message
}
```

### 7. Sanitize User Input

```typescript
import { sanitizeInput } from '@/lib/validation';

const cleanInput = sanitizeInput(userInput);
```

### 8. Use Honeypot Fields for Spam Protection

```tsx
{/* Hidden honeypot field */}
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  className="hidden"
  aria-hidden="true"
/>
```

## Testing Error Handling

### Test 404 Page
Navigate to any non-existent route: `/this-does-not-exist`

### Test Error Page
Trigger an error in a component wrapped with ErrorBoundary

### Test API Errors
```bash
# Bad request
curl http://localhost:3000/api/videos?maxResults=invalid

# Not found
curl http://localhost:3000/api/videos/nonexistent-id
```

### Test Form Validation
Submit forms with invalid data to see validation errors

## Future Enhancements

- [ ] Integrate error monitoring service (Sentry, LogRocket)
- [ ] Add error rate tracking in analytics
- [ ] Implement retry logic for transient errors
- [ ] Add error recovery suggestions
- [ ] Create error reporting form for users
- [ ] Add A/B testing for error messages

## Related Files

- `app/not-found.tsx` - 404 page
- `app/error.tsx` - Error page
- `app/global-error.tsx` - Global error boundary
- `src/components/ui/ErrorBoundary.tsx` - Reusable error boundary
- `src/lib/api-error-handler.ts` - API error utilities
- `src/lib/validation.ts` - Form validation utilities
- `src/components/forms/ValidatedForm.tsx` - Validated form component
