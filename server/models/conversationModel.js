const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aiAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AiAgent', required: true },
  conversationData: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', conversationSchema);
