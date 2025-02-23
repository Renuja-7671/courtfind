require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require("./routes");
const { authenticateToken } = require('./middleware/authMiddleware');

const contactRoutes = require("./routes/contactRoutes");  // Import Contact Routes

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
<<<<<<< HEAD
app.use('/api', routes);
=======
app.use('/api/auth', authRoutes);
app.use("/api", contactRoutes);  // Register the Contact Routes
>>>>>>> 5cbd8b8e928a77c2440b0b3402498d80d62536ec

// Protected Route
app.get('/api/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to the dashboard, User ID: ${req.user.userId}` });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
