import { login, register } from '../models/authModel.js';
import { generateToken } from '../utils/auth.js';
import User from '../models/User.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const registerUser = async (req, res) => {
  try {
    const registeredUser = await register(req.body);
    const token = generateToken(registeredUser);

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      data: {
        _id: registeredUser._id,
        email: registeredUser.email,
        name: registeredUser.name,
        isAdmin: registeredUser.isAdmin,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await login(req.body);
    const token = generateToken(user);

    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', cookieOptions);
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};