'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/src/config/navigation';
import { Button } from '@/src/components/ui';
import { BitcoinPriceTickerCompact } from '@/src/components/ui/BitcoinPriceTicker';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Dropdown management with delay
  const handleMouseEnterDropdown = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Small delay to allow moving to submenu
  };

  const cancelDropdownClose = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  // Check if a path is active
  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, hasChildren: boolean, label?: string) => {
    if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpenDropdown(openDropdown === label ? null : label!);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 shadow-lg backdrop-blur-md'
          : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-heading font-bold text-bitcoin-500 hover:text-bitcoin-400 transition-colors">
                Betirement
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Bitcoin Price Ticker */}
            <div className="mr-4">
              <BitcoinPriceTickerCompact />
            </div>

            {mainNavigation.map((item: typeof mainNavigation[0]) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnterDropdown(item.label)}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <button
                      className={`py-2 text-white/90 hover:text-bitcoin-400 font-medium transition-colors duration-200 flex items-center space-x-1 ${
                        item.children.some(child => isActivePath(child.href)) ? 'text-bitcoin-400' : ''
                      }`}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onKeyDown={(e) => handleKeyDown(e, true, item.label)}
                      tabIndex={0}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Invisible bridge to prevent hover loss */}
                    <div
                      className={`absolute top-full left-0 right-0 h-2 ${
                        openDropdown === item.label ? 'block' : 'hidden'
                      }`}
                      onMouseEnter={cancelDropdownClose}
                    />

                    {/* Dropdown menu with animation */}
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                        openDropdown === item.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-1 pointer-events-none'
                      }`}
                      onMouseEnter={cancelDropdownClose}
                      onMouseLeave={handleMouseLeaveDropdown}
                    >
                      <div className="w-56 bg-white rounded-lg shadow-xl py-2 border border-neutral-200">
                        {item.children.map((child: typeof item.children[0]) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm text-neutral-900 hover:bg-bitcoin-50 hover:text-bitcoin-600 transition-colors duration-150 ${
                              isActivePath(child.href) ? 'bg-bitcoin-50 text-bitcoin-600 font-semibold' : ''
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`py-2 text-white/90 hover:text-bitcoin-400 font-medium transition-colors duration-200 ${
                      isActivePath(item.href) ? 'text-bitcoin-400' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" href="/start-here">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-bitcoin-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
              <span className="text-xl font-heading font-bold text-bitcoin-500">
                Betirement
              </span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-neutral-900 hover:bg-neutral-100"
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {mainNavigation.map((item: typeof mainNavigation[0]) => (
                <div key={item.href}>
                  {item.children ? (
                    <div>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 text-left text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-150 ${
                          item.children.some(child => isActivePath(child.href)) ? 'bg-bitcoin-50 text-bitcoin-600' : ''
                        }`}
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        aria-expanded={openDropdown === item.label}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          openDropdown === item.label ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="ml-4 mt-1 space-y-0.5 pb-2">
                          {item.children.map((child: typeof item.children[0]) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-bitcoin-600 rounded-lg transition-colors duration-150 ${
                                isActivePath(child.href) ? 'bg-bitcoin-50 text-bitcoin-600 font-semibold' : ''
                              }`}
                              onClick={closeMobileMenu}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-150 ${
                        isActivePath(item.href) ? 'bg-bitcoin-50 text-bitcoin-600' : ''
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <Button
                  variant="primary"
                  href="/start-here"
                  className="w-full justify-center"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
