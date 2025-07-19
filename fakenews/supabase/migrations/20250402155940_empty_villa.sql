/*
  # Fix Analysis History RLS Policies

  1. Changes
    - Update RLS policies for analysis_history table to allow authenticated users to insert their own records
    
  2. Security
    - Maintain existing RLS policies for SELECT
    - Add proper INSERT policy for authenticated users
*/

-- Drop existing INSERT policy if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'analysis_history' 
    AND cmd = 'INSERT'
  ) THEN
    DROP POLICY IF EXISTS "Users can insert own analysis" ON analysis_history;
  END IF;
END $$;

-- Create new INSERT policy with proper check
CREATE POLICY "Users can insert own analysis"
  ON analysis_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);