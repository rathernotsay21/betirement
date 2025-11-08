# Layout Components

This directory contains the core layout components for the Betirement website.

## Components

### Header
The main navigation header with the following features:
- **Sticky behavior**: Remains visible when scrolling
- **Responsive design**: Desktop horizontal menu, mobile hamburger menu
- **Dropdown navigation**: Content Hub has child menu items
- **Mobile drawer**: Slide-out menu from the right on mobile devices
- **CTA button**: "Get Started" button prominently displayed
- **Accessibility**: Proper ARIA labels and keyboard navigation support

### Footer
Multi-column footer with comprehensive site navigation:
- **Newsletter signup**: Email capture form (ConvertKit integration pending)
- **Social media links**: YouTube, Twitter, Instagram, LinkedIn
- **Navigation columns**: Content, Company, Community sections
- **Legal links**: Privacy, Terms, Disclaimer, Affiliate Disclosure
- **Responsive layout**: Stacks on mobile, multi-column on desktop

### SkipToContent
Accessibility component that provides a skip link:
- **Screen reader friendly**: Hidden visually but accessible to assistive technology
- **Keyboard accessible**: Visible when focused via Tab key
- **Direct navigation**: Jumps to main content, bypassing navigation

## Usage

These components are automatically included in the root layout (`app/layout.tsx`):

```tsx
import { Header, Footer, SkipToContent } from '@/src/components/layout';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SkipToContent />
        <Header />
        <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

## Styling

All components use Tailwind CSS with the custom design system:
- Bitcoin orange (`bitcoin-500`) for primary actions and branding
- Rich black (`black`) for footer background
- Neutral colors for text and borders
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Accessibility Features

- Semantic HTML elements (`<header>`, `<nav>`, `<footer>`)
- ARIA labels for navigation and interactive elements
- Keyboard navigation support
- Focus indicators on all interactive elements
- Skip-to-content link for keyboard users
- Proper heading hierarchy
- Touch targets minimum 44x44px on mobile

## Future Enhancements

- Search functionality in header
- User authentication menu items
- Shopping cart icon (when e-commerce is added)
- Language selector
- Dark mode toggle
