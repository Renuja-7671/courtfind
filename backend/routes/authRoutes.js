const express = require('express');
const { register, login, resetPassword } = require('../controllers/authController');

const router = express.Router();
const authController = require("../controllers/authController");

router.post('/register', register);
router.post('/login', login);
router.post("/forgot-password", authController.forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
