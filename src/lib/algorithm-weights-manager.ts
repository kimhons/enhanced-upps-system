/**
 * Algorithm Weights Manager
 * Allows users to customize prediction methodology weights
 */

export interface AlgorithmWeights {
  statistical: number;
  frequency: number;
  gap_analysis: number;
  pattern_recognition: number;
  deep_learning: number;
  cosmic_intelligence: number;
}

export interface WeightPreset {
  id: string;
  name: string;
  description: string;
  weights: AlgorithmWeights;
  recommended?: boolean;
}

export class AlgorithmWeightsManager {
  private static readonly DEFAULT_WEIGHTS: AlgorithmWeights = {
    statistical: 25,
    frequency: 20,
    gap_analysis: 15,
    pattern_recognition: 15,
    deep_learning: 20,
    cosmic_intelligence: 5
  };

  private static readonly WEIGHT_PRESETS: WeightPreset[] = [
    {
      id: 'recommended',
      name: 'Recommended (Balanced)',
      description: 'Our recommended balance of all methodologies for optimal results',
      weights: {
        statistical: 25,
        frequency: 20,
        gap_analysis: 15,
        pattern_recognition: 15,
        deep_learning: 20,
        cosmic_intelligence: 5
      },
      recommended: true
    },
    {
      id: 'ai_focused',
      name: 'AI-Focused',
      description: 'Emphasizes deep learning neural networks and pattern recognition',
      weights: {
        statistical: 15,
        frequency: 15,
        gap_analysis: 10,
        pattern_recognition: 20,
        deep_learning: 35,
        cosmic_intelligence: 5
      }
    },
    {
      id: 'statistical_heavy',
      name: 'Statistical Heavy',
      description: 'Focuses on traditional statistical analysis and frequency patterns',
      weights: {
        statistical: 35,
        frequency: 30,
        gap_analysis: 20,
        pattern_recognition: 10,
        deep_learning: 5,
        cosmic_intelligence: 0
      }
    },
    {
      id: 'pattern_master',
      name: 'Pattern Master',
      description: 'Emphasizes pattern recognition and gap analysis for trend followers',
      weights: {
        statistical: 20,
        frequency: 15,
        gap_analysis: 25,
        pattern_recognition: 30,
        deep_learning: 10,
        cosmic_intelligence: 0
      }
    },
    {
      id: 'cosmic_enhanced',
      name: 'Cosmic Enhanced',
      description: 'Integrates cosmic intelligence with AI for spiritually-minded players',
      weights: {
        statistical: 20,
        frequency: 15,
        gap_analysis: 10,
        pattern_recognition: 15,
        deep_learning: 25,
        cosmic_intelligence: 15
      }
    },
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Balanced approach with moderate weights across all methodologies',
      weights: {
        statistical: 22,
        frequency: 22,
        gap_analysis: 18,
        pattern_recognition: 18,
        deep_learning: 15,
        cosmic_intelligence: 5
      }
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'High-risk approach emphasizing AI and advanced pattern recognition',
      weights: {
        statistical: 10,
        frequency: 10,
        gap_analysis: 15,
        pattern_recognition: 25,
        deep_learning: 40,
        cosmic_intelligence: 0
      }
    }
  ];

  /**
   * Get default algorithm weights
   */
  static getDefaultWeights(): AlgorithmWeights {
    return { ...this.DEFAULT_WEIGHTS };
  }

  /**
   * Get all available weight presets
   */
  static getWeightPresets(): WeightPreset[] {
    return [...this.WEIGHT_PRESETS];
  }

  /**
   * Get a specific weight preset by ID
   */
  static getWeightPreset(presetId: string): WeightPreset | null {
    return this.WEIGHT_PRESETS.find(preset => preset.id === presetId) || null;
  }

  /**
   * Get recommended weight preset
   */
  static getRecommendedWeights(): WeightPreset {
    return this.WEIGHT_PRESETS.find(preset => preset.recommended) || this.WEIGHT_PRESETS[0];
  }

  /**
   * Validate algorithm weights
   */
  static validateWeights(weights: AlgorithmWeights): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check if all weights are numbers
    Object.entries(weights).forEach(([key, value]) => {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.push(`${key} must be a valid number`);
      }
    });

    // Check if weights are within valid range (0-100)
    Object.entries(weights).forEach(([key, value]) => {
      if (value < 0 || value > 100) {
        errors.push(`${key} must be between 0 and 100`);
      }
    });

    // Check if weights sum to 100
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    if (Math.abs(total - 100) > 0.1) { // Allow small floating point errors
      errors.push(`Total weights must equal 100% (current: ${total.toFixed(1)}%)`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Normalize weights to sum to 100
   */
  static normalizeWeights(weights: AlgorithmWeights): AlgorithmWeights {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    
    if (total === 0) {
      return this.getDefaultWeights();
    }

    const normalized: AlgorithmWeights = {} as AlgorithmWeights;
    Object.entries(weights).forEach(([key, value]) => {
      normalized[key as keyof AlgorithmWeights] = Math.round((value / total) * 100);
    });

    // Adjust for rounding errors
    const normalizedTotal = Object.values(normalized).reduce((sum, weight) => sum + weight, 0);
    if (normalizedTotal !== 100) {
      const diff = 100 - normalizedTotal;
      // Add difference to the largest weight
      const maxKey = Object.entries(normalized).reduce((max, [key, value]) => 
        value > normalized[max as keyof AlgorithmWeights] ? key : max
      ) as keyof AlgorithmWeights;
      normalized[maxKey] += diff;
    }

    return normalized;
  }

  /**
   * Convert weights to decimal format for calculations
   */
  static weightsToDecimal(weights: AlgorithmWeights): AlgorithmWeights {
    const decimal: AlgorithmWeights = {} as AlgorithmWeights;
    Object.entries(weights).forEach(([key, value]) => {
      decimal[key as keyof AlgorithmWeights] = value / 100;
    });
    return decimal;
  }

  /**
   * Convert decimal weights back to percentage format
   */
  static weightsToPercentage(weights: AlgorithmWeights): AlgorithmWeights {
    const percentage: AlgorithmWeights = {} as AlgorithmWeights;
    Object.entries(weights).forEach(([key, value]) => {
      percentage[key as keyof AlgorithmWeights] = Math.round(value * 100);
    });
    return percentage;
  }

  /**
   * Create custom weights from user input
   */
  static createCustomWeights(
    statistical: number,
    frequency: number,
    gap_analysis: number,
    pattern_recognition: number,
    deep_learning: number,
    cosmic_intelligence: number
  ): { weights: AlgorithmWeights | null; errors: string[] } {
    const weights: AlgorithmWeights = {
      statistical,
      frequency,
      gap_analysis,
      pattern_recognition,
      deep_learning,
      cosmic_intelligence
    };

    const validation = this.validateWeights(weights);
    
    if (!validation.valid) {
      return { weights: null, errors: validation.errors };
    }

    return { weights: this.normalizeWeights(weights), errors: [] };
  }

  /**
   * Get weight description for UI display
   */
  static getWeightDescription(weights: AlgorithmWeights): string {
    const descriptions: string[] = [];
    
    // Find the dominant methodology
    const sortedWeights = Object.entries(weights)
      .sort(([, a], [, b]) => b - a);
    
    const [topMethod, topWeight] = sortedWeights[0];
    const [secondMethod, secondWeight] = sortedWeights[1];

    if (topWeight >= 30) {
      descriptions.push(`${this.getMethodologyName(topMethod)}-focused`);
    } else if (topWeight >= 25) {
      descriptions.push(`Emphasizes ${this.getMethodologyName(topMethod)}`);
    }

    if (secondWeight >= 20) {
      descriptions.push(`with strong ${this.getMethodologyName(secondMethod)}`);
    }

    // Check for balanced approach
    const maxWeight = Math.max(...Object.values(weights));
    const minWeight = Math.min(...Object.values(weights));
    if (maxWeight - minWeight <= 15) {
      descriptions.unshift('Balanced approach');
    }

    return descriptions.join(' ') || 'Custom configuration';
  }

  /**
   * Get human-readable methodology name
   */
  private static getMethodologyName(key: string): string {
    const names: Record<string, string> = {
      statistical: 'Statistical Analysis',
      frequency: 'Frequency Analysis',
      gap_analysis: 'Gap Analysis',
      pattern_recognition: 'Pattern Recognition',
      deep_learning: 'Deep Learning',
      cosmic_intelligence: 'Cosmic Intelligence'
    };
    return names[key] || key;
  }

  /**
   * Save user's custom weights (would integrate with user preferences)
   */
  static saveUserWeights(userId: string, weights: AlgorithmWeights): Promise<boolean> {
    // This would integrate with the database to save user preferences
    // For now, we'll use localStorage as a fallback
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`algorithm_weights_${userId}`, JSON.stringify(weights));
      }
      return Promise.resolve(true);
    } catch (error) {
      console.error('Failed to save user weights:', error);
      return Promise.resolve(false);
    }
  }

  /**
   * Load user's custom weights
   */
  static loadUserWeights(userId: string): Promise<AlgorithmWeights | null> {
    // This would integrate with the database to load user preferences
    // For now, we'll use localStorage as a fallback
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(`algorithm_weights_${userId}`);
        if (saved) {
          const weights = JSON.parse(saved);
          const validation = this.validateWeights(weights);
          if (validation.valid) {
            return Promise.resolve(weights);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load user weights:', error);
    }
    return Promise.resolve(null);
  }

  /**
   * Get weight recommendations based on user preferences
   */
  static getRecommendationsForUser(preferences: {
    experience_level?: 'beginner' | 'intermediate' | 'advanced';
    risk_tolerance?: 'conservative' | 'moderate' | 'aggressive';
    belief_in_cosmic?: boolean;
    prefers_ai?: boolean;
  }): WeightPreset {
    const { experience_level, risk_tolerance, belief_in_cosmic, prefers_ai } = preferences;

    // AI-focused for users who prefer AI
    if (prefers_ai) {
      return this.getWeightPreset('ai_focused') || this.getRecommendedWeights();
    }

    // Cosmic enhanced for users who believe in cosmic influences
    if (belief_in_cosmic) {
      return this.getWeightPreset('cosmic_enhanced') || this.getRecommendedWeights();
    }

    // Risk-based recommendations
    if (risk_tolerance === 'aggressive') {
      return this.getWeightPreset('aggressive') || this.getRecommendedWeights();
    }
    
    if (risk_tolerance === 'conservative') {
      return this.getWeightPreset('conservative') || this.getRecommendedWeights();
    }

    // Experience-based recommendations
    if (experience_level === 'beginner') {
      return this.getWeightPreset('recommended') || this.getRecommendedWeights();
    }

    if (experience_level === 'advanced') {
      return this.getWeightPreset('pattern_master') || this.getRecommendedWeights();
    }

    // Default to recommended
    return this.getRecommendedWeights();
  }
}

// Export singleton instance
export const algorithmWeightsManager = AlgorithmWeightsManager;

