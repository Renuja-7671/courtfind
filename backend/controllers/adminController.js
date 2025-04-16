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


// Get all pricing items
exports.getAllPricing = (req, res) => {
  const query = 'SELECT * FROM pricing ORDER BY id ASC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pricing data:', err);
      return res.status(500).json({ error: 'Failed to fetch pricing data' });
    }
    
    res.json(results);
  });
};

// Update a pricing item
exports.updatePricing = (req, res) => {
  const { id, activity_name, price } = req.body;
  
  if (!id || !price || !activity_name) {
    return res.status(400).json({ error: 'ID, activity name, and price are required' });
  }
  
  const query = 'UPDATE pricing SET activity_name = ?, price = ? WHERE id = ?';
  
  db.query(query, [activity_name, price, id], (err, result) => {
    if (err) {
      console.error('Error updating pricing:', err);
      return res.status(500).json({ error: 'Failed to update pricing' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pricing item not found' });
    }
    
    res.json({ message: 'Pricing updated successfully' });
  });
};

// Add a new pricing item
exports.addPricing = (req, res) => {
  const { activity_name, price } = req.body;
  
  if (!activity_name || !price) {
    return res.status(400).json({ error: 'Activity name and price are required' });
  }
  
  const query = 'INSERT INTO pricing (activity_name, price) VALUES (?, ?)';
  
  db.query(query, [activity_name, price], (err, result) => {
    if (err) {
      console.error('Error adding pricing:', err);
      return res.status(500).json({ error: 'Failed to add pricing' });
    }
    
    res.status(201).json({ 
      message: 'Pricing added successfully',
      id: result.insertId,
      activity_name,
      price
    });
  });
};

// Delete a pricing item
exports.deletePricing = (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  
  const query = 'DELETE FROM pricing WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting pricing:', err);
      return res.status(500).json({ error: 'Failed to delete pricing' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pricing item not found' });
    }
    
    res.json({ message: 'Pricing deleted successfully' });
  });
};