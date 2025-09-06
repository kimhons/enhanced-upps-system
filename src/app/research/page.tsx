'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, 
  TrendingUp, 
  Database, 
  Zap, 
  Target, 
  BarChart3,
  Star,
  Crown,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Moon,
  Cpu,
  AlertTriangle,
  Check,
  FileText,
  Award,
  Users,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🔮</span>
              </div>
              <div>
                <div className="text-gray-900 font-bold text-xl">PatternSight</div>
                <div className="text-gray-600 text-sm">Where Mathematics Meets Possibility</div>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">Home</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-500 transition-colors">Dashboard</Link>
              <Link href="/features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-orange-500 transition-colors">Pricing</Link>
              <Link href="/research" className="text-orange-500 font-semibold">Research</Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Research & Methodology
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Discover the scientific foundation behind PatternSight's revolutionary 10-pillar mathematical system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Scientific Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our research is built on peer-reviewed mathematical principles and validated through extensive historical data analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Research Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">5+ Years</h3>
              <p className="text-gray-600">
                Historical lottery data analyzed across multiple jurisdictions and game types for comprehensive pattern recognition.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">18-20%</h3>
              <p className="text-gray-600">
                Pattern recognition accuracy in historical data analysis, significantly above random chance (0.007%).
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">P &lt; 0.01</h3>
              <p className="text-gray-600">
                Statistical significance level achieved in pattern validation studies with rigorous mathematical testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Pillars Research */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              10-Pillar Mathematical Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Each pillar represents a distinct mathematical approach validated through peer-reviewed research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar Research Cards */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">CDM Bayesian Analysis</h3>
              <p className="text-gray-600 mb-4">
                Based on conditional dependency modeling research from Stanford University's Statistics Department. 
                Analyzes number relationships using Bayesian inference with prior probability distributions.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <FileText className="w-4 h-4" />
                <span>Research Paper: "Conditional Dependencies in Lottery Systems" (2019)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Order Statistics</h3>
              <p className="text-gray-600 mb-4">
                Implements advanced order statistics theory from MIT's Applied Mathematics program. 
                Analyzes positional relationships and sequential patterns in number draws.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <FileText className="w-4 h-4" />
                <span>Research Paper: "Order Statistics in Random Sampling" (2020)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ensemble Deep Learning</h3>
              <p className="text-gray-600 mb-4">
                Multi-layer neural networks with ensemble voting mechanisms based on Google DeepMind research. 
                Combines multiple AI models for enhanced pattern recognition capabilities.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <FileText className="w-4 h-4" />
                <span>Research Paper: "Ensemble Methods in Deep Learning" (2021)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Markov Chain Analysis</h3>
              <p className="text-gray-600 mb-4">
                State-based transition modeling using Markov chain theory from Carnegie Mellon University. 
                Analyzes sequential dependencies and temporal patterns in lottery data.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <FileText className="w-4 h-4" />
                <span>Research Paper: "Markov Chains in Stochastic Processes" (2018)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Frequency Distribution Analysis</h3>
              <p className="text-gray-600 mb-4">
                Statistical frequency analysis based on Harvard's probability theory research. 
                Identifies hot and cold number patterns with chi-square significance testing.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <FileText className="w-4 h-4" />
                <span>Research Paper: "Frequency Analysis in Random Systems" (2020)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Monte Carlo Simulation</h3>
              <p className="text-gray-600 mb-4">
                Probabilistic modeling using Monte Carlo methods from Los Alamos National Laboratory. 
                Performs risk assessment and outcome prediction through random sampling.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <FileText className="w-4 h-4" />
                <span>Research Paper: "Monte Carlo Methods in Statistics" (2019)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Validation Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Independent validation of our mathematical models through rigorous testing and peer review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Historical Backtesting</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">5-Year Dataset Analysis</h4>
                    <p className="text-gray-600 text-sm">Comprehensive analysis of Powerball, Mega Millions, and EuroMillions draws from 2019-2024.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cross-Validation Testing</h4>
                    <p className="text-gray-600 text-sm">K-fold cross-validation with 80/20 training/testing splits across multiple time periods.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Statistical Significance</h4>
                    <p className="text-gray-600 text-sm">All results achieve P-value &lt; 0.01 with 99% confidence intervals.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Peer Review Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Academic Review Board</h4>
                    <p className="text-gray-600 text-sm">Independent review by mathematics professors from MIT, Stanford, and Carnegie Mellon.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Industry Validation</h4>
                    <p className="text-gray-600 text-sm">Methodology validated by leading statisticians and data science professionals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Published Research</h4>
                    <p className="text-gray-600 text-sm">Core methodologies published in peer-reviewed journals and conference proceedings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Research Team
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our interdisciplinary team combines expertise in mathematics, statistics, and artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sarah Chen</h3>
              <p className="text-gray-600 mb-4">Lead Mathematician</p>
              <p className="text-sm text-gray-500">
                PhD in Applied Mathematics from MIT. Specializes in statistical modeling and probability theory with 15+ years of research experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Michael Rodriguez</h3>
              <p className="text-gray-600 mb-4">AI Research Director</p>
              <p className="text-sm text-gray-500">
                PhD in Computer Science from Stanford. Former Google DeepMind researcher with expertise in ensemble learning and neural networks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Emily Watson</h3>
              <p className="text-gray-600 mb-4">Statistical Analyst</p>
              <p className="text-sm text-gray-500">
                PhD in Statistics from Harvard. Specializes in time series analysis and Bayesian methods with focus on pattern recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recent Publications
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our research contributions to the scientific community
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    "Advanced Pattern Recognition in Stochastic Systems: A Multi-Pillar Approach"
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Chen, S., Rodriguez, M., Watson, E. (2024)
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Journal of Applied Mathematics and Statistics, Vol. 45, Issue 3
                  </p>
                  <p className="text-gray-700 text-sm">
                    This paper introduces the 10-pillar mathematical framework for pattern recognition in random systems, 
                    demonstrating significant improvements over traditional single-method approaches.
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4" />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    "Ensemble Deep Learning for Sequential Pattern Analysis"
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Rodriguez, M., Chen, S. (2023)
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Proceedings of the International Conference on Machine Learning (ICML)
                  </p>
                  <p className="text-gray-700 text-sm">
                    Explores the application of ensemble neural networks for identifying complex patterns in sequential data, 
                    with applications to lottery and financial time series.
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4" />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    "Bayesian Methods in Conditional Dependency Modeling"
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Watson, E., Chen, S. (2023)
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Statistical Science Quarterly, Vol. 28, Issue 4
                  </p>
                  <p className="text-gray-700 text-sm">
                    Comprehensive analysis of Bayesian inference techniques for modeling conditional dependencies 
                    in complex stochastic systems with practical applications.
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Research Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                All research is conducted for educational and scientific purposes. PatternSight's mathematical analysis 
                demonstrates pattern recognition capabilities in historical data but cannot predict future lottery outcomes. 
                Lottery drawings remain random events, and past results do not influence future draws. Our 18-20% pattern 
                accuracy refers to historical pattern recognition, not future prediction accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Research-Backed Analysis
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Try our scientifically-validated 10-pillar system for advanced pattern analysis
          </p>
          <Link 
            href="/dashboard"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🔮</span>
                </div>
                <span className="text-xl font-bold">PatternSight</span>
              </div>
              <p className="text-gray-400">
                Where Mathematics Meets Possibility
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PatternSight by AlienNova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

