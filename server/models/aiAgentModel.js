const mongoose = require('mongoose');

const aiAgentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  script: { type: String, required: true },
  voice: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AiAgent', aiAgentSchema);
