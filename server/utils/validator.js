// validator.js
const validator = require("validator");

/**
 * Check if an email address is valid.
 * @param {String} email - Email to validate
 * @returns {Boolean} - True if valid, otherwise false
 */
const isValidEmail = (email) => {
    return validator.isEmail(email);
};

/**
 * Check if a string is a valid phone number.
 * @param {String} phone - Phone number to validate
 * @returns {Boolean} - True if valid, otherwise false
 */
const isValidPhone = (phone) => {
    return validator.isMobilePhone(phone, "any");
};

/**
 * Sanitize input to prevent XSS attacks.
 * @param {String} input - User input to sanitize
 * @returns {String} - Sanitized input
 */
const sanitizeInput = (input) => {
    return validator.escape(input);
};

module.exports = {
    isValidEmail,
    isValidPhone,
    sanitizeInput,
};
