import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const API_URL = "http://localhost:8000";

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(`${API_URL}/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(res.data.message);
            } catch (error) {
                setMessage("Access denied. Please log in.");
                navigate("/login");
            }
        };
        fetchDashboard();
    }, [navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="shadow p-4 text-center" style={{ width: "400px" }}>
                <Card.Body>
                    <Card.Title>Dashboard</Card.Title>
                    {message && <Alert variant="info">{message}</Alert>}
                    <Button
                        variant="danger"
                        className="w-100 mt-3"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;
