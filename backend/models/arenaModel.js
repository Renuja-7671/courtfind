const db = require("../config/db");
const { addArena } = require("../controllers/ownerController");

const arena={
    getAllArenas: (callback) => {
        const query = "SELECT * FROM arenas a, courts c WHERE a.arenaId = c.arenaId";
        db.query(query, callback);
    },

    searchArenas: (sport, venue, callback) => {
        let query = "SELECT a.arenaId, a.city, a.country, a.description, a.image_url, c.name AS courtName, c.courtId, c.sport FROM arenas a, courts c WHERE a.arenaId = c.arenaId";
        const params = [];

        if (sport) {
            query += " AND c.sport  LIKE ?";
            params.push(`%${sport}%`);
        }

        if (venue) {
            query += " AND (a.name LIKE ? OR a.city LIKE ?)";
            params.push(`%${venue}%`, `%${venue}%`);
        }

        db.query(query, params, callback);
    },

    addArena: (ownerId, name, city, description, image_url, callback) => {
        const query = "INSERT INTO arenas (owner_id, name, city, description, image_url) VALUES (?, ?, ?, ?, ?)";
        db.query(query, [ownerId, name, city, description, image_url], callback);
    },

    getArenaByRating: (callback) => {
        const query = "SELECT a.arenaId, a.city, a.name, a.country, a.description, a.image_url, AVG(r.rating) AS average_rating FROM arenas a JOIN reviews r ON a.arenaId = r.arenaId GROUP BY a.arenaId ORDER BY average_rating DESC";
        db.query(query, callback);
    },
}

module.exports = arena;