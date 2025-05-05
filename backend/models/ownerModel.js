const db = require('../config/db');

const OwnerDashboard = {
    fetchStats: async (ownerId) => {
        try {
            const [arenaRes] = await query('SELECT COUNT(*) AS totalArenas FROM arenas WHERE owner_id = ?', [ownerId]);
            const totalArenas = arenaRes[0].totalArenas;

            const [bookingRes] = await query('SELECT COUNT(*) AS totalBookings FROM bookings WHERE ownerId = ?', [ownerId]);
            const totalBookings = bookingRes[0].totalBookings;

            const [incomeRes] = await query('SELECT SUM(amount) AS totalIncome FROM payments WHERE ownerId = ?', [ownerId]);
            const totalIncome = incomeRes[0].totalIncome || 0;

            return { totalArenas, totalBookings, totalIncome };
        } catch (err) {
            throw err;
        }
    },

    fetchIncomeOverview: async (ownerId) => {
        try {
            const queryStr = `
                SELECT MONTH(paid_at) AS month, SUM(amount) AS total
                FROM payments
                WHERE ownerId = ?
                GROUP BY MONTH(paid_at)
                ORDER BY MONTH(paid_at)
            `;
            const [rows] = await query(queryStr, [ownerId]);

            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const values = Array(12).fill(0);
            rows.forEach(row => {
                values[row.month - 1] = row.total;
            });

            return { labels, values };
        } catch (err) {
            throw err;
        }
    },

    fetchRecentBookings: async (ownerId) => {
        try {
            const queryStr = `
                SELECT b.bookingId AS bookingId, a.name AS arenaName, c.name AS court, b.booking_date, b.start_time AS startTime, b.end_time
                FROM bookings b 
                JOIN arenas a ON b.arenaId = a.arenaId 
                JOIN courts c ON b.courtId = c.courtId
                WHERE a.owner_id = ?
                ORDER BY b.booking_date DESC
            `;
            const [rows] = await query(queryStr, [ownerId]);
            return rows;
        } catch (err) {
            throw err;
        }
    },

    fetchPaymentHistory: async (ownerId) => {
        try {
            const queryStr = `
                SELECT paymentId, paymentDesc, paid_at, amount
                FROM payments
                WHERE ownerId = ?
                ORDER BY paid_at DESC
            `;
            const [rows] = await query(queryStr, [ownerId]);
            return rows;
        } catch (err) {
            throw err;
        }
    }
};

// Helper: Wrap db.query in a Promise
function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve([results]);
        });
    });
}

module.exports = OwnerDashboard;
