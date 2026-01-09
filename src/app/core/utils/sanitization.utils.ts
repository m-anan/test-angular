/**
 * Input Sanitization Utilities
 * Provides functions to sanitize user input and prevent XSS attacks
 */

/**
 * Sanitize HTML by removing potentially dangerous tags and attributes
 * This is a basic implementation - for production, consider using DOMPurify
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';

  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onload, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  return sanitized;
}

/**
 * Sanitize plain text by encoding HTML special characters
 * Use this for text that should not contain any HTML
 */
export function sanitizeText(input: string): string {
  if (!input) return '';

  const element = document.createElement('div');
  element.textContent = input;
  return element.innerHTML;
}

/**
 * Sanitize a string for use in a URL
 * Removes dangerous characters and protocols
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  // Remove whitespace
  let sanitized = url.trim();

  // Check for dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = sanitized.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return ''; // Return empty string for dangerous URLs
    }
  }

  return sanitized;
}

/**
 * Sanitize filename to prevent directory traversal attacks
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return '';

  // Remove directory traversal patterns
  let sanitized = filename.replace(/\.\./g, '');

  // Remove path separators
  sanitized = sanitized.replace(/[\/\\]/g, '');

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Limit to safe characters: alphanumeric, dash, underscore, dot
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');

  return sanitized;
}

/**
 * Validate and sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const trimmed = email.trim().toLowerCase();

  if (!emailRegex.test(trimmed)) {
    return '';
  }

  return trimmed;
}

/**
 * Sanitize number input - ensures it's a valid number
 */
export function sanitizeNumber(input: string | number, min?: number, max?: number): number | null {
  const num = typeof input === 'string' ? parseFloat(input) : input;

  if (isNaN(num)) {
    return null;
  }

  if (min !== undefined && num < min) {
    return min;
  }

  if (max !== undefined && num > max) {
    return max;
  }

  return num;
}

/**
 * Sanitize string length - truncates if too long
 */
export function sanitizeLength(input: string, maxLength: number): string {
  if (!input) return '';

  if (input.length > maxLength) {
    return input.substring(0, maxLength);
  }

  return input;
}

/**
 * Remove control characters from string
 */
export function removeControlCharacters(input: string): string {
  if (!input) return '';

  // Remove control characters (ASCII 0-31 except newline, tab, carriage return)
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Sanitize input for safe storage and display
 * Combines multiple sanitization strategies
 */
export function sanitizeInput(input: string, maxLength?: number): string {
  if (!input) return '';

  // Remove control characters
  let sanitized = removeControlCharacters(input);

  // Trim whitespace
  sanitized = sanitized.trim();

  // Encode HTML entities
  sanitized = sanitizeText(sanitized);

  // Apply length limit if specified
  if (maxLength) {
    sanitized = sanitizeLength(sanitized, maxLength);
  }

  return sanitized;
}
