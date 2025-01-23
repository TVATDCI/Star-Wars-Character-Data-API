// Initialize express router to be used in app.js
import express from "express";
import {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/characterController.js";

const router = express.Router();

router.route("/").get(getCharacters).post(createCharacter);

router
  .route("/:id")
  .get(getCharacterById)
  .put(updateCharacter)
  .delete(deleteCharacter);

export default router;

// Next stop updating the app.js file to use the routes!
