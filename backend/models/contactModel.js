const db = require("../config/db");

const Contact = {
    createMessage: (data, callback) => {
        const query = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
        db.query(query, [data.name, data.email, data.phone, data.message], callback);
    }
};

module.exports = Contact;
