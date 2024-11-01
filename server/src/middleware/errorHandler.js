module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
  
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
  
    res.status(500).json({ message: 'Something went wrong' });


    if (err.name === 'ValidationError') {
      return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: Object.values(err.errors).map(error => error.message)
      });
  }

  res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
  
  };