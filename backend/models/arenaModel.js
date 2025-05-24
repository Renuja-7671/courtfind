const db = require("../config/db");
const { addArena } = require("../controllers/ownerController");

const arena={
    getAllArenas: (callback) => {
        const query = "SELECT * FROM arenas";
        db.query(query, callback);
    },

    searchArenas: (sport, venue, callback) => {
        let query = "SELECT * FROM arenas WHERE 1=1";
        const params = [];

        if (sport) {
            query += " AND sport = ?";
            params.push(sport);
        }

        if (venue) {
            query += " AND (name LIKE ? OR city LIKE ?)";
            params.push(`%${venue}%`, `%${venue}%`);
        }

        db.query(query, params, callback);
    },

    addArena: (name, city, description, image_url, callback) => {
        const query = "INSERT INTO arenas (name, city, description, image_url) VALUES (?, ?, ?, ?)";
        db.query(query, [name, city, description, image_url], callback);
    },

    getArenaByRating: (callback) => {
        const query = "SELECT a.arenaId, a.city, a.name, a.country, a.description, a.image_url, AVG(r.rating) AS average_rating FROM arenas a JOIN reviews r ON a.arenaId = r.arenaId GROUP BY a.arenaId ORDER BY average_rating DESC";
        db.query(query, callback);
    },
}

module.exports = arena;