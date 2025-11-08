# Image Optimization Guide

This guide explains how to properly use images in the Betirement website for optimal performance.

## Quick Start

### Basic Image Usage

```tsx
import Image from 'next/image';
import { getImageProps } from '@/src/lib/image-optimization';

// For hero images (above the fold)
<Image
  src="/images/hero-image.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  {...getImageProps('hero')}
/>

// For card thumbnails (below the fold)
<Image
  src="/images/thumbnail.jpg"
  alt="Descriptive alt text"
  width={400}
  height={300}
  {...getImageProps('thumbnail')}
/>
```

## Image Configuration

### Next.js Image Component

All images MUST use the Next.js `Image` component instead of HTML `<img>` tags. This provides:

- Automatic WebP/AVIF conversion
- Responsive image sizing
- Lazy loading by default
- Blur placeholder support
- Automatic optimization

### Image Formats

The site is configured to automatically serve images in the following priority:

1. **AVIF** - Best compression, served to supporting browsers
2. **WebP** - Excellent compression, wide browser support
3. **Original format** - Fallback for older browsers

You should upload images in their original format (JPG/PNG), and Next.js will handle the conversion.

## Image Sizes and Responsive Design

### Configured Device Sizes

The following device sizes are configured in `next.config.mjs`:

- 640px (mobile)
- 750px (mobile landscape)
- 828px (tablet portrait)
- 1080px (tablet landscape)
- 1200px (small desktop)
- 1920px (desktop)
- 2048px (large desktop)
- 3840px (4K displays)

### Using the `sizes` Prop

The `sizes` prop tells the browser which image size to load based on viewport width:

```tsx
import { generateImageSizes } from '@/src/lib/image-optimization';

<Image
  src="/images/content.jpg"
  alt="Content image"
  width={1200}
  height={800}
  sizes={generateImageSizes({
    desktop: '1200px',
    tablet: '768px',
    mobile: '640px',
    default: '100vw',
  })}
/>
```

## Image Quality Settings

Use appropriate quality settings based on image type:

- **Thumbnails**: 75 quality (smaller file size)
- **Standard**: 85 quality (default, good balance)
- **High**: 90 quality (hero images, important visuals)

```tsx
import { IMAGE_QUALITY } from '@/src/lib/image-optimization';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  quality={IMAGE_QUALITY.high}
/>
```

## Loading Strategies

### Priority Loading (Above the Fold)

Images visible on initial page load should use `priority={true}`:

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true} // Loads immediately, no lazy loading
/>
```

### Lazy Loading (Below the Fold)

Images below the fold should use default lazy loading:

```tsx
<Image
  src="/images/content.jpg"
  alt="Content image"
  width={800}
  height={600}
  // priority is false by default - lazy loads when scrolled into view
/>
```

## Placeholder Strategies

### Blur Placeholder

For a better user experience, use blur placeholders:

```tsx
import { generatePlaceholderDataUrl } from '@/src/lib/image-optimization';

<Image
  src="/images/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={generatePlaceholderDataUrl('#F7931A')}
/>
```

### Static Import (Automatic Blur)

For local images, use static imports to get automatic blur placeholders:

```tsx
import heroImage from '@/public/images/hero.jpg';

<Image
  src={heroImage}
  alt="Hero"
  placeholder="blur" // Automatically generated from import
/>
```

## Common Use Cases

### Hero Images

```tsx
import { getImageProps } from '@/src/lib/image-optimization';

<Image
  src="/images/hero.jpg"
  alt="Bitcoin retirement freedom"
  width={1920}
  height={1080}
  {...getImageProps('hero')}
/>
```

### Video Thumbnails

```tsx
import { getImageProps } from '@/src/lib/image-optimization';

<Image
  src={video.thumbnail.high}
  alt={video.title}
  width={480}
  height={360}
  {...getImageProps('thumbnail')}
/>
```

### Blog Post Cards

```tsx
import { getImageProps } from '@/src/lib/image-optimization';

<Image
  src={post.coverImage}
  alt={post.title}
  width={400}
  height={300}
  {...getImageProps('card')}
/>
```

### Author Avatars

```tsx
import { getImageProps } from '@/src/lib/image-optimization';

<Image
  src="/images/author/michael.jpg"
  alt="Michael"
  width={128}
  height={128}
  {...getImageProps('avatar')}
  className="rounded-full"
/>
```

### Full-Width Images

```tsx
import { getImageProps } from '@/src/lib/image-optimization';

<Image
  src="/images/timeline-event.jpg"
  alt="Timeline event"
  width={1200}
  height={800}
  {...getImageProps('fullWidth')}
/>
```

## Background Images

For background images, use CSS with optimized images:

```tsx
// Instead of inline styles, use Tailwind classes
<div className="bg-[url('/images/pattern.svg')] bg-cover bg-center">
  {/* Content */}
</div>

// Or for dynamic backgrounds, use Image with fill
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

## Image Preparation Checklist

Before uploading images to the project:

- [ ] Resize images to appropriate dimensions (max 2048px width for most images)
- [ ] Compress images using tools like ImageOptim, TinyPNG, or Squoosh
- [ ] Use descriptive filenames (e.g., `bitcoin-retirement-hero.jpg`)
- [ ] Ensure images are under 200KB when possible
- [ ] Use JPG for photos, PNG for graphics with transparency
- [ ] Provide descriptive alt text for accessibility

## Performance Best Practices

1. **Always use Next.js Image component** - Never use `<img>` tags
2. **Set explicit width and height** - Prevents layout shift
3. **Use priority for above-fold images** - Improves LCP
4. **Lazy load below-fold images** - Default behavior, don't disable
5. **Use appropriate quality settings** - Balance quality and file size
6. **Provide alt text** - Required for accessibility and SEO
7. **Use blur placeholders** - Improves perceived performance
8. **Optimize source images** - Compress before uploading

## Troubleshooting

### Image Not Loading

- Check that the image path is correct (relative to `/public`)
- Verify the image file exists in the public directory
- Check browser console for errors

### Layout Shift Issues

- Always provide `width` and `height` props
- Use `fill` prop for responsive containers
- Set `sizes` prop appropriately

### Slow Loading

- Reduce image quality if file size is too large
- Ensure images are properly compressed
- Check that lazy loading is enabled for below-fold images
- Verify CDN caching is working (check Network tab)

## External Images

For external images (YouTube thumbnails, etc.), configure domains in `next.config.mjs`:

```js
images: {
  domains: ['i.ytimg.com', 'img.youtube.com'],
  // or use remotePatterns for more control
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.ytimg.com',
    },
  ],
}
```

## Testing Image Optimization

1. **Lighthouse Audit**: Run Lighthouse to check image optimization scores
2. **Network Tab**: Verify WebP/AVIF formats are being served
3. **Page Speed**: Check that images don't block rendering
4. **Mobile Testing**: Test on real devices to verify responsive images

## Resources

- [Next.js Image Documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Image Compression Tools](https://squoosh.app/)
