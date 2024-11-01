const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  // Google OAuth callback
  router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Updated redirect URL to match your client directory structure
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    }
  );
  
  module.exports = router;