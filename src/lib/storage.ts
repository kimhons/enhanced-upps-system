import { supabase } from './supabase'

export class CloudStorage {
  private static instance: CloudStorage
  
  public static getInstance(): CloudStorage {
    if (!CloudStorage.instance) {
      CloudStorage.instance = new CloudStorage()
    }
    return CloudStorage.instance
  }

  // Upload file to cloud storage
  async uploadFile(
    bucket: string,
    path: string,
    file: File,
    options?: {
      cacheControl?: string
      contentType?: string
      upsert?: boolean
    }
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: options?.cacheControl || '3600',
          contentType: options?.contentType || file.type,
          upsert: options?.upsert || false
        })

      return { data, error }
    } catch (error) {
      console.error('Upload error:', error)
      return { data: null, error }
    }
  }

  // Download file from cloud storage
  async downloadFile(bucket: string, path: string): Promise<{ data: Blob | null; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path)

      return { data, error }
    } catch (error) {
      console.error('Download error:', error)
      return { data: null, error }
    }
  }

  // Get public URL for a file
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  }

  // Create signed URL for private files
  async createSignedUrl(
    bucket: string, 
    path: string, 
    expiresIn: number = 3600
  ): Promise<{ data: { signedUrl: string } | null; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn)

      return { data, error }
    } catch (error) {
      console.error('Signed URL error:', error)
      return { data: null, error }
    }
  }

  // List files in a directory
  async listFiles(
    bucket: string, 
    path?: string,
    options?: {
      limit?: number
      offset?: number
      sortBy?: { column: string; order: 'asc' | 'desc' }
    }
  ): Promise<{ data: any[] | null; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(path, {
          limit: options?.limit || 100,
          offset: options?.offset || 0,
          sortBy: options?.sortBy || { column: 'name', order: 'asc' }
        })

      return { data, error }
    } catch (error) {
      console.error('List files error:', error)
      return { data: null, error }
    }
  }

  // Delete file from cloud storage
  async deleteFile(bucket: string, paths: string[]): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove(paths)

      return { data, error }
    } catch (error) {
      console.error('Delete error:', error)
      return { data: null, error }
    }
  }

  // Move/rename file
  async moveFile(
    bucket: string,
    fromPath: string,
    toPath: string
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .move(fromPath, toPath)

      return { data, error }
    } catch (error) {
      console.error('Move error:', error)
      return { data: null, error }
    }
  }

  // Copy file
  async copyFile(
    bucket: string,
    fromPath: string,
    toPath: string
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .copy(fromPath, toPath)

      return { data, error }
    } catch (error) {
      console.error('Copy error:', error)
      return { data: null, error }
    }
  }

  // Upload user profile image
  async uploadProfileImage(userId: string, file: File): Promise<{ url: string | null; error: any }> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/profile.${fileExt}`
    
    const { data, error } = await this.uploadFile('avatars', fileName, file, {
      upsert: true,
      contentType: file.type
    })

    if (error) {
      return { url: null, error }
    }

    const url = this.getPublicUrl('avatars', fileName)
    return { url, error: null }
  }

  // Upload prediction export
  async uploadPredictionExport(
    userId: string, 
    exportData: any, 
    format: 'json' | 'csv' | 'pdf' = 'json'
  ): Promise<{ url: string | null; error: any }> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `${userId}/exports/predictions-${timestamp}.${format}`
    
    let file: File
    let contentType: string

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        file = new File([jsonBlob], `predictions-${timestamp}.json`, { type: 'application/json' })
        contentType = 'application/json'
        break
      case 'csv':
        // Convert to CSV format
        const csvContent = this.convertToCSV(exportData)
        const csvBlob = new Blob([csvContent], { type: 'text/csv' })
        file = new File([csvBlob], `predictions-${timestamp}.csv`, { type: 'text/csv' })
        contentType = 'text/csv'
        break
      case 'pdf':
        // For PDF, exportData should already be a Blob
        file = new File([exportData], `predictions-${timestamp}.pdf`, { type: 'application/pdf' })
        contentType = 'application/pdf'
        break
      default:
        return { url: null, error: new Error('Unsupported format') }
    }

    const { data, error } = await this.uploadFile('exports', fileName, file, {
      contentType,
      cacheControl: '86400' // 24 hours
    })

    if (error) {
      return { url: null, error }
    }

    // Create signed URL for private access
    const { data: signedData, error: signedError } = await this.createSignedUrl('exports', fileName, 86400)
    
    if (signedError) {
      return { url: null, error: signedError }
    }

    return { url: signedData?.signedUrl || null, error: null }
  }

  // Get user's uploaded files
  async getUserFiles(userId: string, folder?: string): Promise<{ files: any[] | null; error: any }> {
    const path = folder ? `${userId}/${folder}` : userId
    
    const { data, error } = await this.listFiles('user-files', path, {
      sortBy: { column: 'created_at', order: 'desc' }
    })

    return { files: data, error }
  }

  // Helper method to convert data to CSV
  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return ''
    
    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        }).join(',')
      )
    ]
    
    return csvRows.join('\n')
  }
}

// Storage buckets configuration
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',           // User profile images
  EXPORTS: 'exports',           // Prediction exports and reports
  USER_FILES: 'user-files',     // User uploaded files
  SYSTEM: 'system',             // System files and backups
  TEMP: 'temp'                  // Temporary files
} as const

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  AVATAR: 5 * 1024 * 1024,      // 5MB
  EXPORT: 50 * 1024 * 1024,     // 50MB
  USER_FILE: 100 * 1024 * 1024, // 100MB
} as const

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'text/csv', 'application/json'],
  EXPORTS: ['application/json', 'text/csv', 'application/pdf']
} as const

export const cloudStorage = CloudStorage.getInstance()

