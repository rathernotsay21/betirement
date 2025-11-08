/**
 * Accessibility Utilities
 * 
 * Provides utilities for ensuring WCAG 2.1 AA compliance
 */

/**
 * Calculate color contrast ratio between two colors
 * @param color1 - First color in hex format (e.g., '#FFFFFF')
 * @param color2 - Second color in hex format (e.g., '#000000')
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Get relative luminance of a color
 * @param color - Color in hex format
 * @returns Relative luminance (0-1)
 */
function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 * @param hex - Hex color string
 * @returns RGB object or null
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns Whether contrast meets standards
 */
export function meetsWCAGAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standards
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns Whether contrast meets standards
 */
export function meetsWCAGAAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Generate a unique ID for ARIA relationships
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Announce message to screen readers
 * @param message - Message to announce
 * @param priority - Priority level ('polite' or 'assertive')
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Trap focus within a container (useful for modals)
 * @param container - Container element
 * @returns Cleanup function
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Get all focusable elements within a container
 * @param container - Container element
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(elements);
}

/**
 * Check if element is visible to screen readers
 * @param element - Element to check
 * @returns Whether element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    element.getAttribute('aria-hidden') !== 'true'
  );
}

/**
 * Format number for screen readers
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumberForScreenReader(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Create accessible label for form field
 * @param label - Label text
 * @param required - Whether field is required
 * @returns Formatted label
 */
export function createAccessibleLabel(label: string, required: boolean = false): string {
  return required ? `${label} (required)` : label;
}

/**
 * Keyboard navigation handler
 * @param e - Keyboard event
 * @param onEnter - Callback for Enter key
 * @param onSpace - Callback for Space key
 * @param onEscape - Callback for Escape key
 */
export function handleKeyboardNavigation(
  e: React.KeyboardEvent,
  handlers: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
): void {
  switch (e.key) {
    case 'Enter':
      handlers.onEnter?.();
      break;
    case ' ':
      e.preventDefault(); // Prevent page scroll
      handlers.onSpace?.();
      break;
    case 'Escape':
      handlers.onEscape?.();
      break;
    case 'ArrowUp':
      e.preventDefault();
      handlers.onArrowUp?.();
      break;
    case 'ArrowDown':
      e.preventDefault();
      handlers.onArrowDown?.();
      break;
    case 'ArrowLeft':
      handlers.onArrowLeft?.();
      break;
    case 'ArrowRight':
      handlers.onArrowRight?.();
      break;
  }
}

/**
 * Color contrast checker for design system
 */
export const colorContrast = {
  // Bitcoin orange on white
  bitcoinOnWhite: getContrastRatio('#F7931A', '#FFFFFF'),
  // Bitcoin orange on black
  bitcoinOnBlack: getContrastRatio('#F7931A', '#0D0D0D'),
  // White on bitcoin orange
  whiteOnBitcoin: getContrastRatio('#FFFFFF', '#F7931A'),
  // Black on white
  blackOnWhite: getContrastRatio('#0D0D0D', '#FFFFFF'),
  // Neutral text on white
  neutralOnWhite: getContrastRatio('#6C757D', '#FFFFFF'),
  // Success on white
  successOnWhite: getContrastRatio('#27AE60', '#FFFFFF'),
  // Trust blue on white
  trustOnWhite: getContrastRatio('#2E86DE', '#FFFFFF'),
};

/**
 * Validate color contrast for accessibility
 * @param foreground - Foreground color
 * @param background - Background color
 * @param isLargeText - Whether text is large
 * @returns Validation result
 */
export function validateColorContrast(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  recommendation: string;
} {
  const ratio = getContrastRatio(foreground, background);
  const meetsAA = meetsWCAGAA(ratio, isLargeText);
  const meetsAAA = meetsWCAGAAA(ratio, isLargeText);

  let recommendation = '';
  if (!meetsAA) {
    recommendation = 'Contrast ratio is too low. Increase contrast to meet WCAG AA standards.';
  } else if (!meetsAAA) {
    recommendation = 'Meets WCAG AA but not AAA. Consider increasing contrast for better accessibility.';
  } else {
    recommendation = 'Excellent contrast! Meets WCAG AAA standards.';
  }

  return { ratio, meetsAA, meetsAAA, recommendation };
}
