const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Create Campaign
router.post('/', campaignController.createCampaign);

// Get Campaign
router.get('/:id', campaignController.getCampaign);

// Update Campaign
router.put('/:id', campaignController.updateCampaign);

// Delete Campaign
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router; 