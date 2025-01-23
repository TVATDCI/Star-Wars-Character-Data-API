// Description: Controller for the character routes
import Character from "../models/characterModel.js";

// @desc    Get all characters
// @route   GET /api/characters
// @access  Public
const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single character by ID
// @route   GET /api/characters/:id
// @access  Public
const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new character
// @route   POST /api/characters
// @access  Public
const createCharacter = async (req, res) => {
  const character = new Character(req.body);
  try {
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a character
// @route   PUT /api/characters/:id
// @access  Public
const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      Object.assign(character, req.body);
      const updatedCharacter = await character.save();
      res.json(updatedCharacter);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a character
// @route   DELETE /api/characters/:id
// @access  Public
const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character) {
      await character.remove();
      res.json({ message: "Character removed" });
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporting the functions to be used in the routes
export {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};

// Next stop creating routes/characterRoutes.js file to handle the routes for the characters data.
