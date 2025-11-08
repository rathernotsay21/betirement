# Email Capture and ConvertKit Integration

## Overview

This document describes the implementation of email capture functionality with ConvertKit integration for the Betirement website.

## Implementation Summary

### Components Created

1. **ConvertKit API Client** (`src/lib/convertkit.ts`)
   - Full-featured API client for ConvertKit
   - Methods: `addSubscriber`, `tagSubscriber`, `getSubscriber`, `unsubscribe`
   - Comprehensive tagging strategy
   - Error handling and type safety

2. **API Route** (`app/api/subscribe/route.ts`)
   - POST endpoint for email subscriptions
   - Rate limiting (10 requests per 10 minutes per IP)
   - Honeypot spam protection
   - Email validation
   - ConvertKit integration
   - Proper error responses

3. **EmailCaptureForm Component** (`src/components/forms/EmailCaptureForm.tsx`)
   - Three variants: inline, modal, slide-in
   - Optional first name field
   - Lead magnet support
   - Success/error feedback
   - Loading states
   - Accessibility compliant

4. **Supporting Components**
   - `EmailCaptureModal` - Modal wrapper
   - `EmailCaptureSlideIn` - Slide-in wrapper
   - `EmailCaptureExamples` - Demo implementations

## Features Implemented

### ✅ ConvertKit API Client
- Complete API integration with all required methods
- Type-safe interfaces for all API responses
- Error handling and logging
- Configurable via environment variables

### ✅ Email Capture Form Variants

**Inline Variant:**
- Embeds directly in page content
- Flexible styling options
- Used in Footer component

**Modal Variant:**
- Displays in a modal dialog
- Perfect for exit-intent popups
- Auto-closes after successful subscription

**Slide-in Variant:**
- Slides in from bottom-right
- Non-intrusive engagement
- Dismissible by user

### ✅ Form Validation
- Client-side email validation
- Server-side validation
- Real-time error feedback
- Accessible error messages

### ✅ Security Features
- Rate limiting per IP address
- Honeypot field for bot detection
- Input sanitization
- CORS protection
- Environment variable protection

### ✅ Tagging Strategy

**Source Tags:**
- `website-home` - Home page signups
- `website-blog` - Blog page signups
- `website-resources` - Resources page signups
- `website-video` - Video page signups
- `lead-magnet` - Lead magnet downloads
- `exit-intent` - Exit intent popups
- `slide-in` - Slide-in forms

**Interest Tags:**
- `bitcoin` - Bitcoin interest
- `retirement` - Retirement planning
- `investing` - General investing

**Engagement Tags:**
- `video-viewer` - Watched videos
- `blog-reader` - Read blog posts
- `resource-downloader` - Downloaded resources
- `calculator-user` - Used calculators

### ✅ Success Confirmation
- Clear success messages
- Visual feedback
- Auto-reset after submission
- Optional callback support

## Environment Variables

Required variables in `.env.local`:

```bash
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_API_SECRET=your_api_secret
CONVERTKIT_FORM_ID=your_form_id
```

## Usage Examples

### Basic Inline Form

```tsx
import { EmailCaptureForm } from '@/components/forms';
import { CONVERTKIT_TAGS } from '@/lib/convertkit';

<EmailCaptureForm
  variant="inline"
  source={CONVERTKIT_TAGS.WEBSITE_HOME}
  tags={[CONVERTKIT_TAGS.BITCOIN]}
/>
```

### Modal with Lead Magnet

```tsx
import { EmailCaptureModal } from '@/components/forms';

<EmailCaptureModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  source={CONVERTKIT_TAGS.EXIT_INTENT}
  leadMagnet="Bitcoin Retirement Planning Guide"
  title="Before You Go..."
/>
```

### Slide-in Form

```tsx
import { EmailCaptureSlideIn } from '@/components/forms';

<EmailCaptureSlideIn
  isVisible={showSlideIn}
  onClose={() => setShowSlideIn(false)}
  source={CONVERTKIT_TAGS.SLIDE_IN}
  title="Stay Connected"
/>
```

## Integration Points

### Current Integrations

1. **Footer Component** - Inline newsletter signup
   - Location: `src/components/layout/Footer.tsx`
   - Tags: `bitcoin`, `retirement`
   - Source: `website-home`

### Recommended Future Integrations

