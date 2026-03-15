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
('Thuốc & Tiêm chủng', 'thuoc-tiem-chung', 'syringe', 'Deworming, vaccines', 2),
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
('Tắm & Vệ sinh cơ bản', 'Tắm sạch, vệ sinh tai, cắt móng cho bé cưng', 200000, 60, 'both'),
('Spa & Cắt tỉa trọn gói', 'Tắm spa, cắt tỉa lông theo giống, sấy tạo kiểu', 500000, 120, 'both'),
('Khám sức khỏe tổng quát', 'Kiểm tra sức khỏe tổng quát bởi bác sĩ thú y', 150000, 30, 'both'),
('Trị ký sinh trùng', 'Tẩy giun, trị ve rận bên trong và bên ngoài', 100000, 20, 'both')
ON CONFLICT DO NOTHING;

-- 5. Sample Accounts (Password for ALL accounts: 'Pawsitive@2024')
-- Admin
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@pawsitive.com', '$2b$10$h8xrKWa5ia2sOw1towY5geZ7g5FeJp7/D6C7HWffKQaPnW5pCF702', 'System Admin', 'admin')
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Staff
INSERT INTO users (email, password_hash, full_name, role, phone_number) VALUES
('staff1@pawsitive.com', '$2b$10$h8xrKWa5ia2sOw1towY5geZ7g5FeJp7/D6C7HWffKQaPnW5pCF702', 'Emily Watson (Groomer)', 'staff', '0912345678'),
('staff2@pawsitive.com', '$2b$10$h8xrKWa5ia2sOw1towY5geZ7g5FeJp7/D6C7HWffKQaPnW5pCF702', 'John Smith (Vet)', 'staff', '0987654321')
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Customers
INSERT INTO users (email, password_hash, full_name, role, address, phone_number) VALUES
('customer1@gmail.com', '$2b$10$h8xrKWa5ia2sOw1towY5geZ7g5FeJp7/D6C7HWffKQaPnW5pCF702', 'Trần Văn An', 'customer', '123 Nguyễn Huệ, Quận 1, TP.HCM', '0901234567'),
('customer2@gmail.com', '$2b$10$h8xrKWa5ia2sOw1towY5geZ7g5FeJp7/D6C7HWffKQaPnW5pCF702', 'Lê Thị Bình', 'customer', '456 Lê Lợi, Quận 5, TP.HCM', '0907654321')
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- ================================================================
-- 6. Products (18 sản phẩm — 3 mỗi category, ảnh Unsplash)
-- ================================================================

-- Category: Thức ăn hạt
INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Royal Canin Mini Adult', 'royal-canin-mini-adult',
       'Thức ăn hạt cao cấp dành cho chó nhỏ trưởng thành, hỗ trợ tiêu hóa và lông bóng mượt',
       385000, 50, 'FOOD-001',
       'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop',
       'dog', 'all', 'small', true, id
FROM product_categories WHERE slug = 'thuc-an'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Whiskas Cá Ngừ', 'whiskas-ca-ngu',
       'Thức ăn hạt cho mèo vị cá ngừ, giàu protein và Omega-3 giúp lông mượt',
       125000, 80, 'FOOD-002',
       'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=400&h=400&fit=crop',
       'cat', 'all', 'all', true, id
FROM product_categories WHERE slug = 'thuc-an'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Pedigree Adult Bò & Rau', 'pedigree-adult-bo-rau',
       'Thức ăn hạt cho chó trưởng thành vị bò và rau củ, dinh dưỡng cân bằng',
       295000, 60, 'FOOD-003',
       'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=400&fit=crop',
       'dog', 'all', 'all', true, id
FROM product_categories WHERE slug = 'thuc-an'
ON CONFLICT (slug) DO NOTHING;

-- Category: Thuốc & Tiêm chủng
INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Thuốc tẩy giun Drontal', 'thuoc-tay-giun-drontal',
       'Thuốc tẩy giun phổ rộng cho chó, hiệu quả sau 1 liều duy nhất',
       85000, 100, 'MED-001',
       'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
       'dog', 'all', 'all', true, id
FROM product_categories WHERE slug = 'thuoc-tiem-chung'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Thuốc nhỏ gáy Frontline', 'thuoc-nho-gay-frontline',
       'Thuốc nhỏ gáy trị ve, bọ chét cho chó mèo. Hiệu quả 30 ngày',
       195000, 75, 'MED-002',
       'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop',
       'both', 'all', 'all', true, id
FROM product_categories WHERE slug = 'thuoc-tiem-chung'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Vitamin tổng hợp Nutri-Vet', 'vitamin-nutri-vet',
       'Viên bổ sung vitamin và khoáng chất cho chó mèo, tăng cường đề kháng',
       155000, 45, 'MED-003',
       'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
       'both', 'all', 'all', true, id
FROM product_categories WHERE slug = 'thuoc-tiem-chung'
ON CONFLICT (slug) DO NOTHING;

