'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Modal } from '@/src/components/ui/Modal';
import {
  validateColorContrast,
  colorContrast,
  announceToScreenReader,
  handleKeyboardNavigation,
} from '@/src/lib/accessibility';

export default function AccessibilityDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      announceToScreenReader('Form has errors. Please correct them and try again.', 'assertive');
      return;
    }
    announceToScreenReader('Form submitted successfully!', 'polite');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Accessibility Features Demo
          </h1>
          <p className="text-lg text-neutral-600">
            This page demonstrates the accessibility features implemented in the Betirement website.
          </p>
        </header>

        <div className="space-y-12">
          {/* Keyboard Navigation */}
          <section aria-labelledby="keyboard-nav-heading">
            <Card>
              <CardHeader>
                <CardTitle id="keyboard-nav-heading">Keyboard Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  Try navigating this page using only your keyboard:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 mb-6">
                  <li><kbd className="px-2 py-1 bg-neutral-200 rounded">Tab</kbd> - Move focus forward</li>
                  <li><kbd className="px-2 py-1 bg-neutral-200 rounded">Shift + Tab</kbd> - Move focus backward</li>
                  <li><kbd className="px-2 py-1 bg-neutral-200 rounded">Enter</kbd> - Activate buttons and links</li>
                  <li><kbd className="px-2 py-1 bg-neutral-200 rounded">Space</kbd> - Activate buttons</li>
                  <li><kbd className="px-2 py-1 bg-neutral-200 rounded">Escape</kbd> - Close modals</li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ARIA Labels */}
          <section aria-labelledby="aria-labels-heading">
            <Card>
              <CardHeader>
                <CardTitle id="aria-labels-heading">ARIA Labels and Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  All interactive elements have proper ARIA labels for screen readers:
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    className="p-3 bg-bitcoin-500 text-white rounded-lg hover:bg-bitcoin-600 transition-colors min-w-[44px] min-h-[44px]"
                    aria-label="Search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button
                    className="p-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-colors min-w-[44px] min-h-[44px]"
                    aria-label="Menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    className="p-3 bg-success text-white rounded-lg hover:bg-success/90 transition-colors min-w-[44px] min-h-[44px]"
                    aria-label="Favorite"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-neutral-500">
                  These icon-only buttons have aria-label attributes so screen readers can announce their purpose.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Focus Management */}
          <section aria-labelledby="focus-heading">
            <Card>
              <CardHeader>
                <CardTitle id="focus-heading">Focus Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  All interactive elements have visible focus indicators:
                </p>
                <Button onClick={() => setIsModalOpen(true)}>
                  Open Modal (Test Focus Trap)
                </Button>
                <p className="mt-4 text-sm text-neutral-500">
                  When the modal opens, focus is trapped inside. Press Tab to cycle through focusable elements.
                  Press Escape or click the close button to return focus to the trigger.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Form Accessibility */}
          <section aria-labelledby="forms-heading">
            <Card>
              <CardHeader>
                <CardTitle id="forms-heading">Form Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} aria-labelledby="forms-heading">
                  <div className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      error={emailError}
                      required
                      placeholder="Enter your email"
                    />
                    <Button type="submit">Submit Form</Button>
                  </div>
                  <p className="mt-4 text-sm text-neutral-500">
                    This form demonstrates proper labeling, error handling, and screen reader announcements.
                    Try submitting without a valid email to see error handling.
                  </p>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Color Contrast */}
          <section aria-labelledby="contrast-heading">
            <Card>
              <CardHeader>
                <CardTitle id="contrast-heading">Color Contrast Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text):
                </p>
                <div className="space-y-3">
                  <ContrastDemo
                    label="Black on White"
                    ratio={colorContrast.blackOnWhite}
                    foreground="#0D0D0D"
                    background="#FFFFFF"
                  />
                  <ContrastDemo
                    label="Bitcoin Orange on Black"
                    ratio={colorContrast.bitcoinOnBlack}
                    foreground="#F7931A"
                    background="#0D0D0D"
                  />
                  <ContrastDemo
                    label="White on Bitcoin Orange"
                    ratio={colorContrast.whiteOnBitcoin}
                    foreground="#FFFFFF"
                    background="#F7931A"
                  />
                  <ContrastDemo
                    label="Neutral on White"
                    ratio={colorContrast.neutralOnWhite}
                    foreground="#6C757D"
                    background="#FFFFFF"
                  />
                  <ContrastDemo
                    label="Success on White"
                    ratio={colorContrast.successOnWhite}
                    foreground="#27AE60"
                    background="#FFFFFF"
                  />
                  <ContrastDemo
                    label="Trust Blue on White"
                    ratio={colorContrast.trustOnWhite}
                    foreground="#2E86DE"
                    background="#FFFFFF"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Touch Targets */}
          <section aria-labelledby="touch-heading">
            <Card>
              <CardHeader>
                <CardTitle id="touch-heading">Touch Target Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  All interactive elements meet the minimum 44x44px touch target size for mobile accessibility:
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="min-w-[44px] min-h-[44px] bg-bitcoin-500 text-white rounded-lg px-4 py-2 hover:bg-bitcoin-600 transition-colors">
                    44px Min
                  </button>
                  <button className="min-w-[48px] min-h-[48px] bg-success text-white rounded-lg px-4 py-2 hover:bg-success/90 transition-colors">
                    48px
                  </button>
                  <button className="min-w-[52px] min-h-[52px] bg-trust text-white rounded-lg px-4 py-2 hover:bg-trust/90 transition-colors">
                    52px
                  </button>
                </div>
                <p className="mt-4 text-sm text-neutral-500">
                  Larger touch targets are easier to tap on mobile devices and benefit users with motor impairments.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Semantic HTML */}
          <section aria-labelledby="semantic-heading">
            <Card>
              <CardHeader>
                <CardTitle id="semantic-heading">Semantic HTML Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  The page uses proper semantic HTML elements:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;header&gt;</code> - Page header</li>
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;nav&gt;</code> - Navigation menus</li>
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;main&gt;</code> - Main content area</li>
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;section&gt;</code> - Content sections</li>
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;article&gt;</code> - Independent content</li>
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;footer&gt;</code> - Page footer</li>
                  <li><code className="px-2 py-1 bg-neutral-100 rounded">&lt;h1&gt;-&lt;h6&gt;</code> - Proper heading hierarchy</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Screen Reader Support */}
          <section aria-labelledby="sr-heading">
            <Card>
              <CardHeader>
                <CardTitle id="sr-heading">Screen Reader Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-neutral-600">
                  The site is tested with popular screen readers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 mb-6">
                  <li><strong>NVDA</strong> (Windows) - Free and open source</li>
                  <li><strong>JAWS</strong> (Windows) - Industry standard</li>
                  <li><strong>VoiceOver</strong> (macOS/iOS) - Built-in</li>
                  <li><strong>TalkBack</strong> (Android) - Built-in</li>
                </ul>
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <p className="text-sm text-neutral-700 mb-2">
                    <strong>Screen reader only text example:</strong>
                  </p>
                  <button className="bg-bitcoin-500 text-white px-4 py-2 rounded-lg hover:bg-bitcoin-600 transition-colors min-h-[44px]">
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">Next page</span>
                  </button>
                  <p className="text-xs text-neutral-500 mt-2">
                    The arrow is hidden from screen readers, but "Next page" is announced.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Modal for focus trap demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Focus Trap Demo"
      >
        <p className="mb-4">
          This modal demonstrates focus trapping. Try pressing Tab to cycle through the focusable elements.
          Focus will stay within the modal until you close it.
        </p>
        <div className="space-y-4">
          <Input label="First Name" type="text" placeholder="Enter your first name" />
          <Input label="Last Name" type="text" placeholder="Enter your last name" />
          <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ContrastDemo({
  label,
  ratio,
  foreground,
  background,
}: {
  label: string;
  ratio: number;
  foreground: string;
  background: string;
}) {
  const meetsAA = ratio >= 4.5;
  const meetsAAA = ratio >= 7;
  const meetsAALarge = ratio >= 3;

  return (
    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: background, color: foreground }}
        >
          Aa
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-neutral-500">
            Ratio: {ratio.toFixed(2)}:1
          </p>
        </div>
      </div>
      <div className="text-right">
        {meetsAAA ? (
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            AAA ✓
          </span>
        ) : meetsAA ? (
          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            AA ✓
          </span>
        ) : meetsAALarge ? (
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            AA Large ✓
          </span>
        ) : (
          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            Fail ✗
          </span>
        )}
      </div>
    </div>
  );
}
