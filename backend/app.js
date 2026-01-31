import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import characterRoutes from './routes/characterRoutes.js';
import authenticateToken from './middleware/authMiddleware.js';
import publicRoutes from './routes/publicRoutes.js';
import userProfileRoutes from './routes/userProfile.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

app.use(express.json());

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

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


// Profile routes
app.use('/profile', userProfileRoutes);

// Protected character routes
app.use('/api/characters', authenticateToken, characterRoutes);

// Public routes
app.use('/api/public', publicRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🌌 Welcome to Star Wars Character Database CRUD API server...🚀');
});

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);

export default app;
