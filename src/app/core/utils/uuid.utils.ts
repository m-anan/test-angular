/**
 * UUID Generation Utilities
 * Provides UUID generation with fallback for older browsers
 */

/**
 * Generates a UUID v4
 * Uses crypto.randomUUID() if available, falls back to polyfill
 */
export function generateUUID(): string {
  // Check if native crypto.randomUUID is available
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback implementation for older browsers
  return uuidv4Fallback();
}

/**
 * Fallback UUID v4 generator
 * Based on RFC 4122 specification
 */
function uuidv4Fallback(): string {
  // Use crypto.getRandomValues if available
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    return cryptoUuidV4();
  }

  // Last resort: Math.random() based UUID (not cryptographically secure)
  return mathRandomUuidV4();
}

/**
 * Generates UUID v4 using crypto.getRandomValues
 */
function cryptoUuidV4(): string {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => {
    const num = parseInt(c);
    return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
  });
}

/**
 * Generates UUID v4 using Math.random()
 * WARNING: Not cryptographically secure - use only as last resort
 */
function mathRandomUuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Validates if a string is a valid UUID v4
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Generates a short unique ID (not UUID standard)
 * Useful for temporary IDs where full UUID length is not needed
 */
export function generateShortId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    // Fallback to Math.random
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return result;
}
