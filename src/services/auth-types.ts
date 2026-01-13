/**
 * Type definitions for Supabase Auth.
 * These types provide strong typing for authentication-related operations.
 */

import type { User, Session } from '@supabase/supabase-js';

/**
 * Auth state representing the current user and session.
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/**
 * Sign up credentials for email/password authentication.
 */
export interface SignUpCredentials {
  email: string;
  password: string;
  /** Optional user metadata (name, avatar, etc.) */
  metadata?: Record<string, unknown>;
}

/**
 * Sign in credentials for email/password authentication.
 */
export interface SignInCredentials {
  email: string;
  password: string;
}

/**
 * Auth error with user-friendly message.
 */
export interface AuthError {
  message: string;
  /** Original error from Supabase */
  originalError?: Error;
}
