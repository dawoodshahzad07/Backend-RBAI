<<<<<<< HEAD
const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

=======
const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = mongoose.model('Integration', integrationSchema); 