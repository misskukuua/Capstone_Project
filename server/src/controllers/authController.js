const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, age } = req.body;
    const user = new User({ username, email, password, age });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, age: user.age, role: user.role } });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, age: user.age, role: user.role } });
  } catch (error) {
    next(error);
  }
};
// In authController.js, update the Google OAuth callback:
exports.googleCallback = async (req, res) => {
  try {
    const { email } = req.user;
    let user = await User.findOne({ email });
    
    if (!user) {
      // Generate username for new Google users
      const username = generateUsername(email);
      user = new User({
        email,
        username,
        googleId: req.user.googleId,
        // Other fields from Google profile
      });
      await user.save();
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};
exports.logout = (req, res) => {
  //logout
  
  res.json({ message: 'Logged out successfully' });
};