import express from "express";
import Character from "../models/characterModel.js"; // Adjust path if needed

const router = express.Router();

// GET all characters (public)
router.get("/characters", async (req, res, next) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    next(error);
  }
});

// GET single character by ID (public)
router.get("/characters/:id", async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      res.status(404);
      throw new Error("Character not found");
    }
    res.json(character);
  } catch (error) {
    next(error);
  }
});

export default router;
