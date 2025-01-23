import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Import the character routes from the routes folder
import characterRoutes from "./routes/characterRoutes.js";

dotenv.config();

connectDB();
// Initialize middleware
const app = express();

// Middleware to parse the body but only with tester like Postman or others
app.use(express.json());
// CORS middleware to allow requests from any origin eg. frontend!
app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => {
  res.send("API is running...🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});
