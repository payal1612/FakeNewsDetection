/*
  # Add User Profile Fields

  1. Changes
    - Add avatar_url and bio columns to profiles table
    - Add plagiarism_score to analysis_history table
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS bio text;

-- Add plagiarism score to analysis history
ALTER TABLE analysis_history
ADD COLUMN IF NOT EXISTS plagiarism_score integer CHECK (plagiarism_score >= 0 AND plagiarism_score <= 100);