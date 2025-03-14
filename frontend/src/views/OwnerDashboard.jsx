import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Use global auth state
import OwnerSideMenu from "../components/OwnerSideMenu";
import Sidebar from "../components/ownerSidebar";

const OwnerDashboard = () => {
    const { updateAuthState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove token
        updateAuthState(); // Update global auth state
        navigate("/login"); // Redirect to login
    };

    return (
        <Container className="min-vh-100 d-flex flex-column  align-items-center">
            <Row className="w-100" text-center>
                <Col className="p-4 m-0" xs={12} md={4}>
                    <Sidebar />
                </Col>
            
                <Col className="p-4 m-0" xs={12} md={8}>
                    <h1>🏟️ Owner Dashboard</h1>
                    <p>Manage your courts, view bookings, and track revenue.</p>
                    
                    <Button variant="primary" onClick={() => navigate("/manage-courts")}>Manage Courts</Button>
                    <Button variant="danger" onClick={handleLogout} className="mt-0">Logout</Button>
                    <Button variant="primary" onClick={() => navigate("/change-password")}>Change Password</Button>
                    <Button variant="secondary" onClick={() => navigate("/owner-profile")}>My Profile</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default OwnerDashboard;
