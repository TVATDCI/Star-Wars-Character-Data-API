import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
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

const characters = [
  {
    name: "Luke Skywalker",
    species: "Human",
    homeworld: "Tatooine",
    affiliation: "Rebel Alliance",
    stats: {
      forceRating: 95,
      combatSkill: 88,
      pilotingAbility: 92,
      diplomacyRating: 75,
    },
    weapons: ["Lightsaber", "Blaster"],
    vehicles: ["X-wing Starfighter", "Snowspeeder"],
    isJedi: true,
    apprentices: ["Ben Solo", "Grogu"],
    master: "Obi-Wan Kenobi",
    notableAchievements: [
      "Destroyed the First Death Star",
      "Redeemed Darth Vader",
    ],
  },
  {
    name: "Darth Vader",
    species: "Human",
    homeworld: "Tatooine",
    affiliation: "Galactic Empire",
    stats: {
      forceRating: 98,
      combatSkill: 95,
      pilotingAbility: 85,
      diplomacyRating: 60,
    },
    weapons: ["Lightsaber"],
    vehicles: ["TIE Advanced x1"],
    isJedi: false,
    apprentices: ["Starkiller"],
    master: "Emperor Palpatine",
    notableAchievements: ["Led the Jedi Purge", "Defeated Obi-Wan Kenobi"],
  },
  {
    name: "Leia Organa",
    species: "Human",
    homeworld: "Alderaan",
    affiliation: "Rebel Alliance",
    stats: {
      forceRating: 70,
      combatSkill: 75,
      pilotingAbility: 60,
      diplomacyRating: 95,
    },
    weapons: ["Blaster"],
    vehicles: ["Speeder Bike"],
    isJedi: false,
    apprentices: [],
    master: "",
    notableAchievements: [
      "Helped destroy the Death Star",
      "Led the Rebel Alliance",
    ],
  },
  {
    name: "Han Solo",
    species: "Human",
    homeworld: "Corellia",
    affiliation: "Rebel Alliance",
    stats: {
      forceRating: 0,
      combatSkill: 85,
      pilotingAbility: 95,
      diplomacyRating: 70,
    },
    weapons: ["Blaster"],
    vehicles: ["Millennium Falcon"],
    isJedi: false,
    apprentices: [],
    master: "",
    notableAchievements: [
      "Helped destroy the Death Star",
      "Rescued Princess Leia",
    ],
  },
  {
    name: "Yoda",
    species: "Yoda's species",
    homeworld: "Unknown",
    affiliation: "Jedi Order",
    stats: {
      forceRating: 100,
      combatSkill: 90,
      pilotingAbility: 50,
      diplomacyRating: 95,
    },
    weapons: ["Lightsaber"],
    vehicles: [],
    isJedi: true,
    apprentices: ["Luke Skywalker", "Count Dooku"],
    master: "N'Kata Del Gormo",
    notableAchievements: [
      "Grand Master of the Jedi Order",
      "Trained generations of Jedi",
    ],
  },
  {
    name: "Obi-Wan Kenobi",
    species: "Human",
    homeworld: "Stewjon",
    affiliation: "Jedi Order",
    stats: {
      forceRating: 90,
      combatSkill: 85,
      pilotingAbility: 80,
      diplomacyRating: 85,
    },
    weapons: ["Lightsaber"],
    vehicles: ["Jedi Starfighter"],
    isJedi: true,
    apprentices: ["Anakin Skywalker", "Luke Skywalker"],
    master: "Qui-Gon Jinn",
    notableAchievements: [
      "Defeated Darth Maul",
      "Trained Anakin and Luke Skywalker",
    ],
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return Character.insertMany(characters);
  })
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB or inserting data", err);
  });
