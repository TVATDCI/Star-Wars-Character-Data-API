import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;

// Next, I am going jump and create an auth route inside app.js. This route will be responsible for authenticating users. I split it when i have more time and more routes to create.
