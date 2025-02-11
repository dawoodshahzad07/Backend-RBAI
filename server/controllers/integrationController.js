const Integration = require('../models/integrationModel');

// Create Integration
exports.createIntegration = async (req, res) => {
  try {
    const { userId, serviceName, apiKey } = req.body;
    const integration = new Integration({ userId, serviceName, apiKey });
    await integration.save();
    res.status(201).json({ message: "Integration created successfully", integration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Integration
exports.getIntegration = async (req, res) => {
  try {
    const integration = await Integration.findById(req.params.id);
    if (!integration) {
      return res.status(404).json({ message: "Integration not found" });
    }
    res.status(200).json(integration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Integration
exports.updateIntegration = async (req, res) => {
  try {
    const integration = await Integration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!integration) {
      return res.status(404).json({ message: "Integration not found" });
    }
    res.status(200).json(integration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Integration
exports.deleteIntegration = async (req, res) => {
  try {
    const integration = await Integration.findByIdAndDelete(req.params.id);
    if (!integration) {
      return res.status(404).json({ message: "Integration not found" });
    }
    res.status(200).json({ message: "Integration deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 