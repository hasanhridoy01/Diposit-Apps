/*
  # User System Setup

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text, admin/member)
      - `created_at` (timestamp)
    
    - `members`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `phone` (text, optional)
      - `status` (text, active/inactive)
      - `created_at` (timestamp)
    
    - `deposit_requests`
      - `id` (uuid, primary key)
      - `member_id` (uuid, references user_profiles)
      - `amount` (numeric)
      - `currency` (text, default BDT)
      - `message` (text)
      - `screenshot_url` (text, optional)
      - `status` (text, pending/approved/rejected)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to access their own data
    - Add admin policies for managing members and deposits
*/

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  created_at timestamptz DEFAULT now()
);

-- Create members table for additional member info
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  phone text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now()
);

-- Create deposit requests table
CREATE TABLE IF NOT EXISTS deposit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'BDT',
  message text NOT NULL,
  screenshot_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposit_requests ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Members policies
CREATE POLICY "Users can read own member info"
  ON members
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all members"
  ON members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Deposit requests policies
CREATE POLICY "Users can create own deposit requests"
  ON deposit_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (member_id = auth.uid());

CREATE POLICY "Users can read own deposit requests"
  ON deposit_requests
  FOR SELECT
  TO authenticated
  USING (member_id = auth.uid());

CREATE POLICY "Admins can manage all deposit requests"
  ON deposit_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create a trigger to update updated_at on deposit_requests
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_deposit_requests_updated_at
  BEFORE UPDATE ON deposit_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert demo users (for development)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@demo.com', crypt('demo123', gen_salt('bf')), now(), now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'member@demo.com', crypt('demo123', gen_salt('bf')), now(), now(), now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_profiles (id, email, full_name, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@demo.com', 'Admin User', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'member@demo.com', 'Member User', 'member')
ON CONFLICT (id) DO NOTHING;

INSERT INTO members (user_id, phone, status)
VALUES 
  ('22222222-2222-2222-2222-222222222222', '+880123456789', 'active')
ON CONFLICT DO NOTHING;