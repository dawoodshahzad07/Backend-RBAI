const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// Routes
router.post('/assign', permissionController.assignPermissions);
router.get('/:userId', permissionController.getPermissionsByUserId);

module.exports = router;
