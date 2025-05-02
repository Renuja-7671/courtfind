const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
//const { changePassword } = require('../controllers/ownerController');

router.get("/dashboard", authenticateUser, authorizeRole(["Owner"]), ownerController.dashboard);
router.post("/manage-courts", authenticateUser, authorizeRole(["Owner"]), ownerController.manageCourts);
router.put('/change-password',  authenticateUser, authorizeRole(["Owner"]), ownerController.changePassword);
router.get("/profile", authenticateUser, authorizeRole(["Owner"]), ownerController.getOwnerProfile);
router.put("/profile", authenticateUser, authorizeRole(["Owner"]), ownerController.updateOwnerProfile);
router.post("/profile/upload", authenticateUser, authorizeRole(["Owner"]), upload.single("image"), ownerController.uploadProfileImage);
router.get("/profile/image", authenticateUser, authorizeRole(["Owner"]), ownerController.getProfileImage);
router.post("/arenas", authenticateUser, authorizeRole(["Owner"]), ownerController.addArena);


module.exports = router;
