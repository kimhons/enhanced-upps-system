// Subscription tier configuration and logic enforcement

export interface SubscriptionTier {
  id: string
  name: string
  price: number
  yearlyPrice: number
  dailyPredictions: number
  features: string[]
  addonsIncluded: number
  stripePriceId: string
  stripeYearlyPriceId: string
  description: string
}

export const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  lite: {
    id: 'lite',
    name: 'Pattern Lite',
    price: 0,
    yearlyPrice: 0,
    dailyPredictions: 3,
    features: [
      'Basic pattern analysis',
      '10 mathematical pillars',
      'Community access',
      'Email support'
    ],
    addonsIncluded: 0,
    stripePriceId: '', // Free tier has no Stripe price ID
    stripeYearlyPriceId: '', // Free tier has no Stripe price ID
    description: 'Perfect for getting started with lottery pattern analysis'
  },
  starter: {
    id: 'starter',
    name: 'Pattern Starter',
    price: 9.99,
    yearlyPrice: 99.99, // ~17% discount
    dailyPredictions: 10,
    features: [
      'Enhanced pattern analysis',
      'Daily insights & reports',
      'Historical data access',
      'Priority email support',
      'Can purchase add-ons'
    ],
    addonsIncluded: 0,
    stripePriceId: 'price_1S4JiyBThGqvaVw1LzAMLzUM',
    stripeYearlyPriceId: 'price_1S4KXhBThGqvaVw10fxKe5BF',
    description: 'Enhanced analysis for regular lottery players'
  },
  pro: {
    id: 'pro',
    name: 'Pattern Pro',
    price: 39.99,
    yearlyPrice: 399.99, // ~17% discount
    dailyPredictions: 50,
    features: [
      'Advanced AI analysis',
      'Choose 2 add-ons included',
      'Detailed analytics dashboard',
      'Priority support',
      'Export capabilities'
    ],
    addonsIncluded: 2,
    stripePriceId: 'price_1S4JisBThGqvaVw1BEgIhSto',
    stripeYearlyPriceId: 'price_1S4KXuBThGqvaVw1LtS6bXy2',
    description: 'Professional-grade analysis with included add-ons'
  },
  elite: {
    id: 'elite',
    name: 'Pattern Elite',
    price: 199.99,
    yearlyPrice: 1999.99, // ~17% discount
    dailyPredictions: 300,
    features: [
      'Maximum AI power',
      'All 3 add-ons included',
      'White-label options',
      'VIP support & phone',
      'Custom integrations'
    ],
    addonsIncluded: 3,
    stripePriceId: 'price_1S4Jj3BThGqvaVw18vtORsZe',
    stripeYearlyPriceId: 'price_1S4KY6BThGqvaVw1sSKqNjJJ',
    description: 'Ultimate analysis power for serious professionals'
  }
}

export interface AddonProduct {
  id: string
  name: string
  price: number
  description: string
  stripePriceId: string
  icon: string
}

export const ADDON_PRODUCTS: Record<string, AddonProduct> = {
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Intelligence',
    price: 5.99,
    description: 'Lunar phases, zodiac alignments, numerological patterns, and sacred geometry analysis',
    stripePriceId: process.env.STRIPE_PRICE_COSMIC_INTELLIGENCE || '',
    icon: '🌙'
  },
  claude: {
    id: 'claude',
    name: 'Claude Nexus Intelligence',
    price: 5.99,
    description: '5-engine AI system with statistical, neural network, quantum, and pattern recognition engines',
    stripePriceId: process.env.STRIPE_PRICE_CLAUDE_NEXUS || '',
    icon: '🧠'
  },
  premium: {
    id: 'premium',
    name: 'Premium Enhancement',
    price: 5.99,
    description: 'Ultimate multi-model AI ensemble with predictive intelligence and market analysis',
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_ENHANCEMENT || '',
    icon: '💎'
  }
}

// Utility functions for subscription logic
export function getUserTier(userSubscription?: string): SubscriptionTier {
  if (!userSubscription) return SUBSCRIPTION_TIERS.lite
  return SUBSCRIPTION_TIERS[userSubscription] || SUBSCRIPTION_TIERS.lite
}

export function getPriceId(tier: SubscriptionTier, billingCycle: 'monthly' | 'yearly'): string {
  return billingCycle === 'yearly' ? tier.stripeYearlyPriceId : tier.stripePriceId
}

export function getPrice(tier: SubscriptionTier, billingCycle: 'monthly' | 'yearly'): number {
  return billingCycle === 'yearly' ? tier.yearlyPrice : tier.price
}

export function canGeneratePrediction(currentUsage: number, userTier: SubscriptionTier): boolean {
  return currentUsage < userTier.dailyPredictions
}

export function getRemainingPredictions(currentUsage: number, userTier: SubscriptionTier): number {
  return Math.max(0, userTier.dailyPredictions - currentUsage)
}

export function canAccessAddon(userTier: SubscriptionTier, addonId: string, userAddons: string[] = []): boolean {
  // Elite tier gets all addons
  if (userTier.id === 'elite') return true
  
  // Pro tier gets 2 addons (user can choose which ones)
  if (userTier.id === 'pro' && userAddons.length < 2) return true
  if (userTier.id === 'pro' && userAddons.includes(addonId)) return true
  
  // Starter and Lite can purchase addons separately
  if (userTier.id === 'starter' && userAddons.includes(addonId)) return true
  
  return false
}

export function getUpgradeMessage(userTier: SubscriptionTier): string {
  switch (userTier.id) {
    case 'lite':
      return 'Upgrade to Pattern Starter for 10 daily predictions and add-on access!'
    case 'starter':
      return 'Upgrade to Pattern Pro for 50 daily predictions and 2 included add-ons!'
    case 'pro':
      return 'Upgrade to Pattern Elite for unlimited predictions and all add-ons!'
    default:
      return 'You have the ultimate PatternSight experience!'
  }
}

export function getNextTier(currentTier: SubscriptionTier): SubscriptionTier | null {
  switch (currentTier.id) {
    case 'lite':
      return SUBSCRIPTION_TIERS.starter
    case 'starter':
      return SUBSCRIPTION_TIERS.pro
    case 'pro':
      return SUBSCRIPTION_TIERS.elite
    default:
      return null
  }
}

export function formatPrice(price: number): string {
  return price === 0 ? 'FREE' : `$${price.toFixed(2)}`
}

export function getTierColor(tierId: string): string {
  switch (tierId) {
    case 'lite':
      return 'text-gray-500'
    case 'starter':
      return 'text-blue-500'
    case 'pro':
      return 'text-orange-500'
    case 'elite':
      return 'text-purple-500'
    default:
      return 'text-gray-500'
  }
}

export function getTierBadgeColor(tierId: string): string {
  switch (tierId) {
    case 'lite':
      return 'bg-gray-100 text-gray-800'
    case 'starter':
      return 'bg-blue-100 text-blue-800'
    case 'pro':
      return 'bg-orange-100 text-orange-800'
    case 'elite':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

