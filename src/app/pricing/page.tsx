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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

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
              <Link 
                href="/auth/signin" 
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
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
                Yearly <span className="text-green-400 text-sm">(Save 20%)</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pattern Lite</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">FREE</div>
                <div className="text-gray-600">Forever</div>
              </div>
              
              <div className="mb-8">
                <div className="text-lg font-semibold text-gray-900 mb-4">3 analyses per day</div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Basic pattern analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">10 mathematical pillars</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Community access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Email support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <X className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 font-medium">AI add-ons</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href="/auth/signup"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block"
              >
                Get Started Free
              </Link>
            </motion.div>

            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pattern Starter</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${billingCycle === 'monthly' ? '9.99' : '95.90'}
                </div>
                <div className="text-gray-600">
                  {billingCycle === 'monthly' ? 'per month' : 'per year'}
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-green-600 text-sm font-semibold">Save $23.98/year</div>
                )}
              </div>
              
              <div className="mb-8">
                <div className="text-lg font-semibold text-gray-900 mb-4">10 analyses per day</div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Enhanced pattern analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Daily insights & reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Historical data access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Priority email support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Can purchase add-ons</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href="/auth/signup"
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center block"
              >
                Start Free Trial
              </Link>
            </motion.div>

            {/* Pro Plan - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-xl text-white relative transform scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pattern Pro</h3>
                <div className="text-4xl font-bold mb-2">
                  ${billingCycle === 'monthly' ? '39.99' : '383.90'}
                </div>
                <div className="text-orange-100">
                  {billingCycle === 'monthly' ? 'per month' : 'per year'}
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-yellow-300 text-sm font-semibold">Save $95.98/year</div>
                )}
              </div>
              
              <div className="mb-8">
                <div className="text-lg font-semibold mb-4">50 analyses per day</div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Advanced AI analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Choose 2 add-ons included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Detailed analytics dashboard</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">Export capabilities</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href="/auth/signup"
                className="w-full bg-white text-orange-500 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center block"
              >
                Start Free Trial
              </Link>
            </motion.div>

            {/* Elite Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-900">Pattern Elite</h3>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${billingCycle === 'monthly' ? '199.99' : '1919.90'}
                </div>
                <div className="text-gray-600">
                  {billingCycle === 'monthly' ? 'per month' : 'per year'}
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-green-600 text-sm font-semibold">Save $479.98/year</div>
                )}
              </div>
              
              <div className="mb-8">
                <div className="text-lg font-semibold text-gray-900 mb-4">300 analyses per day</div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Maximum AI power</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">All 3 add-ons included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">White-label options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">VIP support & phone</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900 font-semibold">Custom integrations</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href="/auth/signup"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center block"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Enhancement Add-Ons
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Enhance any subscription with powerful AI add-ons - $5.99/month each
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cosmic Intelligence */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🌙 Cosmic Intelligence</h3>
                <div className="text-2xl font-bold text-orange-500 mb-4">
                  ${billingCycle === 'monthly' ? '5.99' : '57.50'}/
                  {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Lunar phase analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Zodiac alignment patterns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Numerological correlations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sacred geometry analysis</span>
                </li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Add to Plan
              </button>
            </div>

            {/* Claude Nexus */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🧠 Claude Nexus</h3>
                <div className="text-2xl font-bold text-purple-500 mb-4">
                  ${billingCycle === 'monthly' ? '5.99' : '57.50'}/
                  {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>5-engine AI system</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Statistical reasoning engine</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Neural network analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Quantum pattern recognition</span>
                </li>
              </ul>
              <button className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                Add to Plan
              </button>
            </div>

            {/* Premium Enhancement */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">💎 Premium Enhancement</h3>
                <div className="text-2xl font-bold text-pink-500 mb-4">
                  ${billingCycle === 'monthly' ? '5.99' : '57.50'}/
                  {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Multi-model AI ensemble</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Predictive intelligence boost</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Market trend analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Priority processing</span>
                </li>
              </ul>
              <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                Add to Plan
              </button>
            </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Analysis Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of users who trust PatternSight for advanced lottery analysis
          </p>
          <Link 
            href="/dashboard"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🔮</span>
                </div>
                <span className="text-xl font-bold">PatternSight</span>
              </div>
              <p className="text-gray-400">
                Where Mathematics Meets Possibility
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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

