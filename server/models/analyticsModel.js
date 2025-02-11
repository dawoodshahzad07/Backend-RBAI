const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
<<<<<<< HEAD
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalDials: {
    type: Number,
    default: 0
  },
  totalMinutes: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
=======
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  metrics: {
    totalCalls: { type: Number, default: 0 },
    successfulCalls: { type: Number, default: 0 },
    failedCalls: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
});

module.exports = mongoose.model('Analytics', analyticsSchema);
