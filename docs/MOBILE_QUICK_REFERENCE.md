# Mobile Responsiveness Quick Reference

## Quick Checklist

### ✅ Touch Targets
```tsx
// ✅ Good - Meets 44px minimum
<button className="min-h-[44px] min-w-[44px] px-4 py-3">
  Click Me
</button>

// ❌ Bad - Too small
<button className="px-2 py-1">
  Click Me
</button>
```

### ✅ Typography
```tsx
// ✅ Good - Prevents iOS zoom
<input type="email" className="text-base" /> // 16px

// ❌ Bad - Causes zoom on iOS
<input type="email" className="text-sm" /> // 14px
```

### ✅ Responsive Grid
```tsx
// ✅ Good - Adapts to screen size
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// ❌ Bad - Fixed columns
<div className="grid grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### ✅ Responsive Text
```tsx
// ✅ Good - Scales with screen
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
  Heading
</h1>

// ❌ Bad - Fixed size
<h1 className="text-4xl">
  Heading
</h1>
```

### ✅ Responsive Spacing
```tsx
// ✅ Good - Adapts padding
<div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
  Content
</div>

// ❌ Bad - Fixed padding
<div className="px-8 py-6">
  Content
</div>
```

## Common Patterns

### Button
```tsx
import { Button } from '@/src/components/ui/Button';

<Button variant="primary" size="md">
  {/* Automatically mobile-optimized with min-h-[44px] */}
  Click Me
</Button>
```

### Input
```tsx
import { Input } from '@/src/components/ui/Input';

<Input
  type="email"
  placeholder="your@email.com"
  // Automatically has 16px font size and 44px height
/>
```

### Modal
```tsx
import { Modal } from '@/src/components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Title"
  size="md" // Adapts to mobile automatically
>
  {/* Content */}
</Modal>
```

### Responsive Image
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

### Video Player
```tsx
<div className="aspect-video w-full">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/VIDEO_ID"
    allowFullScreen
  />
</div>
```

## Utility Functions

```tsx
import {
  isMobile,
  isTablet,
  isDesktop,
  isTouchDevice,
  getResponsiveGrid,
  getResponsiveTextSize,
  getResponsivePadding,
} from '@/src/lib/mobile-utils';

// Check device type
if (isMobile()) {
  // Mobile-specific logic
}

// Get responsive classes
const gridClasses = getResponsiveGrid(3); // "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
const textClasses = getResponsiveTextSize('lg'); // "text-lg sm:text-xl lg:text-2xl"
const paddingClasses = getResponsivePadding('md'); // "px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5"
```

## Breakpoints

```typescript
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

## Testing

### Test Page
Visit `/mobile-test` to verify mobile responsiveness

### Browser DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test at: 375px, 768px, 1024px, 1280px

### Real Device Testing
- Test on actual mobile devices
- Check touch interactions
- Verify keyboard behavior
- Test in both portrait and landscape

## Common Issues

### Issue: iOS Zoom on Input
```tsx
// ❌ Causes zoom
<input className="text-sm" />

// ✅ Prevents zoom
<input className="text-base" /> // 16px or larger
```

### Issue: Touch Target Too Small
```tsx
// ❌ Too small
<button className="p-2">Icon</button>

// ✅ Meets minimum
<button className="min-h-[44px] min-w-[44px] p-3">Icon</button>
```

### Issue: Horizontal Scroll
```tsx
// ❌ Can cause overflow
<div className="w-[1200px]">Content</div>

// ✅ Responsive width
<div className="w-full max-w-7xl mx-auto px-4">Content</div>
```

### Issue: Modal Not Scrollable
```tsx
// ❌ Content cut off
<div className="p-6">
  {longContent}
</div>

// ✅ Scrollable content
<div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
  {longContent}
</div>
```

## Best Practices

1. **Always use responsive units**
   - Use `rem`, `em`, `%`, `vw`, `vh`
   - Avoid fixed `px` for layout

2. **Test on real devices**
   - Emulators don't catch everything
   - Test touch interactions
   - Verify performance

3. **Mobile-first approach**
   - Design for mobile first
   - Enhance for larger screens
   - Use `min-width` media queries

4. **Optimize images**
   - Use Next.js Image component
   - Provide appropriate sizes
   - Use lazy loading

5. **Minimize JavaScript**
   - Code split heavy components
   - Lazy load below-fold content
   - Use dynamic imports

## Resources

- Full Guide: `/docs/MOBILE_RESPONSIVENESS.md`
- Test Page: `/mobile-test`
- Utilities: `/src/lib/mobile-utils.ts`
- Mobile CSS: `/app/mobile-enhancements.css`
