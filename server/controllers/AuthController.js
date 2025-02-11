const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    console.log("Register request received");
    try {
        const { username, email, password } = req.body;
        console.log("Request body:", { username, email, password });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create user with plaintext password - model will handle hashing
        const user = await User.create({
            username,
            email,
            password // Model's pre-save hook will hash this
        });

        console.log("User registered successfully:", user);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        console.error("Error in register controller:", err);
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            console.warn(`Failed login attempt for email: ${email}`);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log('Stored hash:', user.password);
        console.log('Input password:', password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.warn(`Failed login attempt for email: ${email}`);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check if account is locked
        if (user.failedLoginAttempts >= 5) {
            const lockTime = new Date(user.lockUntil);
            if (lockTime > new Date()) {
                const remainingMinutes = Math.ceil((lockTime - new Date()) / 60000);
                return res.status(403).json({ 
                    message: `Account locked. Try again in ${remainingMinutes} minutes`
                });
            }
        }

        // Reset failed attempts on successful login
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        // If we get here, login is successful
        console.log(`Successful login for user: ${user.email}`);

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log("User logged in successfully:", user);
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error" });
    }
};

const refreshToken = async (req, res) => {
    console.log("Refresh token request received");
    try {
        const { token } = req.body;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Generate a new token
        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Token refreshed successfully");
        res.status(200).json({ message: "Token refreshed successfully", token: newToken });
    } catch (err) {
        console.error("Error in refreshToken controller:", err);
        res.status(500).json({ message: err.message });
    }
};

const logout = async (req, res) => {
    console.log("Logout request received");
    try {
        // Invalidate the token (optional: implement token blacklist or use short-lived tokens)
        console.log("User logged out successfully");
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Error in logout controller:", err);
        res.status(500).json({ message: err.message });
    }
};

console.log("JWT Secret:", process.env.JWT_SECRET);

const token = jwt.sign({ test: "payload" }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log("Generated Token:", token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded Token:", decoded);

module.exports = {
    register,
    login,
    refreshToken,
    logout
}; 