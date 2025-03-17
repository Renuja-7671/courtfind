const db = require('../config/db'); // MySQL connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.changePassword = async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
   

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch user from database
    const sql = 'SELECT password FROM users WHERE userId = ?';
    db.query(sql, [userId], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE userId = ?';
        db.query(updateSql, [hashedPassword, userId], (err, result) => {
            if (err) return res.status(500).json({ message: "Error updating password" });

            res.json({ message: "Password updated successfully" });
        });
    });
};


exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Owner Dashboard", user: req.user });
};

exports.manageCourts = (req, res) => {
    res.json({ message: "Owner managing courts" });
};

// Get Owner Profile
exports.getOwnerProfile = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        console.log("The ID of the user: ", ownerId);
        User.getOwnerProfile(ownerId, async (err, results) =>{
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Profile not found" });
            }
            const profile = results[0];
            console.log("The profile data: ", profile);
            res.json(profile);
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};

// Update Owner Profile
exports.updateOwnerProfile = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const profileData = req.body;
        console.log("The profile data: ", profileData);
        User.updateOwnerProfile(ownerId, profileData, (err, results) =>{
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.json({ message: "Profile updated successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};

// Upload Profile Image
exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const imageUrl = `/uploads/${req.file.filename}`; // Store relative path
        const userId = req.user.userId; // Extract from auth token

        const response = await User.updateProfileImage(userId, imageUrl);
        res.json({ message: response.message, imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Error uploading profile image", error });
    }
};

// Get Profile Image
exports.getProfileImage = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("The ID of the user for fetching the image: ", userId);
        User.getProfileImage(userId, async (err, results) =>{
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Profile image not found" });
            }
            const imageUrl = results[0].profileImage;
            console.log("The image URL: ", imageUrl);
            res.json(imageUrl);
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile image", error });
    }
};
