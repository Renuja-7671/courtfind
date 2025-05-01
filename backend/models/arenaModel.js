const db = require("../config/db");

const arena={
    getAllArenas: (callback) => {
        db.query("SELECT * FROM arenas", callback);
    },
}