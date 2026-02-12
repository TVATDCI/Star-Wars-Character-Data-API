import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' }, // Optional name field
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
    bio: { type: String, default: '' }, // Optional bio field
    location: { type: String, default: '' }, // Optional location field
    avatar: {
      type: String,
      default: 'https://avatars.githubusercontent.com/u/165805964?v=4', // Default avatar URL
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    refreshToken: {
      type: String,
      default: null,
    }, // revocation field for refresh tokens
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
