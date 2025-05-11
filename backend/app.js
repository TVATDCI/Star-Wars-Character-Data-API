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

  //BUG: Check if email and password are provided
  console.log("Registering user:", email, password);
  console.log("Request body:", req.body);

  if (!email || !password) {
    //BUG: Return an error if email or password is not provided
    console.log("Email or password is missing");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    //BUG: Return a success message if user is registered successfully
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    //BUG: Check if the error is due to duplicate email
    console.error("Error registering user:", error);
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  //BUG: Check if user is found
  console.log("Logging in user HIT");
  console.log("Request body:", req.body);

  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //BUG: Return the token if user is found
    console.log("User logged in successfully, token generated");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// #Logout Route
app.post("/logout", (req, res) => {
  // Invalidate the token on the client side by removing it from local storage
  console.log("Logging out user");
  res.json({ message: "Logged out successfully" });
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
