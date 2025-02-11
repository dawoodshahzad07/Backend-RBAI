const AiAgent = require('../models/aiAgentModel');

// Create AI Agent
exports.createAiAgent = async (req, res) => {
  try {
    const { name, script, voiceFile } = req.body;

    const aiAgent = new AiAgent({ name, script, voiceFile });
    await aiAgent.save();

    res.status(201).json({ message: "AI Agent created successfully", aiAgent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get AI Agent
exports.getAiAgent = async (req, res) => {
  try {
    const aiAgent = await AiAgent.findById(req.params.id);
    if (!aiAgent) {
      return res.status(404).json({ message: "AI Agent not found" });
    }
    res.status(200).json(aiAgent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update AI Agent
exports.updateAiAgent = async (req, res) => {
  try {
    const aiAgent = await AiAgent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aiAgent) {
      return res.status(404).json({ message: "AI Agent not found" });
    }
    res.status(200).json(aiAgent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete AI Agent
exports.deleteAiAgent = async (req, res) => {
  try {
    const aiAgent = await AiAgent.findByIdAndDelete(req.params.id);
    if (!aiAgent) {
      return res.status(404).json({ message: "AI Agent not found" });
    }
    res.status(200).json({ message: "AI Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
