const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Protect routes to ensure only Admins can access them
router.get("/dashboard", authenticateUser, authorizeRole(["Admin"]), adminController.dashboard);
router.get("/profile", authenticateUser, authorizeRole(["Admin"]), adminController.getAdminProfile);
router.put("/profile", authenticateUser, authorizeRole(["Admin"]), adminController.updateAdminProfile);


// Test endpoint
router.get('/profile-test', (req, res) => {
  res.json({ message: 'Admin profile API is working!' });
});

module.exports = router;