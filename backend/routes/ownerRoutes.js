const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

router.get("/dashboard", authenticateUser, authorizeRole(["owner"]), ownerController.dashboard);
router.post("/manage-courts", authenticateUser, authorizeRole(["owner"]), ownerController.manageCourts);

module.exports = router;
