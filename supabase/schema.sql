-- Dispatchly Database Schema for Supabase
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- ============================================
-- QUOTES TABLE
-- Stores quote requests from customers
-- ============================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Pickup Details
  pickup_city TEXT NOT NULL,
  pickup_address TEXT,
  
  -- Delivery Details
  delivery_city TEXT NOT NULL,
  delivery_address TEXT,
  
  -- Cargo Details
  cargo_type TEXT NOT NULL,
  weight INTEGER, -- in KG
  vehicle_type TEXT,
  special_instructions TEXT,
  
  -- Customer Details
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  preferred_date DATE,
  
  -- Status: pending, contacted, quoted, accepted, rejected
  status TEXT DEFAULT 'pending',
  
  -- Quote Details (filled by admin)
  quoted_price DECIMAL(10,2),
  quoted_by UUID REFERENCES auth.users(id),
  notes TEXT
);

-- ============================================
-- CONTACTS TABLE
-- Stores contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Status: unread, read, replied
  status TEXT DEFAULT 'unread',
  
  -- Admin response
  replied_by UUID REFERENCES auth.users(id),
  reply_notes TEXT
);

-- ============================================
-- DRIVERS TABLE
-- Stores driver/pilot profiles
-- ============================================
CREATE TABLE IF NOT EXISTS drivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Details
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  profile_photo_url TEXT,
  
  -- Documents
  aadhar_number TEXT,
  aadhar_photo_url TEXT,
  license_number TEXT,
  license_photo_url TEXT,
  
  -- Vehicle Details
  vehicle_number TEXT,
  vehicle_type TEXT,
  vehicle_photo_url TEXT,
  rc_photo_url TEXT,
  
  -- Bank Details
  bank_account TEXT,
  ifsc_code TEXT,
  bank_name TEXT,
  
  -- Verification Status: pending_verification, verified, rejected
  status TEXT DEFAULT 'pending_verification',
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES auth.users(id),
  
  -- Stats
  total_trips INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 5.0
);

-- ============================================
-- HUBS TABLE (Optional - for dynamic hub data)
-- ============================================
CREATE TABLE IF NOT EXISTS hubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  
  -- Stats
  fleet_size INTEGER DEFAULT 0,
  daily_volume TEXT, -- e.g., "150T"
  sla_percentage DECIMAL(4,1) DEFAULT 99.0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hubs ENABLE ROW LEVEL SECURITY;

-- Quotes: Anyone can insert, only admins can view all
CREATE POLICY "Anyone can submit quotes" ON quotes
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own quotes" ON quotes
  FOR SELECT TO authenticated
  USING (customer_phone = auth.jwt() ->> 'phone');

-- Contacts: Anyone can insert, only admins can view
CREATE POLICY "Anyone can submit contacts" ON contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Drivers: Users can manage their own profile
CREATE POLICY "Drivers can view own profile" ON drivers
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Drivers can insert own profile" ON drivers
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Drivers can update own profile" ON drivers
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Hubs: Anyone can view
CREATE POLICY "Anyone can view hubs" ON hubs
  FOR SELECT TO anon, authenticated
  USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers(status);
CREATE INDEX IF NOT EXISTS idx_drivers_user_id ON drivers(user_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drivers_updated_at
  BEFORE UPDATE ON drivers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA FOR HUBS (Optional)
-- ============================================
INSERT INTO hubs (city, state, fleet_size, daily_volume, sla_percentage) VALUES
  ('MUMBAI', 'Maharashtra', 2500, '150T', 99.8),
  ('DELHI NCR', 'Delhi', 3200, '180T', 99.9),
  ('BANGALORE', 'Karnataka', 1800, '120T', 99.5),
  ('HYDERABAD', 'Telangana', 1500, '90T', 99.7),
  ('PUNE', 'Maharashtra', 1200, '85T', 99.6),
  ('CHENNAI', 'Tamil Nadu', 1400, '95T', 99.4),
  ('KOLKATA', 'West Bengal', 900, '60T', 99.2),
  ('AHMEDABAD', 'Gujarat', 1100, '75T', 99.3)
ON CONFLICT (city) DO NOTHING;
