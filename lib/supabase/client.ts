import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build/prerender (or when env vars are not configured), fall back to
  // placeholder values so the client can be constructed without throwing.
  // Real requests will fail gracefully until valid credentials are provided.
  return createBrowserClient(
    supabaseUrl && supabaseUrl.length > 0
      ? supabaseUrl
      : 'https://placeholder.supabase.co',
    supabaseAnonKey && supabaseAnonKey.length > 0
      ? supabaseAnonKey
      : 'placeholder-anon-key'
  )
}
