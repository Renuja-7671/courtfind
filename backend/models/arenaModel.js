const db = require("../config/db");

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
}

module.exports = arena;