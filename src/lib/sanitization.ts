/**
 * Input Sanitization Utilities
 * 
 * Provides functions to sanitize user input and prevent XSS, SQL injection, and other attacks
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/data:text\/html/gi, '') // Remove data URLs
    .trim();
}

/**
 * Sanitize string for safe display
 * Escapes HTML entities
 */
export function escapeHtml(input: string): string {
  if (!input) return '';
  
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char);
}

/**
 * Sanitize email address
 * Removes potentially dangerous characters while preserving valid email format
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w\s@.+-]/g, '') // Only allow word chars, @, ., +, -
    .substring(0, 254); // Max email length per RFC 5321
}

/**
 * Sanitize name (first name, last name, etc.)
 * Allows letters, spaces, hyphens, and apostrophes
 */
export function sanitizeName(name: string): string {
  if (!name) return '';
  
  return name
    .trim()
    .replace(/[^a-zA-Z\s'-]/g, '') // Only allow letters, spaces, hyphens, apostrophes
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
    .substring(0, 100); // Reasonable max length
}

/**
 * Sanitize phone number
 * Removes all non-digit characters except + for international format
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  return phone
    .trim()
    .replace(/[^\d+\s()-]/g, '') // Only allow digits, +, spaces, (), -
    .substring(0, 20); // Max reasonable phone length
}

/**
 * Sanitize URL
 * Ensures URL is safe and uses allowed protocols
 */
export function sanitizeUrl(url: string, allowedProtocols: string[] = ['http', 'https']): string {
  if (!url) return '';
  
  try {
    const parsedUrl = new URL(url.trim());
    
    // Check if protocol is allowed
    const protocol = parsedUrl.protocol.replace(':', '');
    if (!allowedProtocols.includes(protocol)) {
      return '';
    }
    
    return parsedUrl.toString();
  } catch {
    // Invalid URL
    return '';
  }
}

/**
 * Sanitize text content (messages, descriptions, etc.)
 * Removes dangerous content while preserving basic formatting
 */
export function sanitizeText(text: string, maxLength: number = 5000): string {
  if (!text) return '';
  
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, maxLength);
}

/**
 * Sanitize filename
 * Removes path traversal attempts and dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return '';
  
  return filename
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace special chars with underscore
    .replace(/\.{2,}/g, '.') // Remove path traversal attempts (..)
    .replace(/^\.+/, '') // Remove leading dots
    .substring(0, 255); // Max filename length
}

/**
 * Sanitize slug (for URLs)
 * Creates URL-safe slugs
 */
export function sanitizeSlug(slug: string): string {
  if (!slug) return '';
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 200); // Reasonable max length for slugs
}

/**
 * Sanitize JSON input
 * Safely parse JSON and sanitize string values
 */
export function sanitizeJsonInput(jsonString: string): any {
  try {
    const parsed = JSON.parse(jsonString);
    return sanitizeObject(parsed);
  } catch {
    return null;
  }
}

/**
 * Recursively sanitize object properties
 */
function sanitizeObject(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return sanitizeText(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Sanitize key to prevent prototype pollution
      const safeKey = key.replace(/^__|prototype|constructor/gi, '');
      if (safeKey) {
        sanitized[safeKey] = sanitizeObject(value);
      }
    }
    return sanitized;
  }
  
  return obj;
}

/**
 * Check for SQL injection patterns
 * Returns true if suspicious patterns are detected
 */
export function detectSqlInjection(input: string): boolean {
  if (!input) return false;
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(UNION\s+SELECT)/gi,
    /(--|\#|\/\*|\*\/)/g, // SQL comments
    /(\bOR\b\s+\d+\s*=\s*\d+)/gi, // OR 1=1
    /(\bAND\b\s+\d+\s*=\s*\d+)/gi, // AND 1=1
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Check for XSS patterns
 * Returns true if suspicious patterns are detected
 */
export function detectXss(input: string): boolean {
  if (!input) return false;
  
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<img[^>]+src[^>]*>/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Comprehensive input sanitization
 * Detects and sanitizes various types of malicious input
 */
export function sanitizeInput(input: string, type: 'text' | 'html' | 'email' | 'url' | 'name' = 'text'): string {
  if (!input) return '';
  
  // Check for malicious patterns
  if (detectSqlInjection(input) || detectXss(input)) {
    console.warn('Potentially malicious input detected and sanitized');
  }
  
  // Apply type-specific sanitization
  switch (type) {
    case 'html':
      return sanitizeHtml(input);
    case 'email':
      return sanitizeEmail(input);
    case 'url':
      return sanitizeUrl(input);
    case 'name':
      return sanitizeName(input);
    case 'text':
    default:
      return sanitizeText(input);
  }
}
