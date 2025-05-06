const db = require("../config/db");

const review={
    getReviewData: (callback) => {
        const query = "SELECT a.name AS arenaName, CONCAT(u.firstName, ' ', u.lastName) AS playerName, r.rating, r.comment, r.created_at AS reviewDate FROM reviews r JOIN arenas a ON r.arenaId = a.arenaId JOIN users u ON r.playerId = u.userId ORDER BY r.created_at DESC";
        db.query(query, callback);
    }
}

module.exports = review;
