import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";


// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51RirFIFwBYKnL5Z3swzBJJ1N9TUIe9fIJKvXcnw6NH1V3pSWagHy9fHBiuIbMAEsKj6rvxIyUyGBde8CCvy0arXB00ToVFYydf");

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#212529",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#adb5bd",
      },
    },
    invalid: {
      color: "#dc3545",
    },
  },
};


const CheckoutForm = () => {
  const { total } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (total) setAmount(total);
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const conversionRate = 300; // 1 USD = 300 LKR
    const amountInUSD = total / conversionRate;
    const amountInCents = Math.round(amountInUSD * 100);
    setAmount(amountInCents);


    if (!stripe || !elements) return;

    try {
      const res = await fetch("http://localhost:8000/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInCents }),
      });

      const { clientSecret, error } = await res.json();

      if (error) {
        setMessage({ type: "danger", text: error });
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        setMessage({ type: "danger", text: result.error.message });
        setTimeout(() => {
            navigate(`/payment-cancel`);
        }, 3000);
        
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage({ type: "success", text: "✅ Payment successful! Thank you." });
        setTimeout(() => {
            navigate(`/payment-success`);
        }, 3000);
      }
    } catch (err) {
      setMessage({ type: "danger", text: "❌ Server error: " + err.message });
    }

    setLoading(false);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="text-center mb-4">Stripe Secure Payment Gateway</h4>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <div className="p-2 border rounded">
                    <CardNumberElement options={ELEMENT_OPTIONS} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <div className="p-2 border rounded">
                    <CardExpiryElement options={ELEMENT_OPTIONS} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CVC</Form.Label>
                  <div className="p-2 border rounded">
                    <CardCvcElement options={ELEMENT_OPTIONS} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount (LKR)</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100"
                  disabled={!stripe || loading}
                >
                  {loading ? <Spinner size="sm" animation="border" /> : `Pay LKR ${amount}`}
                </Button>

                {message && (
                  <Alert variant={message.type} className="mt-3">
                    {message.text}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
