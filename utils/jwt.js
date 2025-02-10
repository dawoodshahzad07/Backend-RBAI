// jwt.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

/**
 * Generate a JWT token.
 * @param {Object} payload - Data to include in the token
 * @param {String} expiresIn - Token expiration time
 * @returns {String} - JWT token
 */
const generateToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

/**
 * Verify a JWT token.
 * @param {String} token - Token to verify
 * @returns {Object} - Decoded token data
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
