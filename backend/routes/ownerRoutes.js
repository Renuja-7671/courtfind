const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
//const { changePassword } = require('../controllers/ownerController');

router.get("/dashboard", authenticateUser, authorizeRole(["Owner"]), ownerController.dashboard);
router.post("/manage-courts", authenticateUser, authorizeRole(["Owner"]), ownerController.manageCourts);
router.put('/change-password',  authenticateUser, authorizeRole(["Owner"]), ownerController.changePassword);

module.exports = router;
