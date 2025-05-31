const express = require('express');
const router = express.Router();
const arenaController = require('../controllers/arenaController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const { uploadArenas } = require("../middleware/uploadMiddleware");
const { route } = require('./authRoutes');
const sportController = require('../controllers/sportController');

router.get('/', arenaController.getAllArenas); // Get all arenas
router.get('/search', arenaController.searchArenas); // Search arenas based on filters
router.post('/', authenticateUser, authorizeRole(["Owner"]), arenaController.addArena); //Add a new arena
router.post('/upload', authenticateUser, authorizeRole(["Owner"]), uploadArenas.single('image'), arenaController.uploadArenaImage); //Add an image for arena
router.get("/sports", authenticateUser, authorizeRole(["Owner"]), sportController.getAllSports);

module.exports = router;