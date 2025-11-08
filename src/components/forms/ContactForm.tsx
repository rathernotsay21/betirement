'use client';

import { useState, FormEvent } from 'react';
import { Button, Input } from '@/src/components/ui';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Spam protection
}

export interface ContactFormProps {
  type?: 'general' | 'support' | 'media';
  onSuccess?: () => void;
  className?: string;
}

/**
 * General contact form component with Netlify Forms integration
 * Includes honeypot spam protection and proper error handling
 */
export function ContactForm({ type = 'general', onSuccess, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formName = `contact-${type}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      console.log('Honeypot triggered - potential spam');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': formName,
          'contact-type': type,
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: '',
        });
        
        // Call success callback if provided
        onSuccess?.();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'Something went wrong. Please try again or email us directly at contact@betirement.com'
      );
      console.error('Form submission error:', error);
    }
  };

  // Success state
  if (status === 'success') {
    return (
      <div className={`bg-success/10 border border-success rounded-lg p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={`bg-white rounded-xl shadow-lg p-8 ${className}`}
    >
      {/* Netlify form detection - required for Netlify to recognize the form */}
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="contact-type" value={type} />

      {/* Honeypot field for spam protection - hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label>
          Don't fill this out if you're human:
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Error message display */}
      {status === 'error' && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
            Your Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            disabled={status === 'submitting'}
          />
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={status === 'submitting'}
          />
        </div>

        {/* Subject field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
            Subject *
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            disabled={status === 'submitting'}
          />
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us more about your inquiry..."
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent resize-none disabled:bg-neutral-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-8">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
        <p className="text-xs text-neutral-500 text-center mt-4">
          We typically respond within 24-48 hours.
        </p>
      </div>
    </form>
  );
}
