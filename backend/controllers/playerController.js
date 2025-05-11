const PlayerBooking = require("../models/bookingModel");

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
//     exports.getPlayerProfile = (req, res) => {
//     const playerId = req.user.id;

//     const query = "SELECT name, profile_image FROM players WHERE id = ?";
//     db.query(query, [playerId], (err, results) => {
//         if (err) {
//             console.error("Error fetching player profile:", err);
//             return res.status(500).json({ message: "Server error" });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: "Player not found" });
//         }

//         res.status(200).json(results[0]);
//     });
// };
