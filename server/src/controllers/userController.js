const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, age } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, 
      { firstName, lastName, bio, age },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};


