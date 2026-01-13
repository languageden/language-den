/**
 * Helper functions for Supabase Auth operations.
 * These utilities provide a clean API for authentication without coupling to UI.
 */

import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';
import type {
  SignUpCredentials,
  SignInCredentials,
  AuthError,
} from './auth-types';

/**
 * Sign up a new user with email and password.
 *
 * @param credentials - Sign up credentials (email, password, optional metadata)
 * @returns Success status and any error
 *
 * @example
 * const { success, error } = await signUp({
 *   email: 'user@example.com',
 *   password: 'securePassword123',
 *   metadata: { name: 'John Doe' }
 * });
 */
export async function signUp(
  credentials: SignUpCredentials
): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: credentials.metadata,
      },
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, originalError: error },
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred during sign up',
        originalError: error instanceof Error ? error : undefined,
      },
    };
  }
}

/**
 * Sign in an existing user with email and password.
 *
 * @param credentials - Sign in credentials (email, password)
 * @returns Success status and any error
 *
 * @example
 * const { success, error } = await signIn({
 *   email: 'user@example.com',
 *   password: 'securePassword123'
 * });
 */
export async function signIn(
  credentials: SignInCredentials
): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, originalError: error },
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred during sign in',
        originalError: error instanceof Error ? error : undefined,
      },
    };
  }
}

/**
 * Sign out the current user.
 *
 * @returns Success status and any error
 *
 * @example
 * const { success, error } = await signOut();
 */
export async function signOut(): Promise<{
  success: boolean;
  error?: AuthError;
}> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: { message: error.message, originalError: error },
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred during sign out',
        originalError: error instanceof Error ? error : undefined,
      },
    };
  }
}

/**
 * Get the current user session.
 *
 * @returns The current session or null if not authenticated
 *
 * @example
 * const session = await getCurrentSession();
 * if (session) {
 *   console.log('User is authenticated:', session.user.email);
 * }
 */
export async function getCurrentSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Get the current user.
 *
 * @returns The current user or null if not authenticated
 *
 * @example
 * const user = await getCurrentUser();
 * if (user) {
 *   console.log('Logged in as:', user.email);
 * }
 */
export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
