# 🐾 Pawsitive - Kế Hoạch Phát Triển Dự Án

> **Dự án:** Pawsitive Pet Grooming SPA
> **Loại:** Đồ án môn học
> **Nhóm:** 4 thành viên
> **Tech Stack:** React 19 + Vite + TailwindCSS v4 | Express.js + PostgreSQL | FastAPI + TensorFlow.js + Gemini AI

---

## 📊 Hiện Trạng Dự Án

### Đã hoàn thành ✅

| Module | Chi tiết |
|--------|----------|
| **Frontend UI** | Landing Page, Login, Register, Pricing, Booking, Pet Scanner, Products (Admin) — tất cả UI đã có |
| **AI Core API** | FastAPI server phục vụ TF.js model + Gemini chatbot |
| **Pet Scanner** | Client-side inference với TensorFlow.js (nhận diện giống thú cưng) |
| **Database Schema** | ✅ **15 bảng** PostgreSQL: Users, Pets, Breeds, Products, Orders, Vaccinations, Payments... (có ERD + SQL) |
| **Database Migration** | ✅ `setup_database.py` tự động tạo DB + chạy `schema.sql` + `seed.sql` |
| **Seed Data** | ✅ 37 giống chó/mèo (Oxford), 6 danh mục SP, 4 dịch vụ, vaccine types, 5 tài khoản mẫu (admin/staff/customer) |
| **AI Breed Mapping** | ✅ 37 breeds đã gán species, fur_type, size_category → sẵn sàng cho Gemini recommendation |

### Chưa hoàn thành ❌

| Module | Chi tiết |
|--------|----------|
| **Backend API** | `server.js` chỉ có `app.listen()`, models/controllers/routes đều rỗng |
| **Auth** | Middleware JWT rỗng, chưa có register/login API |
| **Frontend ↔ Backend** | Các trang UI chưa kết nối API thật |
| **AI Recommendation** | Gemini API gợi ý sản phẩm theo breed chưa implement |

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

### 👤 AI Core + DB (Bạn)

| # | Task | Output | Status |
|---|------|--------|--------|
| 1 | Tạo database PostgreSQL `pet_grooming` | DB running | ✅ Done |
| 2 | Chạy `schema.sql` migration | 15 bảng được tạo | ✅ Done |
| 3 | Thêm bảng `breeds`, `services`, `products`, `orders`, `vaccinations`... | Schema 15 bảng | ✅ Done |
| 4 | Seed data mẫu (37 breeds, 6 danh mục, 4 dịch vụ, vaccine, 5 accounts) | Dữ liệu test | ✅ Done |
| 5 | Thêm bảng `scan_results` + `breed_recommendations` | AI Scan + Recommendation | ✅ Done |
| 6 | Thêm indexes cho performance | Query performance | ✅ Done |
| 7 | Cải thiện chatbot prompt cho ngữ cảnh pet grooming | Chatbot trả lời chuyên ngành | ❌ |
| 8 | API lưu kết quả scan: `POST /api/ai/scan-results` | Scan history | ❌ |
| 9 | API thống kê cho admin: `GET /api/ai/analytics` | Dashboard data | ❌ |
| 10 | Gemini AI recommendation theo breed (species + fur_type + size) | Gợi ý sản phẩm | ❌ |

---

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

### 👤 Frontend Dev

| # | Task | Output |
|---|------|--------|
| 1 | Tạo axios instance + interceptors (attach JWT, handle 401) | `services/api.js` |
| 2 | Tạo AuthContext (login state, token, user info) | `contexts/AuthContext.jsx` |
| 3 | Kết nối Login/Register với API thật | Auth flow E2E |
| 4 | Protected routes (redirect về /login nếu chưa auth) | Route guards |
| 5 | Trang quản lý Pet (thêm/sửa/xóa pets) | `/my-pets` page |
| 6 | Kết nối BookingPage với API (chọn service → pet → ngày giờ) | Booking flow E2E |
| 7 | Booking history page | `/my-bookings` page |
| 8 | Admin Dashboard: xem danh sách appointments, confirm/cancel | `/admin` page |
| 9 | Chatbot widget (gọi `/chat` endpoint) | Floating chat |
| 10 | Fix responsive cho mobile | Mobile-friendly |

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

