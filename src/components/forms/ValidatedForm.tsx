'use client';

import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '@/components/ui/Button';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  validator?: (value: string) => { isValid: boolean; error?: string };
}

export interface ValidatedFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable form component with built-in validation and error handling
 * 
 * @example
 * <ValidatedForm
 *   fields={[
 *     { name: 'email', label: 'Email', type: 'email', required: true },
 *     { name: 'message', label: 'Message', type: 'textarea', required: true }
 *   ]}
 *   onSubmit={handleSubmit}
 *   submitButtonText="Send"
 * />
 */
export function ValidatedForm({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'Something went wrong. Please try again.',
  className = '',
  children,
}: ValidatedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [apiError, setApiError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      // Check required fields
      if (field.required && (!value || value.trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Run custom validator if provided
      if (field.validator && value) {
        const result = field.validator(value);
        if (!result.isValid && result.error) {
          newErrors[field.name] = result.error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      await onSubmit(formData);
      setStatus('success');
      
      // Reset form after success
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    } catch (error) {
      setStatus('error');
      setApiError(error instanceof Error ? error.message : errorMessage);
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
        <h3 className="text-2xl font-bold mb-2">Success!</h3>
        <p className="text-neutral-600 mb-6">{successMessage}</p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* API Error message */}
      {status === 'error' && apiError && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4"
          role="alert"
        >
          {apiError}
        </div>
      )}

      {/* Form fields */}
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-semibold text-neutral-700 mb-2"
          >
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              required={field.required}
              disabled={status === 'submitting'}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent resize-none disabled:bg-neutral-50 disabled:cursor-not-allowed ${
                errors[field.name] ? 'border-red-500' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              disabled={status === 'submitting'}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent disabled:bg-neutral-50 disabled:cursor-not-allowed ${
                errors[field.name] ? 'border-red-500' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={status === 'submitting'}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent disabled:bg-neutral-50 disabled:cursor-not-allowed ${
                errors[field.name] ? 'border-red-500' : 'border-neutral-300'
              }`}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
          )}

          {/* Field error message */}
          {errors[field.name] && (
            <p
              id={`${field.name}-error`}
              className="mt-2 text-sm text-red-600"
              role="alert"
            >
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* Custom children (e.g., additional fields or content) */}
      {children}

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full"
      >
        {status === 'submitting' ? 'Submitting...' : submitButtonText}
      </Button>
    </form>
  );
}
