const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const { uploadPlayerProfileImage } = require("../middleware/uploadMiddleware");



router.get("/bookings", authenticateUser, authorizeRole(["Player"]), playerController.getBookings);

router.put('/change-password',  authenticateUser, authorizeRole(["Player"]), playerController.changePassword);
router.get("/profile", authenticateUser, authorizeRole(["Player"]), playerController.getPlayerProfile);
router.put("/profile", authenticateUser, authorizeRole(["Player"]), playerController.updatePlayerProfile);
router.post("/profile/upload", authenticateUser, authorizeRole(["Player"]), uploadPlayerProfileImage.single("image"), playerController.uploadProfileImage);
router.get("/profile/image", authenticateUser, authorizeRole(["Player"]), playerController.getProfileImage);

module.exports = router;
