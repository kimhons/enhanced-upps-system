'use client'

import { motion } from 'framer-motion'
import { Brain, Sparkles, ArrowRight, Crown, Zap, Moon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.1),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent)] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-bold text-white">PatternSight</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-2 px-4 rounded-lg transition-all"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              PatternSight v4.0
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced AI-powered lottery analysis platform with subscription tiers, 
              usage tracking, and premium add-ons for enhanced predictions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Access Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/auth/signup"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all border border-white/20"
            >
              Create Account
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Crown className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Subscription Tiers</h3>
              <p className="text-slate-300">
                Free, Starter, Pro, and Elite plans with increasing daily analysis limits
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Zap className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Usage Tracking</h3>
              <p className="text-slate-300">
                Real-time tracking of daily analysis usage with automatic daily resets
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Moon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Premium Add-ons</h3>
              <p className="text-slate-300">
                Cosmic Intelligence, Claude Nexus, and Premium Enhancement add-ons
              </p>
            </div>
          </motion.div>

          {/* Subscription Tiers Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Subscription Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              {/* Free Tier */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Pattern Lite</h3>
                <p className="text-3xl font-bold text-amber-400 mb-4">FREE</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 3 analyses per day</li>
                  <li>• Basic pattern analysis</li>
                  <li>• Community access</li>
                </ul>
              </div>

              {/* Starter Tier */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Pattern Starter</h3>
                <p className="text-3xl font-bold text-amber-400 mb-4">$9.99</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 10 analyses per day</li>
                  <li>• Enhanced analysis</li>
                  <li>• Can purchase add-ons</li>
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="bg-gradient-to-b from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Pattern Pro</h3>
                <p className="text-3xl font-bold text-amber-400 mb-4">$39.99</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 50 analyses per day</li>
                  <li>• Advanced AI analysis</li>
                  <li>• 2 add-ons included</li>
                </ul>
              </div>

              {/* Elite Tier */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Pattern Elite</h3>
                <p className="text-3xl font-bold text-amber-400 mb-4">$199.99</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 300 analyses per day</li>
                  <li>• Maximum AI power</li>
                  <li>• All 3 add-ons included</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
