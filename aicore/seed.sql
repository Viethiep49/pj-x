-- Seed Data for Pawsitive Pet Spa
-- Master Data: 37 Breeds from Oxford-IIIT Dataset

-- 1. Insert Breeds
INSERT INTO breeds (name, display_name, species, fur_type, size_category) VALUES
-- Dogs (25)
('American_Bulldog', 'American Bulldog', 'dog', 'short', 'large'),
('American_Pit_Bull_Terrier', 'American Pit Bull Terrier', 'dog', 'short', 'medium'),
('Basset_Hound', 'Basset Hound', 'dog', 'short', 'medium'),
('Beagle', 'Beagle', 'dog', 'short', 'medium'),
('Boxer', 'Boxer', 'dog', 'short', 'large'),
('Chihuahua', 'Chihuahua', 'dog', 'short', 'small'),
('English_Cocker_Spaniel', 'English Cocker Spaniel', 'dog', 'long', 'medium'),
('English_Setter', 'English Setter', 'dog', 'long', 'large'),
('German_Shorthaired', 'German Shorthaired Pointer', 'dog', 'short', 'large'),
('Great_Pyrenees', 'Great Pyrenees', 'dog', 'long', 'large'),
('Havanese', 'Havanese', 'dog', 'long', 'small'),
('Japanese_Chin', 'Japanese Chin', 'dog', 'long', 'small'),
('Keeshond', 'Keeshond', 'dog', 'long', 'medium'),
('Leonberger', 'Leonberger', 'dog', 'long', 'large'),
('Miniature_Pinscher', 'Miniature Pinscher', 'dog', 'short', 'small'),
('Newfoundland', 'Newfoundland', 'dog', 'long', 'large'),
('Pomeranian', 'Pomeranian', 'dog', 'long', 'small'),
('Pug', 'Pug', 'dog', 'short', 'small'),
('Saint_Bernard', 'Saint Bernard', 'dog', 'long', 'large'),
('Samoyed', 'Samoyed', 'dog', 'long', 'large'),
('Scottish_Terrier', 'Scottish Terrier', 'dog', 'long', 'small'),
('Shiba_Inu', 'Shiba Inu', 'dog', 'medium', 'medium'),
('Staffordshire_Bull_Terrier', 'Staffordshire Bull Terrier', 'dog', 'short', 'medium'),
('Wheaten_Terrier', 'Wheaten Terrier', 'dog', 'long', 'medium'),
('Yorkshire_Terrier', 'Yorkshire Terrier', 'dog', 'long', 'small'),
-- Cats (12)
('Abyssinian', 'Abyssinian', 'cat', 'short', 'medium'),
('Bengal', 'Bengal', 'cat', 'short', 'medium'),
('Birman', 'Birman', 'cat', 'long', 'medium'),
('Bombay', 'Bombay', 'cat', 'short', 'medium'),
('British_Shorthair', 'British Shorthair', 'cat', 'short', 'medium'),
('Egyptian_Mau', 'Egyptian Mau', 'cat', 'short', 'medium'),
('Maine_Coon', 'Maine Coon', 'cat', 'long', 'large'),
('Persian', 'Persian', 'cat', 'long', 'medium'),
('Ragdoll', 'Ragdoll', 'cat', 'long', 'large'),
('Russian_Blue', 'Russian Blue', 'cat', 'short', 'medium'),
('Siamese', 'Siamese', 'cat', 'short', 'medium'),
('Sphynx', 'Sphynx', 'cat', 'hairless', 'medium')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Product Categories
INSERT INTO product_categories (name, slug, icon, description, display_order) VALUES
('Thức ăn hạt', 'thuc-an', 'utensils', 'Dry food, wet food according to breed', 1),
('Thuốc & Tiêm chủng', 'thuoc-tim-chung', 'syringe', 'Deworming, vaccines', 2),
('Đồ chơi', 'do-choi', 'reindeer', 'Balls, ropes, plush toys', 3),
('Chuồng & Lồng', 'chuong', 'home', 'Cages, houses, beds', 4),
('Áo quần', 'ao-quan', 'shirt', 'Pet clothing and accessories', 5),
('Vệ sinh', 've-sinh', 'droplets', 'Shampoos, brushes, towels', 6)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Vaccine Types
INSERT INTO vaccine_types (name, target_species, description, recommended_age_months, interval_days, doses_required) VALUES
('Vaccine 5-in-1', 'dog', 'Prevents distemper, parvovirus, hepatitis, parainfluenza, and leptospirosis', 2, 21, 3),
('Vaccine dại (Rabies)', 'dog', 'Core vaccine for rabies prevention', 3, 365, 1),
('Vaccine 3-in-1 (FVRCP)', 'cat', 'Prevents rhinotracheitis, calicivirus, and panleukopenia', 2, 21, 3),
('Vaccine dại (Rabies Cat)', 'cat', 'Core vaccine for rabies prevention in cats', 3, 365, 1)
ON CONFLICT DO NOTHING;

-- 4. Sample Services
INSERT INTO services (name, description, price, duration_minutes, target_species) VALUES
('Basic Grooming', 'Shower, ear cleaning, and nail trimming', 200000, 60, 'both'),
('Full Spa & Haircut', 'Full grooming with stylish haircut based on breed', 500000, 120, 'both'),
('Medical Checkup', 'General health inspection by professionals', 150000, 30, 'both'),
('Parasite Treatment', 'Internal and external parasite removal', 100000, 20, 'both')
ON CONFLICT DO NOTHING;

-- 5. Sample Accounts (All passwords are '12345678' for easy testing)
-- Admin
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@pawsitive.com', '$2y$10$pUnm0F8eN5n.F8.7v.5.v.x.Y.I.z.I.z.I.z.I.z.I.z.I.z', 'System Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Staff
INSERT INTO users (email, password_hash, full_name, role, phone_number) VALUES
('staff1@pawsitive.com', '$2y$10$pUnm0F8eN5n.F8.7v.5.v.x.Y.I.z.I.z.I.z.I.z.I.z.I.z', 'Emily Watson (Groomer)', 'staff', '0912345678'),
('staff2@pawsitive.com', '$2y$10$pUnm0F8eN5n.F8.7v.5.v.x.Y.I.z.I.z.I.z.I.z.I.z.I.z', 'John Smith (Vet)', 'staff', '0987654321')
ON CONFLICT (email) DO NOTHING;

-- Customers
INSERT INTO users (email, password_hash, full_name, role, address, phone_number) VALUES
('customer1@gmail.com', '$2y$10$pUnm0F8eN5n.F8.7v.5.v.x.Y.I.z.I.z.I.z.I.z.I.z.I.z', 'Trần Văn An', 'customer', '123 Nguyễn Huệ, Quận 1, TP.HCM', '0901234567'),
('customer2@gmail.com', '$2y$10$pUnm0F8eN5n.F8.7v.5.v.x.Y.I.z.I.z.I.z.I.z.I.z.I.z', 'Lê Thị Bình', 'customer', '456 Lê Lợi, Quận 5, TP.HCM', '0907654321')
ON CONFLICT (email) DO NOTHING;
