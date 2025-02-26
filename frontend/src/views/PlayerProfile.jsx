import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlayerProfile = () => {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <Row className="w-100 text-center">
                <Col>
                    <h1>🎾 Player Profile</h1>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>John Doe</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> john.doe@example.com
                            </Card.Text>
                            <Card.Text>
                                <strong>Matches Played:</strong> 10
                            </Card.Text>
                            <Card.Text>
                                <strong>Wins:</strong> 7
                            </Card.Text>
                            <Card.Text>
                                <strong>Losses:</strong> 3
                            </Card.Text>
                            <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlayerProfile;