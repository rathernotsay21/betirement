# Quick Performance Reference

A quick reference guide for maintaining optimal performance in the Betirement website.

## Image Usage

### ✅ DO

```tsx
import Image from 'next/image';
import { getImageProps } from '@/src/lib/image-optimization';

// Hero image (above fold)
<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  {...getImageProps('hero')}
/>

// Thumbnail (below fold)
<Image
  src="/images/thumb.jpg"
  alt="Descriptive alt text"
  width={400}
  height={300}
  {...getImageProps('thumbnail')}
/>
```

### ❌ DON'T

```tsx
// Never use HTML img tags
<img src="/images/photo.jpg" alt="Photo" />

// Never omit width and height
<Image src="/images/photo.jpg" alt="Photo" />
```

## Dynamic Imports

### ✅ DO - For Heavy Components

```tsx
import dynamic from 'next/dynamic';

// Below-fold component
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // If client-only
  }
);
```

### ❌ DON'T - For Lightweight Components

```tsx
// Don't dynamically import simple components
const Button = dynamic(() => import('@/components/Button')); // ❌
```

## When to Use Dynamic Imports

✅ **Use for:**
- Calculators and interactive tools
- Forms (below the fold)
- Charts and data visualizations
- Third-party widgets (social feeds, maps)
- Modal dialogs
- Animations and transitions
- Components with large dependencies

❌ **Don't use for:**
- Simple UI components (buttons, cards)
- Layout components (header, footer)
- Above-fold content
- Critical rendering path components

## Font Loading

### ✅ Already Optimized

Fonts are automatically optimized in `app/layout.tsx`:

```tsx
import { Inter, Open_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

No action needed - just use the CSS variables:
- `font-heading` for headings (Inter)
- `font-body` for body text (Open Sans)

## Image Presets

Use these presets from `src/lib/image-optimization.ts`:

```tsx
import { getImageProps } from '@/src/lib/image-optimization';

// Hero images
{...getImageProps('hero')}

// Thumbnails
{...getImageProps('thumbnail')}

// Card images
{...getImageProps('card')}

// Avatars
{...getImageProps('avatar')}

// Full-width images
{...getImageProps('fullWidth')}
```

## Performance Checklist

Before committing code:

- [ ] All images use Next.js `Image` component
- [ ] Images have explicit `width` and `height`
- [ ] Above-fold images have `priority={true}`
- [ ] Heavy components use dynamic imports
- [ ] No console.log statements in production code
- [ ] No unused imports
- [ ] Client components only when needed

## Testing Performance

```bash
# Build and test locally
npm run build
npm run start

# Run full performance audit
npm run perf

# Run Lighthouse (mobile)
npm run lighthouse:mobile

# Run Lighthouse (desktop)
npm run lighthouse:desktop

# Analyze bundle size
npm run analyze

# Test slow connections
npm run test:performance
```

## Common Patterns

### Video Thumbnail

```tsx
<Image
  src={video.thumbnail.high}
  alt={video.title}
  width={480}
  height={360}
  {...getImageProps('thumbnail')}
/>
```

### Blog Cover Image

```tsx
<Image
  src={post.coverImage}
  alt={post.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Background Image

```tsx
<div className="relative w-full h-96">
  <Image
    src="/images/background.jpg"
    alt=""
    fill
    className="object-cover"
    sizes="100vw"
  />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

## Quick Wins

1. **Use image presets** - Don't manually configure every image
2. **Dynamic import heavy components** - Especially below the fold
3. **Set priority on hero images** - Improves LCP
4. **Use fill for responsive containers** - Prevents layout shift
5. **Lazy load by default** - Don't disable unless necessary

## Resources

- [Full Performance Guide](./PERFORMANCE_OPTIMIZATION.md)
- [Image Optimization Guide](./IMAGE_OPTIMIZATION_GUIDE.md)
- [Next.js Image Docs](https://nextjs.org/docs/app/api-reference/components/image)
