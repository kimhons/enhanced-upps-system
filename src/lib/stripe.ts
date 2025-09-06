import { loadStripe, Stripe } from '@stripe/stripe-js';

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Server-side Stripe instance (only import on server)
let serverStripe: any = null;

export const getServerStripe = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Server-side Stripe should not be used on the client');
  }
  
  if (!serverStripe) {
    const StripeServer = require('stripe');
    serverStripe = new StripeServer(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      typescript: true,
    });
  }
  
  return serverStripe;
};

// Price configurations
export const PRICE_IDS = {
  // Monthly subscriptions
  STARTER_MONTHLY: process.env.STRIPE_PRICE_STARTER_MONTHLY!,
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY!,
  ELITE_MONTHLY: process.env.STRIPE_PRICE_ELITE_MONTHLY!,
  
  // Yearly subscriptions
  STARTER_YEARLY: process.env.STRIPE_PRICE_STARTER_YEARLY!,
  PRO_YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY!,
  ELITE_YEARLY: process.env.STRIPE_PRICE_ELITE_YEARLY!,
  
  // Add-ons
  COSMIC_INTELLIGENCE: process.env.STRIPE_PRICE_COSMIC_INTELLIGENCE!,
  CLAUDE_NEXUS: process.env.STRIPE_PRICE_CLAUDE_NEXUS!,
  PREMIUM_ENHANCEMENT: process.env.STRIPE_PRICE_PREMIUM_ENHANCEMENT!,
};

// Subscription tier configurations
export const SUBSCRIPTION_TIERS = {
  STARTER: {
    name: 'Pattern Starter',
    monthlyPrice: 9.99,
    yearlyPrice: 95.90,
    analyses: 10,
    features: [
      'Enhanced pattern analysis',
      'Daily insights & reports',
      'Historical data access',
      'Priority email support',
      'Can purchase add-ons'
    ]
  },
  PRO: {
    name: 'Pattern Pro',
    monthlyPrice: 39.99,
    yearlyPrice: 383.90,
    analyses: 50,
    features: [
      'Advanced AI analysis',
      'Choose 2 add-ons included',
      'Detailed analytics dashboard',
      'Priority support',
      'Export capabilities'
    ]
  },
  ELITE: {
    name: 'Pattern Elite',
    monthlyPrice: 199.99,
    yearlyPrice: 1919.90,
    analyses: 300,
    features: [
      'Maximum AI power',
      'All 3 add-ons included',
      'White-label options',
      'VIP support & phone',
      'Custom integrations'
    ]
  }
};

// Add-on configurations
export const ADDON_CONFIGS = {
  COSMIC_INTELLIGENCE: {
    name: 'Cosmic Intelligence',
    price: 5.99,
    description: 'Lunar phases, zodiac alignments, numerological patterns',
    features: [
      'Lunar phase analysis',
      'Zodiac alignment patterns',
      'Numerological correlations',
      'Sacred geometry analysis'
    ]
  },
  CLAUDE_NEXUS: {
    name: 'Claude Nexus',
    price: 5.99,
    description: '5-engine AI system with advanced reasoning',
    features: [
      '5-engine AI system',
      'Statistical reasoning engine',
      'Neural network analysis',
      'Quantum pattern recognition'
    ]
  },
  PREMIUM_ENHANCEMENT: {
    name: 'Premium Enhancement',
    price: 5.99,
    description: 'Multi-model AI ensemble with predictive intelligence',
    features: [
      'Multi-model AI ensemble',
      'Predictive intelligence boost',
      'Market trend analysis',
      'Priority processing'
    ]
  }
};

// Utility function to format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Utility function to get price ID based on tier and billing cycle
export const getPriceId = (tier: string, billingCycle: 'monthly' | 'yearly'): string => {
  const tierUpper = tier.toUpperCase();
  const cycleUpper = billingCycle.toUpperCase();
  
  const key = `${tierUpper}_${cycleUpper}` as keyof typeof PRICE_IDS;
  return PRICE_IDS[key];
};

// Utility function to calculate yearly savings
export const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number): number => {
  return (monthlyPrice * 12) - yearlyPrice;
};

