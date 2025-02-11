<<<<<<< HEAD
const express = require('express');
const router = express.Router();

// Controller placeholders
const productController = require('../controllers/productController');

// Routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

=======
const express = require('express');
const router = express.Router();

// Controller placeholders
const productController = require('../controllers/productController');

// Routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = router;