'use client';

import { useEffect } from 'react';

/**
 * Global error boundary that catches errors in the root layout
 * This is a last resort error handler
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 2rem',
              borderRadius: '50%',
              backgroundColor: '#fee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#111',
            }}>
              Critical Error
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#666',
              marginBottom: '2rem',
            }}>
              We're sorry, but something went critically wrong. Please try refreshing the page.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: '#F7931A',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#333',
                  backgroundColor: 'white',
                  border: '2px solid #ddd',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
