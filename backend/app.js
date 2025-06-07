import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

import connectDB from "./config/db.js";
import characterRoutes from "./routes/characterRoutes.js";
import authenticateToken from "./middleware/authMiddleware.js";
import publicRoutes from "./routes/publicRoutes.js";
import userProfileRoutes from "./routes/userProfile.js";
import User from "./models/userModel.js";

// Setup environment
const env = process.env.NODE_ENV || "development";
const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename); // Get the directory name of the current module

dotenv.config({
  path: path.resolve(__dirname, `.env.${env}`),
});

// Connect to DB
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173", // Default for development
  process.env.FRONTEND_URL_PROD ||
    "https://star-wars-character-data-api.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Profile routes
app.use("/profile", userProfileRoutes);
console.log("User profile routes initialized");

// Register route
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    console.log("Email or password is missing");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const newUser = new User({
      email,
      password,
      role: role || "user",
    });

    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  console.log("Login attempt for user:", email);
  console.log("Logging in user HIT");
  console.log("Request body:", req.body);

  if (user) {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("User logged in, token generated successfully");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Logout route (handled on client)
app.post("/logout", (req, res) => {
  console.log("Logout route hit");
  res.json({ message: "Logged out successfully" });
});

// Protected character routes
app.use("/api/characters", authenticateToken, characterRoutes);

// Public routes
app.use("/api/public", publicRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🌌 Welcome to Star Wars Character Database CRUD API server...🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
