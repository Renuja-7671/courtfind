import React, { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";
import apiClient from "../services/adminApiService";
import { FaUsers } from 'react-icons/fa';
import './styles/AdminDashboard.css'; // Updated CSS file

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlayers: 0,
    totalOwners: 0
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
          totalOwners: response.data.totalOwners
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
        </div>
        {/* Add other content for your dashboard here */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;