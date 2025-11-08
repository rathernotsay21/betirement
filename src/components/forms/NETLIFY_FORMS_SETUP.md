# Netlify Forms Setup Guide

This document explains how Netlify Forms are configured in the Betirement website and how to set up email notifications.

## Overview

Netlify Forms provides serverless form handling without requiring a backend. Forms are automatically detected and processed by Netlify when properly configured.

## Form Components

### Available Forms

1. **ContactForm** (`ContactForm.tsx`)
   - General contact form with name, email, subject, and message
   - Three variants: `general`, `support`, `media`
   - Form names: `contact-general`, `contact-support`, `contact-media`

2. **BookingRequestForm** (`BookingRequestForm.tsx`)
   - Speaking engagement and media booking requests
   - Includes event details, audience size, budget, etc.
   - Form name: `booking-request`

3. **EmailCaptureForm** (`EmailCaptureForm.tsx`)
   - Newsletter subscription (uses ConvertKit API, not Netlify Forms)
   - Multiple variants: inline, modal, slide-in

## How Netlify Forms Work

### Form Detection

Netlify automatically detects forms during the build process when they include:

```html
<form 
  name="form-name"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="form-name" />
  <!-- form fields -->
</form>
```

### Key Requirements

1. **`data-netlify="true"`**: Enables Netlify form handling
2. **`name` attribute**: Unique identifier for the form
3. **Hidden `form-name` input**: Required for client-side submissions
4. **`method="POST"`**: Standard form submission method

### Spam Protection

All forms include honeypot fields for spam protection:

```html
<div className="hidden" aria-hidden="true">
  <label>
    Don't fill this out if you're human:
    <input name="bot-field" tabIndex={-1} autoComplete="off" />
  </label>
</div>
```

The honeypot field is:
- Hidden from real users with CSS
- Excluded from tab order (`tabIndex={-1}`)
- Checked on submission (if filled, submission is rejected)

## Form Submission Flow

### Client-Side Submission

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // 1. Check honeypot
  if (formData.honeypot) {
    return; // Silent rejection
  }

  // 2. Submit to Netlify
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'form-name': 'contact-general',
      ...formData,
    }).toString(),
  });

  // 3. Handle response
  if (response.ok) {
    // Show success message
  } else {
    // Show error message
  }
};
```

### Success/Error Handling

Each form component includes:
- **Loading state**: Disabled inputs and "Submitting..." button text
- **Success state**: Confirmation message with checkmark icon
- **Error state**: User-friendly error message with retry option
- **Form reset**: Clears all fields after successful submission

## Setting Up Email Notifications

### In Netlify Dashboard

1. Go to your site in Netlify Dashboard
2. Navigate to **Site settings** > **Forms**
3. Click **Form notifications**
4. Click **Add notification**
5. Choose **Email notification**
6. Configure:
   - **Event to listen for**: New form submission
   - **Form**: Select the specific form (or "Any form")
   - **Email to notify**: Your email address
   - **Email subject**: Custom subject line (optional)

### Notification Options

You can set up multiple notifications:
- Different emails for different forms
- Slack notifications
- Webhook notifications for custom integrations

### Email Template Variables

Netlify automatically includes:
- All form field values
- Submission timestamp
- Submitter's IP address
- Form name

## Testing Forms

### Local Development

Forms won't work in local development (`npm run dev`) because Netlify Forms require the Netlify infrastructure. To test:

1. **Deploy to Netlify**: Push to GitHub and let Netlify build
2. **Use Netlify CLI**: Run `netlify dev` instead of `npm run dev`
3. **Test on preview deploy**: Create a PR to get a preview URL

### Production Testing

After deploying:
1. Submit a test form
2. Check Netlify Dashboard > Forms > Recent submissions
3. Verify email notification was received
4. Check spam folder if email not received

## Form Data Management

### Viewing Submissions

1. Go to Netlify Dashboard
2. Navigate to **Forms** tab
3. View all submissions with timestamps
4. Export submissions as CSV
5. Delete spam submissions

### Data Retention

- Free tier: 100 submissions/month
- Pro tier: 1,000 submissions/month
- Submissions stored for 30 days
- Export data before it expires

## Spam Protection

### Built-in Protection

1. **Honeypot fields**: Catch simple bots
2. **Akismet integration**: Available on Pro plans
3. **reCAPTCHA**: Can be added with `data-netlify-recaptcha="true"`

### Adding reCAPTCHA (Optional)

```html
<form data-netlify="true" data-netlify-recaptcha="true">
  <!-- form fields -->
  <div data-netlify-recaptcha="true"></div>
</form>
```

Then configure reCAPTCHA keys in Netlify Dashboard.

## Troubleshooting

### Form Not Detected

**Problem**: Form submissions return 404

**Solutions**:
1. Ensure `data-netlify="true"` is present
2. Check hidden `form-name` input matches form `name` attribute
3. Redeploy site (forms detected during build)
4. Check Netlify build logs for form detection

### Submissions Not Received

**Problem**: Form submits but no data in dashboard

**Solutions**:
1. Check form name matches exactly
2. Verify `Content-Type` header is correct
3. Check browser console for errors
4. Test with Netlify CLI (`netlify dev`)

### Email Notifications Not Working

**Problem**: Submissions appear in dashboard but no email

**Solutions**:
1. Check spam folder
2. Verify email address in notification settings
3. Check notification is enabled
4. Test with a different email address
5. Check Netlify status page for issues

## Best Practices

1. **Unique form names**: Use descriptive, unique names for each form
2. **Always include honeypot**: Reduces spam significantly
3. **Client-side validation**: Validate before submission
4. **User feedback**: Show clear success/error messages
5. **Accessibility**: Include proper labels and ARIA attributes
6. **Rate limiting**: Consider adding rate limiting for high-traffic sites
7. **Data privacy**: Include privacy policy link near forms
8. **Testing**: Test forms after every deployment

## Security Considerations

1. **Never trust client-side validation**: Always validate on server (Netlify does this)
2. **Sanitize inputs**: Netlify automatically sanitizes form data
3. **HTTPS only**: All form submissions use HTTPS
4. **No sensitive data**: Don't collect passwords or payment info via forms
5. **GDPR compliance**: Include consent checkboxes if required

## Future Enhancements

Potential improvements for form handling:

1. **Custom success pages**: Redirect to thank-you pages
2. **File uploads**: Enable file attachments (Pro feature)
3. **Conditional logic**: Show/hide fields based on selections
4. **Multi-step forms**: Break long forms into steps
5. **Form analytics**: Track conversion rates
6. **A/B testing**: Test different form variations
7. **Integration with CRM**: Send submissions to Salesforce, HubSpot, etc.

## Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Netlify Forms Spam Filtering](https://docs.netlify.com/forms/spam-filters/)
- [Netlify Forms Notifications](https://docs.netlify.com/forms/notifications/)
