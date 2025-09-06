/**
 * Prediction Engine Adapter
 * Integrates the 10-pillar mathematical system with the dashboard
 */

import { tenPillarSystem } from './ten-pillar-system';
import { getLotteryGame, generateRandomNumbers, type LotteryGame } from './lottery-games';

interface SimplifiedPredictionInput {
  gameType: string; // Support all lottery game types
  userId: string;
  addonsActive: {
    cosmic_intelligence: boolean;
    claude_nexus: boolean;
    premium_enhancement: boolean;
  };
}

interface SimplifiedPredictionResult {
  id: string;
  numbers: number[];
  powerball?: number;
  game_type: string;
  confidence_level: 'high' | 'medium' | 'low';
  created_at: string;
  addons_used: string[];
  explanation: string;
  pillar_analysis?: {
    top_pillars: string[];
    unified_score: number;
    pillar_count: number;
  };
}

export class PredictionEngineAdapter {
  
  /**
   * Generate a single prediction using the 10-pillar mathematical system
   */
  async generatePrediction(input: SimplifiedPredictionInput): Promise<SimplifiedPredictionResult> {
    try {
      const { gameType, userId, addonsActive } = input;
      
      // Get lottery game configuration
      const game = getLotteryGame(gameType);
      if (!game) {
        throw new Error(`Unsupported game type: ${gameType}`);
      }
      
      // Generate numbers based on game configuration
      const { numbers, specialBall } = this.generateGameSpecificNumbers(game, addonsActive);
      
      // Generate comprehensive 10-pillar analysis
      const tenPillarAnalysis = await tenPillarSystem.generateTenPillarAnalysis(
        gameType,
        undefined, // Historical data would be loaded here in production
        addonsActive
      );
      
      // Get active addons list
      const addons_used = Object.entries(addonsActive)
        .filter(([_, active]) => active)
        .map(([addon, _]) => addon);
      
      // Get top 3 performing pillars for summary
      const topPillars = tenPillarAnalysis.pillars
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(pillar => pillar.pillarName);
      
      // Create detailed explanation
      const explanation = this.generateExplanation(game, numbers, specialBall, tenPillarAnalysis, addons_used);
      
      return {
        id: Date.now().toString(),
        numbers: numbers,
        powerball: specialBall,
        game_type: gameType,
        confidence_level: tenPillarAnalysis.confidenceLevel,
        created_at: new Date().toISOString(),
        addons_used,
        explanation,
        pillar_analysis: {
          top_pillars: topPillars,
          unified_score: tenPillarAnalysis.unifiedScore,
          pillar_count: 10
        }
      };
      
    } catch (error) {
      console.error('10-Pillar prediction generation error:', error);
      throw new Error('Failed to generate 10-pillar prediction');
    }
  }
  
  /**
   * Generate numbers specific to the lottery game type
   */
  private generateGameSpecificNumbers(game: LotteryGame, addonsActive: any): { numbers: number[]; specialBall?: number } {
    // Use enhanced random generation with mathematical weighting
    const baseNumbers = generateRandomNumbers(game.id);
    
    // Apply 10-pillar mathematical enhancements
    const enhancedNumbers = this.applyMathematicalEnhancements(baseNumbers.numbers, game, addonsActive);
    
    return {
      numbers: enhancedNumbers,
      specialBall: baseNumbers.specialBall
    };
  }
  
  /**
   * Apply mathematical enhancements to base numbers
   */
  private applyMathematicalEnhancements(numbers: number[], game: LotteryGame, addonsActive: any): number[] {
    let enhanced = [...numbers];
    
    // Apply frequency analysis (hot/cold numbers)
    enhanced = this.applyFrequencyAnalysis(enhanced, game);
    
    // Apply pattern recognition
    enhanced = this.applyPatternRecognition(enhanced, game);
    
    // Apply cosmic intelligence if active
    if (addonsActive.cosmic_intelligence) {
      enhanced = this.applyCosmicIntelligence(enhanced, game);
    }
    
    // Apply Claude Nexus if active
    if (addonsActive.claude_nexus) {
      enhanced = this.applyClaudeNexus(enhanced, game);
    }
    
    // Apply Premium Enhancement if active
    if (addonsActive.premium_enhancement) {
      enhanced = this.applyPremiumEnhancement(enhanced, game);
    }
    
    return enhanced.sort((a, b) => a - b);
  }
  
