// index.js
const { registerSchema, loginSchema } = require("./userValidator");
const { addProductSchema } = require("./productValidator");
const { placeOrderSchema } = require("./orderValidator");
const { requestPasswordResetSchema, resetPasswordSchema } = require("./authValidator");

module.exports = {
    userValidator: {
        registerSchema,
        loginSchema,
    },
    productValidator: {
        addProductSchema,
    },
    orderValidator: {
        placeOrderSchema,
    },
    authValidator: {
        requestPasswordResetSchema,
        resetPasswordSchema,
    },
};
