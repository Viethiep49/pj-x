# 🐾 Pawsitive - Kế Hoạch Phát Triển Dự Án

> **Dự án:** Pawsitive Pet Grooming SPA
> **Loại:** Đồ án môn học
> **Nhóm:** 4 thành viên
> **Tech Stack:** React 19 + Vite + TailwindCSS v4 | Express.js + PostgreSQL | FastAPI + TensorFlow.js + Gemini AI

---

## 👥 Phân Công Nhóm

| # | Vai trò | Việc cần làm |
|---|---------|-------------|
| 1 | **Frontend Dev** | Kết nối UI với API, thêm trang quản lý pet/booking history, responsive |
| 2 | **Backend API Dev** | Setup Express đầy đủ, kết nối DB, viết CRUD API cho tất cả entities |
| 3 | **AI Core + DB** (Bạn) | Tạo database, chạy migration, cải thiện chatbot, API analytics |
| 4 | **Security & Auth** | Register/Login API, JWT middleware, RBAC, bảo mật input |

---

## 📋 Việc Cần Làm — Theo Từng Người


### 👤 Backend API Dev

| # | Task | Output |
|---|------|--------|
| 1 | Setup Express đầy đủ (cors, helmet, dotenv, json parser, error handler) | `server.js` hoàn chỉnh |
| 2 | Kết nối PostgreSQL bằng Sequelize | `config/db.js` hoạt động |
| 3 | Tạo Sequelize models (User, Pet, Breed, Service, Product, Order, Appointment, Payment, Vaccination...) | 15 models với relations |
| 4 | CRUD Pets: `GET/POST/PUT/DELETE /api/pets` | Pet management API |
| 5 | CRUD Services: `GET /api/services` | Service listing API |
| 6 | CRUD Products: `GET/POST/PUT/DELETE /api/products` | Product management API |
| 7 | CRUD Orders: `POST/GET /api/orders` | Order management API |
| 8 | CRUD Appointments: `POST/GET/PUT /api/appointments` | Booking API |
| 9 | Available time slots: `GET /api/appointments/slots` | Slot checking |
| 10 | Vaccinations: `POST/GET /api/vaccinations` | Vaccination records |
| 11 | Admin APIs: quản lý appointments, orders (confirm/complete/cancel) | Admin endpoints |
| 12 | API docs cơ bản (README hoặc Swagger) | Documentation |

---

### 👤 Security & Auth

| # | Task | Output |
|---|------|--------|
| 1 | Thiết kế auth flow (JWT access token) | Auth flow document |
| 2 | `POST /api/auth/register` — hash password bằng bcrypt | Register API |
| 3 | `POST /api/auth/login` — trả JWT token | Login API |
| 4 | Middleware xác thực JWT (`middlewares/auth.js`) | Token verification |
| 5 | RBAC middleware: phân quyền customer / staff / admin | Role checking |
| 6 | Input validation cho tất cả endpoints (express-validator) | Validation middleware |
| 7 | Rate limiting cơ bản | Chống spam |
| 8 | Validate ownership (user chỉ access pets/appointments của mình) | Data isolation |

---

## 🔗 API Endpoints Tổng Hợp

```
# Auth (Security Dev)
POST   /api/auth/register
POST   /api/auth/login

# Pets (Backend Dev)
GET    /api/pets                    — List pets của user
POST   /api/pets                    — Thêm pet
PUT    /api/pets/:id                — Sửa pet
DELETE /api/pets/:id                — Xóa pet

# Breeds (Backend Dev)
GET    /api/breeds                  — List 37 giống (public)
GET    /api/breeds/:id              — Chi tiết 1 giống

# Services (Backend Dev)
GET    /api/services                — List dịch vụ (public)

# Products (Backend Dev)
GET    /api/products                — List sản phẩm (filter species/fur/size)
GET    /api/products/:id            — Chi tiết sản phẩm
POST   /api/admin/products          — [Admin] Thêm sản phẩm
PUT    /api/admin/products/:id      — [Admin] Sửa sản phẩm
DELETE /api/admin/products/:id      — [Admin] Xóa sản phẩm
POST   /api/products/:id/reviews    — Đánh giá sản phẩm

# Orders (Backend Dev)
POST   /api/orders                  — Tạo đơn hàng
GET    /api/orders                  — Lịch sử đơn hàng (user)
GET    /api/admin/orders            — [Admin] Tất cả đơn hàng
PUT    /api/admin/orders/:id        — [Admin] Cập nhật trạng thái

# Appointments (Backend Dev)
POST   /api/appointments            — Đặt lịch
GET    /api/appointments            — Lịch sử booking
GET    /api/appointments/slots      — Khung giờ trống
PUT    /api/admin/appointments/:id  — [Admin] confirm/cancel

# Vaccinations (Backend Dev)
POST   /api/vaccinations            — [Staff] Ghi nhận tiêm chủng
GET    /api/vaccinations/:petId     — Phiếu tiêm chủng của pet
GET    /api/vaccine-types           — List loại vaccine

# AI Core
GET    /model/model.json            — TF.js model (static)
POST   /chat                        — Chatbot
POST   /api/ai/scan-results         — Lưu kết quả scan
GET    /api/ai/recommendations/:breedId — Gợi ý sản phẩm theo giống
GET    /api/ai/analytics            — Thống kê cho admin
```

