import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import AdminLayout from "../components/AdminLayout";
import { getAllReviews } from "../services/adminAuthService";

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getAllReviews(token);
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [token]);

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
    };

    const handleSeeLess = () => {
        setVisibleCount(prevCount => Math.max(5, prevCount - 5));
    };

    return (
        <AdminLayout>
            <Container className="py-4">
                <h2 className="text-white mb-4">All Reviews</h2>

                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="light" />
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-white">No reviews found.</p>
                ) : (
                    reviews.slice(0, visibleCount).map((review, index) => (
                        <Card key={index} className="mb-3 bg-dark text-white">
                            <Card.Body>
                                <Row>
                                    <Col md={8}>
                                        <Card.Title>
                                            <h6>Arena Name: </h6>
                                            {review.arenaName}
                                        </Card.Title>
                                        <div>
                                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                        </div>
                                        <Card.Subtitle className="mt-2 text-info">
                                            by {review.playerName}
                                        </Card.Subtitle>
                                        <Card.Text className="mt-2">
                                            {review.comment}
                                        </Card.Text>
                                    </Col>
                                    <Col md={4} className="text-md-end text-start mt-3 mt-md-0">
                                        <small>
                                            {new Date(review.reviewDate).toLocaleDateString()}
                                        </small>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                )}

                <div className="d-flex justify-content-center mt-4 gap-3">
                    {visibleCount < reviews.length && (
                        <Button variant="primary" size="lg" onClick={handleSeeMore}>
                            See More
                        </Button>
                    )}
                    {visibleCount > 5 && (
                        <Button variant="secondary" size="lg" onClick={handleSeeLess}>
                            See Less
                        </Button>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export default AdminReviews;
