// Description: Controller for the character routes
import Character from "../models/characterModel.js";

// Reformat the character data to return how we want it to be displayed
const formatCharacter = (character) => {
  return {
    name: character.name,
    _id: character._id,
    species: character.species,
    homeworld: character.homeworld,
    affiliation: character.affiliation,
    stats: character.stats,
    weapons: character.weapons,
    vehicles: character.vehicles,
    isJedi: character.isJedi,
    apprentices: character.apprentices,
    master: character.master,
    notableAchievements: character.notableAchievements,
    createdAt: character.createdAt,
    updatedAt: character.updatedAt,
    __v: character.__v,
  };
};

// @desc    Get all characters
// @route   GET /api/characters
// @access  Public
const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    const formatCharacters = characters.map(formatCharacter);
    res.json(formatCharacters);
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
      res.json(formatCharacter(character));
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
  // logging just name & id of the character
  console.log("Creating a new character:", {
    name: character.name,
    _id: character._id,
  });
  try {
    const newCharacter = await character.save();
    res.status(201).json(formatCharacter(newCharacter));
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
    console.log("Deleting a character with an id: ", req.params.id);
    const character = await Character.findById(req.params.id);
    if (character) {
      await Character.deleteOne({ _id: req.params.id }); // Correct method to delete
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
