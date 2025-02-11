const Permission = require('../models/permissionModel');

// Assign Permission
exports.assignPermission = async (req, res) => {
  try {
    const { userId, permissionLevel } = req.body;

    const permission = new Permission({ userId, permissionLevel });
    await permission.save();

    res.status(201).json({ message: "Permission assigned successfully", permission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({ userId: req.params.userId });
    if (permissions.length === 0) {
      return res.status(404).json({ message: "No permissions found" });
    }
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
