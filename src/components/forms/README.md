# Form Components

This directory contains form components for the Betirement website, including email capture forms with ConvertKit integration and contact forms with Netlify Forms integration.

## Available Components

1. **EmailCaptureForm** - Newsletter subscription with ConvertKit
2. **ContactForm** - General contact form with Netlify Forms
3. **BookingRequestForm** - Speaking engagement requests with Netlify Forms

---

## EmailCaptureForm

A flexible email capture form component with multiple variants and ConvertKit integration.

### Features

- **Multiple Variants**: Inline, modal, and slide-in presentations
- **Lead Magnet Support**: Display lead magnet offers
- **Tagging Strategy**: Automatic tagging based on source and interests
- **Form Validation**: Client-side and server-side validation
- **Rate Limiting**: Built-in protection against abuse
- **Honeypot Protection**: Anti-spam honeypot field
- **Success Feedback**: Clear success and error messages
- **Accessibility**: WCAG 2.1 AA compliant

### Basic Usage

```tsx
import { EmailCaptureForm } from '@/components/forms';
import { CONVERTKIT_TAGS } from '@/lib/convertkit';

// Inline variant
<EmailCaptureForm
  variant="inline"
  source={CONVERTKIT_TAGS.WEBSITE_HOME}
  tags={[CONVERTKIT_TAGS.BITCOIN, CONVERTKIT_TAGS.RETIREMENT]}
  title="Join Our Newsletter"
  description="Get weekly insights on Bitcoin and retirement planning."
/>
```

### Variants

#### 1. Inline Variant

Embed directly in page content:

```tsx
<EmailCaptureForm
  variant="inline"
  source={CONVERTKIT_TAGS.WEBSITE_BLOG}
  buttonText="Subscribe"
/>
```

#### 2. Modal Variant

Display in a modal dialog:

```tsx
import { EmailCaptureModal } from '@/components/forms';

<EmailCaptureModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  source={CONVERTKIT_TAGS.EXIT_INTENT}
  title="Before You Go..."
  leadMagnet="5 Steps to Bitcoin-Powered Retirement"
/>
```

#### 3. Slide-in Variant

Slide in from bottom-right corner:

```tsx
import { EmailCaptureSlideIn } from '@/components/forms';

<EmailCaptureSlideIn
  isVisible={showSlideIn}
  onClose={() => setShowSlideIn(false)}
  source={CONVERTKIT_TAGS.SLIDE_IN}
  title="Stay Connected"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'inline' \| 'modal' \| 'slide-in'` | `'inline'` | Form presentation style |
| `leadMagnet` | `string` | - | Lead magnet offer text |
| `tags` | `ConvertKitTag[]` | `[]` | Tags to apply to subscriber |
| `source` | `string` | - | Source identifier for tracking |
| `onSuccess` | `() => void` | - | Callback after successful subscription |
| `className` | `string` | - | Additional CSS classes |
| `showName` | `boolean` | `false` | Show first name field |
| `buttonText` | `string` | `'Subscribe'` | Submit button text |
| `placeholder` | `string` | `'Enter your email'` | Email input placeholder |
| `title` | `string` | - | Form title |
| `description` | `string` | - | Form description |

### ConvertKit Tags

Available tags for subscriber segmentation:

**Source Tags:**
- `WEBSITE_HOME` - Home page signup
- `WEBSITE_BLOG` - Blog page signup
- `WEBSITE_RESOURCES` - Resources page signup
- `WEBSITE_VIDEO` - Video page signup
- `LEAD_MAGNET` - Lead magnet download
- `EXIT_INTENT` - Exit intent popup
- `SLIDE_IN` - Slide-in form

**Interest Tags:**
- `BITCOIN` - Bitcoin interest
- `RETIREMENT` - Retirement planning interest
- `INVESTING` - General investing interest

**Engagement Tags:**
- `VIDEO_VIEWER` - Watched videos
- `BLOG_READER` - Read blog posts
- `RESOURCE_DOWNLOADER` - Downloaded resources
- `CALCULATOR_USER` - Used calculators

### API Endpoint

The form submits to `/api/subscribe` which handles:

- Email validation
- Rate limiting (10 requests per 10 minutes per IP)
- Honeypot spam protection
- ConvertKit API integration
- Error handling

### Environment Variables

Required environment variables:

```bash
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_API_SECRET=your_api_secret
CONVERTKIT_FORM_ID=your_form_id
```

### Examples

See `EmailCaptureExamples.tsx` for complete implementation examples of all variants.

### Accessibility

- Semantic HTML with proper labels
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Error announcements
- Success confirmations

### Security

- Rate limiting per IP address
- Honeypot field for bot detection
- Server-side validation
- CORS protection
- Input sanitization


---

