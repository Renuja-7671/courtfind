const db = require("../config/db");

const PlayerBooking = {
    getBookingsByPlayerId: (playerId, callback) => {
        const query = "SELECT * FROM bookings WHERE player_id = ?";
        db.query(query, [playerId], callback);
    }
};

module.exports = PlayerBooking;
