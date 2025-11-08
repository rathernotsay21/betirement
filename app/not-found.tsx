import Link from 'next/link';
import { Button } from '@/components/ui/Button';

/**
 * Custom 404 Not Found page
 * Displayed when a user navigates to a non-existent route
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-bitcoin-50 mb-6">
            <svg
              className="w-16 h-16 text-bitcoin-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
            Looks like this page took an early retirement. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Return Home
            </Button>
          </Link>
          <Link href="/content/videos">
            <Button variant="outline" size="lg">
              Browse Videos
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 mb-4">
            Looking for something specific? Try these popular pages:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/about"
              className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
            >
              About
            </Link>
            <Link
              href="/content/blog"
              className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
            >
              Blog
            </Link>
            <Link
              href="/content/resources"
              className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
            >
              Resources
            </Link>
            <Link
              href="/start-here"
              className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
            >
              Start Here
            </Link>
            <Link
              href="/community"
              className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
            >
              Community
            </Link>
            <Link
              href="/contact"
              className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
