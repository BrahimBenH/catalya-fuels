-- Create collectors table (individuals/chiffoniers)
CREATE TABLE IF NOT EXISTS collectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  face_id_photo_url TEXT,
  total_plastic_weight FLOAT DEFAULT 0,
  collection_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  total_plastic_weight FLOAT DEFAULT 0,
  collection_count INT DEFAULT 0,
  is_municipality BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create plastic collections table
CREATE TABLE IF NOT EXISTS plastic_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collector_id UUID REFERENCES collectors(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  weight_kg FLOAT NOT NULL,
  collection_type VARCHAR(50) DEFAULT 'sorted',
  notes TEXT,
  submitted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create machine status table
CREATE TABLE IF NOT EXISTS machine_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(50) DEFAULT 'idle',
  temperature_celsius FLOAT,
  pressure_bar FLOAT,
  fuel_produced_liters FLOAT DEFAULT 0,
  plastic_processed_kg FLOAT DEFAULT 0,
  efficiency_percentage FLOAT,
  last_maintenance TIMESTAMP,
  operational_hours INT DEFAULT 0,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create machine photos table
CREATE TABLE IF NOT EXISTS machine_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_status_id UUID REFERENCES machine_status(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Create daily production table
CREATE TABLE IF NOT EXISTS daily_production (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  fuel_produced_liters FLOAT DEFAULT 0,
  plastic_processed_kg FLOAT DEFAULT 0,
  collections_count INT DEFAULT 0,
  downtime_hours FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create fuel distribution partners table
CREATE TABLE IF NOT EXISTS fuel_distribution_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name VARCHAR(255) NOT NULL,
  partner_type VARCHAR(100),
  contact_person VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  is_municipality BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create delivery history table
CREATE TABLE IF NOT EXISTS delivery_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES fuel_distribution_partners(id) ON DELETE CASCADE,
  fuel_delivered_liters FLOAT NOT NULL,
  delivery_date TIMESTAMP DEFAULT NOW(),
  delivery_location TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_plastic_collections_collector ON plastic_collections(collector_id);
CREATE INDEX IF NOT EXISTS idx_plastic_collections_company ON plastic_collections(company_id);
CREATE INDEX IF NOT EXISTS idx_plastic_collections_date ON plastic_collections(submitted_at);
CREATE INDEX IF NOT EXISTS idx_daily_production_date ON daily_production(date);
CREATE INDEX IF NOT EXISTS idx_delivery_history_partner ON delivery_history(partner_id);
CREATE INDEX IF NOT EXISTS idx_machine_photos_status ON machine_photos(machine_status_id);

-- Initialize machine status with default entry
INSERT INTO machine_status (status) 
SELECT 'idle' 
WHERE NOT EXISTS (SELECT 1 FROM machine_status);

-- Initialize today's production
INSERT INTO daily_production (date, fuel_produced_liters, plastic_processed_kg)
SELECT NOW()::DATE, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM daily_production WHERE date = NOW()::DATE);
