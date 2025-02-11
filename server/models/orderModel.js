<<<<<<< HEAD
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

=======
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = Order;