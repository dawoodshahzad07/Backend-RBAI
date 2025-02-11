const Analytics = require('../models/analyticsModel');

// Create Analytics Data
exports.createAnalyticsData = async (req, res) => {
  try {
    const { userId, callDuration, callOutcome } = req.body;

    const analyticsData = new Analytics({ userId, callDuration, callOutcome });
    await analyticsData.save();

    res.status(201).json({ message: "Analytics data saved successfully", analyticsData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Analytics Data
exports.getAnalyticsData = async (req, res) => {
  try {
    const analytics = await Analytics.find({ userId: req.params.userId });
    if (analytics.length === 0) {
      return res.status(404).json({ message: "No analytics data found" });
    }
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
