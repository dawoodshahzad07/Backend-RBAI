<<<<<<< HEAD
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

=======
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

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = mongoose.model('Recording', recordingSchema); 