-- Category: Đồ chơi
INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Bóng cao su KONG', 'bong-cao-su-kong',
       'Bóng cao su siêu bền KONG, thích hợp cho chó thích gặm. Có thể nhét snack bên trong',
       175000, 40, 'TOY-001',
       'https://images.unsplash.com/photo-1535294435445-d7249b8ef82f?w=400&h=400&fit=crop',
       'dog', 'all', 'all', true, id
FROM product_categories WHERE slug = 'do-choi'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Cần câu lông vũ cho mèo', 'can-cau-long-vu-meo',
       'Đồ chơi cần câu gắn lông vũ kích thích bản năng săn mồi của mèo',
       65000, 90, 'TOY-002',
       'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=400&fit=crop',
       'cat', 'all', 'all', true, id
FROM product_categories WHERE slug = 'do-choi'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Dây thừng cotton đan', 'day-thung-cotton',
       'Đồ chơi dây thừng cotton bện cho chó kéo co, giúp sạch răng tự nhiên',
       55000, 70, 'TOY-003',
       'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop',
       'dog', 'all', 'all', true, id
FROM product_categories WHERE slug = 'do-choi'
ON CONFLICT (slug) DO NOTHING;

-- Category: Chuồng & Lồng
INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Nệm ngủ êm ái Size M', 'nem-ngu-size-m',
       'Nệm ngủ mềm mại cho thú cưng, chất liệu cotton thoáng khí, có thể giặt máy',
       245000, 30, 'BED-001',
       'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop',
       'both', 'all', 'medium', true, id
FROM product_categories WHERE slug = 'chuong'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Lồng vận chuyển Pet Carrier', 'long-van-chuyen-pet-carrier',
       'Lồng vận chuyển nhựa cứng có cửa lưới, phù hợp đi máy bay và ô tô',
       420000, 20, 'BED-002',
       'https://images.unsplash.com/photo-1567612529009-afe25413e646?w=400&h=400&fit=crop',
       'both', 'all', 'all', true, id
FROM product_categories WHERE slug = 'chuong'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Nhà gỗ mèo 3 tầng', 'nha-go-meo-3-tang',
       'Nhà cây cho mèo leo trèo 3 tầng, có trụ cào móng và ổ ngủ ấm áp',
       890000, 10, 'BED-003',
       'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop',
       'cat', 'all', 'all', true, id
FROM product_categories WHERE slug = 'chuong'
ON CONFLICT (slug) DO NOTHING;

-- Category: Áo quần
INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Áo hoodie cún yêu', 'ao-hoodie-cun-yeu',
       'Áo hoodie ấm áp cho chó nhỏ, chất liệu cotton co giãn, nhiều màu sắc',
       135000, 50, 'CLO-001',
       'https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=400&h=400&fit=crop',
       'dog', 'short', 'small', true, id
FROM product_categories WHERE slug = 'ao-quan'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Áo mưa cho chó', 'ao-mua-cho-cho',
       'Áo mưa chống thấm nước cho chó, có mũ trùm đầu, dễ mặc và tháo',
       185000, 35, 'CLO-002',
       'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
       'dog', 'all', 'all', true, id
FROM product_categories WHERE slug = 'ao-quan'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Bandana thời trang', 'bandana-thoi-trang',
       'Khăn bandana thời trang cho chó mèo, nhiều họa tiết dễ thương',
       45000, 100, 'CLO-003',
       'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
       'both', 'all', 'all', true, id
FROM product_categories WHERE slug = 'ao-quan'
ON CONFLICT (slug) DO NOTHING;

-- Category: Vệ sinh
INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Dầu gội lông dài Bio-Groom', 'dau-goi-long-dai-biogroom',
       'Dầu gội chuyên dụng cho thú cưng lông dài, chống rối và giữ ẩm tự nhiên',
       265000, 40, 'HYG-001',
       'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
       'both', 'long', 'all', true, id
FROM product_categories WHERE slug = 've-sinh'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Lược gỡ rối FURminator', 'luoc-go-roi-furminator',
       'Lược chải lông chuyên nghiệp FURminator, giảm rụng lông đến 90%',
       345000, 25, 'HYG-002',
       'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&h=400&fit=crop',
       'both', 'long', 'all', true, id
FROM product_categories WHERE slug = 've-sinh'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, stock_quantity, sku, image_url, target_species, target_fur_type, target_size, is_active, category_id)
SELECT 'Bộ cắt móng Pet Nail Clipper', 'bo-cat-mong-pet',
       'Bộ dụng cụ cắt móng an toàn cho chó mèo, tay cầm êm, lưỡi thép không gỉ',
       95000, 55, 'HYG-003',
       'https://images.unsplash.com/photo-1522276498395-f4f68f7f8571?w=400&h=400&fit=crop',
       'both', 'all', 'all', true, id
FROM product_categories WHERE slug = 've-sinh'
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- 7. Breed Recommendations (gắn sản phẩm/dịch vụ theo giống)
-- ================================================================

