const db = require("../config/db"); 

const court = {
    create: (courtData, callback) => {
    const {
        name,
        size,
        rate,
        sport,
        images,
        availability,
        arenaId,
    } = courtData;
    
    const query = `INSERT INTO courts (name, size, hourly_rate, sport, images, availability, arenaId) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, size, rate, sport, JSON.stringify(images), JSON.stringify(availability), arenaId], callback);
    },

    getCourtsforbooking: (courtId, callback) => {
        const query = `SELECT a.owner_id, u.mobile, a.arenaId, a.name AS arenaName, a.city, a.country, a.description, c.courtId, c.name AS courtName, c.size, c.hourly_rate, c.sport, c.images, c.availability FROM arenas a, courts c, users u WHERE a.arenaId = c.arenaId AND a.owner_id = u.userId AND c.courtId = ?;`;
        db.query(query, [courtId], callback);
    }
    
};
module.exports = court;
