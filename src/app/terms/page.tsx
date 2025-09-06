'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, Mail } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to PatternSight
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service & Legal Disclaimer</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Important Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1 mr-3" />
            <div>
              <h2 className="text-lg font-bold text-red-800 mb-2">BINDING LEGAL AGREEMENT</h2>
              <p className="text-red-700">
                By accessing, using, or purchasing any services from PatternSight, you agree to be legally bound by these terms and all applicable laws. This constitutes a binding contract between you and PatternSight and its affiliates.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Service Description</h2>
            <p className="text-gray-700 mb-4">
              <strong>ENTERTAINMENT & EDUCATIONAL PURPOSES ONLY:</strong> PatternSight is a mathematical analysis tool designed solely for entertainment and educational purposes to explore lottery patterns and demonstrate AI capabilities. <strong>NO SYSTEM CAN PREDICT LOTTERY OUTCOMES</strong>, which are random by design. Any suggestions, predictions, or analysis provided are for educational demonstration only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. No Refunds Policy</h2>
            <p className="text-gray-700 mb-4">
              <strong>ALL PURCHASES ARE FINAL AND NON-REFUNDABLE.</strong> This includes but is not limited to subscription fees, add-on purchases, premium features, and any other paid services. By making a purchase, you acknowledge and agree that no refunds will be provided under any circumstances, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Dissatisfaction with results</li>
              <li>Technical issues or service interruptions</li>
              <li>Change of mind or buyer's remorse</li>
              <li>Inability to access the service</li>
              <li>Any other reason whatsoever</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. No Guarantees or Warranties</h2>
            <p className="text-gray-700 mb-4">
              We make no representations, warranties, or guarantees regarding the accuracy, reliability, or effectiveness of our analysis. Our stated pattern accuracy percentages refer to mathematical pattern recognition in historical data only, not future prediction accuracy. Lottery drawings are independent random events where past results do not influence future outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              PatternSight, its owners, affiliates, employees, and partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Financial losses from lottery participation</li>
              <li>Gambling losses or addiction</li>
              <li>Lost profits or business opportunities</li>
              <li>Data loss or technical failures</li>
              <li>Any other damages or losses</li>
            </ul>
            <p className="text-gray-700">
              Your sole remedy is to discontinue use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsible Use</h3>
                <p className="text-gray-700">
                  You acknowledge that lottery participation involves risk of financial loss. You agree to play responsibly and never spend more than you can afford to lose. If you have a gambling problem, please seek professional help immediately.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Age Requirement</h3>
                <p className="text-gray-700">
                  You must be 18 years or older to use our services. By using PatternSight, you represent that you meet this age requirement and have legal capacity to enter into this agreement.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless PatternSight and its affiliates from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Your use of our services</li>
              <li>Your violation of these terms</li>
              <li>Your violation of any applicable laws</li>
              <li>Any third-party claims related to your use of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Governing Law & Disputes</h2>
            <p className="text-gray-700 mb-4">
              These terms are governed by applicable laws. Any disputes shall be resolved through binding arbitration rather than in court. If any provision of these terms is deemed invalid or unenforceable, the remaining provisions remain in full effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Modifications</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify, suspend, or discontinue our services at any time without notice. We may also update these terms periodically, and continued use constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these terms (non-legal matters only), please contact us through our website. For legal matters, please consult with your own attorney.
            </p>
          </section>

          {/* Final Agreement */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-red-800 mb-3">ACKNOWLEDGMENT OF AGREEMENT</h2>
            <p className="text-red-700 font-medium">
              BY CONTINUING TO USE THIS WEBSITE, CREATING AN ACCOUNT, OR MAKING ANY PURCHASE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE LEGALLY BOUND BY ALL TERMS ABOVE.
            </p>
          </div>

          {/* Gambling Help Resources */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-blue-800 mb-3">Need Help with Gambling?</h2>
            <div className="text-blue-700 space-y-2">
              <p><strong>National Problem Gambling Helpline:</strong> 1-800-522-4700</p>
              <p><strong>Gamblers Anonymous:</strong> www.gamblersanonymous.org</p>
              <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🔮</span>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">PatternSight</div>
                  <div className="text-gray-400 text-sm">Where Mathematics Meets Possibility</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced AI-powered lottery analysis platform combining mathematical precision with artificial intelligence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
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
            <p>&copy; 2025 PatternSight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

