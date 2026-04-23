-- Catalya Fuels Database Schema
-- This script sets up the complete database for the plastic recycling to fuels project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== USERS & AUTHENTICATION =====
-- profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'viewer', -- admin, operator, viewer
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===== COLLECTION MODULE =====

-- individual_collectors (chiffoniers) - for informal waste collectors
CREATE TABLE IF NOT EXISTS individual_collectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  face_photo_url TEXT, -- URL to the stored face photo
  total_weight_kg DECIMAL(10, 2) DEFAULT 0,
  total_submissions INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- companies - for company/municipal plastic donors
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT, -- municipality, company, ngo, etc.
  contact_email TEXT,
  contact_phone TEXT,
  total_weight_kg DECIMAL(10, 2) DEFAULT 0,
  total_submissions INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- plastic_collections - individual submission records
CREATE TABLE IF NOT EXISTS plastic_collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collector_type TEXT NOT NULL, -- 'individual' or 'company'
  collector_id UUID NOT NULL, -- references either individual_collectors or companies
  weight_kg DECIMAL(10, 2) NOT NULL,
  plastic_type TEXT, -- type of plastic if tracked
  notes TEXT,
  submitted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== MONITORING MODULE =====

-- machine_status - tracks reactor/machine operational status
CREATE TABLE IF NOT EXISTS machine_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status TEXT NOT NULL, -- idle, running, maintenance, stopped
  temperature_celsius INT,
  pressure_bar DECIMAL(5, 2),
  current_batch_weight_kg DECIMAL(10, 2),
  efficiency_percentage DECIMAL(5, 2),
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- daily_production - daily output records
CREATE TABLE IF NOT EXISTS daily_production (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  input_weight_kg DECIMAL(10, 2) NOT NULL,
  output_fuel_liters DECIMAL(10, 2) NOT NULL,
  efficiency_percentage DECIMAL(5, 2),
  status TEXT, -- completed, in_progress, failed
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- machine_images - gallery of machine photos
CREATE TABLE IF NOT EXISTS machine_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  description TEXT,
  taken_at TIMESTAMP DEFAULT NOW(),
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- ===== TRACKING MODULE =====

-- fuel_distribution_partners - companies/entities receiving fuel
CREATE TABLE IF NOT EXISTS fuel_distribution_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  partner_type TEXT NOT NULL, -- municipality, company, gas_station, etc.
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  monthly_quota_liters DECIMAL(10, 2),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- fuel_deliveries - records of fuel distributed
CREATE TABLE IF NOT EXISTS fuel_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES fuel_distribution_partners(id) ON DELETE CASCADE,
  fuel_quantity_liters DECIMAL(10, 2) NOT NULL,
  fuel_quality_grade TEXT, -- A, B, C based on purity
  delivery_date TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===== STATISTICS & AGGREGATES =====

-- monthly_statistics - pre-aggregated stats for dashboard performance
CREATE TABLE IF NOT EXISTS monthly_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month_year TEXT NOT NULL UNIQUE, -- YYYY-MM format
  total_plastic_collected_kg DECIMAL(10, 2),
  total_fuel_produced_liters DECIMAL(10, 2),
  total_individual_collectors INT,
  total_company_submissions INT,
  machine_uptime_percentage DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===== ROW LEVEL SECURITY =====

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE individual_collectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE plastic_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_production ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_distribution_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_statistics ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to view all data (can be restricted later)
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can view all collectors" ON individual_collectors FOR SELECT USING (TRUE);
CREATE POLICY "Users can view all companies" ON companies FOR SELECT USING (TRUE);
CREATE POLICY "Users can view all collections" ON plastic_collections FOR SELECT USING (TRUE);
CREATE POLICY "Users can view machine status" ON machine_status FOR SELECT USING (TRUE);
CREATE POLICY "Users can view daily production" ON daily_production FOR SELECT USING (TRUE);
CREATE POLICY "Users can view machine images" ON machine_images FOR SELECT USING (TRUE);
CREATE POLICY "Users can view all partners" ON fuel_distribution_partners FOR SELECT USING (TRUE);
CREATE POLICY "Users can view all deliveries" ON fuel_deliveries FOR SELECT USING (TRUE);
CREATE POLICY "Users can view monthly stats" ON monthly_statistics FOR SELECT USING (TRUE);

-- Allow admins to insert/update/delete
CREATE POLICY "Admins can insert collectors" ON individual_collectors FOR INSERT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can update collectors" ON individual_collectors FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can insert companies" ON companies FOR INSERT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can update companies" ON companies FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can insert collections" ON plastic_collections FOR INSERT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can insert machine status" ON machine_status FOR INSERT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can update machine status" ON machine_status FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can insert daily production" ON daily_production FOR INSERT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can update daily production" ON daily_production FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- ===== INDEXES =====

CREATE INDEX idx_collections_date ON plastic_collections(submitted_at);
CREATE INDEX idx_collections_collector_type ON plastic_collections(collector_type);
CREATE INDEX idx_daily_production_date ON daily_production(date);
CREATE INDEX idx_deliveries_date ON fuel_deliveries(delivery_date);
CREATE INDEX idx_machine_images_date ON machine_images(taken_at);
