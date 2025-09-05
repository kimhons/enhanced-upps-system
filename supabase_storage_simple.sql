-- Simplified storage setup for PatternSight v4.0
-- This version works with standard Supabase permissions

-- First, let's create the storage buckets using the Supabase dashboard
-- Go to Storage > Create Bucket and create these buckets:

-- 1. avatars (public: true, file size limit: 5MB)
-- 2. user-files (public: false, file size limit: 100MB) 
-- 3. exports (public: false, file size limit: 50MB)
-- 4. system (public: false, file size limit: 1GB)
-- 5. temp (public: false, file size limit: 10MB)

-- Add storage tracking columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS storage_used BIGINT DEFAULT 0,
ADD COLUMN IF NOT EXISTS storage_limit BIGINT DEFAULT 1073741824; -- 1GB default

-- Create a simple function to get user storage usage
CREATE OR REPLACE FUNCTION get_user_storage_usage(user_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_size BIGINT := 0;
BEGIN
  -- This is a placeholder - in production you would query storage.objects
  -- For now, we'll return the stored value
  SELECT COALESCE(storage_used, 0) INTO total_size
  FROM public.users
  WHERE id = user_id;
  
  RETURN total_size;
END;
$$;

-- Create function to update storage usage (called from application)
CREATE OR REPLACE FUNCTION update_storage_usage(user_id UUID, size_change BIGINT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users
  SET storage_used = GREATEST(0, COALESCE(storage_used, 0) + size_change)
  WHERE id = user_id;
END;
$$;

-- Create function to check if user can upload file
CREATE OR REPLACE FUNCTION can_upload_file(user_id UUID, file_size BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_usage BIGINT;
  storage_limit BIGINT;
BEGIN
  SELECT COALESCE(storage_used, 0), COALESCE(users.storage_limit, 1073741824)
  INTO current_usage, storage_limit
  FROM public.users
  WHERE id = user_id;
  
  RETURN (current_usage + file_size) <= storage_limit;
END;
$$;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION get_user_storage_usage(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_storage_usage(UUID, BIGINT) TO authenticated;
GRANT EXECUTE ON FUNCTION can_upload_file(UUID, BIGINT) TO authenticated;

