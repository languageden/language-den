/**
 * Secure storage adapter for Supabase Auth using expo-secure-store.
 * This provides encrypted storage for authentication tokens on iOS and Android.
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Custom storage adapter for Supabase Auth that uses expo-secure-store
 * for secure, encrypted token storage on native platforms.
 *
 * On web, falls back to localStorage (Supabase default behavior).
 */
export const authStorage = {
  /**
   * Get an item from secure storage.
   * @param key - Storage key
   * @returns The stored value or null if not found
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      // On web, use localStorage as fallback
      return localStorage.getItem(key);
    }
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error getting item from secure storage:', error);
      return null;
    }
  },

  /**
   * Set an item in secure storage.
   * @param key - Storage key
   * @param value - Value to store
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      // On web, use localStorage as fallback
      localStorage.setItem(key, value);
      return;
    }
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting item in secure storage:', error);
    }
  },

  /**
   * Remove an item from secure storage.
   * @param key - Storage key
   */
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      // On web, use localStorage as fallback
      localStorage.removeItem(key);
      return;
    }
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing item from secure storage:', error);
    }
  },
};
