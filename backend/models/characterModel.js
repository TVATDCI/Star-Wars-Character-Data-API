// Building the character model (how the data should be structured in the database)
// Then exporting the model to be used in the controllers/characterController.js
import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  height: { type: Number, min: 0 }, // Do not forget to add the height field to controller!
  species: { type: String, required: true },
  homeworld: { type: String, required: true },
  affiliation: { type: String, required: true },
  stats: {
    forceRating: { type: Number, min: 0, max: 100 },
    combatSkill: { type: Number, min: 0, max: 100 },
    pilotingAbility: { type: Number, min: 0, max: 100 },
    diplomacyRating: { type: Number, min: 0, max: 100 },
  },
  weapons: [String],
  vehicles: [String],
  isJedi: { type: Boolean },
  apprentices: [String],
  master: { type: String },
  notableAchievements: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Character = mongoose.model("Character", characterSchema);

export default Character;

// NOTE: Next stop creating controllers/characterController.js file to handle the CRUD operations for the characters data.
