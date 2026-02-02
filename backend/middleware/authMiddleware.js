import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//#NOTE No need to call dotenv.config() here because it's already loaded in app.js

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findById(decoded.userId).select('-password');
    console.log('User Object:', user);

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    req.user = user;
    console.log('Authenticated User:', req.user);
    next();
  } catch (err) {
    next(err); // Pass the error to the centralized error handler
  }
};

export default authenticateToken;
