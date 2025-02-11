const ExtraMinutes = require('../models/extraMinutesModel');

// Add Extra Minutes
exports.addExtraMinutes = async (req, res) => {
  try {
    const { userId, minutes } = req.body;

    const extraMinutes = new ExtraMinutes({ userId, minutes });
    await extraMinutes.save();

    res.status(201).json({ message: "Extra minutes added successfully", extraMinutes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Extra Minutes
exports.getExtraMinutes = async (req, res) => {
  try {
    const extraMinutes = await ExtraMinutes.find({ userId: req.params.userId });
    if (extraMinutes.length === 0) {
      return res.status(404).json({ message: "No extra minutes found" });
    }
    res.status(200).json(extraMinutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
