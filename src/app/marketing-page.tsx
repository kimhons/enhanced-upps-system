'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
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
  AlertTriangle
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
              <button className="text-gray-700 hover:text-orange-500 transition-colors">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Purple Gradient */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* NOW LIVE Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold">
              <CheckCircle className="w-4 h-4 mr-2" />
              NOW LIVE - PUBLIC LAUNCH
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-orange-400">PatternSight v4.0</span>
            <br />
            <span className="text-white">Ultimate AI Prediction Platform</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
            The world's most advanced lottery prediction system combining<br />
            <strong>10 mathematical pillars + 3 AI enhancement add-ons</strong>
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-semibold">18-20% Pattern Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">Multi-AI Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Moon className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Cosmic Enhancement</span>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex justify-center items-center gap-8 mb-12 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>🏛️ 10 Pillars Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span>🧠 Multi-AI Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>🌙 Cosmic Intelligence</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>🔮 Discover Your Patterns</span>
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>See How It Works</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Important Disclaimer Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-3">⚠️ IMPORTANT DISCLAIMER</h3>
                <p className="text-white/90 mb-4">
                  <strong>For Entertainment and Educational Purposes Only.</strong> PatternSight is a mathematical analysis tool designed to 
                  explore lottery patterns and demonstrate AI capabilities. <strong>No system can predict lottery outcomes</strong>, which are 
                  random by design. Please play responsibly and never spend more than you can afford to lose.
                </p>
                <p className="text-white/70 text-sm">
                  Our 18-20% pattern accuracy refers to mathematical pattern recognition in historical data, not future prediction accuracy. 
                  Lottery drawings are independent random events. Past results do not influence future outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">18-20%</div>
              <div className="text-lg font-semibold mb-1">Pattern Accuracy</div>
              <div className="text-sm opacity-90">vs 0.007% random</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+3</div>
              <div className="text-lg font-semibold mb-1">AI Pillars + Add-ons</div>
              <div className="text-sm opacity-90">Mathematical + AI</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+ Years</div>
              <div className="text-lg font-semibold mb-1">Historical Data</div>
              <div className="text-sm opacity-90">Real lottery analysis</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3 AI</div>
              <div className="text-lg font-semibold mb-1">Enhancement Add-ons</div>
              <div className="text-sm opacity-90">$5.99 each</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary 10-Pillar Architecture Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Revolutionary 10-Pillar Architecture</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our educational system demonstrates advanced mathematical analysis by combining 10 peer-reviewed mathematical pillars with 3 optional AI enhancement add-ons to explore pattern recognition concepts in lottery data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Mathematical Foundation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Mathematical Foundation</h3>
              <p className="text-gray-600 text-center">
                10 peer-reviewed pillars including CDM Bayesian, Order Statistics, Ensemble Deep Learning, and Markov Chain analysis for educational exploration.
              </p>
            </div>

            {/* Multi-AI Intelligence */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Multi-AI Intelligence</h3>
              <p className="text-gray-600 text-center">
                Advanced AI reasoning with OpenAI GPT-4, Claude, and DeepSeek integration for educational pattern analysis demonstrations.
              </p>
            </div>

            {/* Real Data Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Real Data Analysis</h3>
              <p className="text-gray-600 text-center">
                5+ years of historical lottery data analysis for educational purposes, demonstrating statistical significance concepts (P-value &lt; 0.01).
              </p>
            </div>

            {/* Transparent Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Transparent Analysis</h3>
              <p className="text-gray-600 text-center">
                Educational demonstration of 18-20% pattern recognition in historical data with complete mathematical validation and realistic expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium AI Enhancement Add-Ons Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Premium AI Enhancement Add-Ons</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cosmic Intelligence */}
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Moon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🌙 Cosmic Intelligence</h3>
              <p className="text-gray-600 mb-6">
                Lunar phases, zodiac alignments, numerological patterns, and sacred geometry analysis.
              </p>
              <div className="text-2xl font-bold text-orange-500">$5.99/month</div>
            </div>

            {/* Claude Nexus Intelligence */}
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🧠 Claude Nexus Intelligence</h3>
              <p className="text-gray-600 mb-6">
                5-engine AI system with statistical, neural network, quantum, and pattern recognition engines.
              </p>
              <div className="text-2xl font-bold text-orange-500">$5.99/month</div>
            </div>

            {/* Premium Enhancement */}
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">💎 Premium Enhancement</h3>
              <p className="text-gray-600 mb-6">
                Ultimate multi-model AI ensemble with predictive intelligence and market analysis.
              </p>
              <div className="text-2xl font-bold text-orange-500">$5.99/month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Your Intelligence Level Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Choose Your Intelligence Level</h2>
            <p className="text-xl text-gray-600">Flexible subscription tiers with optional AI enhancement add-ons</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Pattern Lite */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Pattern Lite</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">FREE</div>
              <p className="text-gray-600 mb-6">3 analyses per day</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Basic pattern analysis</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ 10 mathematical pillars</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Community access</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white py-3 rounded-lg font-semibold transition-all">
                Get Started
              </button>
            </div>

            {/* Pattern Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Pattern Starter</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">$9.99</div>
              <p className="text-gray-600 mb-6">10 analyses per day</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Enhanced pattern analysis</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Daily insights</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Can purchase add-ons</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white py-3 rounded-lg font-semibold transition-all">
                Upgrade
              </button>
            </div>

            {/* Pattern Pro */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Pattern Pro</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">$39.99</div>
              <p className="text-gray-600 mb-6">50 analyses per day</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Advanced AI analysis</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Choose 2 add-ons included</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white py-3 rounded-lg font-semibold transition-all">
                Upgrade Now
              </button>
            </div>

            {/* Pattern Elite */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Pattern Elite</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">$199.99</div>
              <p className="text-gray-600 mb-6">300 analyses per day</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ Maximum AI power</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ All 3 add-ons included</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>✓ VIP support</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-3 rounded-lg font-semibold transition-all">
                Go Elite
              </button>
            </div>
          </div>

          {/* AI Enhancement Add-Ons */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">AI Enhancement Add-Ons</h3>
            <p className="text-gray-600 mb-8">Enhance any subscription with powerful AI add-ons - $5.99/month each</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">Cosmic Intelligence</h4>
                <div className="text-orange-500 font-bold">$5.99/month</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">Claude Nexus Intelligence</h4>
                <div className="text-orange-500 font-bold">$5.99/month</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">Premium Enhancement</h4>
                <div className="text-orange-500 font-bold">$5.99/month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">⚡ FLASH SALE: Analysis Bundles</h2>
              <p className="text-xl text-white">50% OFF - Never expire, use anytime!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 25 Analyses */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">25 Analyses</h3>
                <div className="text-2xl font-bold mb-2">
                  <span className="line-through text-white/60">$12.99</span> $6.49
                </div>
                <p className="text-white/80">$0.26 each</p>
              </div>

              {/* 50 Analyses */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">50 Analyses</h3>
                <div className="text-2xl font-bold mb-2">
                  <span className="line-through text-white/60">$22.99</span> $11.49
                </div>
                <p className="text-white/80">$0.23 each</p>
              </div>

              {/* 125 Analyses */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white border-2 border-yellow-400 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    BEST VALUE
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">125 Analyses</h3>
                <div className="text-2xl font-bold mb-2">
                  <span className="line-through text-white/60">$49.99</span> $24.99
                </div>
                <p className="text-white/80">$0.20 each</p>
              </div>

              {/* 250 Analyses */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">250 Analyses</h3>
                <div className="text-2xl font-bold mb-2">
                  <span className="line-through text-white/60">$89.99</span> $44.99
                </div>
                <p className="text-white/80">$0.18 each</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

