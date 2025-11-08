'use client';

import { useState, FormEvent } from 'react';
import { Button, Input } from '@/src/components/ui';

interface FormData {
  name: string;
  email: string;
  organization: string;
  eventType: string;
  eventDate: string;
  audience: string;
  topic: string;
  budget: string;
  details: string;
  honeypot: string; // Spam protection
}

export function BookingRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    eventType: '',
    eventDate: '',
    audience: '',
    topic: '',
    budget: '',
    details: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'booking-request',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          organization: '',
          eventType: '',
          eventDate: '',
          audience: '',
          topic: '',
          budget: '',
          details: '',
          honeypot: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
      console.error('Form submission error:', error);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-success/10 border border-success rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for your interest. We'll review your request and get back to you within 48 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus('idle')}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      name="booking-request"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value="booking-request" />

      {/* Honeypot field for spam protection */}
      <div className="hidden">
        <label>
          Don't fill this out if you're human:
          <input
            name="bot-field"
            value={formData.honeypot}
            onChange={handleChange}
          />
        </label>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
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
          />
        </div>

        {/* Email */}
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
          />
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-sm font-semibold text-neutral-700 mb-2">
            Organization *
          </label>
          <Input
            id="organization"
            name="organization"
            type="text"
            required
            value={formData.organization}
            onChange={handleChange}
            placeholder="Company or Event Name"
          />
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-semibold text-neutral-700 mb-2">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent"
          >
            <option value="">Select event type</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="podcast">Podcast Interview</option>
            <option value="webinar">Webinar</option>
            <option value="corporate">Corporate Event</option>
            <option value="media">Media Interview</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Event Date */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-semibold text-neutral-700 mb-2">
            Event Date *
          </label>
          <Input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>

        {/* Expected Audience */}
        <div>
          <label htmlFor="audience" className="block text-sm font-semibold text-neutral-700 mb-2">
            Expected Audience Size *
          </label>
          <select
            id="audience"
            name="audience"
            required
            value={formData.audience}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent"
          >
            <option value="">Select audience size</option>
            <option value="1-50">1-50 people</option>
            <option value="51-100">51-100 people</option>
            <option value="101-250">101-250 people</option>
            <option value="251-500">251-500 people</option>
            <option value="500+">500+ people</option>
            <option value="virtual">Virtual/Online</option>
          </select>
        </div>

        {/* Preferred Topic */}
        <div className="md:col-span-2">
          <label htmlFor="topic" className="block text-sm font-semibold text-neutral-700 mb-2">
            Preferred Topic or Theme
          </label>
          <Input
            id="topic"
            name="topic"
            type="text"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g., Bitcoin-Powered Early Retirement"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Leave blank if you'd like recommendations based on your audience
          </p>
        </div>

        {/* Budget Range */}
        <div className="md:col-span-2">
          <label htmlFor="budget" className="block text-sm font-semibold text-neutral-700 mb-2">
            Budget Range (Optional)
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent"
          >
            <option value="">Prefer not to say</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-2.5k">$1,000 - $2,500</option>
            <option value="2.5k-5k">$2,500 - $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k+">$10,000+</option>
          </select>
        </div>

        {/* Additional Details */}
        <div className="md:col-span-2">
          <label htmlFor="details" className="block text-sm font-semibold text-neutral-700 mb-2">
            Additional Details *
          </label>
          <textarea
            id="details"
            name="details"
            required
            value={formData.details}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us more about your event, audience, goals, and any specific requirements..."
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Booking Request'}
        </Button>
        <p className="text-xs text-neutral-500 text-center mt-4">
          We typically respond within 48 hours. For urgent requests, please email{' '}
          <a href="mailto:speaking@betirement.com" className="text-bitcoin-500 hover:underline">
            speaking@betirement.com
          </a>
        </p>
      </div>
    </form>
  );
}