  /**
   * Apply frequency analysis to numbers
   */
  private applyFrequencyAnalysis(numbers: number[], game: LotteryGame): number[] {
    // Simulate hot/cold number analysis
    const hotNumbers = this.getHotNumbers(game);
    const enhanced = [...numbers];
    
    // Replace 1-2 numbers with hot numbers (30% chance each)
    for (let i = 0; i < enhanced.length; i++) {
      if (Math.random() < 0.3 && hotNumbers.length > 0) {
        const hotNumber = hotNumbers[Math.floor(Math.random() * hotNumbers.length)];
        if (!enhanced.includes(hotNumber)) {
          enhanced[i] = hotNumber;
        }
      }
    }
    
    return enhanced;
  }
  
  /**
   * Apply pattern recognition
   */
  private applyPatternRecognition(numbers: number[], game: LotteryGame): number[] {
    // Simulate pattern-based adjustments
    const enhanced = [...numbers];
    
    // Avoid consecutive numbers (reduce by 50%)
    for (let i = 0; i < enhanced.length - 1; i++) {
      if (enhanced[i + 1] === enhanced[i] + 1 && Math.random() < 0.5) {
        // Replace with a non-consecutive number
        let newNumber;
        do {
          newNumber = Math.floor(Math.random() * (game.numbers.max - game.numbers.min + 1)) + game.numbers.min;
        } while (enhanced.includes(newNumber) || Math.abs(newNumber - enhanced[i]) === 1);
        enhanced[i + 1] = newNumber;
      }
    }
    
    return enhanced;
  }
  
  /**
   * Apply cosmic intelligence enhancements
   */
  private applyCosmicIntelligence(numbers: number[], game: LotteryGame): number[] {
    // Simulate lunar phase and numerological influences
    const enhanced = [...numbers];
    const lunarInfluence = this.getLunarInfluence();
    
    // Apply lunar influence to 1-2 numbers
    for (let i = 0; i < Math.min(2, enhanced.length); i++) {
      if (Math.random() < 0.4) {
        const influenced = (enhanced[i] + lunarInfluence) % (game.numbers.max - game.numbers.min + 1) + game.numbers.min;
        if (!enhanced.includes(influenced)) {
          enhanced[i] = influenced;
        }
      }
    }
    
    return enhanced;
  }
  
  /**
   * Apply Claude Nexus AI enhancements
   */
  private applyClaudeNexus(numbers: number[], game: LotteryGame): number[] {
    // Simulate advanced AI pattern recognition
    const enhanced = [...numbers];
    
    // Apply statistical reasoning (favor numbers in middle ranges)
    const midRange = Math.floor((game.numbers.max + game.numbers.min) / 2);
    for (let i = 0; i < enhanced.length; i++) {
      if (Math.random() < 0.25) {
        const variance = Math.floor(Math.random() * 10) - 5;
        const newNumber = Math.max(game.numbers.min, Math.min(game.numbers.max, midRange + variance));
        if (!enhanced.includes(newNumber)) {
          enhanced[i] = newNumber;
        }
      }
    }
    
    return enhanced;
  }
  
