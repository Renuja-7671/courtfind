const db = require("../config/db");

const PlayerBooking = {
    getBookingsByPlayerId: (playerId, callback) => {
        const query = "SELECT a.name, b.booking_date, b.start_time, b.end_time, b.status, a.image_url FROM bookings b JOIN arenas a ON b.arenaId = a.arenaId WHERE b.playerId = ?;";
        db.query(query, [playerId], callback);
    },
    setABooking: (bookingData, callback) => {
        const { playerId, courtId, booking_date, start_time, end_time, total_price, payment_status, status, ownerId, arenaId } = bookingData;
        const query = "INSERT INTO bookings (playerId, courtId, booking_date, start_time, end_time, total_price, payment_status, status, ownerId, arenaId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        db.query(query, [playerId, courtId, booking_date, start_time, end_time, total_price, payment_status, status, ownerId, arenaId], callback);
    },
    getBookingTimesByCourtId: (courtId, bookingDate, callback) => {
        const query = "SELECT start_time, end_time FROM bookings WHERE courtId = ? AND booking_date = ?;";
        db.query(query, [courtId, bookingDate], callback);
    },
};

module.exports = PlayerBooking;
