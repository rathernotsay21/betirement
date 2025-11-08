# Mobile Responsiveness Guide

## Overview

This document outlines the mobile responsiveness implementation for the Betirement website, ensuring an optimal experience across all devices and screen sizes.

## Key Requirements (Requirement 18)

### 18.1 Mobile Navigation
- ✅ Hamburger menu on screens < 768px
- ✅ Slide-out drawer with smooth animations
- ✅ Touch-friendly menu items (44px+ height)
- ✅ Prevents body scroll when open

### 18.2 Touch Target Sizes
- ✅ Minimum 44×44px for all interactive elements (WCAG 2.1 AA)
- ✅ Buttons have adequate padding
- ✅ Icon buttons meet minimum size
- ✅ Links have sufficient spacing

### 18.3 Typography Optimization
- ✅ Base font size: 16px (prevents iOS zoom)
- ✅ Responsive heading sizes
- ✅ Readable line heights
- ✅ Proper text scaling across breakpoints

### 18.4 Video Player Optimization
- ✅ Responsive aspect ratio (16:9)
- ✅ Full-width on mobile
- ✅ Touch-friendly controls
- ✅ Proper iframe sizing

### 18.5 Form Optimization
- ✅ Full-width inputs on mobile
- ✅ Appropriate input types for mobile keyboards
- ✅ Adequate spacing between fields
- ✅ Clear error messages
- ✅ Touch-friendly submit buttons

## Breakpoints

```typescript
const BREAKPOINTS = {
  sm: 640px,   // Mobile landscape
  md: 768px,   // Tablet
  lg: 1024px,  // Desktop
  xl: 1280px,  // Large desktop
  '2xl': 1536px // Extra large
}
```

## Mobile Utilities

### Location
`src/lib/mobile-utils.ts`

### Key Functions

```typescript
// Device detection
isMobile(): boolean
isTablet(): boolean
isDesktop(): boolean
isTouchDevice(): boolean
getCurrentBreakpoint(): string

// Responsive helpers
getResponsiveGrid(columns): string
getResponsiveTextSize(size): string
getResponsivePadding(size): string
getTouchFriendlyClasses(): string

// Utilities
preventBodyScroll(prevent): void
meetsMinTouchTarget(element): boolean
```

## Component Enhancements

### Button Component
- Minimum height: 44px for all sizes
- Touch-friendly padding
- Clear active states
- Proper focus indicators

```tsx
<Button variant="primary" size="md">
  {/* Automatically has min-h-[44px] */}
  Click Me
</Button>
```

### Input Component
- Minimum height: 44px
- Font size: 16px (prevents iOS zoom)
- Clear focus states
- Responsive padding

```tsx
<Input
  type="email"
  placeholder="your@email.com"
  // Automatically mobile-optimized
/>
```

### Modal Component
- Full-width on mobile with margins
- Scrollable content area
- Touch-friendly close button (44×44px)
- Prevents body scroll
- Proper safe area handling

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Modal Title"
  size="md" // Adapts to mobile
>
  {/* Content */}
