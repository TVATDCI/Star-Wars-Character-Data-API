import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Environment loading is now handled in server.js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🟥 MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
