// userService.js
const User = require("../models/userModel");
const logger = require("../utils/logger");

/**
 * Create a new user
 * @param {Object} userData - User details
 * @returns {Object} - Created user
 */
const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        logger.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};

/**
 * Update a user's profile
 * @param {String} userId - User ID to update
 * @param {Object} updateData - Profile update details
 * @returns {Object} - Updated user profile
 */
const updateUserProfile = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        logger.error("Error updating user profile:", error);
        throw new Error("Failed to update user profile");
    }
};

/**
 * Delete a user's account
 * @param {String} userId - User ID to delete
 * @returns {Boolean} - Deletion status
 */
const deleteUserAccount = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return true;
    } catch (error) {
        logger.error("Error deleting user account:", error);
        throw new Error("Failed to delete user account");
    }
};

module.exports = {
    createUser,
    updateUserProfile,
    deleteUserAccount,
};
