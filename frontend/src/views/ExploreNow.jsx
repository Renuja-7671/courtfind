import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getAllArenas, searchArenas } from "../services/arenaService";
import { MdOutlineSportsScore } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

const ExploreNow = () => {
    const [arenas, setArenas] = useState([]);
    const [filters, setFilters] = useState({ sport: "", venue: "" });
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const sportId = searchParams.get("sportId");
            const sport = searchParams.get("sport") || "";
            const venue = searchParams.get("venue") || "";

            // Pre-populate filters from query parameters
            setFilters(prev => ({ ...prev, sport, venue }));

            let updatedSport = sport;
            if (sportId) {
                try {
                    //console.log("Fetching sport for sportId:", sportId); // Debug log
                    const response = await fetch(`http://localhost:8000/common/sport`);
                    const sports = await response.json();
                    console.log("Sports data:", sports); // Debug log
                    updatedSport = sports.find(s => s.id === parseInt(sportId))?.name || "";
                    console.log("Mapped sport name:", updatedSport); // Debug log
                    if (!updatedSport) {
                        console.warn("No sport name found for sportId:", sportId);
                    }
                    setFilters(prev => ({ ...prev, sport: updatedSport }));
                } catch (error) {
                    console.error("Error fetching sport name:", error);
                }
            }

            // Wait for filters to update before searching
            if (updatedSport || venue) {
                console.log("Searching with filters:", { sport: updatedSport, venue }); // Debug log
                const data = await searchArenas({ sport: updatedSport, venue });
                console.log("Search results:", data); // Debug log
                setArenas(data);
            } else {
                const data = await getAllArenas();
                setArenas(data);
            }
        };
        fetchData();
    }, [searchParams]);

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
                            <Card.Img variant="top" 
                                src={`http://localhost:8000${arena.image_url}`} 
                                style={{ height: "200px", width: "100%", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{arena.arenaName} <br/> {arena.courtName}</Card.Title>
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