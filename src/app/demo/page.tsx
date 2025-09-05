'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Sparkles, 
  Crown, 
  Zap, 
  Moon, 
  Star, 
  TrendingUp, 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  LogOut,
  Plus,
  BarChart3,
  Target,
  Gem,
  RefreshCw
} from 'lucide-react'

// Mock data for demo
const mockUser = {
  full_name: 'John Doe',
  subscription_tier: 'pro',
  subscription_status: 'active',
  daily_analyses_used: 12,
  daily_analyses_limit: 50,
  cosmic_intelligence_active: true,
  claude_nexus_active: true,
  premium_enhancement_active: false
}

const mockPredictions = [
  {
    id: '1',
    numbers: [7, 14, 21, 35, 42],
    powerball: 18,
    game_type: 'powerball',
    unified_score: 0.24,
    confidence_level: 'high',
    created_at: '2025-09-05T10:30:00Z',
    addons_used: ['cosmic_intelligence', 'claude_nexus'],
    explanation: "Numbers selected based on frequency analysis of past 100 draws. The sequence 7-14-21 shows strong mathematical progression. Cosmic Intelligence detected lunar cycle alignment favoring these combinations. Claude Nexus identified pattern correlation with historical jackpot winners."
  },
  {
    id: '2',
    numbers: [3, 11, 28, 33, 51],
    powerball: 9,
    game_type: 'powerball',
    unified_score: 0.21,
    confidence_level: 'medium',
    created_at: '2025-09-04T15:45:00Z',
    addons_used: ['cosmic_intelligence'],
    explanation: "Statistical analysis shows these numbers are due for selection based on 6-month frequency gaps. Number 28 has strong correlation with current date patterns. Cosmic Intelligence suggests favorable planetary alignment for odd-heavy combinations."
  },
  {
    id: '3',
    numbers: [5, 19, 26, 44, 58],
    powerball: 22,
    game_type: 'powerball',
    unified_score: 0.19,
    confidence_level: 'medium',
    created_at: '2025-09-03T09:15:00Z',
    addons_used: [],
    explanation: "Basic pattern analysis reveals balanced distribution across number ranges. The 19-26 pair has appeared together in 3 of the last 50 draws. Numbers follow Fibonacci-adjacent sequence suggesting mathematical probability alignment."
  }
]

const SUBSCRIPTION_TIERS = {
  free: { name: 'Pattern Lite', price: 0, daily_limit: 3 },
  starter: { name: 'Pattern Starter', price: 9.99, daily_limit: 10 },
  pro: { name: 'Pattern Pro', price: 39.99, daily_limit: 50 },
  elite: { name: 'Pattern Elite', price: 199.99, daily_limit: 300 }
}

const ADDONS = {
  cosmic_intelligence: { name: 'Cosmic Intelligence', icon: '🌙', price: 5.99 },
  claude_nexus: { name: 'Claude Nexus', icon: '🧠', price: 5.99 },
  premium_enhancement: { name: 'Premium Enhancement', icon: '💎', price: 5.99 }
}

export default function DemoDashboard() {
  const [generating, setGenerating] = useState(false)
  const [predictions, setPredictions] = useState(mockPredictions)
  const [addonStates, setAddonStates] = useState({
    cosmic_intelligence_active: mockUser.cosmic_intelligence_active,
    claude_nexus_active: mockUser.claude_nexus_active,
    premium_enhancement_active: mockUser.premium_enhancement_active
  })

  const currentTier = SUBSCRIPTION_TIERS[mockUser.subscription_tier as keyof typeof SUBSCRIPTION_TIERS]
  const usagePercentage = (mockUser.daily_analyses_used / mockUser.daily_analyses_limit) * 100

  const toggleAddon = (addonKey: string) => {
    setAddonStates(prev => ({
      ...prev,
      [`${addonKey}_active`]: !prev[`${addonKey}_active` as keyof typeof prev]
    }))
  }

  const generateExplanation = (numbers: number[], addons: string[]) => {
    const explanations = []
    
    // Base analysis
    explanations.push(`Statistical analysis of numbers ${numbers.join(', ')} shows balanced distribution across ranges.`)
    
    // Add addon-specific explanations
    if (addons.includes('cosmic_intelligence')) {
      explanations.push('Cosmic Intelligence detected favorable celestial alignment for this combination.')
    }
    if (addons.includes('claude_nexus')) {
      explanations.push('Claude Nexus identified pattern correlation with recent winning sequences.')
    }
    if (addons.includes('premium_enhancement')) {
      explanations.push('Premium Enhancement applied advanced mathematical modeling for optimal selection.')
    }
    
    // Add mathematical insight
    const sum = numbers.reduce((a, b) => a + b, 0)
    if (sum > 150) {
      explanations.push('High sum total suggests potential for larger prize pools.')
    } else {
      explanations.push('Moderate sum total aligns with historical winning patterns.')
    }
    
    return explanations.join(' ')
  }

  const generatePrediction = async () => {
    setGenerating(true)
    
    try {
      // Use the real prediction engine adapter
      const { predictionEngineAdapter } = await import('@/lib/prediction-engine-adapter')
      
      const prediction = await predictionEngineAdapter.generatePrediction({
        gameType: 'powerball',
        userId: 'demo-user',
        addonsActive: {
          cosmic_intelligence: addonStates.cosmic_intelligence_active,
          claude_nexus: addonStates.claude_nexus_active,
          premium_enhancement: addonStates.premium_enhancement_active
        }
      })
      
      setPredictions(prev => [prediction, ...prev.slice(0, 9)])
      setGenerating(false)
    } catch (error) {
      console.error('Prediction generation failed:', error)
      setGenerating(false)
    }
  }

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
              <span className="text-xl font-bold text-white">PatternSight Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">Welcome back,</p>
                <p className="text-white font-semibold">{mockUser.full_name}</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Daily Usage</p>
                    <p className="text-2xl font-bold text-white">
                      {mockUser.daily_analyses_used}/{mockUser.daily_analyses_limit}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-amber-400" />
                </div>
                <div className="mt-3 bg-black/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Subscription</p>
                    <p className="text-xl font-bold text-white">{currentTier.name}</p>
                  </div>
                  <Crown className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-sm text-slate-300 mt-1">
                  ${currentTier.price}/month
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Predictions</p>
                    <p className="text-2xl font-bold text-white">{predictions.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </motion.div>
            </div>

            {/* Generate Prediction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Generate New Prediction</h2>
                <p className="text-slate-300 mb-6">
                  Use our advanced AI system to generate lottery number predictions
                </p>
                
                <button
                  onClick={generatePrediction}
                  disabled={generating}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 text-indigo-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Prediction</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Recent Predictions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Recent Predictions</h3>
              
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="bg-black/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-amber-400 uppercase">
                          {prediction.game_type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          prediction.confidence_level === 'high' ? 'bg-green-500/20 text-green-400' :
                          prediction.confidence_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {prediction.confidence_level} confidence
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(prediction.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      {prediction.numbers.map((num, idx) => (
                        <span key={idx} className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 text-indigo-900 rounded-full flex items-center justify-center text-sm font-bold">
                          {num}
                        </span>
                      ))}
                      {prediction.powerball && (
                        <>
                          <span className="text-slate-400">+</span>
                          <span className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {prediction.powerball}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-slate-300">
                        {new Date(prediction.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {prediction.addons_used.length > 0 && (
                        <div className="flex items-center space-x-1">
                          {prediction.addons_used.includes('cosmic_intelligence') && <Moon className="h-4 w-4 text-purple-400" />}
                          {prediction.addons_used.includes('claude_nexus') && <Brain className="h-4 w-4 text-blue-400" />}
                          {prediction.addons_used.includes('premium_enhancement') && <Gem className="h-4 w-4 text-pink-400" />}
                        </div>
                      )}
                    </div>

                    {/* Prediction Explanation */}
                    <div className="bg-black/30 rounded-lg p-3 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-amber-400 font-medium">Analysis: </span>
                        {prediction.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Active Add-ons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Active Add-ons</h3>
              
              <div className="space-y-3">
                {Object.entries(ADDONS).map(([key, addon]) => {
                  const isActive = addonStates[`${key}_active` as keyof typeof addonStates]
                  return (
                    <div key={key} className={`p-3 rounded-lg border ${
                      isActive ? 'bg-green-500/10 border-green-500/20' : 'bg-black/20 border-white/10'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white flex items-center space-x-2">
                          <span>{addon.icon}</span>
                          <span>{addon.name}</span>
                        </span>
                        <button
                          onClick={() => toggleAddon(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isActive ? 'bg-green-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">${addon.price}/month</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all">
                Manage Add-ons
              </button>
            </motion.div>

            {/* Subscription Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Subscription Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Plan</span>
                  <span className="text-white font-medium">{currentTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Cost</span>
                  <span className="text-white font-medium">${currentTier.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Daily Limit</span>
                  <span className="text-white font-medium">{currentTier.daily_limit} analyses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-green-400 font-medium capitalize">{mockUser.subscription_status}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-2 px-4 rounded-lg transition-all">
                Manage Subscription
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <span className="text-white">Profile Settings</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                  <span className="text-white">Usage History</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-slate-400" />
                  <span className="text-white">Account Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

