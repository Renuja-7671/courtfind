const express = require("express");
const { submitContactForm } = require("../controllers/contactController");
const { chatWithGemini } = require("../controllers/geminiController");
const { getArenaCourtDetails } = require("../controllers/courtViewingController");
const { getAllSports } = require('../controllers/sportController');
const { searchArenas } = require('../controllers/arenaController');
const { getArenaByRating } = require('../controllers/arenaController');

const router = express.Router();

router.post("/contact", submitContactForm);

// chatbot route
router.post("/chat", chatWithGemini);

//Arena and court info for viewing route
router.get("/arena-courts", getArenaCourtDetails);
router.get("/sport", getAllSports);
router.get("/searchArenas", searchArenas);
router.get('/arenasByRating', getArenaByRating);

module.exports = router;
