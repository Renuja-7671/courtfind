import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getAllArenas, searchArenas } from "../services/arenaService";

const ExploreNow = () => {
    const [arenas, setArenas] = useState([]);
    const [filters, setFilters] = useState({ sport: "", venue: "" });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllArenas();
            setArenas(data);
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        const data = await searchArenas(filters);
        setArenas(data);
    };

    return (
        <Container className="mt-4">
            <h2>Explore Arenas</h2>

            <Row className="my-3">
                <Col md={5}>
                    <Form.Control
                        placeholder="Sport"
                        value={filters.sport}
                        onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
                    />
                </Col>
                <Col md={5}>
                    <Form.Control
                        placeholder="Enter a venue or city"
                        value={filters.venue}
                        onChange={(e) => setFilters({ ...filters, venue: e.target.value })}
                    />
                </Col>
                <Col md={2}>
                    <Button variant="primary" onClick={handleSearch}>
                        <FaSearch />
                    </Button>
                </Col>
            </Row>

            <Row>
                {arenas.map((arena) => (
                    <Col md={4} key={arena.id} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={`http://localhost:8000/uploads/${arena.image_url}`} />
                            <Card.Body>
                                <Card.Title>{arena.name}</Card.Title>
                                <Card.Text>{arena.city}, {arena.country}</Card.Text>
                                <Card.Text>
                                    <span role="img" aria-label="sport">🏏</span> {arena.sport}
                                </Card.Text>
                                <Button variant="primary">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ExploreNow;
