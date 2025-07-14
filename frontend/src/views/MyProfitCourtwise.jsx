import React, { useState, useEffect } from 'react';
import { getOwnerArenas, getArenaDetails, getArenaCourtYearlyData } from '../services/ownerAuthService';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitCourtwise = () => {
  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);
  const [arenaDetails, setArenaDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Color palette for courts
  const courtColors = [
    '#1e40af', // Blue
    '#3b82f6', // Light Blue
    '#60a5fa', // Lighter Blue
    '#93c5fd', // Very Light Blue
    '#dbeafe', // Pale Blue
    '#1e3a8a', // Dark Blue
    '#1d4ed8', // Medium Blue
    '#2563eb', // Another Blue
  ];

  useEffect(() => {
    fetchArenas();
  }, []);

  const fetchArenas = async () => {
    try {
      const arenasData = await getOwnerArenas();
      setArenas(arenasData);
      if (arenasData.length > 0) {
        setSelectedArena(arenasData[0].arenaId);
        fetchArenaData(arenasData[0].arenaId);
      }
    } catch (err) {
      setError('Failed to fetch arenas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArenaData = async (arenaId) => {
    try {
      setLoading(true);
      const [details, yearlyData] = await Promise.all([
        getArenaDetails(arenaId),
        getArenaCourtYearlyData(arenaId, currentYear)
      ]);
      
      setArenaDetails(details);
      
      // Format chart data with colors
      const formattedData = {
        ...yearlyData,
        datasets: yearlyData.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: courtColors[index % courtColors.length],
          borderColor: courtColors[index % courtColors.length],
          borderWidth: 1,
        }))
      };
      
      setChartData(formattedData);
    } catch (err) {
      setError('Failed to fetch arena data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleArenaChange = (e) => {
    const arenaId = parseInt(e.target.value);
    setSelectedArena(arenaId);
    fetchArenaData(arenaId);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: LKR ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          color: '#6b7280'
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          color: '#6b7280',
          callback: function(value) {
            return value >= 1000 ? (value / 1000) + 'K' : value;
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '16rem' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center bg-white py-3">
    <Row className="w-100">
    <div className="container-fluid p-5 bg-white">
      {/* Header */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold text-dark mb-4 text-center">Profit of your Arena</h1>
        
        {/* Arena Selector */}
        <div className="mb-4">
          <select
            value={selectedArena || ''}
            onChange={handleArenaChange}
            className="form-select form-select-lg"
            style={{ maxWidth: '28rem', backgroundColor: '#f8f9fa' }}
          >
            <option value=""disabled hidden>Choose an Arena</option>
            {arenas.map((arena) => (
              <option key={arena.arenaId} value={arena.arenaId}>
                {arena.name}
              </option>
            ))}
          </select>
        </div>

        {/* Arena Details */}
        {arenaDetails && (
          <div className="mb-4">
            <h2 className="h4 fw-semibold text-dark mb-1">
              {arenaDetails.name}
            </h2>
            <p className="text-muted mb-0">
              {arenaDetails.city}, {arenaDetails.country}
            </p>
          </div>
        )}
      </div>

      {/* Chart Container */}
      {chartData && (
        <div className="card border-0 shadow-sm rounded-3 mb-4">
          <div className="card-body p-4">
            <div style={{ height: '24rem' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="d-flex justify-content-start">
        <button
          onClick={() => navigate('/my-profit')}
          className="btn btn-primary btn-lg px-4 py-2"
        >
          Back to summarized view
        </button>
      </div>
    </div>
    </Row>
    </Container>
  );
};

export default ProfitCourtwise;