'use client'

import { useState, useEffect } from 'react'
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
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase, SUBSCRIPTION_TIERS, ADDONS } from '@/lib/supabase'

interface PredictionResult {
  id: string
  numbers: number[]
  powerball?: number
  game_type: string
  unified_score: number
  confidence_level: string
  created_at: string
  addons_used: string[]
}

export default function Dashboard() {
  const { user, userProfile, signOut, canGeneratePrediction, incrementUsage } = useAuth()
  const router = useRouter()
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }
    
    // Check if disclaimer has been accepted
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted')
    if (!disclaimerAccepted) {
      router.push('/auth/disclaimer')
      return
    }
    fetchPredictions()
  }, [user, router])

  const fetchPredictions = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setPredictions(data || [])
    } catch (error) {
      console.error('Error fetching predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePrediction = async () => {
    if (!user || !userProfile || !canGeneratePrediction()) {
      alert('You have reached your daily analysis limit. Please upgrade your subscription for more analyses.')
      return
    }

    setGenerating(true)
    try {
      // Use the real prediction engine adapter
      const { predictionEngineAdapter } = await import('@/lib/prediction-engine-adapter')
      
      const prediction = await predictionEngineAdapter.generatePrediction({
        gameType: 'powerball',
        userId: user.id,
        addonsActive: {
          cosmic_intelligence: userProfile.cosmic_intelligence_active,
          claude_nexus: userProfile.claude_nexus_active,
          premium_enhancement: userProfile.premium_enhancement_active
        }
      })

      const { data, error } = await supabase
        .from('predictions')
        .insert({
          user_id: user.id,
          numbers: prediction.numbers,
          powerball: prediction.powerball,
          game_type: prediction.game_type,
          statistical_score: 0.20, // Realistic base score
          ai_score: 0.22,
          cosmic_score: userProfile.cosmic_intelligence_active ? 0.21 : 0,
          unified_score: 0.21, // Average realistic score
          confidence_level: prediction.confidence_level,
          target_date: new Date().toISOString().split('T')[0],
          analysis_type: userProfile.subscription_tier === 'free' ? 'basic' : 'enhanced',
          addons_used: prediction.addons_used,
          explanation: prediction.explanation
        })
        .select()
        .single()

      if (error) throw error

      // Increment usage count
      await incrementUsage()
      
      // Add to predictions list
      setPredictions(prev => [data, ...prev.slice(0, 9)])
      
    } catch (error) {
      console.error('Error generating prediction:', error)
      alert('Failed to generate prediction. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const currentTier = SUBSCRIPTION_TIERS[userProfile.subscription_tier as keyof typeof SUBSCRIPTION_TIERS]
  const usagePercentage = (userProfile.daily_analyses_used / userProfile.daily_analyses_limit) * 100

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
                <p className="text-white font-semibold">{userProfile.full_name}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
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
                      {userProfile.daily_analyses_used}/{userProfile.daily_analyses_limit}
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
                  disabled={generating || !canGeneratePrediction()}
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

                {!canGeneratePrediction() && (
                  <p className="text-red-400 text-sm mt-3">
                    Daily limit reached. Upgrade for more analyses.
                  </p>
                )}
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
              
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 text-amber-400 animate-spin mx-auto mb-2" />
                  <p className="text-slate-300">Loading predictions...</p>
                </div>
              ) : predictions.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300">No predictions yet. Generate your first one!</p>
                </div>
              ) : (
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
                      {prediction.explanation && (
                        <div className="bg-black/30 rounded-lg p-3 mt-3">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <span className="text-amber-400 font-medium">Analysis: </span>
                            {prediction.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                  const isActive = userProfile[`${key}_active` as keyof typeof userProfile] as boolean
                  return (
                    <div key={key} className={`p-3 rounded-lg border ${
                      isActive ? 'bg-green-500/10 border-green-500/20' : 'bg-black/20 border-white/10'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white flex items-center space-x-2">
                          <span>{addon.icon}</span>
                          <span>{addon.name}</span>
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">${addon.price}/month</p>
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
                  <span className="text-green-400 font-medium capitalize">{userProfile.subscription_status}</span>
                </div>
              </div>

              {userProfile.subscription_tier === 'free' && (
                <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-lg">
                  <p className="text-amber-400 text-sm font-medium mb-2">Upgrade for More!</p>
                  <p className="text-xs text-slate-300">Get unlimited analyses and premium features</p>
                </div>
              )}

              <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-2 px-4 rounded-lg transition-all">
                {userProfile.subscription_tier === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
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

