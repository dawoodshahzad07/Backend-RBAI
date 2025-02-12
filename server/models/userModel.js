const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: function() { return this.status !== 'trial'; },
    minlength: 6,
    select: false
  },
  username: {
    type: String,
    required: function() { return this.status !== 'trial'; },
    unique: true,
    trim: true
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  plan: {
    type: String,
    enum: ['BUSINESS', 'AGENCY', 'AGENCY_PRO', 'AGENCY_VIP'],
    default: 'BUSINESS'
  },
  minutesUsed: {
    type: Number,
    default: 0
  },
  agentsAllowed: {
    type: Number,
    default: 1
  },
  contactsLimit: {
    type: Number,
    default: 10000
  },
  features: [String],
  planId: { type: String, enum: ['business', 'agency', 'agency-pro', 'agency-vip'] },
  trialStart: { type: Date, required: true },
  trialEnd: { type: Date, required: true },
  status: { type: String, enum: ['trial', 'active', 'inactive'], default: 'trial' },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  companyName: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    console.log('Hashing new password');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Add indexes for frequently queried fields
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: 1 });
userSchema.index({ plan: 1 });

module.exports = mongoose.model('User', userSchema);
