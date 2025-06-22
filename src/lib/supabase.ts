import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ojvpcvysnqpnuoqbqhzn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdnBjdnlzbnFwbnVvcWJxaHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTA3MTQsImV4cCI6MjA2NTkyNjcxNH0.mBIGnCigJQvnjdxYCzQ3Dk68URpnHbFnf3BSCf2jHAA'

// Create a Supabase client WITHOUT localStorage persistence.
// This ensures that the authentication session is kept **only in memory**
// and nothing is written to or read from the browser's localStorage.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // keep session across refreshes
    autoRefreshToken: true,
  },
})

export type Profile = {
  id: string
  username: string
  email: string
  created_at: string
  updated_at: string
} 