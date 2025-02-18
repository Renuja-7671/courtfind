import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <Container className="min-vh-100 d-flex justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <div className="p-4 shadow-sm border rounded">
                        <h2 className="text-left mb-4">Log In</h2>
                        <p className="text-left">
                            Don't have a Courtfind account?{" "}
                            <Button variant="link" onClick={() => navigate("/register")}>
                                Sign Up
                            </Button>
                        </p>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label> <br />
                                <Form.Control
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group> <br />

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group> <br />
                            <Button variant="link" onClick={() => navigate("/forgetpassword")}>
                                Forget Password
                            </Button> <br />

                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Login
                            </Button>
                        </Form>
                        

                        <p className="text-justify mt-3">
                            By signing in, I agree to the Courtfind Terms of Use and Privacy Policy.
                        </p>

                        {message && <Alert variant={message.includes("failed") ? "danger" : "success"}>{message}</Alert>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
