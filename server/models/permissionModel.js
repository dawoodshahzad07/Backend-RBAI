const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: [{ type: String, enum: ['read', 'write', 'admin'], required: true }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Permission', permissionSchema);
