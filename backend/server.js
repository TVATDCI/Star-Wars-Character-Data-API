import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

// 1. Environment Configuration
// We use the robust logic we discussed to find the .env file in root or backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';

// Try loading specific env file first, fallback to standard .env
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Connect to Database
connectDB();

// 3. Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${env} mode on port ${PORT}
  👉 http://localhost:${PORT}
  `);
});
