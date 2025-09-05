-- Create storage buckets for PatternSight v4.0
-- Run this in Supabase SQL Editor

-- Create avatars bucket for user profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create user-files bucket for general user uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-files',
  'user-files',
  false,
  104857600, -- 100MB
  ARRAY[
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/csv', 'application/json', 'text/plain'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Create exports bucket for prediction exports and reports
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'exports',
  'exports',
  false,
  52428800, -- 50MB
  ARRAY['application/json', 'text/csv', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Create system bucket for system files and backups
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'system',
  'system',
  false,
  1073741824, -- 1GB
  ARRAY['application/json', 'text/csv', 'application/pdf', 'application/zip']
) ON CONFLICT (id) DO NOTHING;

-- Create temp bucket for temporary files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'temp',
  'temp',
  false,
  10485760, -- 10MB
  ARRAY[
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/csv', 'application/json', 'text/plain'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS) policies for storage

-- Avatars bucket policies (public read, user can update own)
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- User-files bucket policies (private, user access only)
CREATE POLICY "Users can view their own files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'user-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'user-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'user-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'user-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Exports bucket policies (private, user access only)
CREATE POLICY "Users can view their own exports" ON storage.objects
FOR SELECT USING (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own exports" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own exports" ON storage.objects
FOR DELETE USING (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- System bucket policies (admin access only)
CREATE POLICY "Only admins can access system files" ON storage.objects
FOR ALL USING (
  bucket_id = 'system' 
  AND EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND subscription_tier = 'admin'
  )
);

-- Temp bucket policies (user access with time limit)
CREATE POLICY "Users can access temp files" ON storage.objects
FOR ALL USING (
  bucket_id = 'temp' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND created_at > NOW() - INTERVAL '24 hours'
);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create function to clean up temp files older than 24 hours
CREATE OR REPLACE FUNCTION cleanup_temp_files()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM storage.objects 
  WHERE bucket_id = 'temp' 
  AND created_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Create a scheduled job to run cleanup daily (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-temp-files', '0 2 * * *', 'SELECT cleanup_temp_files();');

-- Add storage usage tracking to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS storage_used BIGINT DEFAULT 0,
ADD COLUMN IF NOT EXISTS storage_limit BIGINT DEFAULT 1073741824; -- 1GB default

-- Function to update user storage usage
CREATE OR REPLACE FUNCTION update_user_storage_usage()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  total_size BIGINT;
BEGIN
  -- Extract user ID from the file path
  user_id := (storage.foldername(COALESCE(NEW.name, OLD.name)))[1]::UUID;
  
  -- Calculate total storage used by this user
  SELECT COALESCE(SUM(metadata->>'size')::BIGINT, 0)
  INTO total_size
  FROM storage.objects
  WHERE bucket_id IN ('user-files', 'exports', 'avatars')
  AND (storage.foldername(name))[1]::UUID = user_id;
  
  -- Update user's storage usage
  UPDATE public.users
  SET storage_used = total_size
  WHERE id = user_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create triggers to update storage usage
CREATE TRIGGER update_storage_usage_on_insert
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION update_user_storage_usage();

CREATE TRIGGER update_storage_usage_on_delete
  AFTER DELETE ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION update_user_storage_usage();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

