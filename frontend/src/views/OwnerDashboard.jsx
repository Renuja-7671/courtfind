import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Use global auth state

const OwnerDashboard = () => {
    const { updateAuthState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove token
        updateAuthState(); // Update global auth state
        navigate("/login"); // Redirect to login
    };

    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <Row className="w-100 text-center">
                <Col>
                    <h1>🏟️ Owner Dashboard</h1>
                    <p>Manage your courts, view bookings, and track revenue.</p>
                    
                    <Button variant="primary" onClick={() => navigate("/manage-courts")}>Manage Courts</Button>
                    <Button variant="danger" onClick={handleLogout} className="mt-0">Logout</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default OwnerDashboard;
