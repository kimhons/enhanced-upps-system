/**
 * Lottery Database Schema and Operations
 * Production-ready database integration for lottery data
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database Types
export interface LotteryGame {
  id: string;
  name: string;
  type: 'powerball' | 'megamillions' | 'state' | 'international';
  min_number: number;
  max_number: number;
  total_numbers: number;
  special_ball_min?: number;
  special_ball_max?: number;
  draw_days: string[];
  draw_time: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DrawResult {
  id: string;
  game_id: string;
  draw_date: string;
  numbers: number[];
  special_ball?: number;
  jackpot_amount: string;
  winners_count?: number;
  next_draw_date: string;
  next_jackpot_amount: string;
  created_at: string;
  updated_at: string;
}

export interface PredictionRecord {
  id: string;
  user_id: string;
  game_id: string;
  predicted_numbers: number[];
  predicted_special_ball?: number;
  confidence_score: number;
  algorithm_used: string;
  prediction_date: string;
  draw_date: string;
  result_numbers?: number[];
  result_special_ball?: number;
  matches: number;
  special_ball_match: boolean;
  prize_tier?: string;
  prize_amount?: string;
  created_at: string;
  updated_at: string;
}

export interface FrequencyAnalysis {
  id: string;
  game_id: string;
  number: number;
  frequency: number;
  last_drawn: string;
  gap_days: number;
  hot_cold_status: 'hot' | 'cold' | 'neutral';
  analysis_period: string;
  created_at: string;
  updated_at: string;
}

export interface PatternAnalysis {
  id: string;
  game_id: string;
  pattern_type: 'sum_range' | 'even_odd' | 'high_low' | 'consecutive' | 'gap';
  pattern_data: any;
  frequency: number;
  last_occurrence: string;
  confidence_score: number;
  analysis_period: string;
  created_at: string;
  updated_at: string;
}

class LotteryDatabase {
  /**
   * Initialize database tables (run once during setup)
   */
  async initializeTables(): Promise<void> {
    try {
      // Create lottery_games table
      await supabase.rpc('create_lottery_games_table');
      
      // Create draw_results table
      await supabase.rpc('create_draw_results_table');
      
      // Create prediction_records table
      await supabase.rpc('create_prediction_records_table');
      
      // Create frequency_analysis table
      await supabase.rpc('create_frequency_analysis_table');
      
      // Create pattern_analysis table
      await supabase.rpc('create_pattern_analysis_table');
      
      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing database tables:', error);
      throw error;
    }
  }

  /**
   * Insert or update lottery game configuration
   */
  async upsertLotteryGame(game: Omit<LotteryGame, 'id' | 'created_at' | 'updated_at'>): Promise<LotteryGame | null> {
    try {
      const { data, error } = await supabase
        .from('lottery_games')
        .upsert({
          ...game,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error upserting lottery game:', error);
      return null;
    }
  }

  /**
   * Insert new draw result
   */
  async insertDrawResult(result: Omit<DrawResult, 'id' | 'created_at' | 'updated_at'>): Promise<DrawResult | null> {
    try {
      const { data, error } = await supabase
        .from('draw_results')
        .insert({
          ...result,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error inserting draw result:', error);
      return null;
    }
  }

  /**
   * Get latest draw results for a game
   */
  async getLatestDrawResults(gameId: string, limit: number = 10): Promise<DrawResult[]> {
    try {
      const { data, error } = await supabase
        .from('draw_results')
        .select('*')
        .eq('game_id', gameId)
        .order('draw_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting latest draw results:', error);
      return [];
    }
  }

  /**
   * Get historical draw results for analysis
   */
  async getHistoricalDrawResults(
    gameId: string, 
    startDate: string, 
    endDate: string
  ): Promise<DrawResult[]> {
    try {
      const { data, error } = await supabase
        .from('draw_results')
        .select('*')
        .eq('game_id', gameId)
        .gte('draw_date', startDate)
        .lte('draw_date', endDate)
        .order('draw_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting historical draw results:', error);
      return [];
    }
  }

  /**
   * Insert prediction record
   */
  async insertPrediction(prediction: Omit<PredictionRecord, 'id' | 'created_at' | 'updated_at'>): Promise<PredictionRecord | null> {
    try {
      const { data, error } = await supabase
        .from('prediction_records')
        .insert({
          ...prediction,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error inserting prediction:', error);
      return null;
    }
  }

  /**
   * Update prediction with actual results
   */
  async updatePredictionResults(
    predictionId: string,
    resultNumbers: number[],
    resultSpecialBall?: number
  ): Promise<PredictionRecord | null> {
    try {
      // Calculate matches
      const { data: prediction } = await supabase
        .from('prediction_records')
        .select('*')
        .eq('id', predictionId)
        .single();

      if (!prediction) return null;

      const matches = prediction.predicted_numbers.filter((num: number) => 
        resultNumbers.includes(num)
      ).length;

      const specialBallMatch = prediction.predicted_special_ball === resultSpecialBall;

      // Determine prize tier (simplified logic)
      let prizeTier = 'no_prize';
      let prizeAmount = '$0';

      if (matches >= 3) {
        if (matches === 5 && specialBallMatch) {
          prizeTier = 'jackpot';
        } else if (matches === 5) {
          prizeTier = 'second_prize';
          prizeAmount = '$1,000,000';
        } else if (matches === 4 && specialBallMatch) {
          prizeTier = 'third_prize';
          prizeAmount = '$50,000';
        } else if (matches === 4) {
          prizeTier = 'fourth_prize';
          prizeAmount = '$100';
        } else if (matches === 3 && specialBallMatch) {
          prizeTier = 'fifth_prize';
          prizeAmount = '$100';
        } else if (matches === 3) {
          prizeTier = 'sixth_prize';
          prizeAmount = '$7';
        }
      }

      const { data, error } = await supabase
        .from('prediction_records')
        .update({
          result_numbers: resultNumbers,
          result_special_ball: resultSpecialBall,
          matches,
          special_ball_match: specialBallMatch,
          prize_tier: prizeTier,
          prize_amount: prizeAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', predictionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating prediction results:', error);
      return null;
    }
  }

  /**
   * Get user predictions
   */
  async getUserPredictions(userId: string, limit: number = 50): Promise<PredictionRecord[]> {
    try {
      const { data, error } = await supabase
        .from('prediction_records')
        .select('*')
        .eq('user_id', userId)
        .order('prediction_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting user predictions:', error);
      return [];
    }
  }

  /**
   * Calculate and store frequency analysis
   */
  async updateFrequencyAnalysis(gameId: string): Promise<void> {
    try {
      // Get historical data for the last 2 years
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      
      const historicalResults = await this.getHistoricalDrawResults(
        gameId,
        twoYearsAgo.toISOString(),
        new Date().toISOString()
      );

      // Calculate frequency for each number
      const frequencyMap = new Map<number, { count: number; lastDrawn: string }>();
      
      historicalResults.forEach(result => {
        result.numbers.forEach(number => {
          const current = frequencyMap.get(number) || { count: 0, lastDrawn: '' };
          frequencyMap.set(number, {
            count: current.count + 1,
            lastDrawn: result.draw_date > current.lastDrawn ? result.draw_date : current.lastDrawn
          });
        });
      });

      // Clear existing frequency analysis for this game
      await supabase
        .from('frequency_analysis')
        .delete()
        .eq('game_id', gameId);

      // Insert new frequency analysis
      const frequencyRecords = Array.from(frequencyMap.entries()).map(([number, data]) => {
        const lastDrawnDate = new Date(data.lastDrawn);
        const today = new Date();
        const gapDays = Math.floor((today.getTime() - lastDrawnDate.getTime()) / (1000 * 60 * 60 * 24));
        
        let hotColdStatus: 'hot' | 'cold' | 'neutral' = 'neutral';
        if (data.count > historicalResults.length * 0.15) hotColdStatus = 'hot';
        else if (data.count < historicalResults.length * 0.05) hotColdStatus = 'cold';

        return {
          game_id: gameId,
          number,
          frequency: data.count,
          last_drawn: data.lastDrawn,
          gap_days: gapDays,
          hot_cold_status: hotColdStatus,
          analysis_period: '2_years',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      });

      const { error } = await supabase
        .from('frequency_analysis')
        .insert(frequencyRecords);

      if (error) throw error;
      console.log(`Frequency analysis updated for game ${gameId}`);
    } catch (error) {
      console.error('Error updating frequency analysis:', error);
      throw error;
    }
  }

  /**
   * Get frequency analysis for a game
   */
  async getFrequencyAnalysis(gameId: string): Promise<FrequencyAnalysis[]> {
    try {
      const { data, error } = await supabase
        .from('frequency_analysis')
        .select('*')
        .eq('game_id', gameId)
        .order('frequency', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting frequency analysis:', error);
      return [];
    }
  }

  /**
   * Get all active lottery games
   */
  async getActiveLotteryGames(): Promise<LotteryGame[]> {
    try {
      const { data, error } = await supabase
        .from('lottery_games')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting active lottery games:', error);
      return [];
    }
  }

  /**
   * Get prediction accuracy statistics
   */
  async getPredictionAccuracy(userId?: string): Promise<{
    totalPredictions: number;
    winningPredictions: number;
    accuracy: number;
    totalPrizeAmount: number;
  }> {
    try {
      let query = supabase
        .from('prediction_records')
        .select('matches, prize_amount');

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;
      if (error) throw error;

      const predictions = data || [];
      const totalPredictions = predictions.length;
      const winningPredictions = predictions.filter(p => p.matches >= 3).length;
      const accuracy = totalPredictions > 0 ? (winningPredictions / totalPredictions) * 100 : 0;
      
      const totalPrizeAmount = predictions.reduce((sum, p) => {
        const amount = parseFloat(p.prize_amount?.replace(/[$,]/g, '') || '0');
        return sum + amount;
      }, 0);

      return {
        totalPredictions,
        winningPredictions,
        accuracy,
        totalPrizeAmount
      };
    } catch (error) {
      console.error('Error getting prediction accuracy:', error);
      return {
        totalPredictions: 0,
        winningPredictions: 0,
        accuracy: 0,
        totalPrizeAmount: 0
      };
    }
  }
}

// Export singleton instance
export const lotteryDatabase = new LotteryDatabase();

// Export utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