## 📂 Cấu Trúc Thư Mục

```
pj-x/
├── frontend/src/
│   ├── components/ui/        # Button, Card, Input (✅ có sẵn)
│   ├── contexts/             # 🆕 AuthContext.jsx
│   ├── features/
│   │   ├── auth/             # Login, Register (✅ UI có, cần kết nối API)
│   │   ├── landing/          # ✅ Done
│   │   ├── pricing/          # ✅ Done
│   │   ├── scanner/          # ✅ Done
│   │   ├── pets/             # 🆕 My Pets
│   │   ├── bookings/         # 🆕 Booking history
│   │   └── admin/            # 🆕 Admin dashboard
│   ├── hooks/                # 🆕 useAuth
│   ├── layouts/              # ✅ Main, Auth, Admin layouts
│   └── services/             # 🆕 api.js
│
├── backend/src/
│   ├── config/db.js          # 🔧 PostgreSQL connection
│   ├── controllers/          # 🔧 auth, pet, appointment, admin
│   ├── middlewares/          # 🔧 auth, rbac, validate, errorHandler
│   ├── routes/               # 🔧 auth, pet, appointment, service, admin
│   └── server.js             # 🔧 Full Express setup
│
├── aicore/
│   ├── api.py                # ✅ FastAPI server
│   ├── chatbot.py            # ✅ Gemini chatbot
│   ├── schema.sql            # ✅ Migration SQL (15 bảng)
│   ├── seed.sql              # ✅ Seed data (37 breeds, products, vaccines, accounts)
│   ├── setup_database.py     # ✅ Auto setup DB + schema + seed
│   └── web_model/            # ✅ TF.js model + classes.json
│
└── docs/
    ├── database-schema.md    # ✅ ERD + Full Schema Design (15 bảng)
    └── PLAN-project-development.md  # 📋 File này
```

---

## 🔄 Thứ Tự Ưu Tiên (Dependencies)

```
1. ✅ AI Core + DB: Tạo database + migration (DONE — 15 bảng + seed data)
          ↓
2. Security: Auth APIs (register/login/JWT)
   Backend: Setup Express + kết nối DB + models
          ↓
3. Backend: CRUD APIs (pets, services, products, orders, appointments, vaccinations)
   Security: RBAC + validation
   AI Core: Gemini recommendation API
          ↓
4. Frontend: Kết nối tất cả API + thêm trang mới (shop, orders, vaccination card)
          ↓
5. Tất cả: Fix bug + polish + chuẩn bị demo
```

---

## 📏 Quy Ước


- **API response:** `{ success: true/false, data: ..., message: "..." }`
- **Auth header:** `Authorization: Bearer <JWT>`
- **Port:** Frontend `:5173` | Backend `:5001` | AI Core `:8000`

---

## ✅ Tiêu Chí Hoàn Thành Đồ Án

- [ ] Đăng ký + Đăng nhập hoạt động
- [ ] Customer: thêm pet, đặt lịch grooming, xem lịch sử
- [ ] Customer: mua sản phẩm, đặt hàng (ship / nhận tại cửa hàng)
- [ ] Admin: xem + xác nhận/hủy appointments + orders
- [ ] Admin: quản lý sản phẩm, dịch vụ, phiếu tiêm chủng
- [x] AI Scanner: upload ảnh → nhận diện giống thú cưng
- [ ] AI Recommendation: gợi ý sản phẩm theo giống (Gemini API)
- [ ] Chatbot: hỏi đáp về dịch vụ pet grooming
- [x] Database PostgreSQL với schema đầy đủ (15 bảng + seed data)
- [ ] Responsive trên mobile cơ bản