## ContactForm

A general-purpose contact form component with Netlify Forms integration for serverless form handling.

### Features

- **Netlify Forms Integration**: Serverless form handling without backend code
- **Honeypot Spam Protection**: Built-in anti-spam measures
- **Multiple Types**: General, support, and media contact forms
- **Success/Error Handling**: Clear user feedback
- **Form Validation**: Client-side validation with HTML5
- **Accessibility**: WCAG 2.1 AA compliant
- **Email Notifications**: Configurable in Netlify Dashboard

### Basic Usage

```tsx
import { ContactForm } from '@/components/forms';

// General contact form
<ContactForm type="general" />

// Support form
<ContactForm type="support" />

// Media inquiries
<ContactForm type="media" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'general' \| 'support' \| 'media'` | `'general'` | Form type/purpose |
| `onSuccess` | `() => void` | - | Callback after successful submission |
| `className` | `string` | `''` | Additional CSS classes |

### Form Fields

- **Name** (required) - User's full name
- **Email** (required) - User's email address
- **Subject** (required) - Message subject
- **Message** (required) - Detailed message (textarea)
- **Honeypot** (hidden) - Spam protection field

### Netlify Forms Setup

#### 1. Form Detection

Forms are automatically detected by Netlify during build when they include:

```html
<form 
  name="contact-general"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact-general" />
  <!-- form fields -->
</form>
```

#### 2. Email Notifications

Configure in Netlify Dashboard:

1. Go to **Site settings** > **Forms**
2. Click **Form notifications**
3. Add email notification
4. Select form and enter email address

#### 3. Viewing Submissions

- Navigate to **Forms** tab in Netlify Dashboard
- View all submissions with timestamps
- Export as CSV
- Delete spam submissions

### Spam Protection

The ContactForm includes multiple layers of spam protection:

1. **Honeypot Field**: Hidden field that bots typically fill out
2. **Netlify Akismet**: Available on Pro plans
3. **Rate Limiting**: Can be added via Netlify Functions

### Testing

**Important**: Netlify Forms only work in production or with Netlify CLI.

```bash
# Test locally with Netlify CLI
netlify dev

# Or deploy to preview
git push origin feature-branch
```

### Form Names

Each form type has a unique name:
- General: `contact-general`
- Support: `contact-support`
- Media: `contact-media`

### Success State

After successful submission, the form displays:
- Success icon (checkmark)
- Confirmation message
- Option to submit another message

### Error Handling

If submission fails:
- Error message displayed
- Form remains filled (no data loss)
- Retry option available
- Fallback email address provided

### Complete Documentation

See `NETLIFY_FORMS_SETUP.md` for comprehensive setup guide including:
- Detailed configuration steps
- Email notification setup
- Troubleshooting guide
- Security best practices
- Testing procedures

---

## BookingRequestForm

A specialized form for speaking engagement and media booking requests with Netlify Forms integration.

### Features

- **Comprehensive Fields**: Event details, audience size, budget, etc.
- **Netlify Forms**: Serverless form handling
- **Honeypot Protection**: Anti-spam measures
- **Conditional Fields**: Smart form logic
- **Success Feedback**: Clear confirmation messages

### Usage

```tsx
import { BookingRequestForm } from '@/components/forms';

<BookingRequestForm />
```

### Form Fields

- Name, Email, Organization (required)
- Event Type (dropdown)
- Event Date (date picker)
- Expected Audience Size (dropdown)
- Preferred Topic (optional)
- Budget Range (optional)
- Additional Details (textarea, required)

### Form Name

- `booking-request`

### Integration

Used on the `/speaking` page for booking requests. Submissions are sent to Netlify Forms and can trigger email notifications to the speaking coordinator.

---

## Development Guidelines

### Adding New Forms

1. Create component in `src/components/forms/`
2. Add Netlify attributes: `data-netlify="true"`
3. Include honeypot field
4. Add hidden `form-name` input
5. Implement success/error states
6. Export from `index.ts`
7. Update this README

### Form Validation

Use HTML5 validation attributes:
- `required` for required fields
- `type="email"` for email validation
- `pattern` for custom validation
- `minlength`/`maxlength` for text length

### Accessibility Checklist

- [ ] Proper `<label>` for each input
- [ ] `id` and `htmlFor` attributes match
- [ ] Error messages with `role="alert"`
- [ ] Success messages with `role="status"`
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader tested

### Testing Checklist

- [ ] Test in local development (Netlify CLI)
- [ ] Test on preview deployment
- [ ] Verify email notifications
- [ ] Test spam protection
- [ ] Test on mobile devices
- [ ] Test with screen reader
- [ ] Test error states
- [ ] Test success states

---

## Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [ConvertKit API Documentation](https://developers.convertkit.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
