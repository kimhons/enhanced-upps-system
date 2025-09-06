-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('starter', 'pro', 'elite')),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'incomplete')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  last_payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Add-ons Table
CREATE TABLE IF NOT EXISTS user_addons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID NOT NULL REFERENCES user_subscriptions(id) ON DELETE CASCADE,
  addon_type TEXT NOT NULL CHECK (addon_type IN ('cosmic_intelligence', 'claude_nexus', 'premium_enhancement')),
  stripe_subscription_item_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage Tracking Table
CREATE TABLE IF NOT EXISTS user_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  analyses_used INTEGER DEFAULT 0,
  analyses_limit INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Payment History Table
CREATE TABLE IF NOT EXISTS payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_paid INTEGER NOT NULL, -- Amount in cents
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending')),
  payment_date TIMESTAMPTZ NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_customer_id ON user_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_subscription_id ON user_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_user_addons_user_id ON user_addons(user_id);
CREATE INDEX IF NOT EXISTS idx_user_addons_subscription_id ON user_addons(subscription_id);

CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON user_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_date ON user_usage(date);

CREATE INDEX IF NOT EXISTS idx_payment_history_user_id ON payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_stripe_invoice_id ON payment_history(stripe_invoice_id);

-- Row Level Security (RLS) Policies
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- Policies for user_subscriptions
CREATE POLICY "Users can view their own subscriptions" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for user_addons
CREATE POLICY "Users can view their own addons" ON user_addons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own addons" ON user_addons
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_usage
CREATE POLICY "Users can view their own usage" ON user_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage" ON user_usage
  FOR ALL USING (auth.uid() = user_id);

-- Policies for payment_history
CREATE POLICY "Users can view their own payment history" ON payment_history
  FOR SELECT USING (auth.uid() = user_id);

-- Function to get user's current subscription tier and limits
CREATE OR REPLACE FUNCTION get_user_subscription_info(user_uuid UUID)
RETURNS TABLE (
  subscription_tier TEXT,
  billing_cycle TEXT,
  status TEXT,
  analyses_limit INTEGER,
  addons TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(us.subscription_tier, 'free') as subscription_tier,
    COALESCE(us.billing_cycle, 'monthly') as billing_cycle,
    COALESCE(us.status, 'free') as status,
    CASE 
      WHEN us.subscription_tier IS NULL OR us.status != 'active' THEN 3
      WHEN us.subscription_tier = 'starter' THEN 10
      WHEN us.subscription_tier = 'pro' THEN 50
      WHEN us.subscription_tier = 'elite' THEN 300
      ELSE 3
    END as analyses_limit,
    COALESCE(
      ARRAY(
        SELECT ua.addon_type 
        FROM user_addons ua 
        WHERE ua.user_id = user_uuid AND ua.status = 'active'
      ),
      ARRAY[]::TEXT[]
    ) as addons
  FROM auth.users u
  LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
  WHERE u.id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and update daily usage
CREATE OR REPLACE FUNCTION check_daily_usage(user_uuid UUID)
RETURNS TABLE (
  analyses_used INTEGER,
  analyses_limit INTEGER,
  can_analyze BOOLEAN
) AS $$
DECLARE
  current_usage INTEGER;
  daily_limit INTEGER;
BEGIN
  -- Get user's subscription info
  SELECT analyses_limit INTO daily_limit
  FROM get_user_subscription_info(user_uuid);
  
  -- Get or create today's usage record
  INSERT INTO user_usage (user_id, analyses_used, analyses_limit)
  VALUES (user_uuid, 0, daily_limit)
  ON CONFLICT (user_id, date) DO NOTHING;
  
  -- Get current usage
  SELECT uu.analyses_used INTO current_usage
  FROM user_usage uu
  WHERE uu.user_id = user_uuid AND uu.date = CURRENT_DATE;
  
  RETURN QUERY
  SELECT 
    current_usage as analyses_used,
    daily_limit as analyses_limit,
    (current_usage < daily_limit) as can_analyze;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage count
CREATE OR REPLACE FUNCTION increment_usage(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_usage INTEGER;
  daily_limit INTEGER;
BEGIN
  -- Check current usage
  SELECT analyses_used, analyses_limit 
  INTO current_usage, daily_limit
  FROM check_daily_usage(user_uuid);
  
  -- If under limit, increment usage
  IF current_usage < daily_limit THEN
    UPDATE user_usage 
    SET analyses_used = analyses_used + 1,
        updated_at = NOW()
    WHERE user_id = user_uuid AND date = CURRENT_DATE;
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

