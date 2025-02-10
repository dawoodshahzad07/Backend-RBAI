const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  callId: {
    type: String,
    required: true
  },
  recordingUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recording', recordingSchema); 