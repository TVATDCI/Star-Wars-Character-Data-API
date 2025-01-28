import express from "express";
import dotenv from "dotenv";
// Import cors to allow requests from any origin
import cors from "cors";
// Import the connectDB function from the db.js file
import connectDB from "./config/db.js";
// Import the character routes from the routes folder
import characterRoutes from "./routes/characterRoutes.js";
// Add models/userModel.js to extend register and auth routes with user registration and authentication
import User from "./models/userModel.js";
// npm install jsonwebtoken for token generation
import jwt from "jsonwebtoken";

dotenv.config();

connectDB();
// Initialize middleware
const app = express();
// Also use the cors middleware for cross-origin requests.In this case, frontend requests!
app.use(cors());

// Middleware to parse the body but only with tester like Postman or others
app.use(express.json());
// CORS middleware to allow requests from any origin eg. frontend!

// Create register route. This route will be responsible for registering users.
// Register a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});
// Here begins the character routes V1
app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => {
  res.send("API is running ...🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});
