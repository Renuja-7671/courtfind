import React, { useState } from "react";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Row, Col, InputGroup } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Sidebar from "../components/ownerSidebar";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("danger"); // Alert type
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match");
            setVariant("danger");
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            setMessage("Password changed successfully!");
            setVariant("success");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setTimeout(() => navigate("/owner-dashboard"), 2000); // Redirect after success
        } catch (error) {
            setMessage(error);
            setVariant("danger");
        }
    };

    return (
        <Container className="min-vh-100 d-flex flex-column  align-items-center">
                <Row className="w-100" text-center>
                <Col className="p-4 m-0"  md={3}>
                    <Sidebar />
                </Col>
                <Col className="p-4 m-0"  md={2}>
                </Col>
                <Col md={6} lg={5} className="p-4 m-0 align-self-center justify-content-center">
                    <div className="p-4 shadow-sm border rounded">
                        <h2 className="mb-4">Change Password</h2>
                        {message && <Alert variant={variant}>{message}</Alert>}
                        <Form onSubmit={handleChangePassword}>

                            <Form.Group className="mb-3" controlId="currentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <InputGroup>
                                <Form.Control
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <Button 
                                    variant="light" 
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </Button>
                                </InputGroup>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <InputGroup>
                                <Form.Control
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <Button 
                                    variant="light" 
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </Button>
                                </InputGroup>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Button 
                                    variant="light" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </Button>
                                </InputGroup>
                            </Form.Group>
                            <br />

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;