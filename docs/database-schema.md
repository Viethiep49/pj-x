# Database Schema Design (PostgreSQL/MongoDB)

### 1. Users Collection/Table
- id: Primary Key
- email: String (Unique)
- password: String (Hashed)
- name: String
- role: Enum ('user', 'admin')
- createdAt: Timestamp

### 2. Pets Collection/Table
- id: Primary Key
- ownerId: Foreign Key (Users.id)
- name: String
- type: Enum ('dog', 'cat', 'other')
- breed: String (Filled by AI or Manual)
- photoUrl: String
- age: Number

### 3. Appointments Collection/Table
- id: Primary Key
- userId: Foreign Key (Users.id)
- petId: Foreign Key (Pets.id)
- servicePackage: String
- appointmentDate: Timestamp
- status: Enum ('pending', 'confirmed', 'completed', 'cancelled')
- aiMetadata: JSON (Breed detected, confidence score)

### 4. Payments Collection/Table
- id: Primary Key
- appointmentId: Foreign Key (Appointments.id)
- amount: Decimal
- status: Enum ('pending', 'paid', 'failed')
- transactionId: String
- gateway: String (Stripe/Paypal)
