import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" }, // Optional name field. It can be updated from frontend
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Password should be hashed before saving to the database
    bio: { type: String, default: "" }, // Optional bio field
    location: { type: String, default: "" }, // Optional location field
    avatar: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/165805964?v=4",
    }, // Optional avatar field (my github avatar URL)
    // This field can be used to store the URL of the user's avatar image
    createdAt: { type: Date, default: Date.now }, // Timestamp of user creation
    updatedAt: { type: Date, default: Date.now }, // Timestamp of last update
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true } // Add createdAt and updatedAt fields automatically
);

const User = mongoose.model("User", userSchema);

export default User;

// Next, I am going jump and create an auth route inside app.js. This route will be responsible for authenticating users. I split it when i have more time and more routes to create.

// Full version of the user model with regex to check the valid email, hashed password before saving, compare password and time stamp for createdAt and updatedAt fields, and role-based access control.

{
  /*
    import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" }, // Optional name field
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regex for email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: { type: String, required: true }, // Password should be hashed before saving
    bio: { type: String, default: "" }, // Optional bio field
    location: { type: String, default: "" }, // Optional location field
    avatar: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/165805964?v=4", // Default avatar URL
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
     */
}
