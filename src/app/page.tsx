'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, 
  TrendingUp, 
  Database, 
  Zap, 
  Target, 
  BarChart3,
  Star,
  Crown,
  Shield,
  CheckCircle,
  ArrowRight,
  X,
  Clock,
  Sparkles,
  Moon,
  Cpu,
  AlertTriangle,
  Check
} from 'lucide-react';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [showBanner, setShowBanner] = useState(true);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Flash Sale Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 text-center relative">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="font-bold">⚡ 24-HOUR FLASH SALE</span>
            <span>50% OFF ALL ANALYSIS PACKAGES</span>
            <span>ENDS IN:</span>
            <div className="flex items-center space-x-1 font-mono">
              <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
              <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
              <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
            </div>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
              <Link href="/pricing" className="text-gray-700 hover:text-orange-500 transition-colors">Pricing</Link>
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

      {/* Hero Section - Purple Gradient */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* Live Badge */}
          <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            NOW LIVE - PUBLIC LAUNCH
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                PatternSight
              </span>
              <br />
              <span className="text-white">Ultimate AI Prediction Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-4 max-w-4xl mx-auto">
              The world's most advanced lottery prediction system combining
            </p>
            <p className="text-xl md:text-2xl text-white font-bold mb-8 max-w-4xl mx-auto">
              10 mathematical pillars + 3 AI enhancement add-ons
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm">
              <div className="flex items-center space-x-2 bg-orange-500/20 px-4 py-2 rounded-full">
                <Target className="w-4 h-4 text-orange-400" />
                <span>18-20% Pattern Accuracy</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/20 px-4 py-2 rounded-full">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Multi-AI Intelligence</span>
              </div>
              <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                <Moon className="w-4 h-4 text-yellow-400" />
                <span>Cosmic Enhancement</span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>🏛️ 10 Pillars Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>🧠 Multi-AI Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>🌙 Cosmic Intelligence</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-colors flex items-center space-x-2"
              >
                <span>🔮</span>
                <span>Discover Your Patterns</span>
              </Link>
              <Link 
                href="/features"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-teal-600 hover:to-cyan-600 transition-colors flex items-center space-x-2"
              >
                <span>See How It Works</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-orange-500 mb-2">18-20%</div>
              <div className="text-gray-600 font-semibold">Pattern Accuracy</div>
              <div className="text-sm text-gray-500">vs 0.007% random</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-purple-500 mb-2">10+3</div>
              <div className="text-gray-600 font-semibold">AI Pillars + Add-ons</div>
              <div className="text-sm text-gray-500">Mathematical + AI</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-500 mb-2">5+ Years</div>
              <div className="text-gray-600 font-semibold">Historical Data</div>
              <div className="text-sm text-gray-500">Real lottery analysis</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-green-500 mb-2">3 AI</div>
              <div className="text-gray-600 font-semibold">Enhancement Add-ons</div>
              <div className="text-sm text-gray-500">$5.99 each</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionary 10-Pillar Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our educational system demonstrates advanced mathematical analysis by combining 10 peer-reviewed mathematical pillars with 3 optional AI enhancement add-ons to explore pattern recognition concepts in lottery data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mathematical Foundation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mathematical Foundation</h3>
              <p className="text-gray-600 text-sm">
                10 peer-reviewed pillars including CDM Bayesian, Order Statistics, Ensemble Deep Learning, and Markov Chain analysis for educational exploration.
              </p>
            </motion.div>

            {/* Multi-AI Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-AI Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI reasoning with OpenAI GPT-4, Claude, and DeepSeek integration for educational pattern analysis demonstrations.
              </p>
            </motion.div>

            {/* Real Data Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real Data Analysis</h3>
              <p className="text-gray-600 text-sm">
                5+ years of historical lottery data analysis for educational purposes, demonstrating statistical significance concepts (P-value &lt; 0.01).
              </p>
            </motion.div>

            {/* Transparent Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Analysis</h3>
              <p className="text-gray-600 text-sm">
                Educational demonstration of 18-20% pattern recognition in historical data with complete mathematical validation and realistic expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium AI Enhancement Add-Ons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cosmic Intelligence */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🌙 Cosmic Intelligence</h3>
                <p className="text-gray-600 mb-4">
                  Lunar phases, zodiac alignments, numerological patterns, and sacred geometry analysis.
                </p>
                <div className="text-2xl font-bold text-orange-500">$5.99/month</div>
              </div>
            </div>

            {/* Claude Nexus */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🧠 Claude Nexus Intelligence</h3>
                <p className="text-gray-600 mb-4">
                  5-engine AI system with statistical, neural network, quantum, and pattern recognition engines.
                </p>
                <div className="text-2xl font-bold text-purple-500">$5.99/month</div>
              </div>
            </div>

            {/* Premium Enhancement */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">💎 Premium Enhancement</h3>
                <p className="text-gray-600 mb-4">
                  Ultimate multi-model AI ensemble with predictive intelligence and market analysis.
                </p>
                <div className="text-2xl font-bold text-pink-500">$5.99/month</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Intelligence Level
            </h2>
            <p className="text-xl text-gray-600">
              Flexible subscription tiers with optional AI enhancement add-ons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pattern Lite</h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">FREE</div>
              <div className="text-gray-600 mb-6">3 analyses per day</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">Basic pattern analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">10 mathematical pillars</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">Community access</span>
                </li>
              </ul>
              <Link 
                href="/auth/signup"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block"
              >
                Get Started
              </Link>
            </div>

            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pattern Starter</h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">$9.99</div>
              <div className="text-gray-600 mb-6">10 analyses per day</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">Enhanced pattern analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">Daily insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">Can purchase add-ons</span>
                </li>
              </ul>
              <Link 
                href="/auth/signup"
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center block"
              >
                Upgrade
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-xl text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pattern Pro</h3>
              <div className="text-4xl font-bold mb-4">$39.99</div>
              <div className="text-orange-100 mb-6">50 analyses per day</div>
              <ul className="space-y-3 mb-8">
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
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Link 
                href="/auth/signup"
                className="w-full bg-white text-orange-500 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center block"
              >
                Upgrade Now
              </Link>
            </div>

            {/* Elite Plan */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pattern Elite</h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">$199.99</div>
              <div className="text-gray-600 mb-6">300 analyses per day</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">Maximum AI power</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">All 3 add-ons included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800 font-medium">VIP support</span>
                </li>
              </ul>
              <Link 
                href="/auth/signup"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center block"
              >
                Go Elite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Lottery Strategy?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of users who trust PatternSight for advanced lottery analysis
          </p>
          <Link 
            href="/dashboard"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Your Analysis</span>
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
                <li className="text-xs text-gray-500 pt-2">
                  For entertainment only. No system can predict lottery outcomes. All purchases non-refundable. 18+ only.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PatternSight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

