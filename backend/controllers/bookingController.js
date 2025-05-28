const PlayerBooking = require("../models/bookingModel");

exports.setABooking = async (req, res) => {
    const { courtId, booking_date, start_time, end_time, total_price, payment_status, status } = req.body;
    const playerId = req.user.userId;
    const ownerId = req.body.owner_id; 
    const arenaId = req.body.arenaId; 
    console.log("Booking data received:", req.body); // Debugging line
    console.log("Player ID:", playerId); // Debugging line

    if (!courtId || !booking_date || !start_time || !end_time || !total_price || !payment_status || !status || !ownerId || !arenaId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        PlayerBooking.setABooking({ playerId, courtId, booking_date, start_time, end_time, total_price, payment_status, status, ownerId, arenaId }, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "Booking created successfully", booking: results });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}