1. **Exit Intent Popup** - Modal on exit intent
   - Trigger: Mouse leaves viewport
   - Lead magnet offer
   - Source: `exit-intent`

2. **Blog Post Inline** - After blog content
   - Context-specific messaging
   - Source: `website-blog`
   - Tag: `blog-reader`

3. **Resource Downloads** - Before download
   - Email gate for premium resources
   - Source: `website-resources`
   - Tag: `resource-downloader`

4. **Video Pages** - Below video player
   - Video-specific lead magnets
   - Source: `website-video`
   - Tag: `video-viewer`

5. **Slide-in Timer** - After 30 seconds
   - Non-intrusive engagement
   - Source: `slide-in`

## API Endpoint

### POST /api/subscribe

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "tags": ["bitcoin", "retirement"],
  "source": "website-home",
  "website": ""
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to the newsletter!",
  "subscriberId": 12345
}
```

**Error Responses:**

- `400` - Invalid email or missing required fields
- `409` - Email already subscribed
- `429` - Rate limit exceeded
- `500` - Server error

## Rate Limiting

- **Limit:** 10 requests per 10 minutes per IP
- **Implementation:** In-memory map (consider Redis for production)
- **Response:** 429 status code with error message

## Spam Protection

1. **Honeypot Field:** Hidden `website` field
   - Bots fill it, humans don't
   - Silently accepts but doesn't subscribe

2. **Rate Limiting:** Prevents abuse

3. **Email Validation:** Client and server-side

## Accessibility

- Semantic HTML with proper labels
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Error announcements with `role="alert"`
- Success confirmations with `role="status"`

## Testing

### Manual Testing Checklist

- [ ] Submit valid email - should succeed
- [ ] Submit invalid email - should show error
- [ ] Submit duplicate email - should handle gracefully
- [ ] Test rate limiting - 11th request should fail
- [ ] Test honeypot - bot submissions should be silently accepted
- [ ] Test all three variants (inline, modal, slide-in)
- [ ] Test with and without first name field
- [ ] Test lead magnet display
- [ ] Test success callback
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Test on mobile devices
- [ ] Test in different browsers

### ConvertKit Verification

1. Check subscriber appears in ConvertKit dashboard
2. Verify correct tags are applied
3. Verify custom fields are populated
4. Check automation triggers fire correctly

## Performance

- Minimal bundle size impact
- Lazy loading for modal/slide-in variants
- Debounced validation (if implemented)
- Optimistic UI updates

## Security Considerations

1. **API Keys:** Never exposed to client
2. **Rate Limiting:** Prevents abuse
3. **Input Validation:** Both client and server
4. **CORS:** Properly configured
5. **Honeypot:** Bot protection
6. **HTTPS:** All requests over secure connection

## Future Enhancements

1. **Double Opt-in:** Confirmation email flow
2. **Preference Center:** Allow users to manage subscriptions
3. **A/B Testing:** Test different copy and designs
4. **Analytics:** Track conversion rates
5. **Segmentation:** More granular tagging
6. **Custom Fields:** Capture additional data
7. **Redis Rate Limiting:** For production scale
8. **Email Verification:** Check email deliverability
9. **GDPR Compliance:** Cookie consent integration
10. **Unsubscribe Flow:** One-click unsubscribe page

## Troubleshooting

### Common Issues

**"ConvertKit API credentials not configured"**
- Ensure environment variables are set
- Check `.env.local` file exists
- Restart development server

**"Failed to subscribe"**
- Check ConvertKit API key is valid
- Verify form ID is correct
- Check ConvertKit account status

**"Rate limit exceeded"**
- Wait 10 minutes
- Check if IP is being shared (VPN, proxy)

**"Invalid email address"**
- Verify email format
- Check for whitespace
- Test with different email

## Documentation

- Component README: `src/components/forms/README.md`
- API Client: `src/lib/convertkit.ts` (inline docs)
- Examples: `src/components/forms/EmailCaptureExamples.tsx`

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **11.1** - ConvertKit integration with subscriber management
- **11.2** - Email capture forms with multiple variants
- **11.3** - Form validation and error handling
- **11.4** - Success confirmation messages
- **11.5** - Tagging strategy for signup sources

## Conclusion

The email capture and ConvertKit integration is fully implemented and ready for use. The system provides a flexible, secure, and user-friendly way to grow the email list with proper segmentation and tracking.
