const mongoose = require('mongoose');

const extraMinutesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  extraMinutes: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  expirationDate: { type: Date, required: true },
});

module.exports = mongoose.model('ExtraMinutes', extraMinutesSchema);
