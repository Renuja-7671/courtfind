const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
//const { changePassword } = require('../controllers/ownerController');

router.get("/dashboardbcb", authenticateUser, authorizeRole(["Owner"]), ownerController.dashboard);
router.post("/manage-courts", authenticateUser, authorizeRole(["Owner"]), ownerController.manageCourts);
router.put('/change-password',  authenticateUser, authorizeRole(["Owner"]), ownerController.changePassword);
router.get("/profile", authenticateUser, authorizeRole(["Owner"]), ownerController.getOwnerProfile);
router.put("/profile", authenticateUser, authorizeRole(["Owner"]), ownerController.updateOwnerProfile);
router.post("/profile/upload", authenticateUser, authorizeRole(["Owner"]), upload.single('image'), ownerController.uploadProfileImage);
router.get("/profile/image", authenticateUser, authorizeRole(["Owner"]), ownerController.getProfileImage);

//Owner Dashboard routes
router.get('/dashboard/stats', authenticateUser, authorizeRole(["Owner"]), ownerController.getStats);
router.get('/dashboard/income-overview', authenticateUser, authorizeRole(["Owner"]), ownerController.getIncomeOverview);
router.get('/dashboard/recent-bookings', authenticateUser, authorizeRole(["Owner"]), ownerController.getRecentBookings);
router.get('/dashboard/payment-history', authenticateUser, authorizeRole(["Owner"]), ownerController.getPaymentHistory);

//Arena Bookings routes
router.get('/arena-bookings', authenticateUser, authorizeRole(["Owner"]), ownerController.fetchArenaBookings);
router.put("/arena-bookings/:bookingId", authenticateUser, authorizeRole(["Owner"]), ownerController.updateCancelStatus);
router.get("/arena-bookings/allArenas", authenticateUser, authorizeRole(["Owner"]), ownerController.fetchArenasOfOwner);
router.get("/arena-bookings/:arenaId", authenticateUser, authorizeRole(["Owner"]), ownerController.fetchSelectedArenaBookings);
router.get("/arena-bookings/filter", authenticateUser, authorizeRole(["Owner"]), ownerController.fetchFilteredArenaBookings);
router.get("/arena-bookings/courts/:arenaId", authenticateUser, authorizeRole(["Owner"]), ownerController.fetchCourtsByArenaId);

module.exports = router;
