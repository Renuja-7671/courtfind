const db = require('../config/db');

const Player = {
    getBookingsByPlayerId: (playerId, callback) => {
        const query = `
            SELECT a.name, b.booking_date, b.start_time, b.end_time, b.status, a.image_url
            FROM bookings b
            JOIN arenas a ON b.arenaId = a.arenaId
            WHERE b.playerId = ?;
        `;
        db.query(query, [playerId], callback);
    },

    getPlayerProfile: (playerId, callback) => {
        db.query("SELECT firstName, lastName, email, mobile, country, province, zip, address FROM users WHERE userId = ?", [playerId], callback);
    },

    updatePlayerProfile: (playerId, profileData, callback) => {
        const { firstName, lastName, mobile, country, province, zip, address } = profileData;
        db.query(
            "UPDATE users SET firstName = ?, lastName = ?, mobile = ?, country = ?, province = ?, zip = ?, address = ? WHERE userId = ?",
            [firstName, lastName, mobile, country, province, zip, address, playerId],
            callback
        );
    },

    updateProfileImage: async (userId, imageUrl) => {
        try {
            await db.execute("UPDATE users SET profileImage = ? WHERE userId = ?", [imageUrl, userId]);
            return { message: "Profile image updated successfully" };
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Player;