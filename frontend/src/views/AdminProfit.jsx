import React, { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";
import apiClient from "../services/adminApiService";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './styles/AdminProfit.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminProfits = () => {
  const [chartData, setChartData] = useState({ revenueByActivity: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/admin/revenue-by-activity');
        setChartData({ revenueByActivity: response.data.revenueByActivity });
        setError(null);
      } catch (err) {
        console.error('Error fetching profit data:', err);
        setError('Failed to load profit data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatRevenue = (amount) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `LKR ${(amount / 1000).toFixed(0)}K`;
    } else {
      return `LKR ${amount.toFixed(0)}`;
    }
  };

  // Bar Chart Data
  const barChartData = {
    labels: chartData.revenueByActivity.map(item => item.activity_name),
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: chartData.revenueByActivity.map(item => item.total_amount),
        backgroundColor: ['#a855f7', '#3b82f6', '#93c5fd', '#facc15'],
        borderColor: ['#a855f7', '#3b82f6', '#93c5fd', '#facc15'],
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Amount (LKR)' } },
      //x: { title: { display: true, text: 'Pricing Activities' } }
      x: { title: { display: true, text: 'Pricing Activities' }, ticks: { font: { size: 10 }, maxRotation: 45 } }
    },
    plugins: {
      //legend: { display: false},
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue by Activity' }
    }
  };

  if (loading) return <AdminLayout><div className="loading">Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="error">Error: {error}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-profit">
        <h1>Profit Overview</h1>
        <div className="chart-wrapper">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfits;