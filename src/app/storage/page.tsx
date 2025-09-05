'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Cloud, 
  Download, 
  Trash2, 
  File, 
  Image, 
  FileText, 
  Archive,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Share2
} from 'lucide-react'
import FileUpload from '@/components/ui/file-upload'
import { cloudStorage, STORAGE_BUCKETS, ALLOWED_FILE_TYPES } from '@/lib/storage'

export default function StoragePage() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    // Check disclaimer acceptance
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted')
    if (!disclaimerAccepted) {
      router.push('/auth/disclaimer')
      return
    }

    setLoading(false)
  }, [user, router])

  const handleFileUpload = async (url: string, file: File) => {
    console.log('File uploaded:', { url, fileName: file.name })
  }

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your files...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cloud Storage</h1>
            <p className="text-gray-300">Manage your files and exports</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Storage Used</div>
              <div className="text-lg font-semibold text-white">0 MB</div>
            </div>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Files</span>
            </button>
          </div>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Upload Files</h3>
            <FileUpload
              bucket={STORAGE_BUCKETS.USER_FILES}
              path={user?.id || ''}
              accept="image/*,.pdf,.csv,.json,.txt"
              allowedTypes={[...ALLOWED_FILE_TYPES.IMAGES, ...ALLOWED_FILE_TYPES.DOCUMENTS]}
              onUploadComplete={handleFileUpload}
              onUploadError={handleUploadError}
            />
          </div>
        )}

        {/* Files Grid */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
          <div className="p-12 text-center">
            <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Cloud Storage Ready</h3>
            <p className="text-gray-300 mb-4">Upload files to store them securely in the cloud</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/5 p-4 rounded-lg">
                <Image className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Images</h4>
                <p className="text-sm text-gray-400">JPG, PNG, GIF, WebP</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <FileText className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Documents</h4>
                <p className="text-sm text-gray-400">PDF, TXT, CSV</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <Archive className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Exports</h4>
                <p className="text-sm text-gray-400">JSON, CSV Reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

