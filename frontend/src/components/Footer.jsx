import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
    const fullStyle = {
        backgroundColor: "#0b162c",
        padding: "0px 120px 0px 120px ",
    };

    const footerStyle = {
        backgroundColor: "#0b162c",
        color: "#fff",
        padding: "30px 0px 0px 0px ",
        textAlign: "center",
    };

    const linkStyle = {
        color: "#fff",
        textDecoration: "none",
        display: "block",
        marginBottom: "5px",
    };

    return (
        <>
        <div style={fullStyle}>
        <footer style={footerStyle}>
            <Container>
                <Row>
                    <Col>
                        <img src="/assets/logo.png" alt="CourtFind Logo" style={{ height: "90px" }} />
                        <p>Sign Up and Connect With Us</p>
                        <Button as={Link} to="/signup" variant="primary" style={{ backgroundColor: "#007bff", border: "none" }}>
                            Sign up
                        </Button>
                    </Col>
                    <Col>
                        <h6>About</h6>
                        <Link to="/about" style={linkStyle}>About Us</Link>
                        <Link to="/blog" style={linkStyle}>Blog</Link>
                        <Link to="/careers" style={linkStyle}>Careers</Link>
                    </Col>
                    <Col>
                        <h6>Support</h6>
                        <Link to="/contact" style={linkStyle}>Contact Us</Link>
                        <Link to="/chatbot" style={linkStyle}>Help Centre</Link>
                    </Col>
                </Row>
                <hr style={{ backgroundColor: "#fff", opacity: 0.2, margin: "20px 0" }} />
                <Row>
                <p style={{ textAlign: "left", padding: "0px 0px 0px 65px" }}>© 2025 | Courtfind Web Solutions Reg No. 620250204651231</p>
                </Row>
            </Container>
        </footer>
        </div>
        </>
        
        
    );
};

export default Footer;
