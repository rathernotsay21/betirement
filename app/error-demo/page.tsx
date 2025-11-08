'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ValidatedForm } from '@/components/forms/ValidatedForm';
import { validateEmail, validateName, validateMessage } from '@/lib/validation';

/**
 * Demo page showcasing error handling features
 * This page demonstrates various error scenarios and recovery mechanisms
 */

// Component that throws an error
function ErrorThrowingComponent(): never {
  throw new Error('This is a test error from ErrorThrowingComponent');
}

// Component that throws an error on button click
function ConditionalErrorComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('User triggered error');
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-neutral-200">
      <h3 className="text-lg font-bold mb-3">Conditional Error Component</h3>
      <p className="text-neutral-600 mb-4">
        This component will throw an error when you click the button.
      </p>
      <Button variant="primary" onClick={() => setShouldError(true)}>
        Trigger Error
      </Button>
    </div>
  );
}

export default function ErrorDemoPage() {
  const [showErrorComponent, setShowErrorComponent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const testApiError = async (errorType: string) => {
    setApiLoading(true);
    setApiError(null);

    try {
      const response = await fetch(`/api/videos?maxResults=${errorType}`);
      const data = await response.json();

      if (!response.ok) {
        setApiError(`${response.status}: ${data.error}`);
      } else {
        setApiError('Success! No error occurred.');
      }
    } catch (error) {
      setApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Error Handling Demo
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            This page demonstrates the comprehensive error handling system including error boundaries,
            API error handling, and form validation.
          </p>
        </div>

        {/* Demo Sections */}
        <div className="space-y-8">
          {/* Error Boundary Demo */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">1. Error Boundary Demo</h2>
            <p className="text-neutral-600 mb-6">
              Error boundaries catch JavaScript errors in component trees and display fallback UI.
            </p>

            <div className="space-y-6">
              {/* Immediate Error */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Immediate Error (caught by boundary)</h3>
                <ErrorBoundary>
                  {showErrorComponent ? (
                    <ErrorThrowingComponent />
                  ) : (
                    <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                      <p className="text-neutral-600 mb-4">
                        Click the button to render a component that throws an error.
                      </p>
                      <Button variant="primary" onClick={() => setShowErrorComponent(true)}>
                        Show Error Component
                      </Button>
                    </div>
                  )}
                </ErrorBoundary>
              </div>

              {/* Conditional Error */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Conditional Error (caught by boundary)</h3>
                <ErrorBoundary>
                  <ConditionalErrorComponent />
                </ErrorBoundary>
              </div>
            </div>
          </section>

          {/* API Error Handling Demo */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">2. API Error Handling Demo</h2>
            <p className="text-neutral-600 mb-6">
              API routes use consistent error handling with proper HTTP status codes.
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => testApiError('invalid')}
                  disabled={apiLoading}
                >
                  Test 400 (Bad Request)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => testApiError('999')}
                  disabled={apiLoading}
                >
                  Test 400 (Out of Range)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => testApiError('10')}
                  disabled={apiLoading}
                >
                  Test Success
                </Button>
              </div>

              {apiLoading && (
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-neutral-600">Loading...</p>
                </div>
              )}

              {apiError && (
                <div
                  className={`p-4 rounded-lg ${
                    apiError.includes('Success')
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <p className="font-mono text-sm">{apiError}</p>
                </div>
              )}
            </div>
          </section>

          {/* Form Validation Demo */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">3. Form Validation Demo</h2>
            <p className="text-neutral-600 mb-6">
              Forms include comprehensive validation with detailed error messages.
            </p>

            <div className="max-w-2xl">
              <ValidatedForm
                fields={[
                  {
                    name: 'name',
                    label: 'Full Name',
                    type: 'text',
                    placeholder: 'John Doe',
                    required: true,
                    validator: (value) => validateName(value, 'Full Name'),
                  },
                  {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'john@example.com',
                    required: true,
                    validator: validateEmail,
                  },
                  {
                    name: 'message',
                    label: 'Message',
                    type: 'textarea',
                    placeholder: 'Tell us what you think...',
                    rows: 4,
                    required: true,
                    validator: validateMessage,
                  },
                ]}
                onSubmit={async (data) => {
                  // Simulate API call
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  console.log('Form submitted:', data);
                }}
                submitButtonText="Submit Demo Form"
                successMessage="Form validation successful! (This is just a demo)"
              />
            </div>
          </section>

          {/* Error Pages Demo */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">4. Error Pages Demo</h2>
            <p className="text-neutral-600 mb-6">
              Custom error pages provide user-friendly error experiences.
            </p>

            <div className="space-y-4">
              <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-semibold mb-2">404 Not Found Page</h3>
                <p className="text-neutral-600 mb-4">
                  Navigate to a non-existent route to see the custom 404 page.
                </p>
                <a
                  href="/this-page-does-not-exist"
                  className="text-bitcoin-600 hover:text-bitcoin-700 underline"
                >
                  Visit Non-Existent Page
                </a>
              </div>

              <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-semibold mb-2">Error Recovery</h3>
                <p className="text-neutral-600 mb-4">
                  Error boundaries provide "Try Again" functionality to recover from errors.
                </p>
                <p className="text-sm text-neutral-500">
                  See the error boundary demos above for examples.
                </p>
              </div>
            </div>
          </section>

          {/* Documentation */}
          <section className="bg-bitcoin-50 rounded-xl border border-bitcoin-200 p-8">
            <h2 className="text-2xl font-bold mb-4">📚 Documentation</h2>
            <p className="text-neutral-700 mb-4">
              For complete documentation on the error handling system, see:
            </p>
            <code className="block bg-white p-3 rounded border border-bitcoin-300 text-sm">
              src/lib/ERROR_HANDLING_GUIDE.md
            </code>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a href="/">
            <Button variant="outline" size="lg">
              ← Back to Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
