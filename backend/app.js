import express from "express";
import dotenv from "dotenv";
// Import cors to allow requests from any origin
import cors from "cors";
// Import the connectDB function from the db.js file
import connectDB from "./config/db.js";
// Import the character routes from the routes folder - admins only!
import characterRoutes from "./routes/characterRoutes.js";
// Add models/userModel.js to extend register and auth routes with user registration and authentication
// Import protect character routes from middleware/authMiddleware.js
import authenticateToken from "./middleware/authMiddleware.js";
// Import the requiredAdmin middleware to protect routes
import requireAdmin from "./middleware/requireAdmin.js";
// Import publicRoutes routes for public access
import publicRoutes from "./routes/publicRoutes.js";
// Import the User model for user registration and authentication
import User from "./models/userModel.js";
// npm install jsonwebtoken for token generation
import jwt from "jsonwebtoken";

dotenv.config();

connectDB();
//#Initialize middleware
const app = express();
//#Also use the cors middleware for cross-origin requests.In this case, frontend requests!
app.use(cors());

// Middleware to parse the body but only with tester like Postman or others
app.use(express.json());
// CORS middleware to allow requests from any origin eg. frontend!

// Create register route. This route will be responsible for registering users.
//#Register a new user
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  console.log("Registering user:", email, password, role);
  console.log("Request body:", req.body);

  if (!email || !password) {
    console.log("Email or password is missing");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const newUser = new User({
      email,
      password,
      role: role || "user", // ✅ Correct fallback here
    });

    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: "Email already exists" });
  }
});

//#Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  //BUG: Check if user is found
  console.log("Logging in user HIT");
  console.log("Request body:", req.body);
  //BUG: Check if user is found in the database by token
  if (user) {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    //BUG: Return the token if user is found
    console.log("User logged in successfully, token generated");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// #Logout Route
app.post("/logout", (req, res) => {
  // Clear the token from the client-side storage
  console.log("Logout user HIT");
  // Send a response indicating successful logout
  res.json({ message: "Logged out successfully" });
});
//#Protect character routes with authentication middleware
app.use("/api/characters", authenticateToken, characterRoutes);
//NOTE: This middleware function is a standalone. Al logic is inside the function.

//#The character routes V1
// app.use("/api/characters", characterRoutes);
// V1 is commented out. The V2 is the one with authentication middleware.

//#Public routes for public access V2
app.use("/api/public", publicRoutes);

//# server health check/fallback route
app.get("/", (req, res) => {
  res.send("API is running ...🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});
