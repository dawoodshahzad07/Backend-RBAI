<<<<<<< HEAD
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

=======
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = mongoose.model('Campaign', campaignSchema); 