  /**
   * Apply premium enhancement
   */
  private applyPremiumEnhancement(numbers: number[], game: LotteryGame): number[] {
    // Simulate multi-model ensemble predictions
    const enhanced = [...numbers];
    
    // Apply ensemble weighting (slight bias toward certain number ranges)
    const ranges = [
      { min: game.numbers.min, max: Math.floor(game.numbers.max * 0.33), weight: 0.3 },
      { min: Math.floor(game.numbers.max * 0.33), max: Math.floor(game.numbers.max * 0.67), weight: 0.4 },
      { min: Math.floor(game.numbers.max * 0.67), max: game.numbers.max, weight: 0.3 }
    ];
    
    for (let i = 0; i < enhanced.length; i++) {
      if (Math.random() < 0.2) {
        const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
        const newNumber = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
        if (!enhanced.includes(newNumber)) {
          enhanced[i] = newNumber;
        }
      }
    }
    
    return enhanced;
  }
  
  /**
   * Get hot numbers for frequency analysis
   */
  private getHotNumbers(game: LotteryGame): number[] {
    // Simulate hot numbers based on game type
    const hotNumbers: number[] = [];
    const count = Math.min(10, Math.floor((game.numbers.max - game.numbers.min + 1) * 0.2));
    
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * (game.numbers.max - game.numbers.min + 1)) + game.numbers.min;
      if (!hotNumbers.includes(num)) {
        hotNumbers.push(num);
      }
    }
    
    return hotNumbers;
  }
  
  /**
   * Get lunar influence factor
   */
  private getLunarInfluence(): number {
    // Simulate lunar phase influence (0-7 based on moon phase)
    const moonPhase = new Date().getDate() % 8;
    return moonPhase;
  }
  
  /**
   * Generate detailed explanation for the prediction
   */
  private generateExplanation(
    game: LotteryGame, 
    numbers: number[], 
    specialBall: number | undefined, 
    analysis: any, 
    addons: string[]
  ): string {
    let explanation = `Generated ${game.name} prediction using our advanced 10-pillar mathematical system. `;
    
    explanation += `Selected numbers: ${numbers.join(', ')}`;
    if (specialBall && game.specialBall) {
      explanation += ` with ${game.specialBall.name}: ${specialBall}`;
    }
    explanation += '. ';
    
    explanation += `This prediction incorporates frequency analysis, pattern recognition, and statistical modeling. `;
    
    if (addons.length > 0) {
      explanation += `Enhanced with active add-ons: `;
      if (addons.includes('cosmic_intelligence')) {
        explanation += `Cosmic Intelligence (lunar phases and numerological patterns), `;
      }
      if (addons.includes('claude_nexus')) {
        explanation += `Claude Nexus (5-engine AI reasoning), `;
      }
      if (addons.includes('premium_enhancement')) {
        explanation += `Premium Enhancement (multi-model ensemble), `;
      }
      explanation = explanation.slice(0, -2) + '. ';
    }
    
    explanation += `Confidence level: ${analysis.confidenceLevel}. Remember that lottery drawings are random events, and this analysis is for entertainment purposes only.`;
    
    return explanation;
  }
  
  /**
   * Get detailed pillar breakdown for advanced users
   */
  async getDetailedPillarAnalysis(input: SimplifiedPredictionInput) {
    const tenPillarAnalysis = await tenPillarSystem.generateTenPillarAnalysis(
      input.gameType,
      undefined,
      input.addonsActive
    );
    
    return {
      pillars: tenPillarAnalysis.pillars.map(pillar => ({
        name: pillar.pillarName,
        score: Math.round(pillar.score * 100),
        confidence: Math.round(pillar.confidence * 100),
        explanation: pillar.explanation,
        numbers: pillar.numbers
      })),
      unified_score: Math.round(tenPillarAnalysis.unifiedScore * 100),
      confidence_level: tenPillarAnalysis.confidenceLevel,
      recommended_numbers: tenPillarAnalysis.recommendedNumbers,
      powerball: tenPillarAnalysis.powerball
    };
  }
}

// Export singleton instance
export const predictionEngineAdapter = new PredictionEngineAdapter();

