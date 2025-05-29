const db = require('../config/db');
const invoice = require('../models/InvoiceModel');

exports.getInvoices = (req, res) => {
    const playerId = req.user.userId; // assuming 'req.user' is populated by auth middleware

    invoice.getBookingsByPlayerId(playerId, (err, results) => {
        if (err) {
            console.error("Error fetching player invoices:", err);
            return res.status(500).json({ error: "Failed to fetch invoices" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No invoice found" });
        }
        //console.log("These are the invoices: ", results);

        res.status(200).json(results);
    });
}