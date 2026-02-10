import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel.js';

// Generate a short-lived access token
const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  }); // token expires in 15 minutes for better security. The client can use the refresh token to get a new access token without re-authenticating.
};

// Generate a long-lived refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  }); // token expires in 7 days for refresh token.
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = new User({
      email,
      password,
      role: role || 'user',
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Store the refresh token in the database for revocation checks
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    // Save the hashed refresh token to the user's record
    user.refreshToken = refreshTokenHash;
    await user.save();

    // Set the refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Now send the access token in the response body to be used by the client for authenticated requests in (localStorage)
    res.json({
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    refresh access token
// @route   POST /api/v1/auth/refresh
// @access  Public (but requires a valid refresh token)
const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401);
      throw new Error('No refresh token provided');
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      res.status(403);
      throw new Error('Invalid refresh token');
    }

    // Find the user and verify the refresh token against the stored hash (using  token)
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(403);
      throw new Error('User not found');
    }

    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    if (refreshTokenHash !== user.refreshToken) {
      // Token mismatch - possible token reuse attack! Revoke all refresh tokens for this user.

      user.refreshToken = null; // Clear the stored refresh token
      await user.save();

      (res.clearCookies('refreshToken'), { httpOnly: true });
      res.status(403);
      throw new Error(
        'Token reuse detected. All refresh tokens revoked. Please log in again.'
      );
    }

    // Generate a new access token (token rotation)
    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    // Update the stored refresh token hash in the database
    const newRefreshTokenHash = crypto
      .createHash('sha256')
      .update(newRefreshToken)
      .digest('hex');

    user.refreshToken = newRefreshTokenHash;
    await user.save();

    // Set the new refresh token as an HTTP-only cookie - AGAIN!
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send the new access token in the response body
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user & clear token
// @route   POST /api/v1/auth/logout
// @access  Private
const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // verify and clear the refresh token from the database
      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
      } catch (err) {
        // If token is invalid, just clear the cookie
      }
    }

    // Clear HttpOnly cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, refreshAccessToken, logoutUser };
