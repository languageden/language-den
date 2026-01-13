import { createClient } from '@supabase/supabase-js';
import { authStorage } from './auth-storage';

// Validate environment variables
const supabaseUrl = process.env['EXPO_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_URL environment variable. ' +
      'Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_URL is set.'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_ANON_KEY environment variable. ' +
      'Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_ANON_KEY is set.'
  );
}

// Initialize Supabase client with auth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use secure storage for auth tokens (encrypted on native platforms)
    storage: authStorage,
    // Automatically refresh the session when expired
    autoRefreshToken: true,
    // Persist session to storage (enables auto-login)
    persistSession: true,
    // Don't detect session in URL (not needed for mobile apps)
    detectSessionInUrl: false,
  },
});
