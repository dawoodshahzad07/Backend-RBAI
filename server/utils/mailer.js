// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email.
 * @param {String} to - Recipient email address
 * @param {String} subject - Email subject
 * @param {String} html - Email content in HTML format
 * @returns {Object} - Email sending result
 */
const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        throw new Error("Failed to send email: " + error.message);
    }
};

module.exports = {
    sendEmail,
};
