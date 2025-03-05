const express = require("express");
const { submitContactForm } = require("../controllers/contactController");
const { chatWithGemini } = require("../controllers/geminiController");

const router = express.Router();

router.post("/contact", submitContactForm);

// chatbot route
router.post("/chat", chatWithGemini);

module.exports = router;
