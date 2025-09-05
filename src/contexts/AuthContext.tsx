'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, User } from '@/lib/supabase'

interface AuthContextType {
  user: SupabaseUser | null
  userProfile: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>
  canGeneratePrediction: () => boolean
  incrementUsage: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUserProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code === 'PGRST116') {
        // User profile doesn't exist, create it
        const { data: authUser } = await supabase.auth.getUser()
        if (authUser.user) {
          await createUserProfile(authUser.user)
        }
      } else if (data) {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const createUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: authUser.id,
          email: authUser.email!,
          full_name: authUser.user_metadata?.full_name || authUser.email!.split('@')[0],
          subscription_tier: 'free',
          subscription_status: 'active',
          daily_analyses_used: 0,
          daily_analyses_limit: 3,
          last_reset_date: new Date().toISOString().split('T')[0],
          cosmic_intelligence_active: false,
          claude_nexus_active: false,
          premium_enhancement_active: false
        })
        .select()
        .single()

      if (data) {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: new Error('No user logged in') }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (data) {
      setUserProfile(data)
    }

    return { error }
  }

  const canGeneratePrediction = () => {
    if (!userProfile) return false
    
    // Check if daily reset is needed
    const today = new Date().toISOString().split('T')[0]
    if (userProfile.last_reset_date !== today) {
      // Reset will happen on next API call
      return true
    }
    
    return userProfile.daily_analyses_used < userProfile.daily_analyses_limit
  }

  const incrementUsage = async () => {
    if (!user || !userProfile) return

    // Check if daily reset is needed
    const today = new Date().toISOString().split('T')[0]
    let updates: Partial<User> = {}

    if (userProfile.last_reset_date !== today) {
      updates = {
        daily_analyses_used: 1,
        last_reset_date: today
      }
    } else {
      updates = {
        daily_analyses_used: userProfile.daily_analyses_used + 1
      }
    }

    await updateProfile(updates)

    // Log the usage
    await supabase.from('usage_log').insert({
      user_id: user.id,
      action: 'prediction_generated',
      details: { timestamp: new Date().toISOString() },
      date: today
    })
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    canGeneratePrediction,
    incrementUsage
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

