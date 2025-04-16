const db = require('../config/db'); // MySQL connection

exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard", user: req.user.userId });
};


exports.getAdminProfile = async (req, res) => {
    try {

       const userId = req.user.userId;
  
  console.log('Fetching admin profile for userId:', userId);
  
  const query = 'SELECT firstName, lastName, email FROM users WHERE userId = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch user data: ' + err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('User data found:', results[0]);
    
    // add hardcoded position for now 
    const userData = {
      ...results[0],
      position: 'System Administrator'
    };
    
    res.json(userData);
  });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};

exports.updateAdminProfile = async (req, res) => {
    try {
        
        const userId = req.user.userId;
  
  const { firstName, lastName, email } = req.body;
  console.log('Updating profile with data:', req.body);
  
  // Basic validation
  if (!firstName || !email) {
    return res.status(400).json({ error: 'First name and email are required' });
  }
  
  const query = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE userId = ?';
  
  db.query(query, [firstName, lastName || '', email, userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update user data: ' + err.message });
    }
    
    console.log('Update result:', result);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }
    
    res.json({ message: 'Profile updated successfully' });
  });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};

