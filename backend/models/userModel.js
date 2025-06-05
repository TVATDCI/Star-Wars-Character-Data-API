import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" }, // Optional name field. It can be updated from frontend
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Password should be hashed before saving to the database
  bio: { type: String, default: "" }, // Optional bio field
  location: { type: String, default: "" }, // Optional location field
  avatar: { type: String, default: "" }, // Optional avatar field
  // This field can be used to store the URL of the user's avatar image
  createdAt: { type: Date, default: Date.now }, // Timestamp of user creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp of last update
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;

// Next, I am going jump and create an auth route inside app.js. This route will be responsible for authenticating users. I split it when i have more time and more routes to create.
