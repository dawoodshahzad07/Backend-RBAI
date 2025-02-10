const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionData: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
