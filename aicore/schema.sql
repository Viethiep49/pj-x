-- Database Schema v2 (15 tables)
-- Project: Pawsitive Pet Spa

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Breeds Table (Master Data)
CREATE TABLE IF NOT EXISTS breeds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    species VARCHAR(10) NOT NULL CHECK (species IN ('dog', 'cat')),
    fur_type VARCHAR(20) NOT NULL CHECK (fur_type IN ('short', 'medium', 'long', 'hairless')),
    size_category VARCHAR(20) CHECK (size_category IN ('small', 'medium', 'large')),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url TEXT,
    address TEXT,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Pets Table
CREATE TABLE IF NOT EXISTS pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    breed_id UUID REFERENCES breeds(id),
    name VARCHAR(100) NOT NULL,
    species VARCHAR(10) NOT NULL CHECK (species IN ('dog', 'cat')),
    breed VARCHAR(100),
    fur_length VARCHAR(20) CHECK (fur_length IN ('short', 'medium', 'long', 'hairless')),
    weight DECIMAL(5,2),
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    age INTEGER,
    image_url TEXT,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    display_order INTEGER DEFAULT 0
);

-- 5. Products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES product_categories(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    sale_price DECIMAL(12,2),
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(50) UNIQUE,
    image_url TEXT,
    images JSONB DEFAULT '[]',
    target_species VARCHAR(20) CHECK (target_species IN ('dog', 'cat', 'both')),
    target_fur_type VARCHAR(20) CHECK (target_fur_type IN ('short', 'long', 'all')),
    target_size VARCHAR(20) CHECK (target_size IN ('small', 'medium', 'large', 'all')),
    is_active BOOLEAN DEFAULT TRUE,
    rating_avg DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    duration_minutes INTEGER,
    target_species VARCHAR(20) CHECK (target_species IN ('dog', 'cat', 'both')),
    is_active BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Breed Recommendations
CREATE TABLE IF NOT EXISTS breed_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    breed_id UUID NOT NULL REFERENCES breeds(id),
    product_id UUID REFERENCES products(id),
    service_id UUID REFERENCES services(id),
    recommendation_type VARCHAR(20) NOT NULL CHECK (recommendation_type IN ('food', 'toy', 'clothing', 'cage', 'grooming', 'vaccine', 'hygiene')),
    recommendation_reason TEXT,
    priority INTEGER DEFAULT 0,
    UNIQUE(breed_id, product_id, service_id),
    CHECK ((product_id IS NOT NULL AND service_id IS NULL) OR (product_id IS NULL AND service_id IS NOT NULL))
);

-- 8. Scan Results
CREATE TABLE IF NOT EXISTS scan_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    pet_id UUID REFERENCES pets(id),
    breed_id UUID REFERENCES breeds(id),
    confidence DECIMAL(5,4) NOT NULL,
    image_url TEXT NOT NULL,
    top_3_predictions JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    delivery_method VARCHAR(20) DEFAULT 'pickup' CHECK (delivery_method IN ('pickup', 'shipping')),
    shipping_address TEXT,
    shipping_fee DECIMAL(12,2) DEFAULT 0,
    receiver_name VARCHAR(100),
    receiver_phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipping','delivered','cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 10. Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL
);

-- 11. Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    pet_id UUID NOT NULL REFERENCES pets(id),
    service_id UUID REFERENCES services(id),
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 12. Vaccine Types
CREATE TABLE IF NOT EXISTS vaccine_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    target_species VARCHAR(10) CHECK (target_species IN ('dog', 'cat')),
    description TEXT,
    recommended_age_months INTEGER,
    interval_days INTEGER,
    doses_required INTEGER DEFAULT 1
);

-- 13. Vaccinations
CREATE TABLE IF NOT EXISTS vaccinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id),
    vaccine_type_id UUID NOT NULL REFERENCES vaccine_types(id),
    administered_by UUID REFERENCES users(id),
    dose_number INTEGER DEFAULT 1,
    vaccination_date DATE NOT NULL,
    next_due_date DATE,
    batch_number VARCHAR(50),
    notes TEXT,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('scheduled','completed','missed','cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 14. Payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    appointment_id UUID REFERENCES appointments(id),
    order_id UUID REFERENCES orders(id),
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('appointment', 'order')),
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
    transaction_id VARCHAR(100),
    transaction_date TIMESTAMP DEFAULT NOW(),
    CHECK ((appointment_id IS NOT NULL AND order_id IS NULL) OR (appointment_id IS NULL AND order_id IS NOT NULL))
);

-- 15. Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(product_id, user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pets_owner ON pets(owner_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_species ON products(target_species);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_vaccinations_pet ON vaccinations(pet_id);
CREATE INDEX IF NOT EXISTS idx_scan_user ON scan_results(user_id);
