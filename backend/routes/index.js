const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const ownerRoutes = require("./ownerRoutes");
const playerRoutes = require("./playerRoutes");

router.use("/auth", authRoutes);
router.use("/owner", ownerRoutes);
router.use("/player", playerRoutes);

module.exports = router;
