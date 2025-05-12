import express from "express";
import Character from "../models/characterModel.js"; // Adjust path if needed

const router = express.Router();

// GET all characters (public)
router.get("/characters", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

// GET single character by ID (public)
router.get("/characters/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ error: "Failed to fetch character" });
  }
});

export default router;
