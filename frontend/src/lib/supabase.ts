import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if environment variables are missing
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
        signUp: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ data: [], error: null })
      })
    } as any

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  scenario_id: string
  completed: boolean
  choice_made?: string
  is_correct?: boolean
  completed_at?: string
  created_at: string
}

export interface UserStats {
  total_scenarios_completed: number
  total_correct_choices: number
  scenarios_completed: string[]
}
