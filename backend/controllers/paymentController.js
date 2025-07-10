const db = require('../config/db');

exports.savePayment = async (req, res) => {
  const { bookingId, amount, payment_method, transactionId, ownerId } = req.body;

  try {
    await db.query(
      `INSERT INTO payments (bookingId, amount, payment_method, transactionId, ownerId)
       VALUES (?, ?, ?, ?, ?)`,
      [bookingId, amount, payment_method, transactionId, ownerId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save payment' });
  }
};
