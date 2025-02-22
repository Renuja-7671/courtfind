const db = require('../config/db');

const User = {
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },

    createUser: (userData, callback) => {
        db.query(
            'INSERT INTO users (role, firstName, lastName, mobile, country, province, zip, address, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            userData,
            callback
        );
    }
};

module.exports = User;


