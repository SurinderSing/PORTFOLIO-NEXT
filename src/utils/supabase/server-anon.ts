import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Creates an anonymous (cookieless) Supabase client for server-side use.
 *
 * Use this client for **public, read-only** queries (portfolio data) that do
 * NOT require user authentication. Because it never calls `cookies()` from
 * `next/headers`, pages using this client can be statically generated at
 * build time and revalidated via ISR — resulting in faster page loads served
 * directly from the CDN edge.
 *
 * For authenticated operations (admin mutations, session checks), continue
 * using the cookie-based client from `@/utils/supabase/server`.
 */
export function createAnonClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
