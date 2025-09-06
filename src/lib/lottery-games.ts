// Lottery Games Configuration
export interface LotteryGame {
  id: string
  name: string
  description: string
  numbers: {
    count: number
    min: number
    max: number
  }
  specialBall?: {
    name: string
    min: number
    max: number
  }
  drawDays: string[]
  drawTime: string
  jackpotStart: number
  ticketPrice: number
  active: boolean
}

export const LOTTERY_GAMES: Record<string, LotteryGame> = {
  powerball: {
    id: 'powerball',
    name: 'Powerball',
    description: 'Multi-state lottery with massive jackpots',
    numbers: {
      count: 5,
      min: 1,
      max: 69
    },
    specialBall: {
      name: 'Powerball',
      min: 1,
      max: 26
    },
    drawDays: ['Monday', 'Wednesday', 'Saturday'],
    drawTime: '10:59 PM ET',
    jackpotStart: 20000000,
    ticketPrice: 2,
    active: true
  },
  megamillions: {
    id: 'megamillions',
    name: 'Mega Millions',
    description: 'America\'s other big jackpot game',
    numbers: {
      count: 5,
      min: 1,
      max: 70
    },
    specialBall: {
      name: 'Mega Ball',
      min: 1,
      max: 25
    },
    drawDays: ['Tuesday', 'Friday'],
    drawTime: '11:00 PM ET',
    jackpotStart: 15000000,
    ticketPrice: 2,
    active: true
  },
  lottoamerica: {
    id: 'lottoamerica',
    name: 'Lotto America',
    description: 'Multi-state lottery with great odds',
    numbers: {
      count: 5,
      min: 1,
      max: 52
    },
    specialBall: {
      name: 'Star Ball',
      min: 1,
      max: 10
    },
    drawDays: ['Monday', 'Wednesday', 'Saturday'],
    drawTime: '11:00 PM ET',
    jackpotStart: 2000000,
    ticketPrice: 1,
    active: true
  },
  lucky4life: {
    id: 'lucky4life',
    name: 'Lucky for Life',
    description: '$1,000 a day for life lottery',
    numbers: {
      count: 5,
      min: 1,
      max: 48
    },
    specialBall: {
      name: 'Lucky Ball',
      min: 1,
      max: 18
    },
    drawDays: ['Monday', 'Thursday'],
    drawTime: '10:30 PM ET',
    jackpotStart: 1000, // $1,000/day for life
    ticketPrice: 2,
    active: true
  },
  cash4life: {
    id: 'cash4life',
    name: 'Cash4Life',
    description: '$1,000 a day for life in participating states',
    numbers: {
      count: 5,
      min: 1,
      max: 60
    },
    specialBall: {
      name: 'Cash Ball',
      min: 1,
      max: 4
    },
    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    drawTime: '9:00 PM ET',
    jackpotStart: 1000, // $1,000/day for life
    ticketPrice: 2,
    active: true
  },
  pick3: {
    id: 'pick3',
    name: 'Pick 3',
    description: 'Daily 3-digit lottery game',
    numbers: {
      count: 3,
      min: 0,
      max: 9
    },
    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    drawTime: 'Twice Daily',
    jackpotStart: 500,
    ticketPrice: 1,
    active: true
  },
  pick4: {
    id: 'pick4',
    name: 'Pick 4',
    description: 'Daily 4-digit lottery game',
    numbers: {
      count: 4,
      min: 0,
      max: 9
    },
    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    drawTime: 'Twice Daily',
    jackpotStart: 5000,
    ticketPrice: 1,
    active: true
  },
  fantasy5: {
    id: 'fantasy5',
    name: 'Fantasy 5',
    description: 'Daily 5-number lottery game',
    numbers: {
      count: 5,
      min: 1,
      max: 39
    },
    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    drawTime: '10:30 PM ET',
    jackpotStart: 50000,
    ticketPrice: 1,
    active: true
  }
}

// Get active lottery games
export const getActiveLotteryGames = (): LotteryGame[] => {
  return Object.values(LOTTERY_GAMES).filter(game => game.active)
}

// Get lottery game by ID
export const getLotteryGame = (gameId: string): LotteryGame | undefined => {
  return LOTTERY_GAMES[gameId]
}

