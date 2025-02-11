<<<<<<< HEAD
const Recording = require('../models/recordingModel');
const { openAI } = require('../config/apiConfig');

// Create Recording
exports.createRecording = async (req, res) => {
  try {
    const { userId, callId, recordingUrl, duration } = req.body;

    const recording = new Recording({ userId, callId, recordingUrl, duration });
    await recording.save();

    res.status(201).json({ message: "Recording created successfully", recording });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Recording
exports.getRecording = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(200).json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Recording
exports.updateRecording = async (req, res) => {
  try {
    const recording = await Recording.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(200).json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Recording
exports.deleteRecording = async (req, res) => {
  try {
    const recording = await Recording.findByIdAndDelete(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(200).json({ message: "Recording deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Transcribe Recording
exports.transcribeRecording = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }

    const response = await openAI.post('/audio/transcriptions', {
      file: recording.recordingUrl,
      model: "whisper-1"
    });

    res.status(200).json({ transcription: response.data.text });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
=======
const Recording = require('../models/recordingModel');
const { openAI } = require('../config/apiConfig');

// Create Recording
exports.createRecording = async (req, res) => {
  try {
    const { userId, callId, recordingUrl, duration } = req.body;

    const recording = new Recording({ userId, callId, recordingUrl, duration });
    await recording.save();

    res.status(201).json({ message: "Recording created successfully", recording });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Recording
exports.getRecording = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(200).json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Recording
exports.updateRecording = async (req, res) => {
  try {
    const recording = await Recording.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(200).json(recording);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Recording
exports.deleteRecording = async (req, res) => {
  try {
    const recording = await Recording.findByIdAndDelete(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(200).json({ message: "Recording deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Transcribe Recording
exports.transcribeRecording = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }

    const response = await openAI.post('/audio/transcriptions', {
      file: recording.recordingUrl,
      model: "whisper-1"
    });

    res.status(200).json({ transcription: response.data.text });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
}; 