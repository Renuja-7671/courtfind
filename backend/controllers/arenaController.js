const arenaModel = require("../models/arenaModel");

exports.getAllArenas = async (req, res) => {
    try {
        const arenas = await arenaModel.getAll();
        res.json(arenas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchArenas = async (req, res) => {
    const { sport, venue } = req.query;
    try {
        const results = await arenaModel.search(sport, venue);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
