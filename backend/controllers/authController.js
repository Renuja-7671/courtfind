const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { role, firstName, lastName, mobile, country, province, zip, address, email, password } = req.body;

    if (!role || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Role, first name, last name, email, and password are required' });
    }

    try {
        User.findByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            User.createUser([role, firstName, lastName, mobile, country, province, zip, address, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error registering user', error: err });

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Received Email:", email);

    try {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        
        console.log("Rows found:", rows);

        if (!Array.isArray(rows) || rows.length === 0) {
            console.log("No user found with this email:", email);
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = bcrypt.hashSync(resetToken, 10);
        const expiryTime = new Date(Date.now() + 3600000); // 1 hour expiration

        // Save token in the database
        await db.execute(
            "UPDATE users SET resetToken = ?, resetTokenExpires = ? WHERE email = ?",
            [hashedToken, expiryTime, email]
        );

        // Send reset email
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="${resetUrl}">${resetUrl}</a>
                   <p>This link expires in 1 hour.</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Reset email sent to:", email);
        res.json({ message: "Password reset link sent to your email" });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const [users] = await db.execute("SELECT * FROM users WHERE resetToken = ? AND resetTokenExpires > NOW()", [token]);

        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await db.execute(
            "UPDATE users SET password = ?, resetToken = NULL, resetTokenExpires = NULL WHERE id = ?",
            [hashedPassword, users[0].id]
        );

        res.json({ message: "Password reset successful!" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
