# Accessibility Guide

This document outlines the accessibility features and best practices implemented in the Betirement website to ensure WCAG 2.1 AA compliance.

## Table of Contents

1. [Overview](#overview)
2. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Reader Support](#screen-reader-support)
5. [Color Contrast](#color-contrast)
6. [Focus Management](#focus-management)
7. [ARIA Labels and Roles](#aria-labels-and-roles)
8. [Forms Accessibility](#forms-accessibility)
9. [Images and Media](#images-and-media)
10. [Testing Tools](#testing-tools)
11. [Common Patterns](#common-patterns)

## Overview

The Betirement website is designed to be accessible to all users, including those using assistive technologies such as screen readers, keyboard-only navigation, and voice control software.

### Accessibility Goals

- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation support for all interactive elements
- ✅ Screen reader compatibility (NVDA, JAWS, VoiceOver)
- ✅ Proper color contrast ratios (4.5:1 minimum for normal text)
- ✅ Touch targets minimum 44x44px on mobile
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy

## WCAG 2.1 AA Compliance

### Perceivable

**Text Alternatives**
- All images have descriptive alt text
- Decorative images use empty alt attributes (`alt=""`)
- Icons have `aria-label` or `aria-hidden="true"` with visible text

**Adaptable**
- Semantic HTML elements (header, nav, main, footer, article, section)
- Proper heading hierarchy (H1 → H2 → H3)
- Logical reading order maintained
- Content structure preserved without CSS

**Distinguishable**
- Color contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Text can be resized up to 200% without loss of functionality
- No information conveyed by color alone
- Focus indicators visible on all interactive elements

### Operable

**Keyboard Accessible**
- All functionality available via keyboard
- No keyboard traps
- Skip to main content link
- Logical tab order

**Enough Time**
- No time limits on content
- Users can pause, stop, or hide moving content
- Session timeouts have warnings

**Seizures and Physical Reactions**
- No content flashes more than 3 times per second
- Animations respect `prefers-reduced-motion`

**Navigable**
- Skip navigation link
- Descriptive page titles
- Focus order follows logical sequence
- Link purpose clear from context
- Multiple ways to find pages (navigation, search, sitemap)
- Descriptive headings and labels

### Understandable

**Readable**
- Language of page specified (`lang="en"`)
- Clear, concise content
- Definitions provided for unusual terms (glossary)

**Predictable**
- Consistent navigation across pages
- Consistent identification of components
- No unexpected context changes

**Input Assistance**
- Form labels and instructions provided
- Error messages clear and helpful
- Error prevention for important actions
- Suggestions provided for input errors

### Robust

**Compatible**
- Valid HTML
- ARIA attributes used correctly
- Compatible with assistive technologies
- Graceful degradation for older browsers

## Keyboard Navigation

All interactive elements are accessible via keyboard:

### Global Shortcuts

- **Tab**: Move focus forward
- **Shift + Tab**: Move focus backward
- **Enter**: Activate buttons and links
- **Space**: Activate buttons, toggle checkboxes
- **Escape**: Close modals, menus, and popups
- **Arrow Keys**: Navigate within menus, lists, and carousels

### Skip to Content

Press **Tab** on page load to reveal the "Skip to main content" link, which allows keyboard users to bypass navigation and jump directly to the main content.

```tsx
<SkipToContent />
```

### Focus Management

- Visible focus indicators on all interactive elements
- Focus trapped within modals when open
- Focus returned to trigger element when modal closes
- Focus moved to first heading when navigating to new page

## Screen Reader Support

### Semantic HTML

We use semantic HTML elements to provide structure:

```tsx
<header>
  <nav aria-label="Main navigation">
    {/* Navigation items */}
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Page Title</h1>
    {/* Content */}
  </article>
</main>

<footer>
  {/* Footer content */}
</footer>
```

### ARIA Landmarks

- `role="banner"` - Site header
- `role="navigation"` - Navigation menus
- `role="main"` - Main content area
- `role="complementary"` - Sidebar content
- `role="contentinfo"` - Site footer
- `role="search"` - Search functionality

### Live Regions

For dynamic content updates:

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Screen Reader Only Text

Use the `sr-only` class for text that should only be read by screen readers:

```tsx
<span className="sr-only">Opens in new window</span>
```

## Color Contrast

All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

### Design System Contrast Ratios

| Combination | Ratio | Status |
|-------------|-------|--------|
| Black on White | 21:1 | ✅ AAA |
| Bitcoin Orange on White | 2.9:1 | ⚠️ Large text only |
| White on Bitcoin Orange | 3.4:1 | ✅ AA (large text) |
| Bitcoin Orange on Black | 7.2:1 | ✅ AAA |
| Neutral Gray on White | 4.6:1 | ✅ AA |
| Success Green on White | 3.8:1 | ✅ AA (large text) |
| Trust Blue on White | 4.8:1 | ✅ AA |

### Usage Guidelines

**Bitcoin Orange (#F7931A)**
- ✅ Use on dark backgrounds (black, dark gray)
- ✅ Use for large text on white (18pt+ or 14pt+ bold)
- ❌ Avoid for small text on white backgrounds
- ✅ Use for borders and accents

**Text Colors**
- Primary text: `#0D0D0D` (Rich Black) on white
- Secondary text: `#6C757D` (Neutral Gray) on white
- Inverse text: White on dark backgrounds

### Testing Contrast

Use the accessibility utilities to test contrast:

```tsx
import { validateColorContrast } from '@/src/lib/accessibility';

const result = validateColorContrast('#F7931A', '#FFFFFF', false);
console.log(result.ratio); // 2.9:1
console.log(result.meetsAA); // false
console.log(result.recommendation); // "Contrast ratio is too low..."
```

## Focus Management

### Visible Focus Indicators

All interactive elements have visible focus indicators:

```css
.focus-visible:focus {
  outline: 2px solid #F7931A;
  outline-offset: 2px;
}
```

### Focus Trap in Modals

Modals trap focus to prevent keyboard users from tabbing outside:

```tsx
import { trapFocus } from '@/src/lib/accessibility';

useEffect(() => {
  if (isOpen && modalRef.current) {
    const cleanup = trapFocus(modalRef.current);
    return cleanup;
  }
}, [isOpen]);
```

### Focus Return

When closing modals or menus, focus returns to the trigger element:

```tsx
const handleClose = () => {
  setIsOpen(false);
  triggerRef.current?.focus();
};
```

## ARIA Labels and Roles

### Buttons

All buttons have accessible names:

```tsx
// Text button (accessible by default)
<button>Subscribe</button>

// Icon button (needs aria-label)
<button aria-label="Close modal">
  <XIcon />
</button>

// Button with icon and text
<button>
  <SearchIcon aria-hidden="true" />
  Search
</button>
```

### Links

Links have descriptive text or labels:

```tsx
// Good: Descriptive text
<a href="/about">Learn about our story</a>

// Good: aria-label for icon links
<a href="https://youtube.com" aria-label="Visit our YouTube channel">
  <YouTubeIcon />
</a>

// Avoid: Generic text
<a href="/blog/post">Click here</a> ❌
```

### Forms

Form fields have associated labels:

```tsx
// Visible label
<label htmlFor="email">Email Address</label>
<input id="email" type="email" required />

// aria-label for inline forms
<input
  type="email"
  aria-label="Email address"
  placeholder="Enter your email"
/>

// aria-describedby for help text
<input
  id="password"
  type="password"
  aria-describedby="password-help"
/>
<span id="password-help">
  Must be at least 8 characters
</span>
```

### Navigation

Navigation menus have descriptive labels:

```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<nav aria-label="Footer navigation">
  {/* Footer links */}
</nav>
```

### Modals

Modals have proper ARIA attributes:

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
</div>
```

## Forms Accessibility

### Labels

All form fields have labels:

```tsx
<div>
  <label htmlFor="name" className="block mb-2">
    Full Name
    {required && <span aria-label="required">*</span>}
  </label>
  <input
    id="name"
    type="text"
    required={required}
    aria-required={required}
  />
</div>
```

### Error Messages

Error messages are associated with fields:

```tsx
<input
  id="email"
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <span id="email-error" role="alert" className="text-red-600">
    Please enter a valid email address
  </span>
)}
```

### Required Fields

Required fields are clearly marked:

```tsx
<label htmlFor="email">
  Email Address
  <span className="text-red-500 ml-1" aria-label="required">*</span>
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
/>
```

### Form Validation

Validation messages are announced to screen readers:

```tsx
import { announceToScreenReader } from '@/src/lib/accessibility';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!isValid) {
    announceToScreenReader('Form has errors. Please correct them and try again.', 'assertive');
    return;
  }
  
  // Submit form
  announceToScreenReader('Form submitted successfully!', 'polite');
};
```

## Images and Media

### Images

All images have appropriate alt text:

```tsx
// Informative image
<img
  src="/images/bitcoin-chart.jpg"
  alt="Bitcoin price chart showing growth from 2020 to 2024"
/>

// Decorative image
<img
  src="/images/background-pattern.jpg"
  alt=""
  role="presentation"
/>

// Complex image with long description
<img
  src="/images/retirement-infographic.jpg"
  alt="Retirement planning infographic"
  aria-describedby="infographic-description"
/>
<div id="infographic-description" className="sr-only">
  Detailed description of the infographic...
</div>
```

### Videos

Videos have captions and transcripts:

```tsx
<div>
  <iframe
    src="https://youtube.com/embed/..."
    title="Bitcoin Retirement Strategy Explained"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  />
  <details>
    <summary>Video Transcript</summary>
    <p>{transcript}</p>
  </details>
</div>
```

### Icons

Icons are properly labeled or hidden:

```tsx
// Icon with visible text (hide from screen readers)
<button>
  <SearchIcon aria-hidden="true" />
  Search
</button>

// Icon without text (needs label)
<button aria-label="Search">
  <SearchIcon />
</button>

// Decorative icon
<div>
  <CheckIcon aria-hidden="true" />
  <span>Task completed</span>
</div>
```

## Testing Tools

### Automated Testing

**Browser Extensions**
- [axe DevTools](https://www.deque.com/axe/devtools/) - Comprehensive accessibility testing
- [WAVE](https://wave.webaim.org/extension/) - Visual accessibility evaluation
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools

**Command Line**
```bash
# Run Lighthouse accessibility audit
npm run lighthouse

# Run axe-core tests
npm run test:a11y
```

### Manual Testing

**Keyboard Navigation**
1. Unplug your mouse
2. Navigate the entire site using only keyboard
3. Verify all interactive elements are reachable
4. Check focus indicators are visible
5. Ensure no keyboard traps

**Screen Reader Testing**
- **Windows**: NVDA (free) or JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca

**Screen Reader Shortcuts**
- **NVDA**: Ctrl + Alt + N to start
- **VoiceOver**: Cmd + F5 to start
- **JAWS**: Insert + F12 to start

**Color Contrast**
- Use browser DevTools color picker
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Development Audit

Use the built-in accessibility audit component (development only):

```tsx
import { AccessibilityAudit } from '@/src/components/ui/AccessibilityAudit';

// In development layout
{process.env.NODE_ENV === 'development' && <AccessibilityAudit />}
```

## Common Patterns

### Accessible Button

```tsx
<button
  type="button"
  onClick={handleClick}
  aria-label="Close dialog"
  className="min-w-[44px] min-h-[44px]"
>
  <XIcon aria-hidden="true" />
</button>
```

### Accessible Link

```tsx
<a
  href="/external-site"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit external site (opens in new window)"
>
  External Site
  <ExternalLinkIcon aria-hidden="true" />
</a>
```

### Accessible Modal

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  className="fixed inset-0 z-50"
>
  <div className="fixed inset-0 bg-black/50" onClick={onClose} />
  <div className="relative bg-white rounded-lg p-6">
    <h2 id="dialog-title">Dialog Title</h2>
    <button onClick={onClose} aria-label="Close dialog">
      Close
    </button>
  </div>
</div>
```

### Accessible Form

```tsx
<form onSubmit={handleSubmit} aria-labelledby="form-title">
  <h2 id="form-title">Contact Form</h2>
  
  <div>
    <label htmlFor="name">
      Name <span aria-label="required">*</span>
    </label>
    <input
      id="name"
      type="text"
      required
      aria-required="true"
      aria-invalid={errors.name ? true : false}
      aria-describedby={errors.name ? "name-error" : undefined}
    />
    {errors.name && (
      <span id="name-error" role="alert">
        {errors.name}
      </span>
    )}
  </div>
  
  <button type="submit">Submit</button>
</form>
```

### Accessible Navigation

```tsx
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>
        Home
      </a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
  </ul>
</nav>
```

## Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Testing
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [Keyboard Testing Guide](https://webaim.org/articles/keyboard/)

## Maintenance

### Regular Audits

Run accessibility audits regularly:

```bash
# Weekly automated checks
npm run lighthouse
npm run test:a11y

# Monthly manual testing
- Keyboard navigation test
- Screen reader test
- Color contrast verification
- Focus management review
```

### Continuous Improvement

- Monitor user feedback
- Stay updated with WCAG guidelines
- Test with real users with disabilities
- Review new components for accessibility
- Update documentation as needed

## Support

If you encounter accessibility issues or have suggestions for improvement, please:

1. Open an issue on GitHub
2. Email accessibility@betirement.com
3. Use the feedback form on the website

We are committed to making Betirement accessible to everyone.
