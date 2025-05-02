const arena = require("../models/arenaModel");

exports.getAllArenas = async (req, res) => {
    try {
        arena.getAllArenas((err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "No arenas found" });
            }
            console.log("All arenas:", results); // Debugging line
            res.json(results);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchArenas = async (req, res) => {
    const { sport, venue } = req.query;
    console.log("Filters in controller:", req.query); // Debugging line
    console.log("Sport:", sport); // Debugging line
    console.log("Venue:", venue); // Debugging line
    if (!sport && !venue) {
        return res.status(400).json({ error: "At least one filter (sport or venue) is required." });
    }
    try {
        arena.searchArenas(sport, venue, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                // Log the error for debugging
                console.error("Error details:", err); // Debugging line
                return res.status(500).json({ error: "Database error" });
            }
            if (results.length === 0) {
                console.log("No arenas found for the given filters."); // Debugging line
                return res.status(404).json({ message: "No arenas found" });
            }
            console.log("Search results:", results); // Debugging line
            res.json(results);
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
