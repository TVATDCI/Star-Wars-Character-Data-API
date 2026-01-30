# This is a initiative. Refactoring

The goal is to turn my "student code" into "production-ready code" to solidify understanding of software architecture. Basically, developing my learning skills.

**backend/`app.js`** is where i am going to begin.

It is doing too much heavy lifting (connecting to the DB, defining routes, handling auth logic, and starting the server).

Here is a comprehensive **Backend Refactoring Plan**
Idea - decouple logic, improve security, and prepare the app for scalability.

---

# 🛠️ Backend Refactoring Plan: Star Wars Character API

## Phase 1: Foundation & Configuration

_Goal: separate "configuration" from "code" and ensure the environment is robust._

- [ ] **Standardize Environment Variables**
- Implement the robust `dotenv` loading strategy (checking root vs. backend folders).
- Create a `config/config.js` file to export validated env variables (e.g., throwing an error if `MONGO_URL` is missing on startup).

- [ ] **Entry Point Separation (`app.js` vs `server.js`)**
- **Current:** `app.js` does everything.
- **Refactor:**
- `app.js`: Only sets up Express, middleware, and routes. Exports the `app`.
- `server.js` (new file): Imports `app`, connects to the Database, and listens on the port.

- _Benefit:_ Makes testing easier ( `app` can be tested without starting the server) and keeps the startup logic clean.

## Phase 2: Modularization (MVC Pattern)

_Goal: `app.js` should not contain business logic. Move logic to Controllers._

- [ ] **Extract Auth Logic**
- **Current:** `/login` and `/register` are defined directly inside `app.js`.
- **Refactor:**
- Create `controllers/authController.js`.
- Move the login/register logic there.
- Create `routes/authRoutes.js` to define the endpoints.

- [ ] **Controller Cleanup**
- Ensure `characterController.js` and `userProfile.js` follow a consistent pattern (e.g., using `async/await` with centralized error handling).

- [ ] **Route Grouping**
- Mount all API routes under a versioned prefix in `app.js`:

```javascript
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/characters', characterRoutes);
app.use('/api/v1/users', userRoutes);
```

## Phase 3: Middleware & Security

_Goal: Protect the endpoints and handle errors gracefully._

- [ ] **Centralized Error Handling**
- **Current:** `try/catch` blocks inside every route with `console.error`.
- **Refactor:** Create a `middleware/errorHandler.js`.
- Routes calls `next(error)` and the middleware handles the response formatting (dev vs. prod logging).

- [ ] **Validation Layer**
- **Current:** Basic `if (!email)` checks inside controllers.
- **Refactor:** Use `express-validator` middleware inside the routes files before the request hits the controller.

- [ ] **Security Headers**
- Install and implement `helmet` to secure HTTP headers.
- Implement `express-rate-limit` to prevent brute-force attacks on `/login`.

## Phase 4: Database & Models

_Goal: Ensure data integrity and clean connection logic._

- [ ] **Refine DB Connection**
- Update `config/db.js` to handle connection events (disconnect/reconnect) and use the new config object.

- [ ] **Model Methods**
- Move "User Logic" to the Model.
- Example: Instead of comparing passwords in the controller, add a method `user.matchPassword(enteredPassword)` to the User schema.

---

## 📂 Proposed Folder Structure

This structure separates concerns clearly.

```text
backend/
├── config/             # Environment variables & configuration
│   ├── db.js           # Database connection logic
│   └── index.js        # Central config export (ports, secrets)
├── controllers/        # Business logic (Req -> Res)
│   ├── authController.js
│   ├── characterController.js
│   └── userController.js
├── middleware/         # Interceptors
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── validationMiddleware.js
│   └── requireAdmin.js
├── models/             # Database Schemas
│   ├── Character.js
│   └── User.js
├── routes/             # Route definitions
│   ├── authRoutes.js
│   ├── characterRoutes.js
│   └── userRoutes.js
├── utils/              # Helper functions
│   └── generateToken.js
├── app.js              # Express App setup (Middleware & Routes)
└── server.js           # Entry point (DB Connect & Server Listen)

```

---

Here are the plan to create the files

### 1. `backend/config/db.js`

_Refactored to be more robust and handle the connection string check internally._

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Environment loading is now handled in server.js/app.js,
// but we keep a failsafe check here.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### 2. `backend/routes/authRoutes.js` (New File)

_We immediately extract the Login/Register logic from `app.js` to here. This aligns with your `api.js` which hits `/login` and `/register`._

```javascript
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

// @route   POST /api/auth/register (or /register if using root proxy)
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const newUser = new User({
      email,
      password,
      role: role || 'user',
    });

    await newUser.save();
    console.log(`User registered: ${email}`);
    res.status(201).json({
      message: 'User registered successfully',
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'Email already exists' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }); // Note: In production, use bcrypt to compare hashes!

    if (user) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log(`Login successful: ${email}`);
      res.json({ token, role: user.role, email: user.email });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
```

### 3. `backend/app.js` (Refactored)

_Now `app.js` only configures Express. It exports the `app` instead of listening. Note that we are grouping routes under `/api` now, which means you will need to update your `vite.config.js` proxy._

```javascript
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import characterRoutes from './routes/characterRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import userProfileRoutes from './routes/userProfile.js';
import authenticateToken from './middleware/authMiddleware.js';

const app = express();

// Middleware
app.use(express.json());

// CORS Setup (Refactored for clarity)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Route Definitions
// We are moving to a cleaner structure.
// Old frontend might hit /login directly, but we will proxy that in Vite.

app.use('/api/auth', authRoutes); // Login/Register now live here
app.use('/api/characters', authenticateToken, characterRoutes);
app.use('/api/public', publicRoutes);
app.use('/profile', userProfileRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('🌌 Star Wars API is running...');
});

export default app;
```

### 4. `backend/server.js` (New Entry Point)

_This is the file you will run with `node backend/server.js`. It handles the environment config and DB connection._

```javascript
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

// 1. Environment Configuration
// We use the robust logic we discussed to find the .env file in root or backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';

// Try loading specific env file first, fallback to standard .env
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Connect to Database
connectDB();

// 3. Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${env} mode on port ${PORT}
  👉 http://localhost:${PORT}
  `);
});
```

### ⚡ Next Steps

1. **Generate Files:** Create these four files.
2. **Update `package.json`:** Change the `"server"` script to run `backend/server.js` instead of `backend/app.js`.
3. **Update `vite.config.js`:** Since I moved auth routes to `/api/auth`, update your proxy to map `/login` -> `/api/auth/login`.
