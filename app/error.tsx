'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Custom error page for handling runtime errors
 * This is a client component that catches errors in the app
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);
    
    // TODO: In production, send to error monitoring service (e.g., Sentry)
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-100 mb-6">
            <svg
              className="w-16 h-16 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
          </p>
        </div>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-neutral-100 rounded-lg text-left overflow-auto max-h-48">
            <p className="text-sm font-mono text-red-600 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-neutral-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 mb-2">
            Still having issues?
          </p>
          <a
            href="/contact"
            className="text-sm text-bitcoin-600 hover:text-bitcoin-700 hover:underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
