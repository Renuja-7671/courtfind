import React, { useEffect, useState } from 'react';
import { getDashboardStats, getIncomeOverview, getRecentBookings, getPaymentHistory } from '../services/ownerAuthService';
import { Container, Card, Table, Button, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Sidebar from "../components/ownerSidebar";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import { motion, AnimatePresence } from 'framer-motion';

  

const OwnerDashboard = () => {
    const [stats, setStats] = useState({
        totalArenas: 0, totalBookings: 0, totalIncome: 0,
    });
    const [incomeData, setIncomeData] = useState({ labels: [], values: [] });
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [showAllBookings, setShowAllBookings] = useState(false);
    const [showAllPayments, setShowAllPayments] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        getDashboardStats(token).then((res) => {
            console.log("stats data are:", res);
            setStats(res);
        });

        getIncomeOverview(token).then((res) => {
            console.log("income data are:", res);
            const numericValues = res.values.map(v => {
                const num = Number(v);
                return isNaN(num) ? 0 : num;
            });
            setIncomeData({ labels: res.labels, values: numericValues });
        });
        

        getRecentBookings(token).then((res) => {
            console.log("bookings data are:", res);
            setBookings(res);
        });

        getPaymentHistory(token).then((res) => {
            console.log("payment history data are:", res);
            setPayments(res);
        });
     
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="min-vh-100 d-flex flex-column  align-items-center">
    <Row className="w-100" text-center>
        <Col className="p-4 m-0"  md={3}>
            <Sidebar />
        </Col>
        <Col className="p-4 m-0"  md={9}>
            <Row className="w-100" text-center>
                <Col><Card ><Card.Body><h5>Total Arenas</h5><h3 >{stats.totalArenas}</h3></Card.Body></Card></Col>
                <Col><Card><Card.Body><h5>Total Bookings</h5><h3>{stats.totalBookings}</h3></Card.Body></Card></Col>
                <Col><Card><Card.Body><h5>Total Income</h5><h3>LKR {stats.totalIncome}</h3></Card.Body></Card></Col>
            </Row>
            <br /><br />
            <Row className="w-100" text-center>
                <Col>
                    <Card className="mb-4">
                        <Card.Body>
                            <h5>Income Overview</h5>
                            <Bar
                                data={{
                                    labels: incomeData.labels || [],
                                    datasets: [{
                                    label: 'Income (LKR)',
                                    data: incomeData.values || [],
                                    backgroundColor: '#4e73df'
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                    }
                                }}
                                />

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br /><br />                               
            <Row className="w-100" text-center>
                <Col>
                    <Card className="mb-4">
                        <Card.Body>
                            <h5>Recent Bookings</h5>
                            <Table striped bordered>
                                <thead>
                                    <tr><th>Booking Id</th><th>Arena Name</th><th>Court</th><th>Date</th><th>Start Time</th><th>End Time</th></tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {(showAllBookings ? bookings : bookings.slice(0, 5)).map(b => (
                                            <motion.tr
                                                key={b.bookingId}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <td>{b.bookingId}</td>
                                                <td>{b.arenaName}</td>
                                                <td>{b.court}</td>
                                                <td>{b.booking_date}</td>
                                                <td>{b.startTime}</td>
                                                <td>{b.end_time}</td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center mt-2">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                                onClick={() => setShowAllBookings(!showAllBookings)}
                            >
                                {showAllBookings ? 'See Less' : 'See More'}
                            </motion.button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br /><br />
            <Row className="w-100" text-center>
                <Col>
                    <Card>
                        <Card.Body>
                            <h5>Payments Performed By Owner</h5>
                            <Table striped bordered>
                                <thead>
                                <tr><th>Payment Id</th><th>Description</th><th>Date</th><th>Amount (LKR)</th></tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {(showAllPayments ? payments : payments.slice(0, 5)).map(p => (
                                            <motion.tr
                                                key={p.paymentId}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <td>{p.paymentId}</td>
                                                <td>{p.paymentDesc}</td>
                                                <td>{p.paid_at}</td>
                                                <td>{p.amount}</td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center mt-2">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                                onClick={() => setShowAllPayments(!showAllPayments)}
                            >
                                {showAllPayments ? 'See Less' : 'See More'}
                            </motion.button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnerDashboard;


