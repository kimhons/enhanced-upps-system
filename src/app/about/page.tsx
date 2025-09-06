'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb, 
  Globe, 
  TrendingUp,
  Shield,
  Zap,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  MapPin
} from 'lucide-react';

export default function AboutPage() {
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
              <Link href="/research" className="text-gray-700 hover:text-orange-500 transition-colors">Research</Link>
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
                About PatternSight
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Revolutionizing lottery analysis through advanced mathematics and artificial intelligence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-6">
                To democratize advanced mathematical analysis and make sophisticated pattern recognition accessible to everyone interested in lottery systems.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that through rigorous mathematical analysis and cutting-edge AI technology, we can provide insights that help users make more informed decisions while maintaining complete transparency about the nature of randomness in lottery systems.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">10+</div>
                  <div className="text-gray-600">Mathematical Pillars</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
                  <div className="text-gray-600">Years of Research</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Precision</h3>
                  <p className="text-sm text-gray-600">Mathematical accuracy in every analysis</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
                  <p className="text-sm text-gray-600">Clear explanations for every prediction</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-sm text-gray-600">Cutting-edge AI and machine learning</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Community</h3>
                  <p className="text-sm text-gray-600">Supporting users on their journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">
              From academic research to revolutionary platform
            </p>
          </div>

          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2019 - The Beginning</h3>
                <p className="text-gray-600 text-lg">
                  Our journey started in the mathematics departments of leading universities, where researchers began exploring advanced pattern recognition in stochastic systems. The initial focus was on developing robust mathematical frameworks for analyzing complex random processes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2020-2022 - Research & Development</h3>
                <p className="text-gray-600 text-lg">
                  Three years of intensive research led to the development of our revolutionary 10-pillar mathematical system. Each pillar was rigorously tested and validated through peer review, combining traditional statistical methods with cutting-edge AI technologies.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2023 - Platform Development</h3>
                <p className="text-gray-600 text-lg">
                  We began building PatternSight to make our research accessible to the public. The platform was designed with enterprise-grade security, scalable cloud infrastructure, and an intuitive user interface that makes complex mathematics approachable.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2024-2025 - Launch & Growth</h3>
                <p className="text-gray-600 text-lg">
                  PatternSight launched with immediate success, attracting users worldwide who appreciate our transparent, scientific approach to lottery analysis. We continue to innovate with AI enhancements and new mathematical insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              World-class experts in mathematics, AI, and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">SC</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Sarah Chen</h3>
              <p className="text-orange-500 font-semibold mb-3">Lead Mathematician</p>
              <p className="text-gray-600">
                PhD in Applied Mathematics from MIT. Specializes in statistical modeling and probability theory with 15+ years of research experience in pattern recognition systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">MR</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Michael Rodriguez</h3>
              <p className="text-orange-500 font-semibold mb-3">AI Research Director</p>
              <p className="text-gray-600">
                PhD in Computer Science from Stanford. Former Google DeepMind researcher with expertise in ensemble learning, neural networks, and advanced AI systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">EW</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Emily Watson</h3>
              <p className="text-orange-500 font-semibold mb-3">Statistical Analyst</p>
              <p className="text-gray-600">
                PhD in Statistics from Harvard. Specializes in time series analysis, Bayesian methods, and statistical validation with focus on complex pattern recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We maintain complete honesty about our capabilities and limitations, never making unrealistic promises about lottery predictions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of mathematical analysis and AI technology to provide the most advanced tools available.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We build tools that serve our users' needs and foster a community of people interested in mathematical analysis and pattern recognition.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in everything we do, from mathematical accuracy to user experience and customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-600">
                      AlienNova Technologies<br />
                      123 Innovation Drive<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Founded</h3>
                    <p className="text-gray-600">2019</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Team Size</h3>
                    <p className="text-gray-600">25+ researchers, engineers, and support staff</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Globe className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Global Reach</h3>
                    <p className="text-gray-600">Serving users in 50+ countries worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Achievements & Recognition</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Published in 5+ peer-reviewed journals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Presented at International Conference on Machine Learning (ICML)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Featured in Statistical Science Quarterly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Winner of Innovation in Mathematics Award 2023</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">99.9% customer satisfaction rating</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">SOC 2 Type II compliance certified</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Commitment</h3>
                <p className="text-gray-700">
                  We are committed to advancing the field of mathematical analysis while maintaining the highest ethical standards. Our research contributes to the broader scientific community, and we believe in making our findings accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Experience the power of advanced mathematical analysis and be part of the PatternSight community
          </p>
          <Link 
            href="/dashboard"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Your Analysis</span>
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

