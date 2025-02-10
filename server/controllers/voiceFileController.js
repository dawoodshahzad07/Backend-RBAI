const VoiceFile = require('../models/voiceFileModel');

// Upload Voice File
exports.uploadVoiceFile = async (req, res) => {
  try {
    const { userId, file } = req.body;

    const voiceFile = new VoiceFile({ userId, file });
    await voiceFile.save();

    res.status(201).json({ message: "Voice file uploaded successfully", voiceFile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Voice File
exports.getVoiceFile = async (req, res) => {
  try {
    const voiceFile = await VoiceFile.findOne({ userId: req.params.userId });
    if (!voiceFile) {
      return res.status(404).json({ message: "Voice file not found" });
    }
    res.status(200).json(voiceFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Voice File
exports.deleteVoiceFile = async (req, res) => {
  try {
    const voiceFile = await VoiceFile.findByIdAndDelete(req.params.id);
    if (!voiceFile) {
      return res.status(404).json({ message: "Voice file not found" });
    }
    res.status(200).json({ message: "Voice file deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
