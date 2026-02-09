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
        default: null
  }, // revocation field for refresh tokens
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Check: if the hook run
  console.log('--- Model: Pre-save hook started ---');

  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    console.log('Salt generated');
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    // No next() call here—the async function resolving tells Mongoose to proceed.
  } catch (err) {
    console.error('Error in Model Pre-save:', err);
    // Re-throw the error so it's caught by controller's catch block
    throw err;
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
