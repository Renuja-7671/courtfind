const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const bookingController = require("../controllers/bookingController");
const invoiceController = require("../controllers/invoiceController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { uploadPlayerProfileImage } = require("../middleware/uploadMiddleware");
const playerReviewController = require("../controllers/playerReviewController");

router.get("/bookings", authenticateUser, authorizeRole(["Player"]), playerController.getBookings);

router.put('/change-password',  authenticateUser, authorizeRole(["Player"]), playerController.changePassword);
router.get("/profile", authenticateUser, authorizeRole(["Player"]), playerController.getPlayerProfile);
router.put("/profile", authenticateUser, authorizeRole(["Player"]), playerController.updatePlayerProfile);
router.post("/profile/upload", authenticateUser, authorizeRole(["Player"]), uploadPlayerProfileImage.single("image"), playerController.uploadProfileImage);
router.get("/profile/image", authenticateUser, authorizeRole(["Player"]), playerController.getProfileImage);
router.get("/invoices", authenticateUser, authorizeRole(["Player"]), invoiceController.getPlayerInvoices);
router.post("/create-booking", authenticateUser, authorizeRole(["Player"]), bookingController.setABooking);
router.post("/reviews", authenticateUser, authorizeRole(["Player"]), playerReviewController.addReview);
router.get("/reviews/:courtId", authenticateUser, authorizeRole(["Player"]), playerReviewController.getReviewsByCourtId);
router.get("/reviews/:courtId/stats", authenticateUser, authorizeRole(["Player"]), playerReviewController.getReviewStats);
router.get("/reviews/:courtId/average", authenticateUser, authorizeRole(["Player"]), playerReviewController.getAverageRatingByCourtId);
module.exports = router;
