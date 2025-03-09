const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const ownerRoutes = require("./ownerRoutes");
const playerRoutes = require("./playerRoutes");
const commonRoutes = require("./commonRoutes");
const adminRoutes = require("./adminRoutes"); 

router.use("/auth", authRoutes);
router.use("/owner", ownerRoutes);
router.use("/player", playerRoutes);
router.use("/common", commonRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
