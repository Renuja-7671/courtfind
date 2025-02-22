import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const ForgotPasswordForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const resMessage = await onSubmit(email);
            setMessage(resMessage);
        } catch (err) {
            setError(err);
        }
    };

    return (
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
    );
};

export default ForgotPasswordForm;
