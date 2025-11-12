'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { trackEvent } from '@/src/lib/analytics';
import { safeGetJSON, safeSetJSON } from '@/src/lib/storage';

interface ABTest {
  id: string;
  variants: string[];
  weights?: number[]; // Optional weights for each variant (must sum to 1)
}

interface ABTestContextValue {
  getVariant: (testId: string) => string;
  trackConversion: (testId: string, conversionType?: string) => void;
}

const ABTestContext = createContext<ABTestContextValue | undefined>(undefined);

interface ABTestProviderProps {
  children: ReactNode;
  tests?: ABTest[];
}

/**
 * A/B Testing Provider
 * 
 * Provides a simple framework for running A/B tests on the website.
 * Variants are assigned randomly and stored in localStorage to ensure
 * consistent experience across sessions.
 * 
 * Example usage:
 * 
 * const { getVariant, trackConversion } = useABTest();
 * const ctaVariant = getVariant('homepage-cta');
 * 
 * if (ctaVariant === 'A') {
 *   return <Button>Get Started</Button>;
 * } else {
 *   return <Button>Start Your Journey</Button>;
 * }
 * 
 * // Track conversion
 * trackConversion('homepage-cta', 'signup');
 */
export function ABTestProvider({ children, tests = [] }: ABTestProviderProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load existing assignments from localStorage (with Safari-safe storage access)
    const existingAssignments = safeGetJSON<Record<string, string>>('ab_test_assignments') || {};

    // Assign variants for any new tests
    const newAssignments = { ...existingAssignments };
    let hasNewAssignments = false;

    tests.forEach((test) => {
      if (!newAssignments[test.id]) {
        newAssignments[test.id] = assignVariant(test);
        hasNewAssignments = true;

        // Track assignment
        trackEvent('cta_click', {
          test_id: test.id,
          variant: newAssignments[test.id],
          event_type: 'ab_test_assignment',
        });
      }
    });

    if (hasNewAssignments) {
      safeSetJSON('ab_test_assignments', newAssignments);
    }

    setAssignments(newAssignments);
    setIsInitialized(true);
  }, [tests]);

  const getVariant = (testId: string): string => {
    // Return assigned variant or default to 'A'
    return assignments[testId] || 'A';
  };

  const trackConversion = (testId: string, conversionType: string = 'default') => {
    const variant = getVariant(testId);
    
    trackEvent('cta_click', {
      test_id: testId,
      variant,
      conversion_type: conversionType,
      event_type: 'ab_test_conversion',
    });
  };

  const value: ABTestContextValue = {
    getVariant,
    trackConversion,
  };

  // Don't render children until initialized to prevent flash of wrong variant
  if (!isInitialized) {
    return null;
  }

  return (
    <ABTestContext.Provider value={value}>
      {children}
    </ABTestContext.Provider>
  );
}

/**
 * Hook to access A/B testing functionality
 */
export function useABTest(): ABTestContextValue {
  const context = useContext(ABTestContext);
  
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }
  
  return context;
}

/**
 * Assign a variant based on weights or random distribution
 */
function assignVariant(test: ABTest): string {
  const { variants, weights } = test;

  if (!weights || weights.length !== variants.length) {
    // Equal distribution
    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex];
  }

  // Weighted distribution
  const random = Math.random();
  let cumulativeWeight = 0;

  for (let i = 0; i < variants.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      return variants[i];
    }
  }

  // Fallback to first variant
  return variants[0];
}

/**
 * Component wrapper for A/B testing
 * 
 * Example usage:
 * 
 * <ABTestVariant testId="homepage-cta" variant="A">
 *   <Button>Get Started</Button>
 * </ABTestVariant>
 * 
 * <ABTestVariant testId="homepage-cta" variant="B">
 *   <Button>Start Your Journey</Button>
 * </ABTestVariant>
 */
interface ABTestVariantProps {
  testId: string;
  variant: string;
  children: ReactNode;
}

export function ABTestVariant({ testId, variant, children }: ABTestVariantProps) {
  const { getVariant } = useABTest();
  const assignedVariant = getVariant(testId);

  if (assignedVariant !== variant) {
    return null;
  }

  return <>{children}</>;
}
