-- PatternSight Dashboard Database Schema
-- Clean implementation for subscription tiers and usage tracking

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Subscription Management
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'elite')),
    subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
    subscription_start_date TIMESTAMP WITH TIME ZONE,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    
    -- Usage Tracking
    daily_analyses_used INTEGER DEFAULT 0,
    daily_analyses_limit INTEGER DEFAULT 3, -- Free tier limit
    last_reset_date DATE DEFAULT CURRENT_DATE,
    
    -- Add-on Subscriptions (boolean flags for simplicity)
    cosmic_intelligence_active BOOLEAN DEFAULT FALSE,
    claude_nexus_active BOOLEAN DEFAULT FALSE,
    premium_enhancement_active BOOLEAN DEFAULT FALSE
);

-- Predictions table
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
    cosmic_score REAL DEFAULT 0, -- Only if cosmic intelligence active
    unified_score REAL DEFAULT 0,
    confidence_level TEXT DEFAULT 'medium' CHECK (confidence_level IN ('low', 'medium', 'high', 'premium')),
    
    -- Metadata
    target_date DATE NOT NULL,
    analysis_type TEXT DEFAULT 'basic' CHECK (analysis_type IN ('basic', 'enhanced', 'premium')),
    addons_used TEXT[] DEFAULT '{}', -- Array of addon names used
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage Log table for tracking daily limits
CREATE TABLE public.usage_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL, -- 'prediction_generated', 'addon_used', etc.
    details JSONB DEFAULT '{}',
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription History table
CREATE TABLE public.subscription_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    tier TEXT NOT NULL,
    amount INTEGER NOT NULL, -- in cents
    stripe_subscription_id TEXT,
    stripe_payment_intent_id TEXT,
    status TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_predictions_user_id ON public.predictions(user_id);
CREATE INDEX idx_predictions_created_at ON public.predictions(created_at);
CREATE INDEX idx_usage_log_user_date ON public.usage_log(user_id, date);
CREATE INDEX idx_users_subscription_tier ON public.users(subscription_tier);

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Predictions policies
CREATE POLICY "Users can view own predictions" ON public.predictions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own predictions" ON public.predictions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usage log policies
CREATE POLICY "Users can view own usage log" ON public.usage_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage log" ON public.usage_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscription history policies
CREATE POLICY "Users can view own subscription history" ON public.subscription_history
    FOR SELECT USING (auth.uid() = user_id);

-- Function to reset daily usage limits
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

-- Function to update subscription limits based on tier
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

-- Trigger to update limits when subscription changes
CREATE TRIGGER update_user_limits 
    BEFORE UPDATE ON public.users
    FOR EACH ROW 
    WHEN (OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier)
    EXECUTE FUNCTION update_subscription_limits();

-- Function to check if user can generate prediction
CREATE OR REPLACE FUNCTION can_generate_prediction(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_record RECORD;
BEGIN
    SELECT * INTO user_record FROM public.users WHERE id = user_uuid;
    
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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

