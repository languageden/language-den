/**
 * Hello World Edge Function
 *
 * A simple Supabase Edge Function demonstrating the basic structure.
 * This function returns a JSON response with a greeting message.
 *
 * @example
 * // Local testing:
 * supabase functions serve hello
 *
 * @example
 * // Deploy to Supabase:
 * supabase functions deploy hello --project-ref your-project-id
 *
 * @example
 * // Invoke the function:
 * curl -i --location --request POST 'https://your-project-id.supabase.co/functions/v1/hello' \
 *   --header 'Authorization: Bearer YOUR_ANON_KEY' \
 *   --header 'Content-Type: application/json'
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  return new Response(JSON.stringify({ message: 'Hello from Language Den!' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
});
