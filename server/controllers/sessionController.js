const Session = require('../models/sessionModel');

// Create Session
exports.createSession = async (req, res) => {
  try {
    const { userId, sessionData, startTime, endTime } = req.body;

    const session = new Session({ userId, sessionData, startTime, endTime });
    await session.save();

    res.status(201).json({ message: "Session created successfully", session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Session by ID
exports.getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Sessions by User ID
exports.getSessionsByUserId = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.params.userId });
    if (sessions.length === 0) {
      return res.status(404).json({ message: "No sessions found" });
    }
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Session
exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Session
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
