// subscriptionService.js
const Subscription = require("../models/subscriptionModel");
const logger = require("../utils/logger");

/**
 * Activate a subscription
 * @param {Object} subscriptionData - Subscription details
 * @returns {Object} - Created subscription
 */
const activateSubscription = async (subscriptionData) => {
    try {
        const subscription = new Subscription(subscriptionData);
        await subscription.save();
        return subscription;
    } catch (error) {
        logger.error("Error activating subscription:", error);
        throw new Error("Failed to activate subscription");
    }
};

/**
 * Update a subscription
 * @param {String} subscriptionId - Subscription ID to update
 * @param {Object} updateData - Data to update
 * @returns {Object} - Updated subscription
 */
const updateSubscription = async (subscriptionId, updateData) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            updateData,
            { new: true }
        );
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        return subscription;
    } catch (error) {
        logger.error("Error updating subscription:", error);
        throw new Error("Failed to update subscription");
    }
};

/**
 * Cancel a subscription
 * @param {String} subscriptionId - Subscription ID to cancel
 * @returns {Boolean} - Cancellation status
 */
const cancelSubscription = async (subscriptionId) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(subscriptionId);
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        return true;
    } catch (error) {
        logger.error("Error canceling subscription:", error);
        throw new Error("Failed to cancel subscription");
    }
};

module.exports = {
    activateSubscription,
    updateSubscription,
    cancelSubscription,
};
