import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const PaymentSuccess = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow p-4">
        
            <Card.Body>
              <h3 className="text-success">Payment Successful!</h3>
              <p className="text-muted">Your booking has been confirmed. Thank you for using our service.</p>
              <Button variant="success" href="/player-dashboard">
                Go to Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;