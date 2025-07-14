const db = require("../config/db");

exports.savePayment = (paymentData, callback) => {
  const { bookingId, paymentDesc, amount, payment_method, transactionId, ownerId } = paymentData;
  const query = `
    INSERT INTO payments (bookingId, paymentDesc, amount, payment_method, transactionId, ownerId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [bookingId, paymentDesc, amount, payment_method, transactionId, ownerId], callback);
};
