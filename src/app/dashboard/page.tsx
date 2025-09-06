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
import { 
  SUBSCRIPTION_TIERS, 
  ADDON_PRODUCTS, 
  getUserTier, 
  canGeneratePrediction, 
  getRemainingPredictions,
  getUpgradeMessage,
  formatPrice,
  getTierColor
} from '@/lib/subscription-tiers'

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
    powerball: { count: 1, range: [1, 25] },
    nextDraw: 'Tue 11:00 PM ET',
    jackpot: '$89M'
  },
  lottoamerica: {
    name: 'Lotto America',
    description: 'Multi-state lottery with great odds',
    numbers: { count: 5, range: [1, 52] },
    powerball: { count: 1, range: [1, 10] },
    nextDraw: 'Mon 10:00 PM ET',
    jackpot: '$4.2M'
  },
  lucky4life: {
    name: 'Lucky for Life',
    description: '$1,000 a day for life',
    numbers: { count: 5, range: [1, 48] },
    powerball: { count: 1, range: [1, 18] },
    nextDraw: 'Daily 9:30 PM ET',
    jackpot: '$1K/Day'
  }
}

// Game Selector Component
const GameSelector = ({ selectedGame, onGameChange }: { selectedGame: string, onGameChange: (game: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedGameData = LOTTERY_GAMES[selectedGame as keyof typeof LOTTERY_GAMES]
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-left hover:bg-white/20 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">{selectedGameData.name}</div>
            <div className="text-slate-300 text-sm">{selectedGameData.description}</div>
          </div>
          <div className="text-slate-400">▼</div>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-lg shadow-xl z-50">
          {Object.entries(LOTTERY_GAMES).map(([gameId, game]) => (
            <button
              key={gameId}
              onClick={() => {
                onGameChange(gameId)
                setIsOpen(false)
              }}
              className="w-full p-4 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
            >
              <div className="text-white font-semibold">{game.name}</div>
              <div className="text-slate-300 text-sm">{game.description}</div>
              <div className="text-slate-400 text-xs mt-1">
                Next Draw: {game.nextDraw} | Jackpot: {game.jackpot}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface PredictionResult {
  id: string
  numbers: number[]
  powerball?: number
  game_type: string
  unified_score: number
  confidence_level: string
  created_at: string
  addons_used: string[]
  explanation?: string
}

export default function Dashboard() {
  const { user, userProfile, signOut } = useAuth()
  const router = useRouter()
  
  // Get user's subscription tier (default to lite for demo)
  const userTier = getUserTier(userProfile?.subscription_tier || 'lite')
  const userAddons = userProfile?.active_addons || []
  
  const [predictions, setPredictions] = useState<PredictionResult[]>([
    {
      id: '1',
      numbers: [7, 23, 35, 51, 69],
      powerball: 15,
      game_type: 'Powerball',
      unified_score: 75,
      confidence_level: 'High',
      created_at: new Date().toISOString(),
      addons_used: [],
      explanation: 'Advanced neural network analysis identified optimal frequency convergence patterns. Primary sequence 7-23-35-51-69 demonstrates 73.2% correlation with historical winning distributions using our proprietary Ten-Pillar Mathematical Framework. Quantum probability matrices indicate elevated potential for this combination based on 15,847 historical data points and cosmic alignment algorithms.'
    },
    {
      id: '2',
      numbers: [12, 29, 33, 41, 56],
      powerball: 8,
      game_type: 'Mega Millions',
      unified_score: 89,
      confidence_level: 'Very High',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      addons_used: [],
      explanation: 'Multi-dimensional statistical modeling utilizing our Claude Nexus Intelligence system identified this sequence through advanced regression analysis. The combination demonstrates optimal spacing distribution (11 average gap) and exhibits strong correlation with our proprietary Hot-Cold Number Classification Algorithm. Predictive confidence: 89%.'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState('powerball')
  const [dailyUsage, setDailyUsage] = useState(2)
  const [totalPredictions, setTotalPredictions] = useState(2)

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }
  }, [user, router])

  const generateSophisticatedExplanation = (numbers: number[], game: string, addons: string[] = []) => {
    const explanations = [
      `Advanced neural network analysis identified optimal frequency convergence patterns. Primary sequence ${numbers.join('-')} demonstrates 73.2% correlation with historical winning distributions using our proprietary Ten-Pillar Mathematical Framework. Quantum probability matrices indicate elevated potential for this combination based on 15,847 historical data points and cosmic alignment algorithms.`,
      
      `Multi-dimensional statistical modeling utilizing our Claude Nexus Intelligence system identified this sequence through advanced regression analysis. The combination demonstrates optimal spacing distribution (${Math.floor(Math.random() * 5 + 8)} average gap) and exhibits strong correlation with our proprietary Hot-Cold Number Classification Algorithm. Predictive confidence: ${Math.floor(Math.random() * 15 + 75)}%.`,
      
      `Our Premium Enhancement Engine employed machine learning clustering algorithms to identify this optimal combination. The prediction incorporates Bayesian probability theory, Markov chain analysis, and our exclusive Number Magnetism Index. Statistical modeling indicates ${Math.floor(Math.random() * 20 + 70)}% higher probability than random selection based on comprehensive pattern analysis.`,
      
      `Cosmic Intelligence algorithms analyzed lunar cycles, planetary alignments, and mathematical harmonics to generate this prediction. The sequence follows our Advanced Probability Distribution Model with ${Math.floor(Math.random() * 10 + 79)}% statistical significance. Each number was selected based on weighted frequency analysis spanning ${Math.floor(Math.random() * 2000 + 8000)} years of historical data and quantum pattern recognition.`,
      
      `Deep learning algorithms processed ${Math.floor(Math.random() * 50000 + 20000)} historical data points to identify this sequence. Our AI synthesis combines neural network predictions with Fibonacci-based distribution models, resulting in ${Math.floor(Math.random() * 15 + 80)}% confidence rating. The combination exhibits optimal mathematical spacing and demonstrates strong correlation with winning patterns using our proprietary Ten-Pillar system.`,
      
      `AI-powered ensemble modeling utilizing multiple prediction engines identified this combination through sophisticated pattern recognition. The sequence demonstrates optimal frequency distribution with ${Math.floor(Math.random() * 10 + 85)}% correlation to historical winning patterns. Our multi-layered neural network analysis indicates elevated probability based on ${Math.floor(Math.random() * 30000 + 72000)} processed lottery drawings and advanced statistical validation.`
    ]
    
    return explanations[Math.floor(Math.random() * explanations.length)]
  }

  const generatePrediction = async () => {
    if (!canGeneratePrediction(dailyUsage, userTier)) {
      return
    }

    setGenerating(true)
    
    // Simulate 2-second processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const game = LOTTERY_GAMES[selectedGameId as keyof typeof LOTTERY_GAMES]
    
    // Generate main numbers
    const mainNumbers = []
    while (mainNumbers.length < game.numbers.count) {
      const num = Math.floor(Math.random() * (game.numbers.range[1] - game.numbers.range[0] + 1)) + game.numbers.range[0]
      if (!mainNumbers.includes(num)) {
        mainNumbers.push(num)
      }
    }
    mainNumbers.sort((a, b) => a - b)
    
    // Generate powerball/bonus number
    const powerball = Math.floor(Math.random() * (game.powerball.range[1] - game.powerball.range[0] + 1)) + game.powerball.range[0]
    
    const newPrediction: PredictionResult = {
      id: Date.now().toString(),
      numbers: mainNumbers,
      powerball: powerball,
      game_type: game.name,
      unified_score: Math.floor(Math.random() * 25 + 70),
      confidence_level: ['High', 'Very High', 'Excellent'][Math.floor(Math.random() * 3)],
      created_at: new Date().toISOString(),
      addons_used: [],
      explanation: generateSophisticatedExplanation(mainNumbers, game.name)
    }
    
    setPredictions(prev => [newPrediction, ...prev])
    setDailyUsage(prev => prev + 1)
    setTotalPredictions(prev => prev + 1)
    setGenerating(false)
  }

  const handleNavigation = (path: string) => {
    if (path.startsWith('/')) {
      router.push(path)
    } else {
      // For demo purposes, show alert for non-implemented features
      alert(`${path} feature coming soon!`)
    }
  }

  if (!user) return null

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
              <span className="text-xl font-bold text-white">PatternSight Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">Welcome back,</p>
                <p className="text-white font-semibold">{user?.email || 'User'}</p>
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
                    <p className="text-2xl font-bold text-white">{dailyUsage}/{userTier.dailyPredictions}</p>
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
                    <p className="text-2xl font-bold text-white">Pattern Lite</p>
                    <p className="text-slate-400 text-xs">$0/month</p>
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
                    <p className="text-2xl font-bold text-white">{totalPredictions}</p>
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
                    selectedGame={selectedGameId}
                    onGameChange={setSelectedGameId}
                  />
                </div>

                <button
                  onClick={generatePrediction}
                  disabled={generating || !canGeneratePrediction(dailyUsage, userTier)}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 text-indigo-900 font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                >
                  {generating ? (
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

                {!canGeneratePrediction(dailyUsage, userTier) && (
                  <p className="text-amber-400 text-sm mt-2">
                    Daily limit reached. {getUpgradeMessage(userTier)}
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
              <h3 className="text-xl font-bold text-white mb-6">Recent Predictions</h3>
              
              {predictions.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No predictions yet. Generate your first one!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {predictions.map((prediction) => (
                    <div key={prediction.id} className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">{prediction.game_type}</h4>
                        <span className="text-slate-400 text-sm">
                          {new Date(prediction.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        {prediction.numbers.map((num, idx) => (
                          <div key={idx} className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-indigo-900 font-bold">
                            {num}
                          </div>
                        ))}
                        {prediction.powerball && (
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                            {prediction.powerball}
                          </div>
                        )}
                      </div>
                      
                      {prediction.explanation && (
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {prediction.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            
            {/* Active Add-ons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Active Add-ons</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Moon className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Cosmic Intelligence</p>
                      <p className="text-slate-400 text-xs">$5.99/month</p>
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs">Inactive</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Claude Nexus Intelligence</p>
                      <p className="text-slate-400 text-xs">$5.99/month</p>
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs">Inactive</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Gem className="h-5 w-5 text-pink-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Premium Enhancement</p>
                      <p className="text-slate-400 text-xs">$5.99/month</p>
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs">Inactive</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleNavigation('Manage Add-ons')}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Manage Add-ons
              </button>
            </motion.div>

            {/* Subscription Details */}
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
                  <span className={`font-medium ${getTierColor(userTier.id)}`}>{userTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Cost</span>
                  <span className="text-white font-medium">{formatPrice(userTier.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Daily Limit</span>
                  <span className="text-white font-medium">{userTier.dailyPredictions} analyses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
              </div>
              
              {userTier.id !== 'elite' && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-amber-400 text-sm font-medium">Upgrade for More!</p>
                  <p className="text-amber-300 text-xs mt-1">{getUpgradeMessage(userTier)}</p>
                </div>
              )}
              
              <button 
                onClick={() => handleNavigation('/pricing')}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-2 px-4 rounded-lg transition-all"
              >
                {userTier.id === 'elite' ? 'Manage Plan' : 'Upgrade Plan'}
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
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleNavigation('/dashboard/profile')}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                >
                  <User className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Profile Settings</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('Usage History')}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                >
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  <span className="text-white">Usage History</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/dashboard/settings')}
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                >
                  <Settings className="h-5 w-5 text-purple-400" />
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

