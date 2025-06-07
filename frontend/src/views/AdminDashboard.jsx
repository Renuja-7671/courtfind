import React, { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";
import apiClient from "../services/adminApiService";
import { FaUsers, FaDollarSign } from 'react-icons/fa'; // Added FaDollarSign for revenue icon
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlayers: 0,
    totalOwners: 0,
    averageRevenue: 0 // Added averageRevenue to state
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the user stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/admin/user-stats');
        setStats({
          totalUsers: response.data.totalUsers,
          totalPlayers: response.data.totalPlayers,
          totalOwners: response.data.totalOwners,
          averageRevenue: response.data.averageRevenue
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load user stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Function to format the revenue (e.g., 150000 -> LKR 150K)
  const formatRevenue = (amount) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `LKR ${(amount / 1000).toFixed(0)}K`;
    } else {
      return `LKR ${amount.toFixed(0)}`;
    }
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div>{error}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <div className="stats-header">
          {/* Total Users Box */}
          <div className="stats-box">
            <FaUsers className="stats-icon" />
            <div className="stats-text">
              <span className="stats-number">{stats.totalUsers}</span>
              <span className="stats-label">Total Users</span>
            </div>
          </div>
          {/* Players in Total Box */}
          <div className="stats-box">
            <FaUsers className="stats-icon" />
            <div className="stats-text">
              <span className="stats-number">{stats.totalPlayers}</span>
              <span className="stats-label">Players in Total</span>
            </div>
          </div>
          {/* Owners in Total Box */}
          <div className="stats-box">
            <FaUsers className="stats-icon" />
            <div className="stats-text">
              <span className="stats-number">{stats.totalOwners}</span>
              <span className="stats-label">Owners in Total</span>
            </div>
          </div>
          {/* Average Revenue Box */}
          <div className="stats-box">
            <FaDollarSign className="stats-icon" />
            <div className="stats-text">
              <span className="stats-number">{formatRevenue(stats.averageRevenue)}</span>
              <span className="stats-label">Average Revenue</span>
            </div>
          </div>
        </div>
        {/* Add other content for your dashboard here */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

