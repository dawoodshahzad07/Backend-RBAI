// productValidator.js
const Joi = require("joi");

// Schema for adding a new product
const addProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Product name is required.",
        "string.min": "Product name must be at least 3 characters.",
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Price must be a number.",
        "number.positive": "Price must be greater than zero.",
    }),
    description: Joi.string().optional(),
    category: Joi.string().required().messages({
        "string.empty": "Category is required.",
    }),
    stock: Joi.number().integer().min(0).required().messages({
        "number.base": "Stock must be a number.",
        "number.min": "Stock cannot be negative.",
    }),
});

module.exports = {
    addProductSchema,
};
