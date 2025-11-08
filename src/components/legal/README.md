# Legal Components

This directory contains components related to legal compliance and user consent.

## Components

### CookieConsent

A GDPR-compliant cookie consent banner that appears at the bottom of the page for first-time visitors.

**Features:**
- Appears after 1 second delay for better UX
- Stores user consent preference in localStorage
- Provides Accept and Decline options
- Links to Privacy Policy for more information
- Smooth slide-up animation
- Fully responsive design
- Accessible with proper ARIA labels

**Usage:**
```tsx
import { CookieConsent } from '@/src/components/legal';

// Already included in root layout
<CookieConsent />
```

**Consent Storage:**
- Key: `cookie-consent`
- Values: `'accepted'` or `'declined'`
- Also stores: `cookie-consent-date` with ISO timestamp

**Styling:**
- Dark background (black) to match footer
- Bitcoin orange accent for primary button
- Responsive layout (stacks on mobile)
- Fixed position at bottom of viewport

## Legal Pages

The following legal pages are available at `/legal/*`:

### Privacy Policy (`/legal/privacy`)
Comprehensive privacy policy covering:
- Information collection practices
- Third-party service providers (ConvertKit, Netlify, YouTube)
- Cookie usage
- User rights (GDPR compliance)
- Data security measures
- Contact information

### Terms of Service (`/legal/terms`)
Terms and conditions covering:
- Permitted use of the site
- Intellectual property rights
- Products and services
- Third-party links
- Disclaimers and liability limitations
- Dispute resolution

### Disclaimer (`/legal/disclaimer`)
Important disclaimers including:
- Not financial advice notice
- Investment risks (general and cryptocurrency-specific)
- No guarantees or warranties
- Personal experience disclosure
- Tax implications
- Legal compliance requirements

### Affiliate Disclosure (`/legal/affiliate-disclosure`)
Transparent disclosure about:
- Affiliate link usage
- Commission structure
- Product recommendation criteria
- FTC compliance
- Amazon Associates participation
- Cryptocurrency exchange affiliates

## Footer Integration

Legal page links are automatically included in the footer via the navigation configuration:

```typescript
// src/config/navigation.ts
footerNavigation.legal = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Affiliate Disclosure", href: "/legal/affiliate-disclosure" },
];
```

## Compliance Notes

### GDPR Compliance
- Cookie consent banner for EU visitors
- Clear privacy policy with user rights
- Data retention policies
- Right to access, correct, and delete data

### FTC Compliance
- Affiliate relationships disclosed
- Clear labeling of sponsored content
- Honest product recommendations

### Financial Disclaimer
- Clear "not financial advice" statements
- Risk disclosures for cryptocurrency
- Encouragement to consult professionals

## Customization

To customize legal pages:

1. **Update Contact Information:**
   - Edit email addresses in each legal page
   - Update company name if needed

2. **Modify Cookie Consent:**
   - Edit `CookieConsent.tsx` for different styling
   - Adjust delay timing in `useEffect`
   - Customize consent message

3. **Add New Legal Pages:**
   - Create new page in `app/legal/[page-name]/page.tsx`
   - Add link to `src/config/navigation.ts`
   - Follow existing page structure

## Best Practices

1. **Keep Updated:**
   - Review legal pages quarterly
   - Update "Last Updated" dates when making changes
   - Monitor changes in relevant laws and regulations

2. **Accessibility:**
   - All legal pages use semantic HTML
   - Proper heading hierarchy
   - Sufficient color contrast
   - Readable font sizes

3. **SEO:**
   - Each page has proper metadata
   - Indexed by search engines
   - Clear, descriptive titles

4. **User Experience:**
   - Clear, plain language where possible
   - Organized with sections and headings
   - Easy navigation between legal pages
   - Mobile-responsive design
