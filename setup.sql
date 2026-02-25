-- BotVault Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- Create visitors table for tracking page views
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  project_name TEXT DEFAULT 'botvault'
);

-- Create signups table for tracking email submissions
CREATE TABLE IF NOT EXISTS signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  project_name TEXT NOT NULL DEFAULT 'botvault',
  visitor_id UUID REFERENCES visitors(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_botvault_visitors_created_at ON visitors(created_at);
CREATE INDEX IF NOT EXISTS idx_botvault_visitors_project ON visitors(project_name);
CREATE INDEX IF NOT EXISTS idx_botvault_visitors_ip ON visitors(ip_address);
CREATE INDEX IF NOT EXISTS idx_botvault_signups_created_at ON signups(created_at);
CREATE INDEX IF NOT EXISTS idx_botvault_signups_project ON signups(project_name);
CREATE INDEX IF NOT EXISTS idx_botvault_signups_email ON signups(email);

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Create policies for visitors table
CREATE POLICY IF NOT EXISTS "BotVault: Allow anonymous inserts for visitors" ON visitors
  FOR INSERT WITH CHECK (project_name = 'botvault');

CREATE POLICY IF NOT EXISTS "BotVault: Allow read access for visitor analytics" ON visitors
  FOR SELECT USING (project_name = 'botvault');

-- Create policies for signups table
CREATE POLICY IF NOT EXISTS "BotVault: Allow anonymous inserts for signups" ON signups
  FOR INSERT WITH CHECK (project_name = 'botvault');

CREATE POLICY IF NOT EXISTS "BotVault: Allow read access for signup analytics" ON signups
  FOR SELECT USING (project_name = 'botvault');

-- Create a view for BotVault analytics
CREATE OR REPLACE VIEW botvault_analytics AS
SELECT 
  'visitors' as metric,
  COUNT(*) as total_count,
  COUNT(DISTINCT ip_address) as unique_count,
  DATE(created_at) as date
FROM visitors 
WHERE project_name = 'botvault'
GROUP BY DATE(created_at)

UNION ALL

SELECT 
  'signups' as metric,
  COUNT(*) as total_count,
  COUNT(DISTINCT email) as unique_count,
  DATE(created_at) as date
FROM signups 
WHERE project_name = 'botvault'
GROUP BY DATE(created_at);

-- Grant access to the view
GRANT SELECT ON botvault_analytics TO anon, authenticated;
