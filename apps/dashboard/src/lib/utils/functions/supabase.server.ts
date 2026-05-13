import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { config } from '$lib/config';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export let supabase: SupabaseClient;

/**
 * Should only be called on server files
 *
 * @returns supabase
 */
export const getServerSupabase = () => {
  if (supabase) return supabase;

  const serviceRoleKey = env.PRIVATE_SUPABASE_SERVICE_ROLE || '';

  if (!serviceRoleKey) {
    throw new Error('Missing Supabase server config: PRIVATE_SUPABASE_SERVICE_ROLE is required.');
  }

  if (!dev && serviceRoleKey === 'some-key-here') {
    throw new Error('Invalid production Supabase config: PRIVATE_SUPABASE_SERVICE_ROLE is still using the placeholder value.');
  }

  supabase = createClient(
    config.supabaseConfig.url,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  );

  return supabase;
};
