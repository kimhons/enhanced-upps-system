'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DisclaimerPage() {
  const [confirmationText, setConfirmationText] = useState('')
  const [initials, setInitials] = useState('')
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const requiredText = "I have read and understood the complete disclaimer"

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10
    if (isAtBottom) {
      setHasScrolledToEnd(true)
    }
  }

  const handleAccept = () => {
    if (confirmationText.trim() !== requiredText) {
      setError('Please type the required text exactly as shown.')
      return
    }
    
    if (initials.trim().length < 2) {
      setError('Please enter your initials.')
      return
    }

    // Store disclaimer acceptance in localStorage
    localStorage.setItem('disclaimerAccepted', 'true')
    localStorage.setItem('disclaimerTimestamp', new Date().toISOString())
    localStorage.setItem('disclaimerInitials', initials.trim())
    
    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔮</div>
            <h1 className="text-3xl font-bold text-white mb-2">PatternSight</h1>
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Important Disclaimer</h2>
            <p className="text-gray-300">Please read this disclaimer carefully and completely before accessing the PatternSight prediction system.</p>
          </div>

          {/* Disclaimer Content */}
          <div 
            className="bg-black/30 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto border border-red-500/50"
            onScroll={handleScroll}
          >
            <div className="text-red-400 font-bold text-center mb-6 text-lg">
              ⚠️ MANDATORY LEGAL DISCLAIMER ⚠️<br />
              You must read this entire disclaimer and provide explicit consent before accessing our services
            </div>

            <div className="space-y-6 text-gray-200 text-sm leading-relaxed">
              <div>
                <h3 className="text-red-400 font-bold mb-2">NO GUARANTEED RESULTS</h3>
                <p>PatternSight is a statistical analysis and entertainment platform. We do NOT guarantee winning lottery numbers, jackpot victories, or any financial returns. Lottery drawings are random events, and past results do not influence future outcomes. Our predictions are based on mathematical analysis and should be treated as entertainment only.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">RESPONSIBLE GAMBLING</h3>
                <p>Lottery participation should be limited to amounts you can afford to lose. Gambling can be addictive. If you or someone you know has a gambling problem, please contact the National Problem Gambling Helpline at 1-800-522-4700 or visit ncpgambling.org. PatternSight encourages responsible gaming practices and does not promote excessive gambling.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">STATISTICAL ANALYSIS LIMITATIONS</h3>
                <p>Our system uses advanced statistical methods, astronomical correlations, numerological analysis, and artificial intelligence to identify patterns in historical lottery data. However, these patterns do not guarantee future results. Lottery numbers are drawn randomly, and each combination has an equal probability of being selected regardless of historical patterns.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">FINANCIAL DISCLAIMER</h3>
                <p>PatternSight subscription fees are for access to our analysis platform and entertainment services only. These fees do not guarantee lottery winnings or financial returns. You acknowledge that lottery participation involves financial risk, and you are solely responsible for your gambling decisions and any resulting financial consequences.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">ACCURACY AND RELIABILITY</h3>
                <p>While we strive for accuracy in our statistical analysis and data processing, we cannot guarantee the accuracy, completeness, or reliability of our predictions or analysis. Technical errors, data inconsistencies, or system failures may occur. Users should verify all lottery information through official lottery sources.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">AGE AND LEGAL REQUIREMENTS</h3>
                <p>You must be at least 18 years old (or the legal gambling age in your jurisdiction) to use PatternSight. You are responsible for ensuring that your use of our services complies with all applicable local, state, and federal laws. Lottery participation may be restricted or prohibited in certain jurisdictions.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">LIMITATION OF LIABILITY</h3>
                <p>PatternSight, its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to financial losses from lottery participation, missed opportunities, or technical failures. Your use of our services is at your own risk.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">SUBSCRIPTION AND BILLING</h3>
                <p>Subscription fees are charged according to your selected plan and are non-refundable except as required by law. You may cancel your subscription at any time, but cancellation does not entitle you to a refund of previously paid fees. Continued use of our services after any changes to these terms constitutes acceptance of the modified terms.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">INTELLECTUAL PROPERTY</h3>
                <p>All content, algorithms, analysis methods, and intellectual property on PatternSight are owned by us and protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without explicit written permission.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">PRIVACY AND DATA COLLECTION</h3>
                <p>We collect and process personal information as described in our Privacy Policy. By using our services, you consent to our data collection and processing practices. We may use your information to improve our services, send you updates, and for other legitimate business purposes.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">MODIFICATIONS TO TERMS</h3>
                <p>We reserve the right to modify these terms and our services at any time without prior notice. Continued use of our services after modifications constitutes acceptance of the updated terms. It is your responsibility to review these terms periodically for changes.</p>
              </div>

              <div>
                <h3 className="text-red-400 font-bold mb-2">GOVERNING LAW</h3>
                <p>These terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes arising from your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
              </div>

              <div className="bg-red-900/50 p-4 rounded-lg border border-red-500">
                <h3 className="text-red-300 font-bold mb-2 text-center">FINAL WARNING</h3>
                <p className="text-center font-semibold">BY PROCEEDING, YOU ACKNOWLEDGE THAT PATTERNSIGHT IS FOR ENTERTAINMENT PURPOSES ONLY. WE DO NOT GUARANTEE LOTTERY WINS OR FINANCIAL RETURNS. LOTTERY PARTICIPATION INVOLVES FINANCIAL RISK. PLEASE GAMBLE RESPONSIBLY AND WITHIN YOUR MEANS.</p>
              </div>
            </div>
          </div>

          {/* Confirmation Section */}
          {hasScrolledToEnd ? (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Type the following text to confirm you have read the disclaimer:
                </label>
                <p className="text-amber-400 font-mono mb-2">"{requiredText}"</p>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="Type the required text exactly..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Enter your initials for legal acknowledgment:
                </label>
                <input
                  type="text"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase())}
                  placeholder="J.D."
                  maxLength={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm font-semibold">
                  {error}
                </div>
              )}

              <div className="text-gray-300 text-sm">
                I have read, understood, and agree to all terms in this disclaimer. I acknowledge that PatternSight provides entertainment services only and does not guarantee lottery winnings.
              </div>

              <div className="flex gap-4">
                <Link 
                  href="/"
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold text-center transition-colors"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Accept & Continue
                </button>
              </div>

              <div className="text-xs text-gray-400 text-center">
                Timestamp: {new Date().toLocaleString()} | IP: [Logged for legal purposes]
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-amber-400 font-semibold mb-4">
                ⚠️ Please scroll to the end of the disclaimer above to continue
              </div>
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Cancel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

