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
    
};
module.exports = court;