</Modal>
```

### Header Component
- Sticky positioning
- Hamburger menu on mobile
- Slide-out drawer
- Touch-friendly navigation items
- Backdrop overlay

### VideoCard Component
- Responsive thumbnail sizing
- Optimized text sizes
- Proper aspect ratio
- Touch-friendly card area

## Mobile-Specific CSS

### Location
`app/mobile-enhancements.css`

### Key Features

1. **iOS Optimizations**
   - Prevents text size adjustment
   - Removes default input styling
   - Better tap highlight colors

2. **Touch Improvements**
   - Smooth scrolling
   - Better active states
   - Touch feedback

3. **Layout Enhancements**
   - Responsive spacing
   - Better modal experience
   - Improved navigation drawer

4. **Safe Area Support**
   - Handles notched devices
   - Proper padding for safe areas

## Testing

### Test Page
Visit `/mobile-test` to see comprehensive mobile responsiveness testing including:
- Device information display
- Touch target size verification
- Typography scaling
- Form layouts
- Grid responsiveness
- Modal behavior
- Video player testing

### Manual Testing Checklist

#### Navigation
- [ ] Hamburger menu appears on mobile
- [ ] Menu drawer slides in smoothly
- [ ] All menu items are tappable (44px+)
- [ ] Backdrop closes menu when tapped
- [ ] Body scroll is prevented when menu is open

#### Touch Targets
- [ ] All buttons are at least 44×44px
- [ ] Icon buttons have adequate touch area
- [ ] Links have sufficient spacing
- [ ] Form inputs are easy to tap

#### Typography
- [ ] Text is readable without zooming
- [ ] Headings scale appropriately
- [ ] Line heights are comfortable
- [ ] No horizontal scrolling required

#### Forms
- [ ] Inputs are full-width on mobile
- [ ] Correct keyboard types appear (email, tel, etc.)
- [ ] Error messages are visible
- [ ] Submit buttons are easy to tap
- [ ] No zoom on input focus (16px font size)

#### Video Players
- [ ] Videos maintain aspect ratio
- [ ] Full-width on mobile
- [ ] Controls are accessible
- [ ] No overflow issues

#### Modals
- [ ] Modals are full-width with margins
- [ ] Close button is easy to tap
- [ ] Content is scrollable
- [ ] Body scroll is prevented

#### Grid Layouts
- [ ] Single column on mobile
- [ ] Proper spacing between items
- [ ] No horizontal overflow

### Device Testing

Test on the following devices/viewports:

**Mobile**
- iPhone SE (375×667)
- iPhone 12/13/14 (390×844)
- iPhone 14 Pro Max (430×932)
- Samsung Galaxy S21 (360×800)
- Google Pixel 5 (393×851)

**Tablet**
- iPad Mini (768×1024)
- iPad Air (820×1180)
- iPad Pro (1024×1366)

**Desktop**
- 1280×720 (small laptop)
- 1920×1080 (standard desktop)
- 2560×1440 (large desktop)

### Browser Testing

Test on:
- Safari (iOS)
- Chrome (Android)
- Chrome (Desktop)
- Firefox (Desktop)
- Safari (macOS)
- Edge (Desktop)

## Common Issues and Solutions

### Issue: iOS Zoom on Input Focus
**Solution:** Ensure all inputs have `font-size: 16px` or larger

### Issue: Touch Targets Too Small
**Solution:** Use `min-h-[44px]` and `min-w-[44px]` classes

### Issue: Modal Not Scrollable on Mobile
**Solution:** Add `max-h-[calc(100vh-200px)] overflow-y-auto` to content area

### Issue: Horizontal Scroll on Mobile
**Solution:** Use `overflow-x-hidden` on body and ensure no fixed-width elements exceed viewport

### Issue: Navigation Drawer Doesn't Prevent Body Scroll
**Solution:** Set `overflow: hidden` on body when drawer is open

### Issue: Video Player Overflow
**Solution:** Use `aspect-video` class and ensure parent has proper width constraints

## Performance Considerations

### Image Optimization
- Use Next.js Image component
- Provide appropriate sizes prop
- Use lazy loading for below-fold images
- Serve WebP format

```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
/>
```

### Code Splitting
- Use dynamic imports for heavy components
- Lazy load below-fold content
- Minimize initial bundle size

### Touch Performance
- Use CSS transforms for animations
- Avoid layout thrashing
- Debounce scroll/resize events

## Accessibility on Mobile

### Focus Management
- Visible focus indicators
- Logical tab order
- Skip to content link

### Screen Reader Support
- Proper ARIA labels
- Semantic HTML
- Alt text for images

### Keyboard Navigation
- All interactive elements accessible
- Proper focus trapping in modals
- Escape key closes modals

## Best Practices

1. **Mobile-First Approach**
   - Design for mobile first
   - Enhance for larger screens
   - Use min-width media queries

2. **Touch-Friendly Design**
   - 44×44px minimum touch targets
   - Adequate spacing between elements
   - Clear visual feedback

3. **Performance**
   - Optimize images
   - Minimize JavaScript
   - Use efficient CSS

4. **Testing**
   - Test on real devices
   - Use browser dev tools
   - Test with slow connections

5. **Progressive Enhancement**
   - Core functionality works without JS
   - Enhanced experience with JS
   - Graceful degradation

## Resources

- [WCAG 2.1 Touch Target Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## Maintenance

### Regular Checks
- Test on new device releases
- Update breakpoints if needed
- Monitor analytics for mobile issues
- Review user feedback

### Updates
- Keep dependencies updated
- Test after major framework updates
- Review and update documentation
- Add new device profiles as needed
