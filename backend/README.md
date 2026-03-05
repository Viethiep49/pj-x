# Pawsitive Pet Spa – Backend API

Backend service for **Pawsitive Pet Spa**, a pet care platform that provides pet management, product sales, grooming services, and appointment booking.
This backend exposes RESTful APIs used by the frontend application.

---

# 📦 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Nodemon**
* **UUID**
* **dotenv**

---

# 📁 Project Structure

```
backend
│
├── src
│   │
│   ├── config
│   │   └── db.js                # PostgreSQL connection
│   │
│   ├── controllers              # Business logic
│   │   ├── petsController.js
│   │   ├── productsController.js
│   │   ├── ordersController.js
│   │   └── appointmentsController.js
│   │
│   ├── routes                   # API routes
│   │   ├── petsRoutes.js
│   │   ├── productsRoutes.js
│   │   ├── ordersRoutes.js
│   │   ├── appointmentsRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── utils
│   │   └── helpers.js
│   │
│   └── server.js                # Entry point
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone project:

```bash
git clone https://github.com/your-repo/pawsitive-pet-spa.git
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 🔑 Environment Variables

Create `.env` file in the root of backend.

```
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=pawsitive
DB_USER=postgres
DB_PASSWORD=yourpassword
```

---

# ▶️ Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

---

# 🗄️ Database Schema

Main tables used in the system:

* users
* pets
* breeds
* services
* product_categories
* products
* orders
* order_items
* appointments
* vaccine_types
* vaccinations
* payments
* product_reviews
* breed_recommendations
* scan_results

---

# 🔌 API Endpoints

## Pets API

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | `/api/pets`     | Get all pets   |
| GET    | `/api/pets/:id` | Get pet by id  |
| POST   | `/api/pets`     | Create new pet |
| PUT    | `/api/pets/:id` | Update pet     |
| DELETE | `/api/pets/:id` | Delete pet     |

---

## Services API

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/api/services` | Get all services |

---

## Products API

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/products`     | Get product list |
| POST   | `/api/products`     | Create product   |
| PUT    | `/api/products/:id` | Update product   |
| DELETE | `/api/products/:id` | Delete product   |

---

## Orders API

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | `/api/orders` | Create order      |
| GET    | `/api/orders` | Get order history |

---

## Appointments API

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/appointments`     | Create appointment |
| GET    | `/api/appointments`     | Get appointments   |
| PUT    | `/api/appointments/:id` | Update appointment |

---

## Available Time Slots

| Method | Endpoint                            | Description                |
| ------ | ----------------------------------- | -------------------------- |
| GET    | `/api/appointments/available-slots` | Get available booking time |

---

# 📌 Example Request

Create a pet:

```http
POST /api/pets
Content-Type: application/json
```

Body:

```json
{
  "name": "Buddy",
  "breed_id": "uuid",
  "birthdate": "2023-01-10",
  "weight": 5.2,
  "owner_id": "uuid"
}
```

---

# 🛠️ Error Handling

Standard error response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 🧪 Testing API

You can test APIs using:

* Postman
* Thunder Client
* Insomnia

---

# 👨‍💻 Development Notes

* All APIs follow **RESTful conventions**
* UUID is used as primary key
* PostgreSQL handles relational data
* Controllers contain business logic
* Routes handle endpoint definitions

---

# 📄 License

This project is for **educational purposes**.
