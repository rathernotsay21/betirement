'use client';

import { useEffect, useState } from 'react';
import { colorContrast, validateColorContrast } from '@/src/lib/accessibility';
import { CheckCircle } from 'lucide-react';

/**
 * Accessibility Audit Component
 * 
 * Development-only component that displays accessibility information
 * and potential issues. Should only be rendered in development mode.
 */
export function AccessibilityAudit() {
  const [isOpen, setIsOpen] = useState(false);
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Run accessibility checks
    const foundIssues: string[] = [];

    // Check for images without alt text
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        foundIssues.push(`Image ${index + 1} missing alt text: ${img.src}`);
      }
    });

    // Check for buttons without accessible names
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute('aria-label');
      const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
      
      if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
        foundIssues.push(`Button ${index + 1} missing accessible name`);
      }
    });

    // Check for links without accessible names
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      const hasText = link.textContent?.trim();
      const hasAriaLabel = link.getAttribute('aria-label');
      
      if (!hasText && !hasAriaLabel) {
        foundIssues.push(`Link ${index + 1} missing accessible name`);
      }
    });

    // Check for form inputs without labels
    const inputs = document.querySelectorAll('input:not([type="hidden"])');
    inputs.forEach((input, index) => {
      const hasLabel = input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${input.id}"]`);
      
      if (!hasLabel) {
        foundIssues.push(`Input ${index + 1} missing label: ${input.getAttribute('name') || 'unnamed'}`);
      }
    });

    // Check heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      if (lastLevel > 0 && level > lastLevel + 1) {
        foundIssues.push(`Heading hierarchy skip: ${heading.tagName} after H${lastLevel}`);
      }
      lastLevel = level;
    });

    setIssues(foundIssues);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Toggle accessibility audit"
      >
        A11y Audit {issues.length > 0 && `(${issues.length})`}
      </button>

      {/* Audit panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 bg-white border-2 border-purple-600 rounded-lg shadow-2xl max-w-md max-h-96 overflow-auto">
          <div className="sticky top-0 bg-purple-600 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-bold">Accessibility Audit</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-200"
              aria-label="Close audit panel"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Color Contrast Results */}
            <section>
              <h4 className="font-bold text-sm mb-2">Color Contrast Ratios</h4>
              <div className="space-y-1 text-xs">
                <ContrastResult
                  label="Bitcoin Orange on White"
                  ratio={colorContrast.bitcoinOnWhite}
                />
                <ContrastResult
                  label="Bitcoin Orange on Black"
                  ratio={colorContrast.bitcoinOnBlack}
                />
                <ContrastResult
                  label="White on Bitcoin Orange"
                  ratio={colorContrast.whiteOnBitcoin}
                />
                <ContrastResult
                  label="Black on White"
                  ratio={colorContrast.blackOnWhite}
                />
                <ContrastResult
                  label="Neutral on White"
                  ratio={colorContrast.neutralOnWhite}
                />
                <ContrastResult
                  label="Success on White"
                  ratio={colorContrast.successOnWhite}
                />
                <ContrastResult
                  label="Trust Blue on White"
                  ratio={colorContrast.trustOnWhite}
                />
              </div>
            </section>

            {/* Issues */}
            <section>
              <h4 className="font-bold text-sm mb-2">
                Issues Found: {issues.length}
              </h4>
              {issues.length === 0 ? (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  No accessibility issues detected!
                </p>
              ) : (
                <ul className="space-y-1 text-xs">
                  {issues.map((issue, index) => (
                    <li key={index} className="text-red-600">
                      • {issue}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Keyboard Navigation Tips */}
            <section>
              <h4 className="font-bold text-sm mb-2">Keyboard Navigation</h4>
              <ul className="space-y-1 text-xs text-neutral-600">
                <li>• Tab: Navigate forward</li>
                <li>• Shift+Tab: Navigate backward</li>
                <li>• Enter/Space: Activate buttons</li>
                <li>• Escape: Close modals/menus</li>
                <li>• Arrow keys: Navigate lists/menus</li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

function ContrastResult({ label, ratio }: { label: string; ratio: number }) {
  const meetsAA = ratio >= 4.5;
  const meetsAAA = ratio >= 7;

  return (
    <div className="flex items-center justify-between">
      <span>{label}:</span>
      <span className="flex items-center gap-2">
        <span className="font-mono">{ratio.toFixed(2)}:1</span>
        {meetsAAA ? (
          <span className="text-green-600 font-bold">AAA</span>
        ) : meetsAA ? (
          <span className="text-yellow-600 font-bold">AA</span>
        ) : (
          <span className="text-red-600 font-bold">FAIL</span>
        )}
      </span>
    </div>
  );
}
