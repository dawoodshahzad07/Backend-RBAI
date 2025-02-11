const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['answered', 'no-answer', 'busy', 'failed'],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  outcome: {
    type: String,
    enum: ['success', 'follow-up', 'no-interest', 'callback'],
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Call', callSchema); 