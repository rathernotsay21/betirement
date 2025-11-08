/**
 * Mobile Responsiveness Utilities
 * Provides helper functions and constants for ensuring mobile-friendly interfaces
 */

/**
 * Minimum touch target size for mobile devices (WCAG 2.1 AA)
 * Ensures all interactive elements are easily tappable
 */
export const MIN_TOUCH_TARGET_SIZE = 44; // pixels

/**
 * Breakpoints matching Tailwind CSS defaults
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Check if current viewport is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
}

/**
 * Check if current viewport is tablet
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
}

/**
 * Check if current viewport is desktop
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.lg;
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint(): keyof typeof BREAKPOINTS | 'xs' {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
}

/**
 * Detect if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - for older browsers
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Prevent body scroll (useful for modals on mobile)
 */
export function preventBodyScroll(prevent: boolean = true): void {
  if (typeof document === 'undefined') return;
  
  if (prevent) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}

/**
 * Get optimal font size for mobile
 */
export function getMobileFontSize(desktopSize: number): number {
  if (!isMobile()) return desktopSize;
  
  // Reduce font size by 10-15% on mobile
  return Math.max(14, Math.round(desktopSize * 0.875));
}

/**
 * Format text for mobile display (truncate if needed)
 */
export function formatForMobile(text: string, maxLength: number = 50): string {
  if (!isMobile() || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Check if element meets minimum touch target size
 */
export function meetsMinTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.width >= MIN_TOUCH_TARGET_SIZE && rect.height >= MIN_TOUCH_TARGET_SIZE;
}

/**
 * Add touch-friendly spacing to element
 */
export function getTouchFriendlyClasses(): string {
  return isTouchDevice() 
    ? 'min-h-[44px] min-w-[44px] p-3' 
    : 'min-h-[36px] min-w-[36px] p-2';
}

/**
 * Get responsive padding classes
 */
export function getResponsivePadding(size: 'sm' | 'md' | 'lg' = 'md'): string {
  const paddingMap = {
    sm: 'px-4 py-2 sm:px-6 sm:py-3',
    md: 'px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5',
    lg: 'px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8',
  };
  
  return paddingMap[size];
}

/**
 * Get responsive text size classes
 */
export function getResponsiveTextSize(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
  const textMap = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl lg:text-2xl',
    xl: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
  };
  
  return textMap[size];
}

/**
 * Get responsive grid columns
 */
export function getResponsiveGrid(columns: 1 | 2 | 3 | 4 = 3): string {
  const gridMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };
  
  return gridMap[columns];
}

/**
 * Debounce function for resize events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Hook for responsive behavior
 */
export function useResponsive() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      breakpoint: 'lg' as const,
      isTouchDevice: false,
    };
  }
  
  return {
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    breakpoint: getCurrentBreakpoint(),
    isTouchDevice: isTouchDevice(),
  };
}
