const express = require('express');
const router = express.Router();
const { getBookingDetailsForPayment } = require('../controllers/bookingController');

router.post('/payment/:bookingId', getBookingDetailsForPayment);

module.exports = router;