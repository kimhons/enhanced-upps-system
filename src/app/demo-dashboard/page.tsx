'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Crown, 
  Target,
  User,
  BarChart3,
  Settings,
  Sparkles,
  Calendar,
  Clock,
  DollarSign,
  Zap,
  ChevronDown
} from 'lucide-react'

// Lottery games configuration
const LOTTERY_GAMES = {
  powerball: {
    name: 'Powerball',
    description: 'Multi-state lottery with huge jackpots',
    numbers: { count: 5, range: [1, 69] },
    powerball: { count: 1, range: [1, 26] },
    nextDraw: 'Wed 9:00 PM ET',
    jackpot: '$150M'
  },
  megamillions: {
    name: 'Mega Millions',
    description: 'America\'s other big jackpot game',
    numbers: { count: 5, range: [1, 70] },
    megaball: { count: 1, range: [1, 25] },
    nextDraw: 'Tue 11:00 PM ET',
    jackpot: '$89M'
  },
  lottoamerica: {
    name: 'Lotto America',
    description: 'Multi-state lottery with great odds',
    numbers: { count: 5, range: [1, 52] },
    starball: { count: 1, range: [1, 10] },
    nextDraw: 'Mon 10:00 PM ET',
    jackpot: '$12M'
  },
  lucky4life: {
    name: 'Lucky for Life',
    description: '$1,000 a day for life',
    numbers: { count: 5, range: [1, 48] },
    luckyball: { count: 1, range: [1, 18] },
    nextDraw: 'Thu 10:30 PM ET',
    jackpot: '$1K/Day'
  }
}

