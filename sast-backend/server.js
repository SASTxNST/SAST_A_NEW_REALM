require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 5837;


// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sast-club';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, email, team } = req.body;
    
    // Create new registration
    const newRegistration = new Registration({ name, phone, email, team });
    
    // Save to DB
    await newRegistration.save();
    
    // Success response
    res.status(201).json({
      success: true,
      message: 'Thanks ,our team will reach out to you soon and schedule an interview for you, please be prepared accordingly'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
