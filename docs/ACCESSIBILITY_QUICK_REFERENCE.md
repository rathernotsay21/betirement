# Accessibility Quick Reference

Quick reference guide for implementing accessible components in the Betirement website.

## 🎯 Quick Checks

Before committing code, verify:
- [ ] All buttons have accessible names (text or aria-label)
- [ ] All images have alt text (or alt="" for decorative)
- [ ] All form inputs have labels
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Touch targets are at least 44x44px
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible

## 🔤 Common Patterns

### Button with Icon Only
```tsx
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

### Button with Icon and Text
```tsx
<button>
  <SearchIcon aria-hidden="true" />
  Search
</button>
```

### Link to External Site
```tsx
<a 
  href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Visit example.com (opens in new window)"
>
  Example Site
</a>
```

### Form Input
```tsx
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}
```

### Modal
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Modal Title</h2>
  {/* Content */}
</div>
```

### Navigation
```tsx
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/" aria-current={isActive ? 'page' : undefined}>
        Home
      </a>
    </li>
  </ul>
</nav>
```

### Loading State
```tsx
<button aria-busy={loading} aria-live="polite">
  {loading && <Spinner aria-hidden="true" />}
  {loading ? 'Loading...' : 'Submit'}
</button>
```

### Image
```tsx
// Informative
<img src="chart.jpg" alt="Bitcoin price chart showing 50% growth" />

// Decorative
<img src="pattern.jpg" alt="" role="presentation" />

// Complex
<img 
  src="infographic.jpg" 
  alt="Retirement planning infographic"
  aria-describedby="infographic-desc"
/>
<div id="infographic-desc" className="sr-only">
  Detailed description...
</div>
```

## 🎨 Color Contrast

### Approved Combinations
✅ Black (#0D0D0D) on White - 21:1
✅ Bitcoin Orange (#F7931A) on Black - 7.2:1
✅ White on Bitcoin Orange - 3.4:1 (large text only)
✅ Neutral (#6C757D) on White - 4.6:1

### Avoid
❌ Bitcoin Orange on White (small text) - 2.9:1
❌ Light gray on white - insufficient contrast

## ⌨️ Keyboard Navigation

### Required Support
- **Tab**: Move forward
- **Shift + Tab**: Move backward
- **Enter**: Activate buttons/links
- **Space**: Activate buttons
- **Escape**: Close modals/menus
- **Arrow Keys**: Navigate lists/menus

### Implementation
```tsx
import { handleKeyboardNavigation } from '@/src/lib/accessibility';

<div
  onKeyDown={(e) => handleKeyboardNavigation(e, {
    onEnter: () => handleSelect(),
    onEscape: () => handleClose(),
    onArrowDown: () => moveNext(),
    onArrowUp: () => movePrevious(),
  })}
>
```

## 🔊 Screen Reader Announcements

```tsx
import { announceToScreenReader } from '@/src/lib/accessibility';

// Polite (non-urgent)
announceToScreenReader('Form submitted successfully', 'polite');

// Assertive (urgent)
announceToScreenReader('Error: Please fix form errors', 'assertive');
```

## 👆 Touch Targets

### Minimum Sizes
- Small: 44x44px (WCAG minimum)
- Medium: 48x48px (recommended)
- Large: 52x52px (comfortable)

### Implementation
```tsx
<button className="min-w-[44px] min-h-[44px] p-3">
  Click me
</button>
```

## 🏷️ ARIA Attributes

### Common Attributes
- `aria-label`: Accessible name for element
- `aria-labelledby`: Reference to labeling element
- `aria-describedby`: Reference to description
- `aria-hidden`: Hide from screen readers
- `aria-live`: Announce dynamic changes
- `aria-current`: Indicate current item
- `aria-expanded`: Indicate expanded state
- `aria-controls`: Indicate controlled element
- `aria-invalid`: Indicate error state
- `aria-required`: Indicate required field

### When to Use
- Use `aria-label` for icon-only buttons
- Use `aria-labelledby` for complex labels
- Use `aria-describedby` for help text and errors
- Use `aria-hidden="true"` for decorative icons
- Use `aria-live` for dynamic content updates

## 📱 Mobile Accessibility

### Touch Targets
```tsx
// Minimum 44x44px
<button className="min-w-[44px] min-h-[44px]">
  Tap me
</button>
```

### Spacing
```tsx
// Adequate spacing between targets
<div className="flex gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Viewport
```tsx
// Ensure proper viewport meta tag
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## 🧪 Testing

### Quick Test Commands
```bash
# Run Lighthouse audit
npm run lighthouse

# Check TypeScript
npm run type-check

# Run linter
npm run lint
```

### Manual Testing
1. Unplug mouse, navigate with keyboard only
2. Use Tab to move through page
3. Verify all interactive elements are reachable
4. Check focus indicators are visible
5. Test with screen reader (NVDA/VoiceOver)

### Browser DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Run audit
5. Fix any issues found

## 🎓 Resources

### Documentation
- [Full Accessibility Guide](./ACCESSIBILITY.md)
- [Accessibility Checklist](./ACCESSIBILITY_CHECKLIST.md)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Extension](https://wave.webaim.org/extension/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Testing
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [VoiceOver Guide](https://support.apple.com/guide/voiceover/welcome/mac)

## 💡 Tips

1. **Start with semantic HTML** - Use the right element for the job
2. **Add ARIA only when needed** - Don't over-use ARIA attributes
3. **Test with keyboard** - Navigate without a mouse regularly
4. **Use the sr-only class** - For screen reader only text
5. **Check contrast** - Use browser DevTools color picker
6. **Test with real users** - Get feedback from people with disabilities
7. **Keep it simple** - Simpler interfaces are more accessible
8. **Document patterns** - Share accessible patterns with team

## ⚠️ Common Mistakes

### ❌ Don't Do This
```tsx
// Missing accessible name
<button><XIcon /></button>

// Using div as button
<div onClick={handleClick}>Click me</div>

// Missing alt text
<img src="photo.jpg" />

// Generic link text
<a href="/blog">Click here</a>

// Color only indicator
<span style={{ color: 'red' }}>Error</span>
```

### ✅ Do This Instead
```tsx
// Proper accessible name
<button aria-label="Close"><XIcon aria-hidden="true" /></button>

// Use button element
<button onClick={handleClick}>Click me</button>

// Descriptive alt text
<img src="photo.jpg" alt="Team photo at 2024 conference" />

// Descriptive link text
<a href="/blog">Read our latest blog post</a>

// Multiple indicators
<span className="text-red-600 flex items-center gap-2">
  <ErrorIcon aria-hidden="true" />
  <span>Error: Invalid input</span>
</span>
```

## 🚀 Quick Start

1. Import accessibility utilities:
```tsx
import { 
  announceToScreenReader,
  handleKeyboardNavigation,
  validateColorContrast 
} from '@/src/lib/accessibility';
```

2. Use semantic HTML:
```tsx
<header>
  <nav aria-label="Main navigation">
    <main id="main-content">
      <footer>
```

3. Add ARIA labels where needed:
```tsx
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

4. Test with keyboard:
- Tab through the page
- Verify focus indicators
- Test all interactions

5. Run accessibility audit:
```bash
npm run lighthouse
```

## 📞 Need Help?

- Check [Full Accessibility Guide](./ACCESSIBILITY.md)
- Review [Accessibility Checklist](./ACCESSIBILITY_CHECKLIST.md)
- Open an issue on GitHub
- Ask in team chat

Remember: Accessibility is not optional - it's a requirement!
