require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middleware/errorHandler');
const abuseRoutes = require('./routes/abuseRoutes');
const passport = require('./config/passport');
const session = require('express-session');

const path = require('path')
const fs = require('fs');
const app = express();

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', abuseRoutes);

app.use(session({
  secret: process.env.JWT_SECRET || '083d04c709c5671bdfe9921f064bbea015ba53690f8cbb1867008257631d793b3dd6733013f0c7629d0e42b5152edf596f1f17aaf28395975c5ac7f0b2ee4683bbab87cc954367461ad13279cb5a2aeb79542a7f2675e31fe3cde1e294905c9e4fa74adaad48fd5c1a391c090b0fa0d0b606d5b37505c1698f34959aba5b265c0ae755447687d4d3a5972ca176b35aac14c0c2999dd5115dfa32332d55a837cf74a53742c4544f19eda6b53be6a546edaf323bc079115da96c4259e002f70dd8809d7e58a037af13bcdf71448577790c077087e9a5f14226db5af60f63e94ba55a40f8b34f7e4ebb6a759f4ffa99d01cbd3f47f5ade069da71402cac259ea9d4',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// Error handling middleware
app.use(errorHandler);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;