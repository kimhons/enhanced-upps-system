import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
  subscription_tier: 'free' | 'starter' | 'pro' | 'elite'
  subscription_status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  subscription_start_date?: string
  subscription_end_date?: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  daily_analyses_used: number
  daily_analyses_limit: number
  last_reset_date: string
  cosmic_intelligence_active: boolean
  claude_nexus_active: boolean
  premium_enhancement_active: boolean
}

export interface Prediction {
  id: string
  user_id: string
  numbers: number[]
  powerball?: number
  game_type: 'powerball' | 'mega_millions' | 'pick3' | 'pick4'
  statistical_score: number
  ai_score: number
  cosmic_score: number
  unified_score: number
  confidence_level: 'low' | 'medium' | 'high' | 'premium'
  target_date: string
  analysis_type: 'basic' | 'enhanced' | 'premium'
  addons_used: string[]
  created_at: string
}

export interface UsageLog {
  id: string
  user_id: string
  action: string
  details: Record<string, any>
  date: string
  created_at: string
}

// Subscription tier configurations
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Pattern Lite',
    price: 0,
    daily_limit: 3,
    features: ['Basic pattern analysis', '10 mathematical pillars', 'Community access'],
    addons_included: 0
  },
  starter: {
    name: 'Pattern Starter',
    price: 9.99,
    daily_limit: 10,
    features: ['Enhanced pattern analysis', 'Daily insights', 'Can purchase add-ons'],
    addons_included: 0
  },
  pro: {
    name: 'Pattern Pro',
    price: 39.99,
    daily_limit: 50,
    features: ['Advanced AI analysis', 'Choose 2 add-ons included', 'Priority support'],
    addons_included: 2
  },
  elite: {
    name: 'Pattern Elite',
    price: 199.99,
    daily_limit: 300,
    features: ['Maximum AI power', 'All 3 add-ons included', 'VIP support'],
    addons_included: 3
  }
}

export const ADDONS = {
  cosmic_intelligence: {
    name: 'Cosmic Intelligence',
    price: 5.99,
    description: 'Lunar phases, zodiac alignments, numerological patterns, and sacred geometry analysis',
    icon: '🌙'
  },
  claude_nexus: {
    name: 'Claude Nexus Intelligence',
    price: 5.99,
    description: '5-engine AI system with statistical, neural network, quantum, and pattern recognition engines',
    icon: '🧠'
  },
  premium_enhancement: {
    name: 'Premium Enhancement',
    price: 5.99,
    description: 'Ultimate multi-model AI ensemble with predictive intelligence and market analysis',
    icon: '💎'
  }
}

