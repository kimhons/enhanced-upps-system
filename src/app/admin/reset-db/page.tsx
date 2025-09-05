'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ResetDatabase() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const resetDatabase = async () => {
    setLoading(true)
    setStatus('Starting database reset...')

    try {
      // Drop existing tables
      const dropQueries = [
        'DROP TABLE IF EXISTS public.subscription_history CASCADE;',
        'DROP TABLE IF EXISTS public.usage_log CASCADE;', 
        'DROP TABLE IF EXISTS public.predictions CASCADE;',
        'DROP TABLE IF EXISTS public.users CASCADE;',
        'DROP FUNCTION IF EXISTS reset_daily_usage() CASCADE;',
        'DROP FUNCTION IF EXISTS update_subscription_limits() CASCADE;',
        'DROP FUNCTION IF EXISTS can_generate_prediction(UUID) CASCADE;'
      ]

      setStatus('Dropping existing tables...')
      for (const query of dropQueries) {
        const { error } = await supabase.rpc('exec_sql', { sql: query })
        if (error && !error.message.includes('does not exist')) {
          console.warn('Drop warning:', error.message)
        }
      }

      setStatus('Creating new schema...')
      
      // Create tables step by step
      const createQueries = [
        // Enable extensions
        `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
        
        // Users table
        `CREATE TABLE public.users (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          full_name TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'elite')),
          subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
          subscription_start_date TIMESTAMP WITH TIME ZONE,
          subscription_end_date TIMESTAMP WITH TIME ZONE,
          stripe_customer_id TEXT,
          stripe_subscription_id TEXT,
          daily_analyses_used INTEGER DEFAULT 0,
          daily_analyses_limit INTEGER DEFAULT 3,
          last_reset_date DATE DEFAULT CURRENT_DATE,
          cosmic_intelligence_active BOOLEAN DEFAULT FALSE,
          claude_nexus_active BOOLEAN DEFAULT FALSE,
          premium_enhancement_active BOOLEAN DEFAULT FALSE
        );`,
        
        // Predictions table
        `CREATE TABLE public.predictions (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
          numbers INTEGER[] NOT NULL,
          powerball INTEGER,
          game_type TEXT DEFAULT 'powerball' CHECK (game_type IN ('powerball', 'mega_millions', 'pick3', 'pick4')),
          statistical_score REAL DEFAULT 0,
          ai_score REAL DEFAULT 0,
          cosmic_score REAL DEFAULT 0,
          unified_score REAL DEFAULT 0,
          confidence_level TEXT DEFAULT 'medium' CHECK (confidence_level IN ('low', 'medium', 'high', 'premium')),
          target_date DATE NOT NULL,
          analysis_type TEXT DEFAULT 'basic' CHECK (analysis_type IN ('basic', 'enhanced', 'premium')),
          addons_used TEXT[] DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
        
        // Usage log table
        `CREATE TABLE public.usage_log (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
          action TEXT NOT NULL,
          details JSONB DEFAULT '{}',
          date DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
        
        // Subscription history table
        `CREATE TABLE public.subscription_history (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
          tier TEXT NOT NULL,
          amount INTEGER NOT NULL,
          stripe_subscription_id TEXT,
          stripe_payment_intent_id TEXT,
          status TEXT NOT NULL,
          start_date TIMESTAMP WITH TIME ZONE NOT NULL,
          end_date TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`
      ]

      for (let i = 0; i < createQueries.length; i++) {
        const query = createQueries[i]
        setStatus(`Creating schema ${i + 1}/${createQueries.length}...`)
        const { error } = await supabase.rpc('exec_sql', { sql: query })
        if (error) {
          throw new Error(`Error in query ${i + 1}: ${error.message}`)
        }
      }

      // Create indexes
      setStatus('Creating indexes...')
      const indexQueries = [
        'CREATE INDEX idx_predictions_user_id ON public.predictions(user_id);',
        'CREATE INDEX idx_predictions_created_at ON public.predictions(created_at);',
        'CREATE INDEX idx_usage_log_user_date ON public.usage_log(user_id, date);',
        'CREATE INDEX idx_users_subscription_tier ON public.users(subscription_tier);'
      ]

      for (const query of indexQueries) {
        const { error } = await supabase.rpc('exec_sql', { sql: query })
        if (error) {
          console.warn('Index warning:', error.message)
        }
      }

      // Enable RLS
      setStatus('Enabling Row Level Security...')
      const rlsQueries = [
        'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;',
        'ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;',
        'ALTER TABLE public.usage_log ENABLE ROW LEVEL SECURITY;',
        'ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;'
      ]

      for (const query of rlsQueries) {
        const { error } = await supabase.rpc('exec_sql', { sql: query })
        if (error) {
          console.warn('RLS warning:', error.message)
        }
      }

      // Create policies
      setStatus('Creating security policies...')
      const policyQueries = [
        `CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);`,
        `CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);`,
        `CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);`,
        `CREATE POLICY "Users can view own predictions" ON public.predictions FOR SELECT USING (auth.uid() = user_id);`,
        `CREATE POLICY "Users can insert own predictions" ON public.predictions FOR INSERT WITH CHECK (auth.uid() = user_id);`,
        `CREATE POLICY "Users can view own usage log" ON public.usage_log FOR SELECT USING (auth.uid() = user_id);`,
        `CREATE POLICY "Users can insert own usage log" ON public.usage_log FOR INSERT WITH CHECK (auth.uid() = user_id);`,
        `CREATE POLICY "Users can view own subscription history" ON public.subscription_history FOR SELECT USING (auth.uid() = user_id);`
      ]

      for (const query of policyQueries) {
        const { error } = await supabase.rpc('exec_sql', { sql: query })
        if (error) {
          console.warn('Policy warning:', error.message)
        }
      }

      setStatus('✅ Database reset completed successfully!')
      
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
      console.error('Database reset error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Database Reset Tool</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This will completely reset the Supabase database and apply the new clean schema.
          </p>
          <p className="text-red-600 font-semibold">
            ⚠️ Warning: This will delete all existing data!
          </p>
        </div>

        <button
          onClick={resetDatabase}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded mb-4"
        >
          {loading ? 'Resetting...' : 'Reset Database'}
        </button>

        {status && (
          <div className="bg-gray-50 border rounded p-4">
            <h3 className="font-semibold mb-2">Status:</h3>
            <p className="text-sm font-mono">{status}</p>
          </div>
        )}
      </div>
    </div>
  )
}

