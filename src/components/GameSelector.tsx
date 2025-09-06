'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Clock, 
  DollarSign, 
  Calendar,
  Target,
  Zap,
  Star,
  Crown
} from 'lucide-react'
import { getActiveLotteryGames, getLotteryGame, getNextDrawDate, calculateOdds, type LotteryGame } from '@/lib/lottery-games'

interface GameSelectorProps {
  selectedGameId: string
  onGameSelect: (gameId: string) => void
  className?: string
}

export default function GameSelector({ selectedGameId, onGameSelect, className = '' }: GameSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeLotteryGames = getActiveLotteryGames()
  const selectedGame = getLotteryGame(selectedGameId)

  const handleGameSelect = (gameId: string) => {
    onGameSelect(gameId)
    setIsOpen(false)
  }

  const formatOdds = (odds: number): string => {
    if (odds >= 1000000) {
      return `1 in ${(odds / 1000000).toFixed(1)}M`
    } else if (odds >= 1000) {
      return `1 in ${(odds / 1000).toFixed(0)}K`
    }
    return `1 in ${odds}`
  }

  const getGameIcon = (gameId: string) => {
    switch (gameId) {
      case 'powerball':
      case 'megamillions':
        return <Crown className="h-5 w-5 text-amber-400" />
      case 'lucky4life':
      case 'cash4life':
        return <Star className="h-5 w-5 text-green-400" />
      case 'pick3':
      case 'pick4':
        return <Zap className="h-5 w-5 text-blue-400" />
      default:
        return <Target className="h-5 w-5 text-purple-400" />
    }
  }

  const getGameColor = (gameId: string): string => {
    switch (gameId) {
      case 'powerball':
        return 'from-red-500 to-red-600'
      case 'megamillions':
        return 'from-blue-500 to-blue-600'
      case 'lottoamerica':
        return 'from-green-500 to-green-600'
      case 'lucky4life':
        return 'from-purple-500 to-purple-600'
      case 'cash4life':
        return 'from-emerald-500 to-emerald-600'
      case 'pick3':
        return 'from-orange-500 to-orange-600'
      case 'pick4':
        return 'from-pink-500 to-pink-600'
      case 'fantasy5':
        return 'from-indigo-500 to-indigo-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Selected Game Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          {selectedGame && getGameIcon(selectedGame.id)}
          <div className="text-left">
            <h3 className="text-white font-semibold">
              {selectedGame?.name || 'Select a Game'}
            </h3>
            {selectedGame && (
              <p className="text-slate-400 text-sm">
                {selectedGame.description}
              </p>
            )}
          </div>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              {activeLotteryGames.map((game) => {
                const nextDraw = getNextDrawDate(game.id)
                const odds = calculateOdds(game.id)
                const isSelected = game.id === selectedGameId

                return (
                  <motion.button
                    key={game.id}
                    onClick={() => handleGameSelect(game.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all hover:bg-white/10 ${
                      isSelected ? 'bg-white/10 border border-white/20' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getGameIcon(game.id)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-white font-semibold">{game.name}</h4>
                            {(game.id === 'powerball' || game.id === 'megamillions') && (
                              <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-bold text-black rounded-full">
                                JACKPOT
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm mb-2">{game.description}</p>
                          
                          {/* Game Details */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-1 text-slate-300">
                              <Target className="h-3 w-3" />
                              <span>
                                {game.numbers.count} numbers ({game.numbers.min}-{game.numbers.max})
                                {game.specialBall && ` + ${game.specialBall.name}`}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-slate-300">
                              <DollarSign className="h-3 w-3" />
                              <span>${game.ticketPrice} per play</span>
                            </div>
                            <div className="flex items-center space-x-1 text-slate-300">
                              <Calendar className="h-3 w-3" />
                              <span>{game.drawDays.length === 7 ? 'Daily' : game.drawDays.join(', ')}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-slate-300">
                              <Clock className="h-3 w-3" />
                              <span>Odds: {formatOdds(odds)}</span>
                            </div>
                          </div>

                          {/* Next Draw */}
                          {nextDraw && (
                            <div className="mt-2 p-2 bg-white/5 rounded-lg">
                              <div className="flex items-center space-x-1 text-xs text-amber-400">
                                <Clock className="h-3 w-3" />
                                <span>
                                  Next Draw: {nextDraw.toLocaleDateString()} at {game.drawTime}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Game Color Indicator */}
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getGameColor(game.id)} ml-2 mt-1`} />
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-3">
              <p className="text-xs text-slate-400 text-center">
                Select a lottery game to generate predictions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

