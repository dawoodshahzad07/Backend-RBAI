const Script = require('../models/scriptModel');

// Create Script
exports.createScript = async (req, res) => {
  try {
    const { userId, scriptContent } = req.body;

    const script = new Script({ userId, scriptContent });
    await script.save();

    res.status(201).json({ message: "Script created successfully", script });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Script
exports.getScript = async (req, res) => {
  try {
    const script = await Script.findOne({ userId: req.params.userId });
    if (!script) {
      return res.status(404).json({ message: "Script not found" });
    }
    res.status(200).json(script);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Script
exports.updateScript = async (req, res) => {
  try {
    const script = await Script.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!script) {
      return res.status(404).json({ message: "Script not found" });
    }
    res.status(200).json(script);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Script
exports.deleteScript = async (req, res) => {
  try {
    const script = await Script.findByIdAndDelete(req.params.id);
    if (!script) {
      return res.status(404).json({ message: "Script not found" });
    }
    res.status(200).json({ message: "Script deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
