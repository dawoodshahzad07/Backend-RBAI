const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

module.exports = mongoose.model('Metadata', metadataSchema);
