import React from 'react';
import './styles/AdminDashboard.css';

import { 
  FiSearch, 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiTag, 
  FiSettings 
} from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="sidebar">
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search for..." className="search-input" />
      </div>

      <div className="menu-items">
        <div className="menu-item active">
          <FiHome className="menu-icon" />
          <span>Dashboard</span>
        </div>
        
        <div className="menu-item">
          <FiUsers className="menu-icon" />
          <span>Arena Owners</span>
        </div>
        
        <div className="menu-item">
          <FiUsers className="menu-icon" />
          <span>Players</span>
        </div>
        
        <div className="menu-item">
          <FiDollarSign className="menu-icon" />
          <span>Profit Analysis</span>
        </div>
        
        <div className="menu-item">
          <FiTag className="menu-icon" />
          <span>Pricing</span>
        </div>
        
        <div className="menu-item settings">
          <FiSettings className="menu-icon" />
          <span>Account Settings</span>
        </div>
      </div>

      <div className="user-profile">
        <div className="profile-img">
          <img src="https://via.placeholder.com/40" alt="Profile" />
        </div>
        <div className="profile-name">
          <span>Admin Courtfind</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;