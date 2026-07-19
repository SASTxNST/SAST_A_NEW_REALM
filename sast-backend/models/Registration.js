const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[0-9\s\-()]{7,20}$/, 'Please provide a valid phone number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  team: {
    type: String,
    required: [true, 'Please select a team'],
    enum: {
      values: [
        'Tech team',
        'R&D team',
        'Product team',
        'Design team',
        'Electronics team',
        'Content creation team'
      ],
      message: '{VALUE} is not a valid team'
    }
  },
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
