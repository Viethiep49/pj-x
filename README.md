# Pawsitive Pet Grooming SPA 🐾

> Nền tảng chăm sóc thú cưng toàn diện tích hợp AI 

Pawsitive là một hệ thống web app full-stack quản lý dịch vụ spa, grooming và mua sắm cho thú cưng. Điểm nổi bật của hệ thống là tích hợp trí tuệ nhân tạo (AI) để nhận diện giống loài qua hình ảnh và tự động gợi ý sản phẩm/dịch vụ phù hợp, cùng chatbot tư vấn chuyên sâu.

## 🚀 Quick Start

Dự án được chia làm 3 phân hệ độc lập. Cần khởi chạy cả 3 để trải nghiệm đầy đủ tính năng.

> **Yêu cầu:** PostgreSQL đã cài và đang chạy. Python 3.10+. Node.js 18+.

---

### Bước 1 — Cấu hình biến môi trường

**Backend:**
```bash
cd backend
copy .env.example .env        # Windows
# cp .env.example .env        # macOS/Linux
# Mở file .env, sửa DB_PASSWORD thành password PostgreSQL của bạn
```

**AI Core (Database Setup):**
```bash
cd aicore
copy .env.example .env        # Windows
# cp .env.example .env        # macOS/Linux
# Mở file .env, sửa DB_PASSWORD thành password PostgreSQL của bạn
```

---

### Bước 2 — Khởi tạo Database & AI Core

```bash
cd aicore

# Cài đặt thư viện Python
pip install -r requirements.txt

# Tự động tạo DB 'pet_grooming', 15 bảng, và seed dữ liệu mẫu
python setup_database.py

# Khởi chạy AI API server (Cổng 8000)
uvicorn api:app --reload
```

✅ Sau bước này sẽ có tài khoản admin mặc định:
- Email: `admin@pawsitive.com`
- Password: `Pawsitive@2024`

---

### Bước 3 — Khởi chạy Backend

```bash
cd backend
npm install
npm run dev        # Chạy trên Cổng 5001
```

---

### Bước 4 — Khởi chạy Frontend

```bash
cd frontend
npm install
npm run dev        # Chạy trên Cổng 5173
```

---

### Chạy nhanh (Windows — tất cả cùng lúc)

```bash
run_project.bat
```

---

## ✨ Features

- **Hệ Thống Đặt Lịch (Booking):** Đặt lịch các dịch vụ spa, cắt tỉa lông với các khung giờ trống tự động.
- **AI Pet Scanner:** Tải ảnh thú cưng lên để bộ AI chuyên biệt (TensorFlow.js) nhận diện chính xác 37 giống chó/mèo phổ biến trực tiếp trên trình duyệt.
- **AI Recommendation:** Góp ý sản phẩm/thức ăn được cá nhân hóa qua Gemini API dựa trên độ tuổi, giống và kích thước của thú cưng.
- **Cửa hàng (Shop):** Mua sắm vật dụng, thức ăn có đầy đủ tính năng Giỏ Hàng, Đặt Hàng và lịch sử mua hàng.
- **Quản lý Y Tế:** Lưu trữ sổ theo dõi Tiêm chủng (Vaccination) cho từng bé.
- **Pawsie Chatbot:** Trợ lý ảo AI túc trực 24/7 giải đáp kiến thức nuôi dưỡng thú cưng.

---

## 🛠 Tech Stack

| Phân hệ | Công nghệ sử dụng | Mức độ hoàn thiện hiện tại |
|---------|-------------------|----------------------------|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion | Hoàn thiện UI Landing, Booking, AI Scanner, Products |
| **Backend** | Node.js, Express, Sequelize ORM (PostgreSQL), JWT | Đã cấu hình Server, Route, Controllers & Middleware bảo mật |
| **Database** | PostgreSQL | Schema 15 bảng hoàn tất (Users, Pets, Breeds, Orders, Appointments...) |
| **AI Core** | Python, FastAPI, TensorFlow.js, Google Gemini | Xong model nhận diện, API Scanner và Chatbot |

---

## ⚙️ Configuration

Một số biến môi trường (Environment Variables) quan trọng cần thiết lập trong file `.env` ở thư mục `backend/`:

| Biến (`.env`) | Mô tả | Giá trị Mặc định / Ví dụ |
|---------------|-------|--------------------------|
| `PORT` | Cổng chạy Backend API | `5001` |
| `DB_HOST` | Địa chỉ máy chủ CSDL | `localhost` |
| `DB_NAME` | Tên CSDL PostgreSQL | `pet_grooming` |
| `JWT_SECRET` | Mã bí mật mã hoá phiên Đăng nhập | *(Chuỗi ngẫu nhiên bảo mật)* |
| `AICORE_URL` | Địa chỉ kết nối Bridge sang AI | `http://localhost:8000` |
| `MAIL_USER` | Email dùng để gửi hóa đơn SMTP | `...........@gmail.com` |

---

## 📄 Documentation Links

- [Bản phác thảo Kế Hoạch Dự Án (Dev Plan)](./docs/PLAN-project-development.md)
- [Cấu trúc Cơ Sở Dữ Liệu (Database Schema)](./docs/database-schema.md)

---
admin@pawsitive.com
Pawsitive@2024
## 👥 Nhóm Phát Triển (Group 4)
- **Frontend Dev:** Đảm nhiệm UI, React Context, API Integration
- **Backend API Dev:** Express Server, CRUD Controllers, Router
- **AI Core & Database (Kaito):** Xây dựng Mô hình TF.js, FastAPI, SQL Migration & Recommendation
- **Security & Auth:** JWT auth flow, Middleware xác thực, Phân quyền RBAC

## 📜 License
Dự án được thực hiện cho mục đích giáo dục môn học. Miễn trừ mọi trách nhiệm thương mại.
MIT License
