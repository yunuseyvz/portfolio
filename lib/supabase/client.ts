/**
 * Supabase client configuration for portfolio project
 * 
 * Provides client instances for both public (anonymous) and service role access
 * to the self-hosted Supabase instance.
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase connection
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing SUPABASE_ANON_KEY environment variable');
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

/**
 * Public Supabase client using anonymous key
 * Use this for public-facing operations and read-only access
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service role Supabase client with admin privileges
 * Use this for server-side operations that require full database access
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});