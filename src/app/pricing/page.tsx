'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Star, 
  ArrowRight, 
  Sparkles,
  Moon,
  Brain,
  Target,
  Shield,
  Clock,
  Users,
  Headphones
} from 'lucide-react';
import { getStripe } from '@/lib/stripe';
import { SUBSCRIPTION_TIERS, getPriceId, getPrice } from '@/lib/subscription-tiers';
import { useAuth } from '@/contexts/AuthContext';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();

  const handleUpgrade = async (tierId: string, cycle: 'monthly' | 'yearly') => {
    setLoading(`${tierId}-${cycle}`);
    
    try {
      // Check if user is authenticated
      if (!user) {
        // Redirect to sign in page
        window.location.href = '/auth/signin?redirect=/pricing';
        return;
      }

      // Get the subscription tier
      const tier = SUBSCRIPTION_TIERS[tierId];
      if (!tier) {
        throw new Error('Invalid subscription tier');
      }

      // Get the price ID for the selected billing cycle
      const priceId = getPriceId(tier, cycle);
      
      if (!priceId) {
        throw new Error('Price ID not found for this tier and billing cycle');
      }

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const renderPricingCard = (tierId: string, index: number) => {
    const tier = SUBSCRIPTION_TIERS[tierId];
    const price = getPrice(tier, billingCycle);
    const isPopular = tierId === 'pro';
    const isFree = tierId === 'lite';
    
    return (
      <motion.div
        key={tierId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`p-8 rounded-xl ${
          isPopular 
            ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white relative transform scale-105' 
            : 'bg-white border border-gray-200 shadow-sm'
        }`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </span>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
            {tier.name}
          </h3>
          <div className={`text-4xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
            {isFree ? 'FREE' : `$${price.toFixed(2)}`}
          </div>
          <div className={isPopular ? 'text-orange-100' : 'text-gray-600'}>
            {isFree ? 'Forever' : billingCycle === 'monthly' ? 'per month' : 'per year'}
          </div>
          {!isFree && billingCycle === 'yearly' && (
            <div className={`text-sm font-semibold ${isPopular ? 'text-yellow-300' : 'text-green-600'}`}>
              Save {Math.round(((tier.price * 12 - tier.yearlyPrice) / (tier.price * 12)) * 100)}%
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <div className={`text-lg font-semibold mb-4 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
            {tier.dailyPredictions} analyses per day
          </div>
          <ul className="space-y-3">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center space-x-2">
                <Check className={`w-4 h-4 ${isPopular ? 'text-orange-200' : 'text-green-500'}`} />
                <span className={`text-sm font-semibold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {isFree ? (
          <Link 
            href="/auth/signup"
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block"
          >
            Get Started Free
          </Link>
        ) : (
          <button
            onClick={() => handleUpgrade(tierId, billingCycle)}
            disabled={loading === `${tierId}-${billingCycle}`}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isPopular 
                ? 'bg-white text-orange-500 hover:bg-gray-100' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {loading === `${tierId}-${billingCycle}` ? 'Loading...' : 'Upgrade Now'}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🔮</span>
              </div>
              <div>
                <div className="text-gray-900 font-bold text-xl">PatternSight</div>
                <div className="text-gray-600 text-sm">Where Mathematics Meets Possibility</div>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">Home</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-500 transition-colors">Dashboard</Link>
              <Link href="/features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</Link>
              <Link href="/pricing" className="text-orange-500 font-semibold">Pricing</Link>
              <Link href="/research" className="text-gray-700 hover:text-orange-500 transition-colors">Research</Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-700 hover:text-orange-500 transition-colors">Sign In</Link>
              <Link href="/auth/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Choose the perfect plan for your lottery analysis needs. Upgrade or downgrade anytime.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`${billingCycle === 'monthly' ? 'text-white' : 'text-purple-300'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 bg-purple-600 rounded-full p-1 transition-colors"
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
              <span className={`${billingCycle === 'yearly' ? 'text-white' : 'text-purple-300'}`}>
                Yearly <span className="text-green-400 text-sm">(Save 17%)</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Object.keys(SUBSCRIPTION_TIERS).map((tierId, index) => 
              renderPricingCard(tierId, index)
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Can I change my plan anytime?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle, and you'll have access to your current plan features until then.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What happens if I exceed my daily analysis limit?</h3>
              <p className="text-gray-600">
                If you reach your daily limit, you can either wait until the next day (limits reset at midnight UTC) or upgrade to a higher plan for more analyses. We'll notify you when you're approaching your limit.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Are the AI add-ons worth it?</h3>
              <p className="text-gray-600">
                Our AI add-ons provide additional analysis layers that can enhance pattern recognition. While the 10-pillar system is powerful on its own, add-ons like Cosmic Intelligence and Claude Nexus offer unique perspectives that many users find valuable.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! All paid plans come with a 7-day free trial. You can explore all features risk-free, and cancel anytime during the trial period without being charged.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🔮</span>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">PatternSight</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Where Mathematics Meets Possibility. Advanced lottery pattern analysis powered by AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PatternSight by AlienNova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

