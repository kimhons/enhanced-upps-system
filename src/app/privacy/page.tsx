'use client'

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, Users, FileText, Globe, Calendar, Mail } from 'lucide-react';

export default function PrivacyPage() {
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Your privacy is our priority. Learn how we protect and handle your personal information.
          </p>
          <div className="flex items-center justify-center space-x-2 text-purple-200">
            <Calendar className="w-5 h-5" />
            <span>Last updated: January 1, 2025</span>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              At PatternSight (operated by AlienNova Technologies), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our lottery analysis platform and services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Name and email address when you create an account</li>
                  <li>Payment information processed securely through Stripe</li>
                  <li>Communication preferences and subscription settings</li>
                  <li>Support inquiries and correspondence</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Prediction history and analysis results</li>
                  <li>Feature usage patterns and preferences</li>
                  <li>Login times and session duration</li>
                  <li>Device information and browser type</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>IP address and geographic location</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Error logs and performance metrics</li>
                  <li>Security and fraud prevention data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Provision</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Generate lottery predictions and analysis</li>
                  <li>Manage your account and subscriptions</li>
                  <li>Process payments and billing</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Improvement</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Analyze usage patterns and preferences</li>
                  <li>Improve our algorithms and features</li>
                  <li>Enhance user experience and interface</li>
                  <li>Develop new products and services</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Send service updates and notifications</li>
                  <li>Respond to inquiries and support requests</li>
                  <li>Share important account information</li>
                  <li>Provide educational content (with consent)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Prevent fraud and unauthorized access</li>
                  <li>Comply with legal obligations</li>
                  <li>Enforce our terms of service</li>
                  <li>Protect user safety and platform integrity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border border-orange-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Security Measures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                  <p className="text-gray-600 text-sm">All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                  <p className="text-gray-600 text-sm">Row Level Security (RLS) ensures users can only access their own data.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Security</h4>
                  <p className="text-gray-600 text-sm">Payment processing handled by Stripe, a PCI DSS Level 1 certified provider.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Regular Audits</h4>
                  <p className="text-gray-600 text-sm">Regular security audits and penetration testing to identify vulnerabilities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Information Sharing</h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Service Providers</h3>
                <p className="text-gray-600">
                  We work with trusted third-party service providers (like Stripe for payments, Supabase for database services) who help us operate our platform. These providers are bound by strict confidentiality agreements.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                <p className="text-gray-600">
                  We may disclose information when required by law, court order, or government regulation, or to protect our rights, property, or safety.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Business Transfers</h3>
                <p className="text-gray-600">
                  In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Your Rights</h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              You have the following rights regarding your personal information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Access & Portability</h3>
                <p className="text-gray-600 text-sm">
                  Request a copy of your personal data and export your prediction history in standard formats.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Correction</h3>
                <p className="text-gray-600 text-sm">
                  Update or correct inaccurate personal information through your account settings.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Deletion</h3>
                <p className="text-gray-600 text-sm">
                  Request deletion of your account and associated data, subject to legal retention requirements.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Opt-out</h3>
                <p className="text-gray-600 text-sm">
                  Unsubscribe from marketing communications while maintaining essential service notifications.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
            
            <p className="text-lg text-gray-600 mb-6">
              We use cookies and similar technologies to enhance your experience and analyze platform usage:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Required for basic platform functionality, authentication, and security. These cannot be disabled.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Help us understand how users interact with our platform to improve performance and user experience.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Preference Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Remember your settings and preferences to provide a personalized experience.
                </p>
              </div>
            </div>
          </div>

          {/* International Transfers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">International Data Transfers</h2>
            <p className="text-lg text-gray-600 mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Adequacy decisions for countries with equivalent data protection laws</li>
              <li>Certification schemes and codes of conduct</li>
              <li>Regular assessment of data protection measures</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Retention</h2>
            <p className="text-lg text-gray-600 mb-4">
              We retain your information for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>Account Information:</strong> Retained while your account is active and for 30 days after deletion</li>
              <li><strong>Prediction History:</strong> Retained for the duration of your subscription plus 1 year</li>
              <li><strong>Payment Records:</strong> Retained for 7 years for tax and accounting purposes</li>
              <li><strong>Support Communications:</strong> Retained for 3 years for quality assurance</li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
              <p className="text-lg text-gray-700">
                PatternSight is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
            <p className="text-lg text-gray-600 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Notify you of material changes via email or platform notification</li>
              <li>Update the "Last Updated" date at the top of this policy</li>
              <li>Provide a summary of key changes when significant updates are made</li>
              <li>Give you the opportunity to review changes before they take effect</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border border-orange-200">
              <p className="text-lg text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Email</h3>
                  <p className="text-gray-600">privacy@patternsight.app</p>
                  <p className="text-gray-600">support@patternsight.app</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mailing Address</h3>
                  <p className="text-gray-600">
                    AlienNova Technologies<br />
                    Attn: Privacy Officer<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
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

