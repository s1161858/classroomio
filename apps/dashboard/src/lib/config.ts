import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';
import type { ConfigType } from '$lib/utils/types/config';

const supabaseUrl = env.PUBLIC_SUPABASE_URL || (dev ? 'http://localhost:54321' : '');
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || (dev ? 'anon-key' : '');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase public config: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required.');
}

if (!dev && (supabaseUrl.includes('localhost') || supabaseUrl.includes('127.0.0.1'))) {
  throw new Error('Invalid production Supabase config: PUBLIC_SUPABASE_URL must be a Supabase cloud URL, not localhost.');
}

if (!dev && supabaseAnonKey === 'anon-key') {
  throw new Error('Invalid production Supabase config: PUBLIC_SUPABASE_ANON_KEY is still using the placeholder value.');
}

export const config: ConfigType = {
  supabaseConfig: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey
  }
};
