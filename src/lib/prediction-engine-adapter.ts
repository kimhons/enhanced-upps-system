/**
 * Prediction Engine Adapter
 * Integrates the 10-pillar mathematical system with the dashboard
 */

import { tenPillarSystem } from './ten-pillar-system';

interface SimplifiedPredictionInput {
  gameType: 'powerball' | 'megamillions' | 'pick5';
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
      
      return {
        id: Date.now().toString(),
        numbers: tenPillarAnalysis.recommendedNumbers,
        powerball: tenPillarAnalysis.powerball,
        game_type: gameType,
        confidence_level: tenPillarAnalysis.confidenceLevel,
        created_at: new Date().toISOString(),
        addons_used,
        explanation: tenPillarAnalysis.explanation,
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

