import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Define the schema for the Character model
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

// Define the characters data to be inserted!
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
  {
    name: "Chewbacca",
    species: "Wookiee",
    homeworld: "Kashyyyk",
    affiliation: "Rebel Alliance",
    stats: {
      forceRating: 0,
      combatSkill: 90,
      pilotingAbility: 85,
      diplomacyRating: 40,
    },
    weapons: ["Bowcaster"],
    vehicles: ["Millennium Falcon"],
    isJedi: false,
    apprentices: [],
    master: "",
    notableAchievements: [
      "Fought in the Clone Wars",
      "Co-pilot of the Millennium Falcon",
      "Helped destroy the Death Star",
    ],
  },
  {
    name: "Rey",
    species: "Human",
    homeworld: "Jakku",
    affiliation: "Resistance",
    stats: {
      forceRating: 95,
      combatSkill: 88,
      pilotingAbility: 85,
      diplomacyRating: 70,
    },
    weapons: ["Lightsaber", "Staff", "Force Powers"],
    vehicles: ["Millennium Falcon"],
    isJedi: true,
    apprentices: [],
    master: "Luke Skywalker",
    notableAchievements: [
      "Defeated Kylo Ren",
      "Discovered Luke Skywalker",
      "Restored Balance to the Force",
    ],
  },
  {
    name: "Kylo Ren",
    species: "Human",
    homeworld: "Chandrila",
    affiliation: "First Order",
    stats: {
      forceRating: 88,
      combatSkill: 85,
      pilotingAbility: 80,
      diplomacyRating: 45,
    },
    weapons: ["Crossguard Lightsaber", "Force Powers"],
    vehicles: ["TIE Silencer"],
    isJedi: false,
    apprentices: [],
    master: "Supreme Leader Snoke",
    notableAchievements: [
      "Master of the Knights of Ren",
      "Supreme Leader of the First Order",
      "Destroyed Luke's Jedi Temple",
    ],
  },
  {
    name: "Mace Windu",
    species: "Human",
    homeworld: "Haruun Kal",
    affiliation: "Jedi Order",
    stats: {
      forceRating: 92,
      combatSkill: 95,
      pilotingAbility: 75,
      diplomacyRating: 80,
    },
    weapons: ["Purple Lightsaber"],
    vehicles: ["Jedi Starfighter"],
    isJedi: true,
    apprentices: ["Depa Billaba", "Echuu Shen-Jon"],
    master: "Cyslin Myr",
    notableAchievements: [
      "Created Vaapad lightsaber form",
      "Member of the Jedi Council",
      "Defeated Darth Sidious in combat",
    ],
  },
  {
    name: "Boba Fett",
    species: "Human",
    homeworld: "Kamino",
    affiliation: "Bounty Hunter",
    stats: {
      forceRating: 0,
      combatSkill: 90,
      pilotingAbility: 85,
      diplomacyRating: 40,
    },
    weapons: ["Blaster Rifle", "Flamethrower"],
    vehicles: ["Slave I"],
    isJedi: false,
    apprentices: [],
    master: "",
    notableAchievements: ["Captured Han Solo", "Survived the Sarlacc Pit"],
  },
  {
    name: "Ahsoka Tano",
    species: "Togruta",
    homeworld: "Shili",
    affiliation: "Jedi Order",
    stats: {
      forceRating: 85,
      combatSkill: 90,
      pilotingAbility: 80,
      diplomacyRating: 75,
    },
    weapons: ["Lightsabers"],
    vehicles: ["T-6 Shuttle"],
    isJedi: true,
    apprentices: [],
    master: "Anakin Skywalker",
    notableAchievements: ["Fought in the Clone Wars", "Survived Order 66"],
  },
  {
    name: "Padmé Amidala",
    species: "Human",
    homeworld: "Naboo",
    affiliation: "Galactic Republic",
    stats: {
      forceRating: 0,
      combatSkill: 70,
      pilotingAbility: 60,
      diplomacyRating: 95,
    },
    weapons: ["Blaster"],
    vehicles: [],
    isJedi: false,
    apprentices: [],
    master: "",
    notableAchievements: ["Queen of Naboo", "Senator of the Galactic Republic"],
  },
  {
    name: "Qui-Gon Jinn",
    species: "Human",
    homeworld: "Coruscant",
    affiliation: "Jedi Order",
    stats: {
      forceRating: 90,
      combatSkill: 85,
      pilotingAbility: 70,
      diplomacyRating: 80,
    },
    weapons: ["Lightsaber"],
    vehicles: [],
    isJedi: true,
    apprentices: ["Obi-Wan Kenobi"],
    master: "Count Dooku",
    notableAchievements: ["Discovered Anakin Skywalker", "Fought Darth Maul"],
  },
];

mongoose
  .connect(process.env.MONGO_URL)
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