// Inline GameSelector component
function GameSelector({ selectedGame, onGameChange }: { selectedGame: string, onGameChange: (game: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedGameData = LOTTERY_GAMES[selectedGame as keyof typeof LOTTERY_GAMES]
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-left text-white hover:bg-black/30 transition-colors flex items-center justify-between"
      >
        <div>
          <span className="font-medium">{selectedGameData?.name || 'Select Game'}</span>
          {selectedGameData && (
            <p className="text-sm text-slate-400">{selectedGameData.description}</p>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
          {Object.entries(LOTTERY_GAMES).map(([key, game]) => (
            <button
              key={key}
              onClick={() => {
                onGameChange(key)
                setIsOpen(false)
              }}
              className="w-full text-left p-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
            >
              <div className="text-white font-medium">{game.name}</div>
              <div className="text-sm text-slate-400">{game.description}</div>
              <div className="text-xs text-slate-500 mt-1">
                Next Draw: {game.nextDraw} | Jackpot: {game.jackpot}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Advanced prediction generator with sophisticated explanations
function generatePrediction(gameKey: string) {
  const game = LOTTERY_GAMES[gameKey as keyof typeof LOTTERY_GAMES]
  if (!game) return null

  const numbers = []
  for (let i = 0; i < game.numbers.count; i++) {
    let num
    do {
      num = Math.floor(Math.random() * (game.numbers.range[1] - game.numbers.range[0] + 1)) + game.numbers.range[0]
    } while (numbers.includes(num))
    numbers.push(num)
  }
  numbers.sort((a, b) => a - b)

  let specialBall = null
  if (game.powerball) {
    specialBall = Math.floor(Math.random() * (game.powerball.range[1] - game.powerball.range[0] + 1)) + game.powerball.range[0]
  } else if (game.megaball) {
    specialBall = Math.floor(Math.random() * (game.megaball.range[1] - game.megaball.range[0] + 1)) + game.megaball.range[0]
  } else if (game.starball) {
    specialBall = Math.floor(Math.random() * (game.starball.range[1] - game.starball.range[0] + 1)) + game.starball.range[0]
  } else if (game.luckyball) {
    specialBall = Math.floor(Math.random() * (game.luckyball.range[1] - game.luckyball.range[0] + 1)) + game.luckyball.range[0]
  }

  // Generate sophisticated explanation
  const explanations = [
    `Advanced neural network analysis identified optimal frequency convergence patterns. Primary sequence ${numbers.join('-')} demonstrates 73.2% correlation with historical winning distributions using our proprietary Ten-Pillar Mathematical Framework. Quantum probability matrices indicate elevated potential for this combination based on 15,847 historical data points and cosmic alignment algorithms.`,
    
    `Deep learning algorithms processed ${Math.floor(Math.random() * 50000 + 10000)} historical draws through our Enhanced Pattern Recognition Engine. The selected numbers exhibit strong mathematical coherence with Fibonacci-based distribution models and prime number clustering analysis. Temporal frequency analysis shows ${Math.floor(Math.random() * 30 + 60)}% probability enhancement over random selection.`,
    
    `Multi-dimensional statistical modeling utilizing our Claude Nexus Intelligence system identified this sequence through advanced regression analysis. The combination demonstrates optimal spacing distribution (${Math.floor(Math.random() * 15 + 8)} average gap) and exhibits strong correlation with our proprietary Hot-Cold Number Classification Algorithm. Predictive confidence: ${Math.floor(Math.random() * 20 + 75)}%.`,
    
    `Cosmic Intelligence algorithms analyzed lunar cycles, planetary alignments, and mathematical harmonics to generate this prediction. The sequence follows our Advanced Probability Distribution Model with ${Math.floor(Math.random() * 25 + 70)}% statistical significance. Each number was selected based on weighted frequency analysis spanning ${Math.floor(Math.random() * 10 + 5)} years of historical data and quantum pattern recognition.`,
    
    `Our Premium Enhancement Engine employed machine learning clustering algorithms to identify this optimal combination. The prediction incorporates Bayesian probability theory, Markov chain analysis, and our exclusive Number Magnetism Index. Statistical modeling indicates ${Math.floor(Math.random() * 30 + 65)}% higher probability than random selection based on comprehensive pattern analysis.`,
    
    `Advanced AI synthesis combining frequency analysis, gap theory, and our proprietary Cosmic Resonance Algorithm. The selected numbers demonstrate optimal mathematical distribution with ${Math.floor(Math.random() * 20 + 12)} standard deviation from mean. Our Ten-Pillar System identified this sequence through multi-layered neural network processing of ${Math.floor(Math.random() * 100000 + 50000)} historical data points.`
  ]

  const randomExplanation = explanations[Math.floor(Math.random() * explanations.length)]

  return {
    numbers,
    specialBall,
    explanation: randomExplanation
  }
}

// Mock user profile for demo
const mockUserProfile = {
  id: 'demo-user',
  user_id: 'demo-user',
  full_name: 'Demo User',
  email: 'demo@patternsight.app',
  subscription_tier: 'free',
  subscription_status: 'active',
  daily_usage: 1,
  cosmic_intelligence_active: false,
  claude_nexus_intelligence_active: false,
  premium_enhancement_active: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Add-ons configuration
const ADDONS = {
  cosmic_intelligence: {
    name: 'Cosmic Intelligence',
    price: 9.99,
    icon: '🌌'
  },
  claude_nexus_intelligence: {
    name: 'Claude Nexus Intelligence',
    price: 14.99,
    icon: '🧠'
  },
  premium_enhancement: {
    name: 'Premium Enhancement',
    price: 19.99,
    icon: '💎'
  }
}

// Subscription tiers
const SUBSCRIPTION_TIERS = {
  free: { name: 'Pattern Lite', price: 0, daily_limit: 3 },
  starter: { name: 'Pattern Starter', price: 29, daily_limit: 25 },
  elite: { name: 'Pattern Elite', price: 79, daily_limit: 100 }
}

export default function DemoDashboardPage() {
  const [userProfile, setUserProfile] = useState(mockUserProfile)
  const [selectedGame, setSelectedGame] = useState('powerball')
  const [isGenerating, setIsGenerating] = useState(false)
  const [predictions, setPredictions] = useState<any[]>([])
  const [recentPredictions, setRecentPredictions] = useState<any[]>([])

  const currentTier = SUBSCRIPTION_TIERS[userProfile.subscription_tier as keyof typeof SUBSCRIPTION_TIERS]

  // Mock recent predictions with sophisticated explanations
  useEffect(() => {
    setRecentPredictions([
      {
        id: '1',
        game: 'Powerball',
        numbers: [7, 23, 35, 51, 69],
        specialBall: 15,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        explanation: 'Advanced neural network analysis identified optimal frequency convergence patterns. Primary sequence 7-23-35-51-69 demonstrates 73.2% correlation with historical winning distributions using our proprietary Ten-Pillar Mathematical Framework. Quantum probability matrices indicate elevated potential for this combination based on 15,847 historical data points and cosmic alignment algorithms.'
      },
      {
        id: '2',
        game: 'Mega Millions',
        numbers: [12, 29, 33, 41, 56],
        specialBall: 8,
        created_at: new Date(Date.now() - 7200000).toISOString(),
        explanation: 'Multi-dimensional statistical modeling utilizing our Claude Nexus Intelligence system identified this sequence through advanced regression analysis. The combination demonstrates optimal spacing distribution (11 average gap) and exhibits strong correlation with our proprietary Hot-Cold Number Classification Algorithm. Predictive confidence: 89%.'
      }
    ])
  }, [])

  const handleGeneratePrediction = async () => {
    setIsGenerating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      const prediction = generatePrediction(selectedGame)
      
      if (prediction) {
        const newPrediction = {
          id: Date.now().toString(),
          game: LOTTERY_GAMES[selectedGame as keyof typeof LOTTERY_GAMES].name,
          numbers: prediction.numbers,
          specialBall: prediction.specialBall,
          created_at: new Date().toISOString(),
          explanation: prediction.explanation
        }
        
        setPredictions(prev => [newPrediction, ...prev])
        setRecentPredictions(prev => [newPrediction, ...prev.slice(0, 4)])
        
        // Update daily usage
        setUserProfile(prev => ({ ...prev, daily_usage: prev.daily_usage + 1 }))
      }
    } catch (error) {
      console.error('Error generating prediction:', error)
      alert('Failed to generate prediction. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleProfileSettings = () => {
    alert('Navigating to Profile Settings... (Demo)')
  }

  const handleUsageHistory = () => {
    alert('Navigating to Usage History... (Demo)')
  }

  const handleAccountSettings = () => {
    window.open('/demo-settings', '_blank')
  }

  const handleManageAddons = () => {
    alert('Navigating to Manage Add-ons... (Demo)')
  }

  const handleUpgradePlan = () => {
    alert('Navigating to Pricing Page... (Demo)')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.1),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent)] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent)] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-bold text-white">PatternSight Dashboard (Demo)</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">Welcome back,</p>
                <p className="text-white font-semibold">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Daily Usage</p>
                    <p className="text-2xl font-bold text-white">{userProfile.daily_usage}/{currentTier.daily_limit}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-amber-400" />
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
                    <p className="text-2xl font-bold text-white">{currentTier.name}</p>
                    <p className="text-slate-400 text-xs">${currentTier.price}/month</p>
                  </div>
                  <Crown className="h-8 w-8 text-purple-400" />
                </div>
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
                    <p className="text-2xl font-bold text-white">{recentPredictions.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </motion.div>
            </div>

            {/* Generate New Prediction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Generate New Prediction</h2>
                <p className="text-slate-300 mb-6">Use our advanced AI system to generate lottery number predictions</p>
                
                {/* Game Selector */}
                <div className="mb-6">
                  <GameSelector 
                    selectedGame={selectedGame}
                    onGameChange={setSelectedGame}
                  />
                </div>

                <button
                  onClick={handleGeneratePrediction}
                  disabled={isGenerating || userProfile.daily_usage >= currentTier.daily_limit}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 text-indigo-900 font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-900"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Prediction</span>
                    </>
                  )}
                </button>

                {userProfile.daily_usage >= currentTier.daily_limit && (
                  <p className="text-amber-400 text-sm mt-2">
                    Daily limit reached. Upgrade for more predictions!
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
              
              {recentPredictions.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">No predictions yet. Generate your first one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPredictions.map((prediction) => (
                    <div key={prediction.id} className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{prediction.game}</h4>
                        <span className="text-slate-400 text-sm">
                          {new Date(prediction.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        {prediction.numbers.map((number: number, index: number) => (
                          <div key={index} className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-indigo-900 font-bold text-sm">
                            {number}
                          </div>
                        ))}
                        {prediction.specialBall && (
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {prediction.specialBall}
                          </div>
                        )}
                      </div>
                      
                      {prediction.explanation && (
                        <p className="text-slate-300 text-sm">{prediction.explanation}</p>
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

              <button 
                onClick={handleManageAddons}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
              >
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

              <button 
                onClick={handleUpgradePlan}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-2 px-4 rounded-lg transition-all"
              >
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
                <button 
                  onClick={handleProfileSettings}
                  className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3"
                >
                  <User className="h-5 w-5 text-slate-400" />
                  <span className="text-white">Profile Settings</span>
                </button>
                <button 
                  onClick={handleUsageHistory}
                  className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3"
                >
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                  <span className="text-white">Usage History</span>
                </button>
                <button 
                  onClick={handleAccountSettings}
                  className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3"
                >
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

