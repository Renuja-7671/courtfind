const axios = require("axios");
require("dotenv").config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

exports.chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Corrected request format
        const requestData = {
            contents: [{ parts: [{ text: message }] }],
        };

        const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, requestData, {
            headers: { "Content-Type": "application/json" }
        });

        // Extract response properly
        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

        res.json({ reply });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Error communicating with Gemini AI" });
    }
};
