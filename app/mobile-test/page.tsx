'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Modal } from '@/src/components/ui/Modal';
import { EmailCaptureForm } from '@/src/components/forms/EmailCaptureForm';
import { 
  isMobile, 
  isTablet, 
  isDesktop, 
  isTouchDevice,
  getCurrentBreakpoint,
  MIN_TOUCH_TARGET_SIZE,
  getResponsiveGrid,
  getResponsiveTextSize,
  getResponsivePadding
} from '@/src/lib/mobile-utils';

export default function MobileTestPage() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouchDevice: false,
    breakpoint: 'xs' as ReturnType<typeof getCurrentBreakpoint>,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setDeviceInfo({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
        isTouchDevice: isTouchDevice(),
        breakpoint: getCurrentBreakpoint(),
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`font-heading font-bold mb-8 ${getResponsiveTextSize('xl')}`}>
          Mobile Responsiveness Test Page
        </h1>

        {/* Device Information */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Device Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Viewport:</strong> {viewport.width}px × {viewport.height}px</p>
              <p><strong>Breakpoint:</strong> {deviceInfo.breakpoint}</p>
              <p><strong>Device Type:</strong> {
                deviceInfo.isMobile ? 'Mobile' : 
                deviceInfo.isTablet ? 'Tablet' : 
                deviceInfo.isDesktop ? 'Desktop' : 'Unknown'
              }</p>
              <p><strong>Touch Device:</strong> {deviceInfo.isTouchDevice ? 'Yes' : 'No'}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Min Touch Target:</strong> {MIN_TOUCH_TARGET_SIZE}px</p>
              <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Touch Target Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Touch Target Size Testing</h2>
          <p className="text-neutral-600 mb-4">
            All interactive elements should be at least {MIN_TOUCH_TARGET_SIZE}px × {MIN_TOUCH_TARGET_SIZE}px
          </p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Standard Buttons (44px+ height):</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small Button</Button>
                <Button variant="primary" size="md">Medium Button</Button>
                <Button variant="primary" size="lg">Large Button</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Icon Buttons (44px+ touch area):</p>
              <div className="flex flex-wrap gap-3">
                <button 
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-bitcoin-500 text-white rounded-lg hover:bg-bitcoin-600 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button 
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  aria-label="Menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                  aria-label="Favorite"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Links with adequate spacing:</p>
              <nav className="flex flex-wrap gap-4">
                <a href="#" className="min-h-[44px] flex items-center text-bitcoin-500 hover:text-bitcoin-600 font-medium">
                  Home
                </a>
                <a href="#" className="min-h-[44px] flex items-center text-bitcoin-500 hover:text-bitcoin-600 font-medium">
                  About
                </a>
                <a href="#" className="min-h-[44px] flex items-center text-bitcoin-500 hover:text-bitcoin-600 font-medium">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </section>

        {/* Typography Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Responsive Typography</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Heading XL (scales down on mobile)</p>
              <h1 className={getResponsiveTextSize('xl')}>
                Extra Large Heading
              </h1>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">Heading LG</p>
              <h2 className={getResponsiveTextSize('lg')}>
                Large Heading
              </h2>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">Body MD</p>
              <p className={getResponsiveTextSize('md')}>
                This is medium body text that adjusts size based on screen width.
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">Body SM</p>
              <p className={getResponsiveTextSize('sm')}>
                This is small body text that remains readable on all devices.
              </p>
            </div>
          </div>
        </section>

        {/* Form Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Mobile-Friendly Forms</h2>
          <form className="space-y-4 max-w-md">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Smith"
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
            />
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 text-base border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent"
                placeholder="Your message here..."
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Submit Form
            </Button>
          </form>
        </section>

        {/* Grid Layout Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Responsive Grid Layouts</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">2-Column Grid (1 col on mobile, 2 on tablet+)</p>
              <div className={`grid ${getResponsiveGrid(2)} gap-4`}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-bitcoin-50 border border-bitcoin-200 rounded-lg p-4 text-center">
                    Item {i}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">3-Column Grid (1 col mobile, 2 tablet, 3 desktop)</p>
              <div className={`grid ${getResponsiveGrid(3)} gap-4`}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-trust/10 border border-trust/20 rounded-lg p-4 text-center">
                    Item {i}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">4-Column Grid (1 mobile, 2 tablet, 3 desktop, 4 xl)</p>
              <div className={`grid ${getResponsiveGrid(4)} gap-4`}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
                    Item {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modal Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Modal on Mobile</h2>
          <p className="text-neutral-600 mb-4">
            Modals should be full-width on mobile and prevent body scroll
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Test Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Mobile-Friendly Modal"
            size="md"
          >
            <div className="space-y-4">
              <p>This modal adapts to mobile screens and prevents background scrolling.</p>
              <EmailCaptureForm
                variant="inline"
                title="Subscribe to Newsletter"
                description="Get updates delivered to your inbox"
              />
            </div>
          </Modal>
        </section>

        {/* Video Player Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Responsive Video Player</h2>
          <p className="text-neutral-600 mb-4">
            Video players should maintain aspect ratio and work on mobile
          </p>
          <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Spacing Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Responsive Spacing</h2>
          <div className="space-y-4">
            <div className={`bg-bitcoin-50 rounded-lg ${getResponsivePadding('sm')}`}>
              <p className="font-medium">Small Padding</p>
              <p className="text-sm text-neutral-600">Adjusts from mobile to desktop</p>
            </div>
            <div className={`bg-trust/10 rounded-lg ${getResponsivePadding('md')}`}>
              <p className="font-medium">Medium Padding</p>
              <p className="text-sm text-neutral-600">Adjusts from mobile to desktop</p>
            </div>
            <div className={`bg-success/10 rounded-lg ${getResponsivePadding('lg')}`}>
              <p className="font-medium">Large Padding</p>
              <p className="text-sm text-neutral-600">Adjusts from mobile to desktop</p>
            </div>
          </div>
        </section>

        {/* Navigation Testing */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Mobile Navigation Patterns</h2>
          <p className="text-neutral-600 mb-4">
            The header uses a hamburger menu on mobile. Test it by resizing your browser or viewing on a mobile device.
          </p>
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-sm">
              <strong>Mobile (&lt;768px):</strong> Hamburger menu with slide-out drawer
            </p>
            <p className="text-sm mt-2">
              <strong>Desktop (≥768px):</strong> Horizontal navigation with dropdowns
            </p>
          </div>
        </section>

        {/* Accessibility Notes */}
        <section className="bg-bitcoin-50 border border-bitcoin-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Mobile Accessibility Checklist</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Touch targets are at least 44×44px</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Text is readable without zooming (minimum 16px base)</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Forms have appropriate input types for mobile keyboards</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Modals prevent body scroll on mobile</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Navigation is accessible via hamburger menu on mobile</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Videos maintain aspect ratio and are responsive</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Grid layouts adapt to screen size</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Typography scales appropriately</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
