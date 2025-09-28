import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
