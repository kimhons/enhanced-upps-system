'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  ArrowLeft,
  Shield,
  Key,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Globe,
  Database,
  FileText,
  Settings as SettingsIcon,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

export default function DemoAccountSettingsPage() {
  const [activeTab, setActiveTab] = useState('security')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: new Date().toISOString(),
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: new Date(Date.now() - 86400000).toISOString(),
      current: false
    }
  ])

  const handlePasswordChange = () => {
    alert('Password updated successfully! (Demo)')
  }

  const handleDataExport = () => {
    alert('Data export started! (Demo)')
  }

  const handleAccountDeletion = () => {
    const confirmation = prompt(
      'Are you sure you want to delete your account? This action cannot be undone. Type "DELETE" to confirm:'
    )
    if (confirmation === 'DELETE') {
      alert('Account deletion request submitted! (Demo)')
    }
  }

  const handleSessionRevoke = (sessionId: string) => {
    alert(`Session ${sessionId} revoked! (Demo)`)
  }

  const tabs = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'sessions', label: 'Active Sessions', icon: Smartphone },
    { id: 'privacy', label: 'Privacy & Data', icon: Database },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.1),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent)] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Brain className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-bold text-white">Account Settings (Demo)</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-300">Demo User</p>
                <p className="text-white font-semibold">demo@patternsight.app</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                        activeTab === tab.id
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'hover:bg-white/5 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Change Password */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Key className="h-5 w-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Change Password</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full pl-10 pr-12 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full pl-10 pr-12 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full pl-10 pr-12 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-indigo-900 font-bold py-2 px-4 rounded-lg transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-amber-400" />
                      <h3 className="text-lg font-bold text-white">Two-Factor Authentication</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      twoFactorEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>

                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      twoFactorEnabled
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Active Sessions Tab */}
            {activeTab === 'sessions' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Smartphone className="h-5 w-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Active Sessions</h3>
                </div>

                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="bg-black/20 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${session.current ? 'bg-green-400' : 'bg-slate-400'}`} />
                        <div>
                          <p className="text-white font-medium">{session.device}</p>
                          <p className="text-slate-400 text-sm">{session.location}</p>
                          <p className="text-slate-400 text-xs">
                            Last active: {new Date(session.lastActive).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {session.current && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Current
                          </span>
                        )}
                        {!session.current && (
                          <button
                            onClick={() => handleSessionRevoke(session.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Privacy & Data Tab */}
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Data Export */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Download className="h-5 w-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Export Your Data</h3>
                  </div>

                  <p className="text-slate-300 text-sm mb-4">
                    Download a copy of all your data including predictions, profile information, and settings.
                  </p>

                  <button
                    onClick={handleDataExport}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </button>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="h-5 w-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Privacy Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Analytics Tracking</h4>
                        <p className="text-sm text-slate-400">Allow us to collect anonymous usage data</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Marketing Communications</h4>
                        <p className="text-sm text-slate-400">Receive product updates and offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Danger Zone</h3>
                </div>

                <div className="space-y-6">
                  {/* Account Deletion */}
                  <div className="border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-white font-bold mb-2">Delete Account</h4>
                    <p className="text-slate-300 text-sm mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-red-300">
                          <p className="font-medium mb-1">This will permanently:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Delete all your predictions and analysis history</li>
                            <li>Cancel any active subscriptions</li>
                            <li>Remove your profile and personal information</li>
                            <li>Revoke access to all PatternSight services</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleAccountDeletion}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

