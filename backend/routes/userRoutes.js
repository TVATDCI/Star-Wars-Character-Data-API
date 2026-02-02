import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import { validateUserProfile } from '../middleware/validateUserProfile.js';

const router = express.Router();

router
  .route('/profile')
  .get(authenticateToken, getUserProfile)
  .patch(authenticateToken, validateUserProfile, updateUserProfile);

export default router;
