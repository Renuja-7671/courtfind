const db = require('../config/db'); // MySQL connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const OwnerDashboard = require('../models/ownerModel');

exports.changePassword = async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
   

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch user from database
    const sql = 'SELECT password FROM users WHERE userId = ?';
    db.query(sql, [userId], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE userId = ?';
        db.query(updateSql, [hashedPassword, userId], (err, result) => {
            if (err) return res.status(500).json({ message: "Error updating password" });

            res.json({ message: "Password updated successfully" });
        });
    });
};


exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Owner Dashboard", user: req.user });
};

exports.manageCourts = (req, res) => {
    res.json({ message: "Owner managing courts" });
};

// Get Owner Profile
exports.getOwnerProfile = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        console.log("The ID of the user: ", ownerId);
        User.getOwnerProfile(ownerId, async (err, results) =>{
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Profile not found" });
            }
            const profile = results[0];
            //console.log("The profile data: ", profile);
            res.json(profile);
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};

// Update Owner Profile
exports.updateOwnerProfile = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const profileData = req.body;
        //console.log("The profile data: ", profileData);
        User.updateOwnerProfile(ownerId, profileData, (err, results) =>{
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.json({ message: "Profile updated successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};

// Upload Profile Image
exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        console.log("The came file is: ",req.file);

        const imageUrl = `/uploads/${req.file.filename}`; // Store relative path
        const userId = req.user.userId; // Extract from auth token

        const response = await User.updateProfileImage(userId, imageUrl);
        res.json({ message: response.message, imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Error uploading profile image", error });
    }
};

// Get Profile Image
exports.getProfileImage = async (req, res) => {
    try {
        const userId = req.user.userId;
        User.getProfileImage(userId, async (err, results) =>{
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Profile image not found" });
            }
            const imageUrl = results[0].profileImage;
            //console.log("The image URL: ", imageUrl);
            res.json(imageUrl);
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile image", error });
    }
};

//Add New Arena
exports.addArena = (req, res) => {
    const ownerId = req.user.userId;  
    const { arenaName, streetName, city } = req.body;

    if (!arenaName || !streetName || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = 'INSERT INTO arenas (id, name, country, city) VALUES (?, ?, ?, ?)';
    db.query(sql, [ownerId, arenaName, streetName, city], (err, result) => {
        if (err) {
            console.error("Error inserting arena:", err);
            return res.status(500).json({ message: "Database error while adding arena" });
        }

        res.status(201).json({ message: "Arena added successfully", arenaId: result.insertId });
    });
};

exports.getStats = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const stats = await OwnerDashboard.fetchStats(ownerId);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  
};

exports.getIncomeOverview = async (req, res) => {
    try {const ownerId = req.user.userId;
        const chartData = await OwnerDashboard.fetchIncomeOverview(ownerId);
        res.json(chartData);
    } catch (error) {
        console.error('Error fetching income overview:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  
};

exports.getRecentBookings = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const bookings = await OwnerDashboard.fetchRecentBookings(ownerId);
    //console.log("The table details are : ", bookings);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching recent bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPaymentHistory = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const payments = await OwnerDashboard.fetchPaymentHistory(ownerId);
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.fetchArenaBookings = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const bookingsArena = await OwnerDashboard.fetchArenaBookings(ownerId);
        console.log("The booking details are : ", bookingsArena);
        res.json(bookingsArena);
    } catch (error) {
        console.error('Error fetching arena bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
};

exports.fetchSelectedArenaBookings = async (req, res) => {
    try {
        const arenaId = req.params.arenaId;
        const ownerId = req.user.userId;
        const bookingsArena = await OwnerDashboard.fetchSelectedArenaBookings(ownerId, arenaId);
        console.log("The booking details are : ", bookingsArena);
        res.json(bookingsArena);
    } catch (error) {
        console.error('Error fetching selected arena bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    };    
    
exports.fetchArenasOfOwner = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const arenas = await OwnerDashboard.fetchArenasOfOwner(ownerId);
        res.json(arenas);
        } catch (error) {
            console.error('Error fetching arenas of owner:', error);
            res.status(500).json({ message: 'Internal server error' });
            }
     };

exports.updateCancelStatus = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        console.log('bookingId :', bookingId);
        const updateBookingStatus = await OwnerDashboard.updateCancelStatus(bookingId);
        console.log("booking status : ", updateBookingStatus);
        res.json(updateBookingStatus);
    } catch (error) {
            console.error('Error updating cancel status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
};

exports.fetchCourtsByArenaId = async (req, res) => {
    try {
        const arenaId = req.params.arenaId;
        const courts = await OwnerDashboard.fetchCourtsByArenaId(arenaId);
        res.json(courts);
        } catch (error) {
            console.error('Error fetching courts by arena id:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
};

exports.fetchFilteredArenaBookings = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const { arenaId, bookingDate, courtName } = req.query;

        const bookings = await OwnerDashboard.fetchFilteredArenaBookings(
            ownerId,
            arenaId,
            bookingDate || null,
            courtName || null
        );

        res.json(bookings);
    } catch (error) {
        console.error("Error filtering arena bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//FOR MY PROFIT 
exports.getTotalRevenue = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const totalRevenue = await OwnerDashboard.fetchTotalRevenue(ownerId);
        res.json({ totalRevenue });
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCurrentMonthRevenue = async (req, res) => {
    try {
        const ownerId = req.user.userId;  
        const currentMonthRevenue = await OwnerDashboard.fetchCurrentMonthRevenue(ownerId);
        res.json({ currentMonthRevenue });
    } catch (error) {
        console.error('Error fetching current month revenue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getYearlyChartData = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const year = req.query.year || new Date().getFullYear(); // capture year from query
        const chartData = await OwnerDashboard.fetchYearlyChartData(ownerId, year);
        res.json(chartData);
    } catch (error) {
        console.error('Error fetching yearly chart data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getMonthlyChartData = async (req, res) => {
    console.log("Raw query params:", req.query);
    const { year, month } = req.query;
    console.log("Parsed values:", { year: typeof year, month: typeof month });
    const ownerId = req.user.userId;
    
    // Convert to numbers explicitly
    const numYear = parseInt(year) || new Date().getFullYear();
    const numMonth = parseInt(month) || new Date().getMonth() + 1;
    console.log("Final values:", { numYear, numMonth });
    
    const chartData = await OwnerDashboard.fetchMonthlyChartData(ownerId, numYear, numMonth);
    console.log(" Monthly Chart Query Params:", req.query);
    try {
        const ownerId = req.user.userId;
        const { year, month } = req.query; // Optional year/month from query params
        const chartData = await OwnerDashboard.fetchMonthlyChartData(ownerId, year, month);
        res.json(chartData);
    } catch (error) {
        console.error('Error fetching monthly chart data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const transactions = await OwnerDashboard.fetchAllTransactions(ownerId);
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getPaymentHistoryForProfit = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const payments = await OwnerDashboard.fetchPaymentHistoryForMyProfit(ownerId);
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payment history for profit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

