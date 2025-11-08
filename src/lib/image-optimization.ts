/**
 * Image Optimization Utilities
 * 
 * This module provides utilities and configurations for optimizing images
 * throughout the Betirement website using Next.js Image component.
 */

/**
 * Standard image sizes for responsive images
 * These match the deviceSizes configured in next.config.mjs
 */
export const IMAGE_SIZES = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
  xlarge: 1920,
} as const;

/**
 * Image quality settings for different use cases
 */
export const IMAGE_QUALITY = {
  thumbnail: 75,
  standard: 85,
  high: 90,
} as const;

/**
 * Common image aspect ratios
 */
export const ASPECT_RATIOS = {
  square: { width: 1, height: 1 },
  video: { width: 16, height: 9 },
  portrait: { width: 3, height: 4 },
  landscape: { width: 4, height: 3 },
  wide: { width: 21, height: 9 },
} as const;

/**
 * Generate srcset sizes string for responsive images
 * @param breakpoints - Array of viewport widths where image size changes
 * @returns sizes string for Next.js Image component
 */
export function generateImageSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default: string;
}): string {
  const sizes: string[] = [];

  if (breakpoints.desktop) {
    sizes.push(`(min-width: 1024px) ${breakpoints.desktop}`);
  }
  if (breakpoints.tablet) {
    sizes.push(`(min-width: 768px) ${breakpoints.tablet}`);
  }
  if (breakpoints.mobile) {
    sizes.push(`(min-width: 640px) ${breakpoints.mobile}`);
  }
  sizes.push(breakpoints.default);

  return sizes.join(', ');
}

/**
 * Calculate image dimensions while maintaining aspect ratio
 * @param originalWidth - Original image width
 * @param originalHeight - Original image height
 * @param targetWidth - Desired width (optional)
 * @param targetHeight - Desired height (optional)
 * @returns Calculated dimensions
 */
export function calculateImageDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    };
  }

  if (targetHeight && !targetWidth) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
    };
  }

  if (targetWidth && targetHeight) {
    return { width: targetWidth, height: targetHeight };
  }

  return { width: originalWidth, height: originalHeight };
}

/**
 * Common image configurations for different use cases
 */
export const IMAGE_CONFIGS = {
  hero: {
    sizes: generateImageSizes({
      desktop: '1920px',
      tablet: '1024px',
      mobile: '768px',
      default: '100vw',
    }),
    quality: IMAGE_QUALITY.high,
    priority: true,
  },
  thumbnail: {
    sizes: generateImageSizes({
      desktop: '384px',
      tablet: '256px',
      mobile: '192px',
      default: '256px',
    }),
    quality: IMAGE_QUALITY.thumbnail,
    priority: false,
  },
  card: {
    sizes: generateImageSizes({
      desktop: '400px',
      tablet: '350px',
      mobile: '300px',
      default: '100vw',
    }),
    quality: IMAGE_QUALITY.standard,
    priority: false,
  },
  avatar: {
    sizes: generateImageSizes({
      default: '128px',
    }),
    quality: IMAGE_QUALITY.standard,
    priority: false,
  },
  fullWidth: {
    sizes: generateImageSizes({
      default: '100vw',
    }),
    quality: IMAGE_QUALITY.standard,
    priority: false,
  },
} as const;

/**
 * Get optimized image props for Next.js Image component
 * @param config - Image configuration type
 * @param overrides - Optional overrides for specific props
 * @returns Props object for Next.js Image component
 */
export function getImageProps(
  config: keyof typeof IMAGE_CONFIGS,
  overrides?: {
    priority?: boolean;
    quality?: number;
    sizes?: string;
  }
) {
  const baseConfig = IMAGE_CONFIGS[config];
  return {
    ...baseConfig,
    ...overrides,
  };
}

/**
 * Placeholder blur data URL generator
 * Creates a simple gradient placeholder for images
 */
export function generatePlaceholderDataUrl(color: string = '#F7931A'): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f5f5f5' width='400' height='300'/%3E%3Crect fill='${encodeURIComponent(color)}' width='400' height='300' opacity='0.1'/%3E%3C/svg%3E`;
}

/**
 * Image loading priorities based on viewport position
 */
export const LOADING_PRIORITY = {
  aboveFold: true,  // Images visible on initial page load
  belowFold: false, // Images that require scrolling to see
} as const;

/**
 * Recommended image formats and their use cases
 */
export const IMAGE_FORMAT_GUIDE = {
  webp: 'Default format - excellent compression and quality',
  avif: 'Next-gen format - better compression than WebP (automatically served when supported)',
  jpg: 'Fallback for photos and complex images',
  png: 'Fallback for images requiring transparency',
  svg: 'Vector graphics, logos, icons (use directly, not through Image component)',
} as const;
