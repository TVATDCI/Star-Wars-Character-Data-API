import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import characterRoutes from './routes/characterRoutes.js';
import authenticateToken from './middleware/authMiddleware.js';
// import publicRoutes from './routes/publicRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(cookieParser());
// Enable CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173', // Default for development
  process.env.FRONTEND_URL_PROD ||
    'https://star-wars-character-data-api.vercel.app/',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Limit requests from same API (general limiter for all routes)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api/v1', limiter);

// Stricter rate limiting for auth endpoints to prevent brute force attacks
const authLimiter = rateLimit({
  max: 10, // 10 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  message:
    'Too many authentication attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests (login/register success shouldn't count against limit)
  skipSuccessfulRequests: false, // Set to true if you want to only count failed attempts
});

import authRoutes from './routes/authRoutes.js';
app.use('/api/v1/auth', authLimiter, authRoutes);

// User routes
app.use('/api/v1/users', authenticateToken, userRoutes);

// Character routes
app.use('/api/v1/characters', characterRoutes);

// Public routes
// app.use('/api/v1/public', publicRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Star Wars Character Database CRUD API server...🚀');
});

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);

export default app;
