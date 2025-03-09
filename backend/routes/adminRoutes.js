const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Protect routes to ensure only Admins can access them
router.get("/dashboard", authenticateUser, authorizeRole(["Admin"]), adminController.dashboard);

module.exports = router;
