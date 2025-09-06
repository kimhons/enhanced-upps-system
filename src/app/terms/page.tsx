'use client'

import React from 'react';
import Link from 'next/link';
import { FileText, Scale, AlertTriangle, Shield, Users, CreditCard, Calendar, Mail } from 'lucide-react';

export default function TermsPage() {
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
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Please read these terms carefully before using PatternSight services.
          </p>
          <div className="flex items-center justify-center space-x-2 text-purple-200">
            <Calendar className="w-5 h-5" />
            <span>Last updated: January 1, 2025</span>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Agreement to Terms</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              These Terms of Service ("Terms") constitute a legally binding agreement between you and AlienNova Technologies ("Company," "we," "us," or "our") regarding your use of the PatternSight platform and services.
            </p>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
              <p className="text-gray-700">
                <strong>By accessing or using PatternSight, you agree to be bound by these Terms.</strong> If you do not agree to these Terms, you may not access or use our services.
              </p>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Scale className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Service Description</h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              PatternSight is a lottery analysis platform that uses mathematical algorithms and statistical analysis to identify patterns in historical lottery data. Our services include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>10-pillar mathematical analysis system</li>
                  <li>Historical pattern recognition</li>
                  <li>Statistical probability calculations</li>
                  <li>Prediction generation and tracking</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Enhancements</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Cosmic Intelligence add-on</li>
                  <li>Claude Nexus AI integration</li>
                  <li>Premium Enhancement features</li>
                  <li>Advanced algorithmic analysis</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-6 rounded-xl mt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Important Disclaimer</h3>
                  <p className="text-red-700 text-sm">
                    PatternSight provides mathematical analysis and pattern recognition services. We do not guarantee lottery wins or specific outcomes. Lottery drawings are random events, and past performance does not predict future results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Accounts */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">User Accounts</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person; sharing accounts is prohibited</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Keep your login credentials confidential</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
                <p className="text-gray-600 mb-3">
                  We may suspend or terminate your account if you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Violate these Terms of Service</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Attempt to circumvent usage limits or security measures</li>
                  <li>Provide false or misleading information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Subscription and Billing */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Subscription and Billing</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Free Tier</h4>
                    <p className="text-gray-600 text-sm">3 analyses per day, basic features</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Starter Plan</h4>
                    <p className="text-gray-600 text-sm">$9.99/month, 10 analyses per day</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Pro Plan</h4>
                    <p className="text-gray-600 text-sm">$39.99/month, 50 analyses per day + 2 add-ons</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Elite Plan</h4>
                    <p className="text-gray-600 text-sm">$199.99/month, 300 analyses per day + all add-ons</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing Terms</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Subscriptions are billed monthly in advance</li>
                  <li>All fees are non-refundable except as required by law</li>

                  <li>Prices may change with 30 days advance notice</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>You may cancel your subscription at any time</li>
                  <li>Cancellation takes effect at the end of the current billing period</li>
                  <li>No refunds for partial months unless required by law</li>
                  <li>Free tier access continues after paid subscription cancellation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Acceptable Use */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Acceptable Use Policy</h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              You agree not to use PatternSight for any of the following prohibited activities:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Transmitting malicious code or viruses</li>
                  <li>Attempting to gain unauthorized access</li>
                  <li>Reverse engineering or decompiling software</li>
                  <li>Creating derivative works without permission</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Restrictions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                  <li>Exceeding daily analysis limits</li>
                  <li>Sharing account credentials with others</li>
                  <li>Using automated tools or bots</li>
                  <li>Reselling or redistributing our services</li>
                  <li>Interfering with service operation</li>
                  <li>Circumventing security measures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Rights</h3>
                <p className="text-gray-600 mb-3">
                  PatternSight and all related content, features, and functionality are owned by AlienNova Technologies and protected by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Copyright, trademark, and patent laws</li>
                  <li>International intellectual property treaties</li>
                  <li>Trade secret and proprietary information laws</li>
                  <li>Other applicable intellectual property rights</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
                <p className="text-gray-600 mb-3">
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Access and use PatternSight for personal, non-commercial purposes</li>
                  <li>Generate and use predictions for your own lottery participation</li>
                  <li>Export your personal data and prediction history</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">User Content</h3>
                <p className="text-gray-600">
                  You retain ownership of any content you submit to PatternSight. By submitting content, you grant us a worldwide, royalty-free license to use, modify, and display such content solely for providing our services.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-gray-900">Legal Disclaimers and Limitations</h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-8 rounded-xl space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">BINDING LEGAL AGREEMENT</h3>
                <p className="text-red-700">
                  By accessing, using, or purchasing any services from PatternSight, you agree to be legally bound by these terms and all applicable laws. This constitutes a binding contract between you and PatternSight and its affiliates.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">ENTERTAINMENT & EDUCATIONAL PURPOSES ONLY</h3>
                <p className="text-red-700">
                  PatternSight is a mathematical analysis tool designed solely for entertainment and educational purposes to explore lottery patterns and demonstrate AI capabilities. <strong>NO SYSTEM CAN PREDICT LOTTERY OUTCOMES</strong>, which are random by design. Any suggestions, predictions, or analysis provided are for educational demonstration only.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">NO REFUNDS POLICY</h3>
                <p className="text-red-700 mb-3">
                  <strong>ALL PURCHASES ARE FINAL AND NON-REFUNDABLE.</strong> This includes but is not limited to subscription fees, add-on purchases, premium features, and any other paid services. By making a purchase, you acknowledge and agree that no refunds will be provided under any circumstances, including:
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Dissatisfaction with results</li>
                  <li>Technical issues or service interruptions</li>
                  <li>Change of mind or buyer's remorse</li>
                  <li>Inability to access the service</li>
                  <li>Any other reason whatsoever</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">NO GUARANTEES OR WARRANTIES</h3>
                <p className="text-red-700">
                  We make no representations, warranties, or guarantees regarding the accuracy, reliability, or effectiveness of our analysis. Our stated pattern accuracy percentages refer to mathematical pattern recognition in historical data only, not future prediction accuracy. Lottery drawings are independent random events where past results do not influence future outcomes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">LIMITATION OF LIABILITY</h3>
                <p className="text-red-700 mb-3">
                  PatternSight, its owners, affiliates, employees, and partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Financial losses from lottery participation</li>
                  <li>Gambling losses or addiction</li>
                  <li>Lost profits or business opportunities</li>
                  <li>Data loss or technical failures</li>
                  <li>Any other damages or losses</li>
                </ul>
                <p className="text-red-700 mt-3">
                  Your sole remedy is to discontinue use of our services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">RESPONSIBLE GAMBLING</h3>
                <p className="text-red-700">
                  You acknowledge that lottery participation involves risk of financial loss. You agree to play responsibly and never spend more than you can afford to lose. If you have a gambling problem, please seek professional help immediately.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">INDEMNIFICATION</h3>
                <p className="text-red-700">
                  You agree to indemnify and hold harmless PatternSight and its affiliates from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of our services or violation of these terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">GOVERNING LAW & DISPUTES</h3>
                <p className="text-red-700">
                  These terms are governed by applicable laws. Any disputes shall be resolved through binding arbitration rather than in court. If any provision of these terms is deemed invalid or unenforceable, the remaining provisions remain in full effect.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">AGE REQUIREMENT</h3>
                <p className="text-red-700">
                  You must be 18 years or older to use our services. By using PatternSight, you represent that you meet this age requirement and have legal capacity to enter into this agreement.
                </p>
              </div>

              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-bold text-center">
                  BY CONTINUING TO USE THIS WEBSITE, CREATING AN ACCOUNT, OR MAKING ANY PURCHASE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE LEGALLY BOUND BY ALL TERMS ABOVE.
                </p>
              </div>
            </div>

            {/* Gambling Help Resources */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Need Help with Gambling?</h3>
              <div className="text-blue-700 space-y-2">
                <p><strong>National Problem Gambling Helpline:</strong> 1-800-522-4700</p>
                <p><strong>Gamblers Anonymous:</strong> www.gamblersanonymous.org</p>
                <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              For questions about these terms (non-legal matters only), please contact us through our website. 
              For legal matters, please consult with your own attorney.
            </p>
          </div>
              <p className="text-gray-700 font-semibold">
                LOTTERY DRAWINGS ARE RANDOM EVENTS. PAST PERFORMANCE DOES NOT PREDICT FUTURE RESULTS.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
                <p className="text-gray-600">
                  We strive to maintain high service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h3>
                <p className="text-gray-600">
                  Our platform integrates with third-party services (payment processors, data providers). We are not responsible for the availability, accuracy, or reliability of these external services.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
            
            <div className="bg-red-50 border border-red-200 p-8 rounded-xl">
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALIENOVA TECHNOLOGIES SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
                <li>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</li>
                <li>DAMAGES RESULTING FROM LOTTERY LOSSES OR GAMBLING ACTIVITIES</li>
                <li>DAMAGES EXCEEDING THE AMOUNT PAID FOR SERVICES IN THE PAST 12 MONTHS</li>
              </ul>
              <p className="text-gray-700 font-semibold">
                SOME JURISDICTIONS DO NOT ALLOW LIMITATION OF LIABILITY, SO THESE LIMITATIONS MAY NOT APPLY TO YOU.
              </p>
            </div>
          </div>

          {/* Indemnification */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Indemnification</h2>
            <p className="text-lg text-gray-600 mb-4">
              You agree to indemnify, defend, and hold harmless AlienNova Technologies and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Your use of PatternSight services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you submit or transmit</li>
            </ul>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Governing Law and Disputes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Governing Law</h3>
                <p className="text-gray-600">
                  These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
                <p className="text-gray-600 mb-3">
                  Any disputes arising from these Terms or your use of PatternSight will be resolved through:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Good faith negotiation between the parties</li>
                  <li>Binding arbitration under the rules of the American Arbitration Association</li>
                  <li>Arbitration proceedings conducted in San Francisco, California</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Class Action Waiver</h3>
                <p className="text-gray-600">
                  You agree to resolve disputes individually and waive any right to participate in class action lawsuits or class-wide arbitration.
                </p>
              </div>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
            <p className="text-lg text-gray-600 mb-4">
              We may update these Terms from time to time. When we make material changes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>We will notify you via email or platform notification</li>
              <li>We will update the "Last Updated" date</li>
              <li>Changes take effect 30 days after notification</li>
              <li>Continued use constitutes acceptance of new Terms</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border border-orange-200">
              <p className="text-lg text-gray-700 mb-6">
                If you have questions about these Terms of Service, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Email</h3>
                  <p className="text-gray-600">legal@patternsight.app</p>
                  <p className="text-gray-600">support@patternsight.app</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mailing Address</h3>
                  <p className="text-gray-600">
                    AlienNova Technologies<br />
                    Attn: Legal Department<br />
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