-- Chó lông dài (Pomeranian, Yorkshire, Havanese...) → Dầu gội lông dài + Lược gỡ rối + Spa trọn gói
INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'hygiene', 'Giống lông dài cần dầu gội chuyên dụng chống rối', 1
FROM breeds b, products p
WHERE b.fur_type = 'long' AND b.species = 'dog' AND p.slug = 'dau-goi-long-dai-biogroom'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'hygiene', 'Lược FURminator giảm rụng lông hiệu quả cho giống lông dài', 2
FROM breeds b, products p
WHERE b.fur_type = 'long' AND b.species = 'dog' AND p.slug = 'luoc-go-roi-furminator'
ON CONFLICT DO NOTHING;

-- Chó nhỏ (Chihuahua, Pug, Miniature Pinscher...) → Thức ăn chó nhỏ + Áo hoodie
INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'food', 'Thức ăn hạt nhỏ phù hợp hàm chó nhỏ', 1
FROM breeds b, products p
WHERE b.size_category = 'small' AND b.species = 'dog' AND p.slug = 'royal-canin-mini-adult'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'clothing', 'Chó nhỏ dễ lạnh, cần áo giữ ấm khi ra ngoài', 2
FROM breeds b, products p
WHERE b.size_category = 'small' AND b.species = 'dog' AND p.slug = 'ao-hoodie-cun-yeu'
ON CONFLICT DO NOTHING;

-- Chó lớn → Bóng cao su + Dây thừng
INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'toy', 'Bóng cao su siêu bền cho giống chó lớn năng động', 1
FROM breeds b, products p
WHERE b.size_category = 'large' AND b.species = 'dog' AND p.slug = 'bong-cao-su-kong'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'toy', 'Dây thừng lý tưởng cho chó lớn thích kéo co', 2
FROM breeds b, products p
WHERE b.size_category = 'large' AND b.species = 'dog' AND p.slug = 'day-thung-cotton'
ON CONFLICT DO NOTHING;

-- Mèo lông dài (Persian, Birman, Maine Coon, Ragdoll) → Dầu gội + Lược
INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'hygiene', 'Mèo lông dài cần dầu gội chuyên dụng chống rối', 1
FROM breeds b, products p
WHERE b.fur_type = 'long' AND b.species = 'cat' AND p.slug = 'dau-goi-long-dai-biogroom'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'hygiene', 'Lược FURminator cần thiết cho mèo lông dài', 2
FROM breeds b, products p
WHERE b.fur_type = 'long' AND b.species = 'cat' AND p.slug = 'luoc-go-roi-furminator'
ON CONFLICT DO NOTHING;

-- Tất cả mèo → Cần câu lông vũ + Nhà gỗ mèo + Whiskas
INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'toy', 'Cần câu lông vũ kích thích bản năng săn mồi tự nhiên', 1
FROM breeds b, products p
WHERE b.species = 'cat' AND p.slug = 'can-cau-long-vu-meo'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'cage', 'Nhà cây cho mèo leo trèo và nghỉ ngơi', 3
FROM breeds b, products p
WHERE b.species = 'cat' AND p.slug = 'nha-go-meo-3-tang'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'food', 'Thức ăn hạt giàu protein phù hợp cho mèo', 1
FROM breeds b, products p
WHERE b.species = 'cat' AND p.slug = 'whiskas-ca-ngu'
ON CONFLICT DO NOTHING;

-- Tất cả giống → Thuốc nhỏ gáy + Cắt móng + Bandana
INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'hygiene', 'Phòng ve bọ chét là việc cần thiết cho mọi giống', 5
FROM breeds b, products p
WHERE p.slug = 'thuoc-nho-gay-frontline'
ON CONFLICT DO NOTHING;

INSERT INTO breed_recommendations (breed_id, product_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, p.id, 'hygiene', 'Cắt móng định kỳ giúp bé cưng thoải mái', 6
FROM breeds b, products p
WHERE p.slug = 'bo-cat-mong-pet'
ON CONFLICT DO NOTHING;

-- Breed → Service Recommendations (dịch vụ theo giống)
-- Chó lông dài → Spa trọn gói
INSERT INTO breed_recommendations (breed_id, service_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, s.id, 'grooming', 'Giống lông dài cần cắt tỉa và chăm sóc chuyên nghiệp', 1
FROM breeds b, services s
WHERE b.fur_type = 'long' AND s.name = 'Spa & Cắt tỉa trọn gói'
ON CONFLICT DO NOTHING;

-- Tất cả giống → Tắm vệ sinh cơ bản
INSERT INTO breed_recommendations (breed_id, service_id, recommendation_type, recommendation_reason, priority)
SELECT b.id, s.id, 'grooming', 'Tắm và vệ sinh định kỳ cho mọi giống thú cưng', 3
FROM breeds b, services s
WHERE s.name = 'Tắm & Vệ sinh cơ bản'
ON CONFLICT DO NOTHING;
