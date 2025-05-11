const db = require("../config/db");

const PlayerBooking = {
    getBookingsByPlayerId: (playerId, callback) => {
        const query = "SELECT a.name, b.booking_date, b.start_time, b.end_time, b.status, a.image_url FROM bookings b JOIN arenas a ON b.arenaId = a.arenaId WHERE b.playerId = ?;";
        db.query(query, [playerId], callback);
    }
};

module.exports = PlayerBooking;
