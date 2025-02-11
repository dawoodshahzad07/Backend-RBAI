// paymentService.js
const Payment = require("../models/paymentModel");
const logger = require("../utils/logger");

/**
 * Create a payment record
 * @param {Object} paymentData - Payment details
 * @returns {Object} - Created payment record
 */
const createPayment = async (paymentData) => {
    try {
        if (!paymentData || !paymentData.amount || !paymentData.currency) {
            logger.warn("Invalid payment data provided");
            throw new Error("Invalid payment data");
        }
        const payment = new Payment(paymentData);
        await payment.save();
        logger.info(`New payment created: ${payment._id}`);
        return payment;
    } catch (error) {
        logger.error(`Error creating payment: ${error.message}`, { stack: error.stack });
        throw new Error("Failed to create payment");
    }
};

/**
 * Process a refund for a specific payment
 * @param {String} paymentId - Payment ID to refund
 * @returns {Object} - Refund details
 */
const processRefund = async (paymentId) => {
    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            throw new Error("Payment not found");
        }

        // Simulate refund logic here
        payment.status = "refunded";
        await payment.save();

        return { success: true, message: "Refund processed successfully" };
    } catch (error) {
        logger.error("Error processing refund:", error);
        throw new Error("Failed to process refund");
    }
};

/**
 * Get payment details
 * @param {String} paymentId - Payment ID to retrieve
 * @returns {Object} - Payment details
 */
const getPaymentDetails = async (paymentId) => {
    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            throw new Error("Payment not found");
        }
        return payment;
    } catch (error) {
        logger.error("Error retrieving payment details:", error);
        throw new Error("Failed to retrieve payment details");
    }
};

module.exports = {
    createPayment,
    processRefund,
    getPaymentDetails,
};
