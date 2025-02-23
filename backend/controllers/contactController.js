const Contact = require("../models/contactModel");

exports.submitContactForm = (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    Contact.createMessage({ name, email, phone, message }, (err, result) => {
        if (err) {
            console.error("Error saving contact message:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Message received successfully" });
    });
};
