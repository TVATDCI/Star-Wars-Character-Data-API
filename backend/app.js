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
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide an email and password" });
  }

  try {
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
});

// Create login route. This route will be responsible for authenticating users.
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware to authenticate the token:
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next(); // Don't forget to call next to pass to the next middleware
  });
};

// Here begins the character routes V1
app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => {
  res.send("API is running ...🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});
