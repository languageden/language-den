import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
