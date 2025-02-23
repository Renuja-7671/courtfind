const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

router.get("/dashboard", authenticateUser, authorizeRole(["player"]), playerController.dashboard);
router.post("/book-court", authenticateUser, authorizeRole(["player"]), playerController.bookCourt);

module.exports = router;
