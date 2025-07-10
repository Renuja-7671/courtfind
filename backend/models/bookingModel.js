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
    getIdOfLastBooking: (playerId, callback) => {
        const query = "SELECT bookingId FROM bookings WHERE playerId = ? ORDER BY bookingId DESC LIMIT 1;";
        db.query(query, [playerId], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                return callback(null, results[0].bookingId);
            } else {
                return callback(null, null); // No bookings found
            }
        });
    },
    getBookingDetailsForPayment: (bookingId, callback) => {
        const query = `
            SELECT b.bookingId, b.total_price, b.payment_status, b.ownerId, a.name AS arena_name, c.name AS court_name
            FROM bookings b
            JOIN arenas a ON b.arenaId = a.arenaId
            JOIN courts c ON b.courtId = c.courtId
            WHERE b.bookingId = ?;
        `;
        db.query(query, [bookingId], callback);
    }
};

module.exports = PlayerBooking;
