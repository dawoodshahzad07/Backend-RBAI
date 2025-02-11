const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['basic', 'premium', 'enterprise'], required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  paymentDate: { type: Date, default: Date.now },
  nextBillingDate: { type: Date, required: true },
});

module.exports = mongoose.model('Billing', billingSchema);
