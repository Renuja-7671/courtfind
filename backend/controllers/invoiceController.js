const db = require('../config/db');
const invoice = require('../models/invoicesModel'); // Assuming you have an invoice model
const PlayerBooking = require("../models/bookingModel");
const player = require("../models/playerModel");

exports.getPlayerInvoices = (req, res) => {
    const playerId = req.user.userId; // assuming 'req.user' is populated by auth middleware

    invoice.getBookingsByPlayerId(playerId, (err, results) => {
        if (err) {
            console.error("Error fetching player invoices:", err);
            return res.status(500).json({ error: "Failed to fetch invoices" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No invoice found" });
        }
        //console.log("These are the invoices: ", results);

        res.status(200).json(results);
    });
};
exports.getBookings = (req, res) => {
    const playerId = req.user.userId; // assuming 'req.user' is populated by auth middleware

    PlayerBooking.getBookingsByPlayerId(playerId, (err, results) => {
        if (err) {
            console.error("Error fetching player bookings:", err);
            return res.status(500).json({ error: "Failed to fetch bookings" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No booking found" });
        }
        console.log("These are the bookings: ", results);

        res.status(200).json(results);
    });
};
// Get Player Profile
exports.getPlayerProfile = async (req, res) => {
    try {
        const playerId = req.user.userId;
        console.log("The ID of the user: ", playerId);
        User.getOwnerProfile(playerId, async (err, results) =>{
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

// Update Player Profile
exports.updatePlayerProfile = async (req, res) => {
    try {
        const playerId = req.user.userId;
        const profileData = req.body;
        //console.log("The profile data: ", profileData);
        User.updateOwnerProfile(playerId, profileData, (err, results) =>{
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
        console.log("The came file is: ",req.file);

        const imageUrl = `/uploads/player/${req.file.filename}`; // Store relative path
        const userId = req.user.userId; // Extract from auth token
        console.log("The image url now is:", imageUrl);

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
