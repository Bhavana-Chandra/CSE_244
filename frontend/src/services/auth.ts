import { supabase } from '../lib/supabase'
import type { User } from '../lib/supabase'

export interface AuthUser {
  id: string
  email: string
  full_name?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  full_name: string
}

class AuthService {
  async signUp({ email, password, full_name }: RegisterCredentials) {
    // Get the current origin (works in both dev and production)
    const redirectTo = `${window.location.origin}/auth/callback`
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
        emailRedirectTo: redirectTo,
      },
    })

    if (error) throw error
    return data
  }

  async signIn({ email, password }: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null
    
    return {
      id: user.id,
      email: user.email!,
      full_name: user.user_metadata?.full_name,
    }
  }

  async resetPassword(email: string) {
    // Get the current origin (works in both dev and production)
    const redirectTo = `${window.location.origin}/auth/reset-password`
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    if (error) throw error
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name,
        }
        callback(user)
      } else {
        callback(null)
      }
    })
  }
}

export const authService = new AuthService()
