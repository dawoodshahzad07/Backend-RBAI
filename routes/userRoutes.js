const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Remove any undefined routes
// Only keep routes that reference existing controller functions
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Remove any POST routes that were using deleted controller functions
module.exports = router;
