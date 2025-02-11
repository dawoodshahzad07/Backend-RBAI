<<<<<<< HEAD
const express = require('express');
const router = express.Router();

// Controller placeholders
const orderController = require('../controllers/orderController');

// Routes
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

=======
const express = require('express');
const router = express.Router();

// Controller placeholders
const orderController = require('../controllers/orderController');

// Routes
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = router;