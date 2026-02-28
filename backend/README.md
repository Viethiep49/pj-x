# 🐾 Pawsitive – Backend API

Backend cho hệ thống quản lý thú cưng, đặt lịch dịch vụ và bán sản phẩm.

Tech stack:

* Node.js + Express
* PostgreSQL
* Sequelize ORM
* UUID primary keys

---

## ⚙️ Cài đặt

```bash
npm install
```

Tạo file `.env`:

```env
PORT=5001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=pawsitive
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=change-this-to-a-long-random-secret-string
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
AICORE_URL=http://localhost:8000
```

Chạy server:

```bash
npm run dev
```

Base URL:

```
http://localhost:5001/api
```

---

## 📌 Quy ước chung

* Tất cả `id` là UUID
* Content-Type: `application/json`

---

## 🔁 Status convention

Áp dụng cho `appointments` và `orders`:

* pending
* confirmed
* completed
* cancelled

---

# 🐶 Pets

### GET all pets

```
GET /pets
```

### GET pet by id

```
GET /pets/:id
```

### Create pet

```
POST /pets
```

### Update pet

```
PUT /pets/:id
```

### Delete pet

```
DELETE /pets/:id
```

---

# 🛍 Products

### GET all products

```
GET /products
```

### GET product by id

```
GET /products/:id
```

### Create product

```
POST /products
```

### Update product

```
PUT /products/:id
```

### Delete product

```
DELETE /products/:id
```

---

# 🧾 Orders

### Create order

```
POST /orders
```

### Get all orders

```
GET /orders
```

---

# ✂️ Services

### Get all services

```
GET /services
```

---

# 📅 Appointments

### Create appointment

```
POST /appointments
```

### Get all appointments

```
GET /appointments
```

### Update appointment

```
PUT /appointments/:id
```

---

### Get available time slots

```
GET /appointments/slots?date=YYYY-MM-DD
```

Ví dụ:

```
GET /appointments/slots?date=2026-03-01
```

---

# 💉 Vaccinations

### Create vaccination

```
POST /vaccinations
```

### Get vaccinations

```
GET /vaccinations
```

⚠️ Các khóa ngoại (ví dụ: pet_id, appointment_id) phải là UUID hợp lệ.

---

# 👨‍💼 Admin APIs

Base path:

```
/api/admin
```

---

## Appointments – quản lý trạng thái

### Confirm appointment

```
PATCH /admin/appointments/:id/confirm
```

### Complete appointment

```
PATCH /admin/appointments/:id/complete
```

### Cancel appointment

```
PATCH /admin/appointments/:id/cancel
```

---

## Orders – quản lý trạng thái

### Confirm order

```
PATCH /admin/orders/:id/confirm
```

### Complete order

```
PATCH /admin/orders/:id/complete
```

### Cancel order

```
PATCH /admin/orders/:id/cancel
```

---

## 🧪 HTTP status

| Trường hợp           | Status    |
| -------------------- | --------- |
| Thành công           | 200 / 201 |
| Không tìm thấy       | 404       |
| Dữ liệu không hợp lệ | 400       |
| Lỗi server           | 500       |

---

## ⚠️ Lưu ý quan trọng

Không sử dụng id dạng số:

```
/orders/1   ❌
```

Phải sử dụng UUID:

```
/orders/550e8400-e29b-41d4-a716-446655440000   ✅
```