---



##  Quy Ước


- **API response:** `{ success: true/false, data: ..., message: "..." }`
- **Auth header:** `Authorization: Bearer <JWT>`
- **Port:** Frontend `:5173` | Backend `:5001` | AI Core `:8000`

---

## 🗓️ Timeline & Thứ Tự Ưu Tiên

> Dựa trên **dependency** giữa các thành phần: Auth → Backend API → Frontend → AI Core

| Sprint | Tuần | Người thực hiện | Task ưu tiên | Phụ thuộc |
|--------|------|----------------|--------------|----------|
| **P0** | Tuần 1 | Security & Auth | Register/Login API, JWT middleware, RBAC | — |
| **P0** | Tuần 1 | AI Core + DB | Tạo DB, chạy migration toàn bộ schema | — |
| **P1** | Tuần 1–2 | Backend API Dev | Setup Express, kết nối DB, CRUD Pets/Services | Auth middleware |
| **P1** | Tuần 2 | Backend API Dev | CRUD Orders, Appointments, Vaccination APIs | DB migration |
| **P1** | Tuần 2 | AI Core + DB | API analytics, lưu scan results | DB ready |
| **P2** | Tuần 2–3 | Frontend Dev | Kết nối UI với API, trang booking/pet management | Backend APIs |
| **P2** | Tuần 3 | Frontend Dev | Breed Recommendation UI (xem chi tiết bên dưới) | Recommendation API |
| **P3** | Tuần 3 | AI Core + DB | Cải thiện chatbot, fine-tune Gemini prompt | Hệ thống ổn định |

### Dependency Map
```
DB Migration (P0)
    └── Backend CRUD APIs (P1)
            └── Frontend UI (P2)

Auth/JWT (P0)
    └── Protected APIs (P1)
            └── User-facing features (P2)

AI Scan + Breed Data (P0/P1)
    └── Breed Recommendation Flow (P2)
```

---

## 🤖 AI Core + DB — Task List Chi Tiết

| # | Task | Output | Priority |
|---|------|--------|----------|
| 1 | Tạo database PostgreSQL, chạy migration từ `docs/database-schema.md` | DB sẵn sàng cho toàn nhóm | P0 |
| 2 | Seed dữ liệu ban đầu: 37 giống (`breeds`), vaccine types, services | Dữ liệu mẫu để test | P0 |
| 3 | Seed bảng `breed_recommendations` — link giống với sản phẩm/dịch vụ phù hợp | Recommendation data | P1 |
| 4 | API `GET /api/ai/recommendations/:breedId` — trả danh sách sản phẩm theo giống | Recommendation endpoint | P1 |
| 5 | API `POST /api/ai/scan-results` — lưu kết quả AI scan của user | Scan history | P1 |
| 6 | API `GET /api/ai/analytics` — thống kê dashboard cho admin | Analytics endpoint | P1 |
| 7 | Cải thiện chatbot: tối ưu SYSTEM_PROMPT cho Gemini 2.0 Flash | Chatbot chất lượng hơn | P2 |
| 8 | Kiểm tra edge cases AI scan: ảnh mờ, sai loại, không nhận diện được | Robustness | P3 |

---

## 🐾 Breed Recommendation Feature

> Chi tiết đầy đủ: [📄 PLAN-breed-recommendation.md](./PLAN-breed-recommendation.md)

**Tóm tắt luồng:**
```
User quét AI → nhận diện giống → click "Xem gợi ý"
    → navigate('/shop?breed={breedName}')
    → ShopPage đọc URL params
    → GET /api/breeds?name={breedName}      → lấy breedId
    → GET /api/breeds/{id}/recommendations  → lấy danh sách sản phẩm
    → Hiển thị "Gợi ý đặc biệt cho [Giống]"
```

**Files bị ảnh hưởng:**
- `frontend/src/features/scanner/PetScannerPage.jsx`
- `frontend/src/features/shop/ShopPage.jsx`
- `backend/routes/breeds.js` (thêm endpoint recommendations nếu chưa)

**Người thực hiện:** Frontend Dev (Task 1–3) + AI Core/DB (seed data)
