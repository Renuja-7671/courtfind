import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = "http://localhost:8000"; // Change to your backend API

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(`${API_URL}/reset-password`, { email });
            setMessage(response.data.message);
            
            // Redirect after delay
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Try again.");
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center min-vh-100 justify-content-center">
            <div className="text-left w-50">
                <h2 className="mb-4">Reset Password</h2>
                <p className="mb-5">Enter the email address associated with your account, and we'll send a confirmation link.</p>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-5">
                        <Form.Label>Your Email Address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">Send</Button>
                </Form>

                {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </div>
        </Container>
    );
};

export default ForgotPassword;
