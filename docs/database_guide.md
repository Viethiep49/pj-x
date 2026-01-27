# Database Integration Guide

This guide outlines the steps required to replace the current mock data system with a persistent database (e.g., MongoDB or MySQL).

## 1. Database Configuration
Create a configuration utility to manage the database connection.

### Example for MongoDB (Mongoose)
Install the required package:
```bash
npm install mongoose
```

Create `backend/src/config/database.js`:
```javascript
const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
```

## 2. Defining Data Models
Standardize the data structure by creating models in the `backend/src/models` directory.

### Example User Model
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
```

## 3. Integrating Models into Controllers
Replace existing hardcoded mock responses in routes or controllers with database queries.

### Authentication Update
Update `backend/src/features/auth/auth.routes.js`:
1. Import the database model.
2. Utilize asynchronous functions (`async/await`) to interact with the database.
3. Implement password hashing using libraries such as `bcrypt`.
4. Replace status code and message logic based on database results.

## 4. Environment Variables
Store sensitive connection strings in a `.env` file at the backend root:
```
DATABASE_URL=mongodb://localhost:27017/project_db
PORT=5000
```
Ensure `.env` is included in `.gitignore` to prevent exposure of credentials.
