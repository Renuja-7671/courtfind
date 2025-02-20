require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// User Registration (Signup)
app.post('/register', async (req, res) => {
    const { role, firstName, lastName, mobile, country, province, zip, address, email, password } = req.body;
    
    //console.log("Received Data:", req.body); // Log received data for debugging
    
    if (!role || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Role, First name, last name, email, and password are required' });
    }

    try {
        // Check if the email already exists
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }
            
    // Hash the password entered
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (role, firstName, lastName, mobile, country, province, zip, address, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [role, firstName, lastName, mobile, country, province, zip, address, email, hashedPassword],
        (err, result) => {
            if (err) {
                console.error("Database Insert Error:", err); // Debugging line
                return res.status(500).json({ message: 'Error registering user', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        }
    );
    });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    });

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

// Forgot Password
app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Simulating email existence check
    const userExists = true; // Replace with actual DB check

    if (!userExists) {
        return res.status(404).json({ message: "No account found with this email" });
    }

    // TODO: Implement password reset email logic
    res.json({ message: "A reset link has been sent to your email" });
});


// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Dashboard with controlled access
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to the dashboard, User ID: ${req.user.userId}` });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
