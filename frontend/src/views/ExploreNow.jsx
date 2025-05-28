import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getAllArenas, searchArenas } from "../services/arenaService";
import { MdOutlineSportsScore } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const ExploreNow = () => {
    const [arenas, setArenas] = useState([]);
    const [filters, setFilters] = useState({ sport: "", venue: "" });
    const navigate = useNavigate();

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

    const handleBookNow = (courtId) => {
    navigate(`/view/${courtId}`);
    };

    return (
        <Container className="py-4 px-5">
            <Row className="my-3 text-center">
            <h2>Explore your desired Arenas</h2>
            </Row>

            <Row className="my-3 w-75 mx-auto align-items-center"> 
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
                            <Card.Img variant="top" width={150} height={200} src={`http://localhost:8000${arena.image_url}`} />
                            <Card.Body>
                                <Card.Title>{arena.name}</Card.Title>
                                <Card.Text>{arena.city}, {arena.country}</Card.Text>
                                <Card.Text>
                                    <span role="img" aria-label="sport"><MdOutlineSportsScore /></span> {arena.sport}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleBookNow(arena.courtId)}>
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ExploreNow;
