import express from 'express';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', authenticateToken, logoutUser);
export default router;
