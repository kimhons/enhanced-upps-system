'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Image, CheckCircle, AlertCircle } from 'lucide-react'
import { cloudStorage, FILE_SIZE_LIMITS, ALLOWED_FILE_TYPES } from '@/lib/storage'

interface FileUploadProps {
  bucket: string
  path?: string
  accept?: string
  maxSize?: number
  allowedTypes?: string[]
  onUploadComplete?: (url: string, file: File) => void
  onUploadError?: (error: any) => void
  className?: string
  children?: React.ReactNode
}

export default function FileUpload({
  bucket,
  path = '',
  accept = '*/*',
  maxSize = FILE_SIZE_LIMITS.USER_FILE,
  allowedTypes = [],
  onUploadComplete,
  onUploadError,
  className = '',
  children
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; url: string; status: 'success' | 'error' }[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      }
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`
      }
    }

    return { valid: true }
  }

  const uploadFile = async (file: File) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      onUploadError?.(new Error(validation.error))
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const timestamp = Date.now()
      const fileExt = file.name.split('.').pop()
      const fileName = `${path}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const { data, error } = await cloudStorage.uploadFile(bucket, fileName, file, {
        contentType: file.type,
        upsert: false
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (error) {
        throw error
      }

      const url = cloudStorage.getPublicUrl(bucket, fileName)
      
      setUploadedFiles(prev => [...prev, { file, url, status: 'success' }])
      onUploadComplete?.(url, file)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadedFiles(prev => [...prev, { file, url: '', status: 'error' }])
      onUploadError?.(error)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach(file => {
      uploadFile(file)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />
    }
    return <File className="w-4 h-4" />
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${dragOver 
            ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-amber-400'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading}
        />

        {children || (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-gray-400" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-amber-600 dark:text-amber-400">Click to upload</span>
              {' '}or drag and drop
            </div>
            <div className="text-xs text-gray-500">
              Max file size: {Math.round(maxSize / 1024 / 1024)}MB
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Uploaded Files
          </h4>
          {uploadedFiles.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(item.file)}
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatFileSize(item.file.size)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

