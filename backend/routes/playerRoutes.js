const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");



router.get("/bookings", authenticateUser, authorizeRole(["Player"]), playerController.getBookings);


module.exports = router;
