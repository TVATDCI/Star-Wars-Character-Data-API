import express from "express";
import dotenv from "dotenv";
// Import cors to allow requests from any origin
import cors from "cors";
// Import the connectDB function from the db.js file
import connectDB from "./config/db.js";
// Import the character routes from the routes folder
import characterRoutes from "./routes/characterRoutes.js";

dotenv.config();

connectDB();
// Initialize middleware
const app = express();
// Also use the cors middleware for cross-origin requests.In this case, frontend requests!
app.use(cors());

// Middleware to parse the body but only with tester like Postman or others
app.use(express.json());
// CORS middleware to allow requests from any origin eg. frontend!
app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => {
  res.send("API is running ...🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});
