import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const API_URL = "http://localhost:8000";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/contact`, formData);
            setFeedback("Your message has been sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            setFeedback("Failed to send the message. Please try again.");
        }
    };

    return (
        <Container className="min-vh-100 d-flex justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={5}>
                    <div className="p-4 shadow-sm border rounded">
                        <h2 className="text-left mb-4">Send Us a Massage</h2>
                        <p className="text-left">
                            You can Contact us with anyhthing related to our Services.
                            We'll get in touch with you as soon as possible. 
                        </p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group> <br />

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group> <br />

                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group> <br />

                            <Form.Group controlId="formMessage">
                                <Form.Label>Your Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group> <br />

                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Submit
                            </Button>
                        </Form>

                        {feedback && <Alert variant={feedback.includes("failed") ? "danger" : "success"} className="mt-3">{feedback}</Alert>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
