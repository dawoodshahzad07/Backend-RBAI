const mongoose = require('mongoose');

const scriptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scriptName: { type: String, required: true },
  scriptContent: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Script', scriptSchema);
