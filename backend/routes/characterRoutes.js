// Initialize express router to be used in app.js
// This is the route file for admins only!
import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/characterController.js";
// Import the requiredAdmin role module
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateToken, getCharacters)
  .post(authenticateToken, requireAdmin, createCharacter);

router
  .route("/:id")
  .get(authenticateToken, getCharacterById)
  .put(authenticateToken, requireAdmin, updateCharacter) // Only admins can update characters
  .delete(authenticateToken, requireAdmin, deleteCharacter); // Only admins can delete characters

export default router;

// Next stop updating the app.js file to use the routes!
