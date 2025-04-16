const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Protect routes to ensure only Admins can access them
router.get("/dashboard", authenticateUser, authorizeRole(["Admin"]), adminController.dashboard);
router.get("/profile", authenticateUser, authorizeRole(["Admin"]), adminController.getAdminProfile);
router.put("/profile", authenticateUser, authorizeRole(["Admin"]), adminController.updateAdminProfile);
// Pricing routes (protected by admin authentication)
router.get('/pricing', authenticateUser, authorizeRole(['Admin']), adminController.getAllPricing);
router.put('/pricing', authenticateUser, authorizeRole(['Admin']), adminController.updatePricing);
router.post('/pricing', authenticateUser, authorizeRole(['Admin']), adminController.addPricing);
router.delete('/pricing/:id', authenticateUser, authorizeRole(['Admin']), adminController.deletePricing);

// Test endpoint (remove this after testing)
router.get('/pricing-test', (req, res) => {
  res.json({ message: 'Pricing API is working!' });
});

module.exports = router;