// Validate lottery numbers for a specific game
export const validateLotteryNumbers = (
  gameId: string, 
  numbers: number[], 
  specialBall?: number
): { valid: boolean; errors: string[] } => {
  const game = getLotteryGame(gameId)
  if (!game) {
    return { valid: false, errors: ['Invalid game type'] }
  }

  const errors: string[] = []

  // Validate main numbers
  if (numbers.length !== game.numbers.count) {
    errors.push(`Must select exactly ${game.numbers.count} numbers`)
  }

  numbers.forEach((num, index) => {
    if (num < game.numbers.min || num > game.numbers.max) {
      errors.push(`Number ${index + 1} must be between ${game.numbers.min} and ${game.numbers.max}`)
    }
  })

  // Check for duplicates in main numbers
  const uniqueNumbers = new Set(numbers)
  if (uniqueNumbers.size !== numbers.length) {
    errors.push('Numbers must be unique')
  }

  // Validate special ball
  if (game.specialBall) {
    if (specialBall === undefined) {
      errors.push(`Must select a ${game.specialBall.name}`)
    } else if (specialBall < game.specialBall.min || specialBall > game.specialBall.max) {
      errors.push(`${game.specialBall.name} must be between ${game.specialBall.min} and ${game.specialBall.max}`)
    }
  }

  return { valid: errors.length === 0, errors }
}

// Generate random numbers for a lottery game
export const generateRandomNumbers = (gameId: string): { numbers: number[]; specialBall?: number } => {
  const game = getLotteryGame(gameId)
  if (!game) {
    throw new Error('Invalid game type')
  }

  // Generate main numbers
  const numbers: number[] = []
  while (numbers.length < game.numbers.count) {
    const num = Math.floor(Math.random() * (game.numbers.max - game.numbers.min + 1)) + game.numbers.min
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  numbers.sort((a, b) => a - b)

  // Generate special ball if needed
  let specialBall: number | undefined
  if (game.specialBall) {
    specialBall = Math.floor(Math.random() * (game.specialBall.max - game.specialBall.min + 1)) + game.specialBall.min
  }

  return { numbers, specialBall }
}

// Format lottery numbers for display
export const formatLotteryNumbers = (
  gameId: string, 
  numbers: number[], 
  specialBall?: number
): string => {
  const game = getLotteryGame(gameId)
  if (!game) return ''

  let formatted = numbers.join(' - ')
  if (specialBall && game.specialBall) {
    formatted += ` + ${game.specialBall.name}: ${specialBall}`
  }
  return formatted
}

// Get next draw date for a game
export const getNextDrawDate = (gameId: string): Date | null => {
  const game = getLotteryGame(gameId)
  if (!game) return null

  const today = new Date()
  const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.
  
  // Map day names to numbers
  const dayMap: Record<string, number> = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  }

  // Find next draw day
  const drawDayNumbers = game.drawDays.map(day => dayMap[day]).sort((a, b) => a - b)
  
  for (const drawDay of drawDayNumbers) {
    if (drawDay > currentDay) {
      const nextDraw = new Date(today)
      nextDraw.setDate(today.getDate() + (drawDay - currentDay))
      return nextDraw
    }
  }

  // If no draw day this week, get first draw day of next week
  const firstDrawDay = drawDayNumbers[0]
  const nextDraw = new Date(today)
  nextDraw.setDate(today.getDate() + (7 - currentDay + firstDrawDay))
  return nextDraw
}

// Calculate odds of winning for a lottery game
export const calculateOdds = (gameId: string): number => {
  const game = getLotteryGame(gameId)
  if (!game) return 0

  // Calculate combinations for main numbers
  const n = game.numbers.max - game.numbers.min + 1
  const k = game.numbers.count
  
  // Calculate C(n,k) = n! / (k! * (n-k)!)
  let combinations = 1
  for (let i = 0; i < k; i++) {
    combinations = combinations * (n - i) / (i + 1)
  }

  // Multiply by special ball possibilities if applicable
  if (game.specialBall) {
    const specialBallOptions = game.specialBall.max - game.specialBall.min + 1
    combinations *= specialBallOptions
  }

  return Math.round(combinations)
}

