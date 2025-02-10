const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Routes
router.post('/', billingController.createOrUpdateBilling);
router.get('/:userId', billingController.getBillingData);
router.put('/:userId', billingController.updateBillingData);
router.delete('/:userId', billingController.deleteBillingData);

module.exports = router;
