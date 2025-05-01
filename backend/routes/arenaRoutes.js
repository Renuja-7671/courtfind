const express = require('express');
const router = express.Router();
const arenaController = require('../controllers/arenaController');

router.get('/', arenaController.getAllArenas); // Get all arenas
router.get('/search', arenaController.searchArenas); // Search arenas based on filters

module.exports = router;