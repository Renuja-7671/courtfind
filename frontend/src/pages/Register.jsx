import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Register = () => {
    const [formData, setFormData] = useState({
        role: "",
        firstName: "",
        lastName: "",
        mobile: "",
        country: "",
        province: "",
        zip: "",
        address: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const API_URL = "http://localhost:8000";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/register`, formData);
            setMessage(res.data.message);
            
            // Clear the form after successful registration
            setFormData({
                role: "",
                firstName: "",
                lastName: "",
                mobile: "",
                country: "",
                province: "",
                zip: "",
                address: "",
                email: "",
                password: ""
            });
    
            // Navigate to login page after a delay
            setTimeout(() => {
                navigate("/login"); // Change this if needed
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };
    

    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <div className="p-4 shadow-sm border rounded bg-white">
                        <h2 className="mb-4 text-center">Registration Form</h2>
                        <p className="text-left">
                            Already have a Courtfind account?{" "}
                            <Button variant="link" onClick={() => navigate("/login")}>
                                Log In
                            </Button>
                        </p>
                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3">
                                        <Form.Label>Choose your role *</Form.Label>
                                        <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                                            <option value="">Select Role</option>
                                            <option value="Player">Player</option>
                                            <option value="Owner">Arena Owner</option>
                                        </Form.Select>
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Phone"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select name="country" value={formData.country} onChange={handleChange}>
                                            <option value="">Select Country</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="India">India</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Province</Form.Label>
                                        <Form.Select name="province" value={formData.province} onChange={handleChange}>
                                            <option value="">Select Province</option>
                                            <option value="Western">Western Province</option>
                                            <option value="Central">Central Province</option>
                                            <option value="Southern">Southern Province</option>
                                            <option value="North-Western">North-Western Province</option>
                                            <option value="Sabaragamuwa">Sabaragamuwa Province</option>
                                            <option value="Northern">Nothern Province</option>
                                            <option value="Eastern">Eastern Province</option>
                                            <option value="Uva">Uva Province</option>
                                            <option value="North-Central">North-Central Province</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="zip"
                                            placeholder="Zip Code"
                                            value={formData.zip}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Register
                            </Button>
                        </Form>
                        <p className="text-justify mt-3">
                            By signing up, I agree to the Courtfind Terms of Use and Privacy Policy.
                        </p>
                        {message && <Alert variant={message.includes("failed") ? "danger" : "success"} className="mt-3">{message}</Alert>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
