import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap"; // Added Row and Col imports

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // Separate error state
  const [successMessage, setSuccessMessage] = useState(""); // Separate success state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setSuccessMessage("Login successful!"); // Set success message
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed"); // Set error message
      setSuccessMessage(""); // Clear success message on error
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
              <Button variant="link" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </p>
            <Form onSubmit={handleSubmit}>
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
              <Button variant="link" onClick={() => navigate("/forgot-password")}>
                Forgot Password
              </Button> <br />

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>

            <p className="text-justify mt-3">
              By signing in, I agree to the Courtfind Terms of Use and Privacy Policy.
            </p>

            {/* Display success or error message */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
