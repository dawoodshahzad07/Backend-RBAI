// authValidator.js
const Joi = require("joi");

// Schema for requesting a password reset
const requestPasswordResetSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be valid.",
    }),
});

// Schema for resetting a password
const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        "string.empty": "Reset token is required.",
    }),
    newPassword: Joi.string().min(8).required().messages({
        "string.empty": "New password is required.",
        "string.min": "New password must be at least 8 characters.",
    }),
});

module.exports = {
    requestPasswordResetSchema,
    resetPasswordSchema,
};
