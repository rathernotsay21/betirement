'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import { ConvertKitTag } from '@/lib/convertkit';
import { trackEmailSignup, trackFormSubmit } from '@/src/lib/analytics';
import { Check, X } from 'lucide-react';

export interface EmailCaptureFormProps {
  variant?: 'inline' | 'modal' | 'slide-in';
  leadMagnet?: string;
  tags?: ConvertKitTag[];
  source?: string;
  onSuccess?: () => void;
  className?: string;
  showName?: boolean;
  buttonText?: string;
  placeholder?: string;
  title?: string;
  description?: string;
}

/**
 * Email capture form component with multiple variants
 * Supports inline, modal, and slide-in presentations
 */
export function EmailCaptureForm({
  variant = 'inline',
  leadMagnet,
  tags = [],
  source,
  onSuccess,
  className,
  showName = false,
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  title,
  description,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: showName ? firstName : undefined,
          tags,
          source,
          website: '', // Honeypot field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setSuccess(true);
      setEmail('');
      setFirstName('');

      // Track successful email signup
      trackEmailSignup(
        source || variant || 'email-form',
        tags // tags are already strings (ConvertKitTag is a string literal type)
      );

      // Track form submission success
      trackFormSubmit('email-capture', source || variant || 'unknown', true);

      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      
      // Track form submission failure
      trackFormSubmit('email-capture', source || variant || 'unknown', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {title && (
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      )}

      {description && (
        <p className="text-gray-600">{description}</p>
      )}

      {leadMagnet && (
        <div className="bg-bitcoin-50 border border-bitcoin-200 rounded-lg p-4">
          <p className="text-sm font-medium text-bitcoin-700">
            🎁 Free Download: {leadMagnet}
          </p>
        </div>
      )}

      {showName && (
        <div>
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isSubmitting || success}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || success}
          error={error || undefined}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-success font-medium flex items-center gap-2" role="status">
          <Check className="w-4 h-4" />
          Successfully subscribed! Check your email for confirmation.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting || success}
        loading={isSubmitting}
      >
        {success ? 'Subscribed!' : buttonText}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );

  if (variant === 'inline') {
    return formContent;
  }

  // Modal and slide-in variants will be handled by parent components
  return formContent;
}

/**
 * Modal variant wrapper
 */
export function EmailCaptureModal({
  isOpen,
  onClose,
  ...props
}: EmailCaptureFormProps & { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={props.title || 'Subscribe to Our Newsletter'}>
      <EmailCaptureForm
        {...props}
        variant="modal"
        onSuccess={() => {
          props.onSuccess?.();
          setTimeout(onClose, 2000);
        }}
      />
    </Modal>
  );
}

/**
 * Slide-in variant
 */
export function EmailCaptureSlideIn({
  isVisible,
  onClose,
  ...props
}: EmailCaptureFormProps & { isVisible: boolean; onClose: () => void }) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 sm:bottom-4 left-0 sm:left-auto right-0 sm:right-4 z-50',
        'w-full sm:max-w-md',
        'bg-white rounded-t-lg sm:rounded-lg shadow-2xl border border-gray-200',
        'transform transition-all duration-300 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      )}
    >
      <div className="relative p-4 sm:p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <EmailCaptureForm
          {...props}
          variant="slide-in"
          onSuccess={() => {
            props.onSuccess?.();
            setTimeout(onClose, 2000);
          }}
        />
      </div>
    </div>
  );
}
