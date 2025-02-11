// userValidator.js
const Joi = require("joi");

// Schema for user registration validation
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 3 characters.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be valid.",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 8 characters.",
    }),
});

// Schema for user login validation
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email must be valid.",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required.",
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
};
