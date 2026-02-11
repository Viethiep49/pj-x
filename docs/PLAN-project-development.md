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
| **Database Schema** | Thiết kế 4 bảng: Users, Pets, Appointments, Payments (có ERD + SQL) |

### Chưa hoàn thành ❌

| Module | Chi tiết |
|--------|----------|
| **Backend API** | `server.js` chỉ có `app.listen()`, models/controllers/routes đều rỗng |
| **Database** | Chưa tạo DB, chưa chạy migration |
| **Auth** | Middleware JWT rỗng, chưa có register/login API |
| **Frontend ↔ Backend** | Các trang UI chưa kết nối API thật |

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

| # | Task | Output |
|---|------|--------|
| 1 | Tạo database PostgreSQL `pet_grooming` | DB running |
| 2 | Chạy `schema.sql` migration | 4 bảng được tạo |
| 3 | Thêm bảng `services` (id, name, description, price, duration) | Schema mở rộng |
| 4 | Seed data mẫu (3 gói dịch vụ, 1 admin account) | Dữ liệu test |
| 5 | Thêm bảng `scan_results` (pet_id, breed, confidence, image_url) | Lưu kết quả scan |
| 6 | Thêm index cho `users.email`, `appointments.appointment_date` | Query performance |
| 7 | Cải thiện chatbot prompt cho ngữ cảnh pet grooming | Chatbot trả lời chuyên ngành |
| 8 | API lưu kết quả scan: `POST /api/ai/scan-results` | Scan history |
| 9 | API thống kê cho admin: `GET /api/ai/analytics` | Dashboard data |

---

### 👤 Backend API Dev

| # | Task | Output |
|---|------|--------|
| 1 | Setup Express đầy đủ (cors, helmet, dotenv, json parser, error handler) | `server.js` hoàn chỉnh |
| 2 | Kết nối PostgreSQL bằng Sequelize | `config/db.js` hoạt động |
| 3 | Tạo Sequelize models (User, Pet, Service, Appointment, Payment) | 5 models với relations |
| 4 | CRUD Pets: `GET/POST/PUT/DELETE /api/pets` | Pet management API |
| 5 | CRUD Services: `GET /api/services` | Service listing API |
| 6 | CRUD Appointments: `POST/GET/PUT /api/appointments` | Booking API |
| 7 | Available time slots: `GET /api/appointments/slots` | Slot checking |
| 8 | Admin APIs: quản lý appointments (confirm/complete/cancel) | Admin endpoints |
| 9 | API docs cơ bản (README hoặc Swagger) | Documentation |

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

# Services (Backend Dev)
GET    /api/services                — List dịch vụ (public)

# Appointments (Backend Dev)
POST   /api/appointments            — Đặt lịch
GET    /api/appointments            — Lịch sử booking
GET    /api/appointments/slots      — Khung giờ trống
PUT    /api/admin/appointments/:id  — [Admin] confirm/cancel

# AI Core
GET    /model/model.json            — TF.js model (static)
POST   /chat                        — Chatbot
POST   /api/ai/scan-results         — Lưu kết quả scan
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
│   ├── schema.sql            # ✅ Migration SQL
│   └── web_model/            # ✅ TF.js model
│
└── docs/
    ├── database-schema.md    # ✅ ERD
    └── PLAN-project-development.md  # 📋 File này
```

---

## 🔄 Thứ Tự Ưu Tiên (Dependencies)

```
1. AI Core + DB: Tạo database + migration
          ↓
2. Security: Auth APIs (register/login/JWT)
   Backend: Setup Express + kết nối DB + models
          ↓
3. Backend: CRUD APIs (pets, services, appointments)
   Security: RBAC + validation
          ↓
4. Frontend: Kết nối tất cả API + thêm trang mới
          ↓
5. Tất cả: Fix bug + polish + chuẩn bị demo
```

---

## 📏 Quy Ước

- **Git branch:** `feature/[tên-task]` → merge vào `main`
- **API response:** `{ success: true/false, data: ..., message: "..." }`
- **Auth header:** `Authorization: Bearer <JWT>`
- **Port:** Frontend `:5173` | Backend `:5001` | AI Core `:8000`

---

## ✅ Tiêu Chí Hoàn Thành Đồ Án

- [ ] Đăng ký + Đăng nhập hoạt động
- [ ] Customer: thêm pet, đặt lịch grooming, xem lịch sử
- [ ] Admin: xem + xác nhận/hủy appointments
- [ ] AI Scanner: upload ảnh → nhận diện giống thú cưng
- [ ] Chatbot: hỏi đáp về dịch vụ pet grooming
- [ ] Database PostgreSQL với schema đầy đủ
- [ ] Responsive trên mobile cơ bản
