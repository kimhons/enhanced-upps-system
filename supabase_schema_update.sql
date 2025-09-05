-- PatternSight Dashboard - Updated Schema (works with existing users table)
-- Copy and paste this into Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- First, let's check what columns exist in the users table and add missing ones
-- Add missing columns to existing users table (if they don't exist)
DO $$ 
BEGIN
    -- Add subscription_tier if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'subscription_tier') THEN
        ALTER TABLE public.users ADD COLUMN subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'elite'));
    END IF;
    
    -- Add subscription_status if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'subscription_status') THEN
        ALTER TABLE public.users ADD COLUMN subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due'));
    END IF;
    
    -- Add daily_analyses_used if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'daily_analyses_used') THEN
        ALTER TABLE public.users ADD COLUMN daily_analyses_used INTEGER DEFAULT 0;
    END IF;
    
    -- Add daily_analyses_limit if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'daily_analyses_limit') THEN
        ALTER TABLE public.users ADD COLUMN daily_analyses_limit INTEGER DEFAULT 3;
    END IF;
    
    -- Add last_reset_date if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_reset_date') THEN
        ALTER TABLE public.users ADD COLUMN last_reset_date DATE DEFAULT CURRENT_DATE;
    END IF;
    
    -- Add addon columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'cosmic_intelligence_active') THEN
        ALTER TABLE public.users ADD COLUMN cosmic_intelligence_active BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'claude_nexus_active') THEN
        ALTER TABLE public.users ADD COLUMN claude_nexus_active BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'premium_enhancement_active') THEN
        ALTER TABLE public.users ADD COLUMN premium_enhancement_active BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Create predictions table (drop and recreate if exists)
DROP TABLE IF EXISTS public.predictions CASCADE;
CREATE TABLE public.predictions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Prediction Data
    numbers INTEGER[] NOT NULL,
    powerball INTEGER,
    game_type TEXT DEFAULT 'powerball' CHECK (game_type IN ('powerball', 'mega_millions', 'pick3', 'pick4')),
    
    -- Analysis Scores
    statistical_score REAL DEFAULT 0,
    ai_score REAL DEFAULT 0,
    cosmic_score REAL DEFAULT 0,
    unified_score REAL DEFAULT 0,
    confidence_level TEXT DEFAULT 'medium' CHECK (confidence_level IN ('low', 'medium', 'high', 'premium')),
    
    -- Metadata
    target_date DATE NOT NULL,
    analysis_type TEXT DEFAULT 'basic' CHECK (analysis_type IN ('basic', 'enhanced', 'premium')),
    addons_used TEXT[] DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage_log table (drop and recreate if exists)
DROP TABLE IF EXISTS public.usage_log CASCADE;
CREATE TABLE public.usage_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription_history table (drop and recreate if exists)
DROP TABLE IF EXISTS public.subscription_history CASCADE;
CREATE TABLE public.subscription_history (
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
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON public.predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON public.predictions(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_log_user_date ON public.usage_log(user_id, date);
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON public.users(subscription_tier);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own predictions" ON public.predictions;
DROP POLICY IF EXISTS "Users can insert own predictions" ON public.predictions;
DROP POLICY IF EXISTS "Users can view own usage log" ON public.usage_log;
DROP POLICY IF EXISTS "Users can insert own usage log" ON public.usage_log;
DROP POLICY IF EXISTS "Users can view own subscription history" ON public.subscription_history;

-- Create new policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own predictions" ON public.predictions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own predictions" ON public.predictions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own usage log" ON public.usage_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage log" ON public.usage_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own subscription history" ON public.subscription_history
    FOR SELECT USING (auth.uid() = user_id);

-- Create or replace functions
CREATE OR REPLACE FUNCTION reset_daily_usage()
RETURNS void AS $$
BEGIN
    UPDATE public.users 
    SET 
        daily_analyses_used = 0,
        last_reset_date = CURRENT_DATE
    WHERE last_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_subscription_limits()
RETURNS TRIGGER AS $$
BEGIN
    -- Set daily limits based on subscription tier
    CASE NEW.subscription_tier
        WHEN 'free' THEN
            NEW.daily_analyses_limit := 3;
        WHEN 'starter' THEN
            NEW.daily_analyses_limit := 10;
        WHEN 'pro' THEN
            NEW.daily_analyses_limit := 50;
        WHEN 'elite' THEN
            NEW.daily_analyses_limit := 300;
        ELSE
            NEW.daily_analyses_limit := 3;
    END CASE;
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS update_user_limits ON public.users;
CREATE TRIGGER update_user_limits 
    BEFORE UPDATE ON public.users
    FOR EACH ROW 
    WHEN (OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier)
    EXECUTE FUNCTION update_subscription_limits();

CREATE OR REPLACE FUNCTION can_generate_prediction(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_record RECORD;
BEGIN
    SELECT * INTO user_record FROM public.users WHERE id = user_uuid;
    
    IF user_record IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Reset daily usage if needed
    IF user_record.last_reset_date < CURRENT_DATE THEN
        UPDATE public.users 
        SET 
            daily_analyses_used = 0,
            last_reset_date = CURRENT_DATE
        WHERE id = user_uuid;
        RETURN TRUE;
    END IF;
    
    -- Check if under daily limit
    RETURN user_record.daily_analyses_used < user_record.daily_analyses_limit;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

