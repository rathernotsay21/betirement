/**
 * Safe storage utility for handling localStorage/sessionStorage
 * Handles Safari private browsing, disabled storage, and SSR gracefully
 */

type StorageType = 'local' | 'session';

/**
 * Safely get an item from storage
 * Returns null if storage is unavailable or access fails
 */
export function safeGetItem(key: string, type: StorageType = 'local'): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    return storage.getItem(key);
  } catch (error) {
    // Safari throws SecurityError in private browsing mode
    // Other browsers may throw QuotaExceededError or other errors
    console.warn(`Failed to access ${type}Storage:`, error);
    return null;
  }
}

/**
 * Safely set an item in storage
 * Returns true if successful, false if storage is unavailable or access fails
 */
export function safeSetItem(key: string, value: string, type: StorageType = 'local'): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.setItem(key, value);
    return true;
  } catch (error) {
    // Safari throws SecurityError in private browsing mode
    // Other browsers may throw QuotaExceededError or other errors
    console.warn(`Failed to write to ${type}Storage:`, error);
    return false;
  }
}

/**
 * Safely remove an item from storage
 * Returns true if successful, false if storage is unavailable or access fails
 */
export function safeRemoveItem(key: string, type: StorageType = 'local'): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from ${type}Storage:`, error);
    return false;
  }
}

/**
 * Check if storage is available
 */
export function isStorageAvailable(type: StorageType = 'local'): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get item and parse as JSON
 * Returns null if storage is unavailable, access fails, or JSON parsing fails
 */
export function safeGetJSON<T>(key: string, type: StorageType = 'local'): T | null {
  const value = safeGetItem(key, type);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn(`Failed to parse JSON from ${type}Storage:`, error);
    return null;
  }
}

/**
 * Stringify and set item as JSON
 * Returns true if successful, false otherwise
 */
export function safeSetJSON<T>(key: string, value: T, type: StorageType = 'local'): boolean {
  try {
    const stringified = JSON.stringify(value);
    return safeSetItem(key, stringified, type);
  } catch (error) {
    console.warn(`Failed to stringify JSON for ${type}Storage:`, error);
    return false;
  }
}
