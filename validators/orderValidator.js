// orderValidator.js
const Joi = require("joi");

// Schema for placing a new order
const placeOrderSchema = Joi.object({
    userId: Joi.string().required().messages({
        "string.empty": "User ID is required.",
    }),
    items: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string().required().messages({
                    "string.empty": "Product ID is required.",
                }),
                quantity: Joi.number().integer().min(1).required().messages({
                    "number.base": "Quantity must be a number.",
                    "number.min": "Quantity must be at least 1.",
                }),
            })
        )
        .min(1)
        .required()
        .messages({
            "array.min": "At least one item is required in the order.",
        }),
    totalAmount: Joi.number().positive().required().messages({
        "number.base": "Total amount must be a number.",
        "number.positive": "Total amount must be greater than zero.",
    }),
});

module.exports = {
    placeOrderSchema,
};
