import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { forgotPassword } from "../services/authService";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const handleForgotPassword = async (email) => {
        const response = await forgotPassword(email);

        // Redirect after delay
        setTimeout(() => {
            navigate("/login");
        }, 3000);

        return response.message;
    };

    return (
        <Container className="d-flex flex-column align-items-center min-vh-100 justify-content-center">
            <ForgotPasswordForm onSubmit={handleForgotPassword} />
        </Container>
    );
};

export default ForgotPasswordPage;
