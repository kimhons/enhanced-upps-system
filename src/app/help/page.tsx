'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  Settings,
  CreditCard,
  Shield,
  Zap,
  Users,
  FileText,
  Video,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb
} from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'account', name: 'Account & Billing', icon: CreditCard },
    { id: 'features', name: 'Features & Usage', icon: Settings },
    { id: 'technical', name: 'Technical Support', icon: HelpCircle },
    { id: 'security', name: 'Security & Privacy', icon: Shield },
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I get started with PatternSight?',
        answer: 'Simply create a free account to start with 3 daily analyses. Click "Get Started" on our homepage, fill in your details, and you\'ll have immediate access to our 10-pillar mathematical system. No credit card required for the free tier.'
      },
      {
        question: 'What makes PatternSight different from other lottery tools?',
        answer: 'PatternSight uses a revolutionary 10-pillar mathematical system combining peer-reviewed algorithms like CDM Bayesian Analysis, Ensemble Deep Learning, and Markov Chain Analysis. Each prediction comes with detailed explanations of the mathematical reasoning behind the number selection.'
      },
      {
        question: 'How accurate are the predictions?',
        answer: 'Our system achieves 18-25% pattern recognition accuracy in historical data analysis, significantly above random chance (0.007%). However, lottery drawings remain random events, and we provide pattern analysis rather than guaranteed predictions.'
      },
      {
        question: 'Can I try PatternSight before subscribing?',
        answer: 'Yes! We offer a free tier with 3 analyses per day. You can explore the basic features and upgrade to a paid plan anytime for additional analyses and AI add-ons.'
      }
    ],
    'account': [
      {
        question: 'How do I upgrade my subscription?',
        answer: 'Go to your Dashboard and click "Manage Subscription" in the sidebar. You can upgrade to any higher tier instantly, and the change takes effect immediately. You\'ll be charged the prorated amount for the current billing period.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through Stripe with bank-level encryption.'
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely! You can cancel your subscription at any time from your account dashboard. You\'ll continue to have access to your current plan features until the end of your billing period, and no further charges will be made.'
      },
      {
        question: 'Do you offer refunds?',
        answer: 'We stand behind our service quality. If you\'re not satisfied with your subscription, contact our support team to discuss your concerns. Refunds are considered on a case-by-case basis in accordance with our terms of service.'
      }
    ],
    'features': [
      {
        question: 'What are the AI Enhancement Add-ons?',
        answer: 'Our AI add-ons enhance the base 10-pillar system: Cosmic Intelligence ($5.99) adds lunar phase and numerological analysis, Claude Nexus ($5.99) provides advanced AI reasoning, and Premium Enhancement ($5.99) offers maximum AI power with multi-model ensemble analysis.'
      },
      {
        question: 'How do daily analysis limits work?',
        answer: 'Each subscription tier has a daily limit: Free (3), Starter (10), Pro (50), Elite (300). Limits reset at midnight UTC. If you reach your limit, you can wait for the reset or upgrade to a higher tier for more analyses.'
      },
      {
        question: 'Can I export my prediction history?',
        answer: 'Yes! Pro and Elite subscribers can export their prediction history in CSV or PDF format. Go to your Dashboard, click on "Export Data" in the sidebar, and choose your preferred format and date range.'
      },
      {
        question: 'How do I enable or disable add-ons?',
        answer: 'In your Dashboard, you\'ll see toggle switches next to each add-on in the sidebar. Simply click the toggle to enable or disable any add-on. Changes take effect immediately for your next prediction.'
      }
    ],
    'technical': [
      {
        question: 'Why is my prediction taking a long time to generate?',
        answer: 'Predictions typically take 200-500ms to generate. If it\'s taking longer, this might be due to high server load or network issues. Try refreshing the page or contact support if the issue persists.'
      },
      {
        question: 'I\'m getting an error when trying to sign in',
        answer: 'First, ensure you\'re using the correct email and password. If you\'ve forgotten your password, use the "Forgot Password" link. If you\'re still having issues, clear your browser cache or try a different browser.'
      },
      {
        question: 'The dashboard isn\'t loading properly',
        answer: 'This is usually a browser compatibility issue. PatternSight works best with Chrome, Firefox, Safari, or Edge. Ensure JavaScript is enabled and try disabling browser extensions that might interfere with the site.'
      },
      {
        question: 'Can I use PatternSight on mobile devices?',
        answer: 'Yes! PatternSight is fully responsive and works on all mobile devices. For the best experience, we recommend using the latest version of your mobile browser.'
      }
    ],
    'security': [
      {
        question: 'How secure is my personal information?',
        answer: 'We use bank-level encryption (AES-256) for all data transmission and storage. Your personal information is protected by Row Level Security in our database, and we comply with GDPR, CCPA, and other major privacy regulations.'
      },
      {
        question: 'Do you store my payment information?',
        answer: 'No, we don\'t store your payment information on our servers. All payment processing is handled by Stripe, a PCI DSS Level 1 certified payment processor, ensuring the highest level of security for your financial data.'
      },
      {
        question: 'Can I delete my account and data?',
        answer: 'Yes, you have full control over your data. You can delete your account and all associated data from your account settings. This action is permanent and cannot be undone, so please export any data you want to keep first.'
      },
      {
        question: 'Do you share my data with third parties?',
        answer: 'We never sell or share your personal data with third parties for marketing purposes. We only share data when required by law or with service providers who help us operate the platform (like Stripe for payments) under strict confidentiality agreements.'
      }
    ]
  };

  const quickLinks = [
    { title: 'Getting Started Guide', icon: Book, href: '#getting-started' },
    { title: 'Video Tutorials', icon: Video, href: '#tutorials' },
    { title: 'API Documentation', icon: FileText, href: '#api' },
    { title: 'Contact Support', icon: MessageCircle, href: '/contact' },
  ];

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
                Help Center
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Find answers, get support, and learn how to make the most of PatternSight
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, features, or questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <link.icon className="w-6 h-6 text-orange-500 group-hover:text-orange-600" />
                <span className="font-medium text-gray-900 group-hover:text-orange-600">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">Need More Help?</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <Link
                    href="/contact"
                    className="text-sm bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors inline-block"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Find answers to common questions about {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}.
                </p>
              </div>

              <div className="space-y-4">
                {faqs[selectedCategory as keyof typeof faqs]?.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section id="tutorials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Video Tutorials</h2>
            <p className="text-xl text-gray-600">
              Learn how to use PatternSight with our step-by-step video guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Video className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Getting Started</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to create your account and generate your first prediction in under 5 minutes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">5:32</span>
                  <button className="text-orange-500 hover:text-orange-600 font-semibold">Watch Now</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Video className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Understanding the 10 Pillars</h3>
                <p className="text-gray-600 mb-4">
                  Deep dive into our mathematical system and how each pillar contributes to analysis.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">12:45</span>
                  <button className="text-orange-500 hover:text-orange-600 font-semibold">Watch Now</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <Video className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Add-ons Explained</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to use Cosmic Intelligence, Claude Nexus, and Premium Enhancement.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">8:21</span>
                  <button className="text-orange-500 hover:text-orange-600 font-semibold">Watch Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Our support team is available 24/7 to help you succeed with PatternSight
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed help via email</p>
              <Link
                href="/contact"
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Send Email
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our team instantly</p>
              <button className="text-orange-500 hover:text-orange-600 font-semibold">
                Start Chat
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak with our experts</p>
              <span className="text-gray-500">Elite subscribers only</span>
            </div>
          </div>
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

