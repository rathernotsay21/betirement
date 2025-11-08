/**
 * Form validation utilities with comprehensive error messages
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Email validation with detailed error messages
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email address is required',
    };
  }

  const trimmedEmail = email.trim();

  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  // Check for common typos
  const commonDomainTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
  };

  const domain = trimmedEmail.split('@')[1];
  if (domain && commonDomainTypos[domain.toLowerCase()]) {
    return {
      isValid: false,
      error: `Did you mean ${trimmedEmail.split('@')[0]}@${commonDomainTypos[domain.toLowerCase()]}?`,
    };
  }

  // Check length
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: 'Email address is too long',
    };
  }

  return { isValid: true };
}

/**
 * Name validation
 */
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: `${fieldName} must be at least 2 characters`,
    };
  }

  if (trimmedName.length > 100) {
    return {
      isValid: false,
      error: `${fieldName} must be less than 100 characters`,
    };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`,
    };
  }

  return { isValid: true };
}

/**
 * Phone number validation
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return {
      isValid: false,
      error: 'Phone number is required',
    };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length < 10) {
    return {
      isValid: false,
      error: 'Phone number must be at least 10 digits',
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      error: 'Phone number is too long',
    };
  }

  return { isValid: true };
}

/**
 * Message/textarea validation
 */
export function validateMessage(
  message: string,
  minLength: number = 10,
  maxLength: number = 5000
): ValidationResult {
  if (!message || message.trim() === '') {
    return {
      isValid: false,
      error: 'Message is required',
    };
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters`,
    };
  }

  if (trimmedMessage.length > maxLength) {
    return {
      isValid: false,
      error: `Message must be less than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * URL validation
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return {
      isValid: false,
      error: 'URL is required',
    };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL (e.g., https://example.com)',
    };
  }
}

/**
 * Required field validation
 */
export function validateRequired(value: string, fieldName: string = 'This field'): ValidationResult {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }

  return { isValid: true };
}

/**
 * Validate multiple fields at once
 */
export interface FieldValidation {
  value: string;
  validator: (value: string) => ValidationResult;
  fieldName: string;
}

export function validateFields(fields: FieldValidation[]): Record<string, string> {
  const errors: Record<string, string> = {};

  fields.forEach(({ value, validator, fieldName }) => {
    const result = validator(value);
    if (!result.isValid && result.error) {
      errors[fieldName] = result.error;
    }
  });

  return errors;
}

/**
 * Sanitize user input to prevent XSS (basic version)
 * For comprehensive sanitization, use functions from @/lib/sanitization
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
}

/**
 * Check if honeypot field is filled (indicates bot)
 */
export function isHoneypotFilled(honeypotValue: string): boolean {
  return honeypotValue !== undefined && honeypotValue !== null && honeypotValue.trim() !== '';
}

/**
 * Validate form data object
 */
export interface FormValidationRule {
  field: string;
  validator: (value: any) => ValidationResult;
  required?: boolean;
}

export function validateForm(
  data: Record<string, any>,
  rules: FormValidationRule[]
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  rules.forEach(({ field, validator, required = true }) => {
    const value = data[field];

    // Check if required field is missing
    if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      return;
    }

    // Skip validation if field is optional and empty
    if (!required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return;
    }

    // Run validator
    const result = validator(value);
    if (!result.isValid && result.error) {
      errors[field] = result.error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
