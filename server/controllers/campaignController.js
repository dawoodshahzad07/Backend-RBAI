const Campaign = require('../models/campaignModel');

// Create Campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const campaign = new Campaign({ name, description, startDate, endDate });
    await campaign.save();
    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Campaign
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Campaign
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 