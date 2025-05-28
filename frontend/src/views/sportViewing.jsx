import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner, Form, Carousel } from 'react-bootstrap';
import { getCourtsForBooking } from '../services/courtService';
import { createBooking } from '../services/bookingService';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from 'react-icons/fa';
import { MdOutlineSportsScore } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const ViewingPage = () => {
  const { courtId } = useParams();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const availability = court?.availability || {};
  const isDayClosed = selectedDate && (() => {
    const dayName = new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' });
    const dayAvail = availability[dayName];
    return !dayAvail || !dayAvail.open || !dayAvail.close;
  })();
  const { authToken } = useAuth();
  const { isAuth, userRole } = useAuth();
  const navigate = useNavigate();
  


  useEffect(() => {
    const fetchCourt = async () => {
      try {
        const response = await getCourtsForBooking(courtId);
        if (response.success) {
            const fetchedCourt = response.court;
            // Convert images from JSON string to array
            if (typeof fetchedCourt.images === 'string') 
            {
                try {
                    fetchedCourt.images = JSON.parse(fetchedCourt.images);
                } catch (err) {
                    console.error("Invalid images JSON format", err);
                    fetchedCourt.images = [];
                }
            }

                // Parse availability
            if (typeof fetchedCourt.availability === 'string') {
              try {
                fetchedCourt.availability = JSON.parse(fetchedCourt.availability);
              } catch (err) {
                console.error("Invalid availability JSON format", err);
                fetchedCourt.availability = {};
              }
            }
            setCourt(fetchedCourt);
        }
        } catch (error) {
        console.error("Error fetching court:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourt();
  }, [courtId]);

  // Handle booking submission
  const handleBooking = async () => {
    if (!isLoggedInPlayer()) {
    alert("You must be logged in as a player to book a court.");
    navigate('/login', { replace: true, state: { from: location.pathname } });
    return;
  }
    if (!selectedDate || !selectedTime || !duration) return;

    const startHour = parseInt(selectedTime.split(':')[0]);
    const endHour = startHour + parseInt(duration);
    const endTime = `${endHour}:00`;

    const bookingData = {
      courtId: court.courtId,
      booking_date: selectedDate,
      start_time: selectedTime,
      end_time: endTime,
      total_price: court.hourly_rate * parseInt(duration),
      payment_status: 'Pending',
      status: 'Booked',
      owner_id: court.owner_id,
      arenaId: court.arenaId,
    };

    try {
      const res = await createBooking(bookingData, authToken);
      if (res.booking) {
        alert("Booking successful!");
        setSelectedDate('');
        setSelectedTime('');
        setDuration('');
      } else {
        alert("Booking failed: " + res.error);
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    }
  };

  // Check if the logged-in user is a player
  const isLoggedInPlayer = () => {
    return isAuth && userRole === 'Player';
  };


  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="my-5 px-5">
      <h2>{court.arenaName} - {court.courtName}</h2>
      <p>{court.city}, {court.country}</p>

      <Row className="mb-4">
        <Col md={6}>
          <Card>          
            {court.images && court.images.length > 0 ? (
                <Carousel>
                {court.images.map((img, index) => (
                    <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/${img}`}
                        alt={`Court image ${index + 1}`}
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                    </Carousel.Item>
                ))}
                </Carousel>
            ) : (
                <Card.Img variant="top" src="/default-court.jpg" />
            )}
          </Card>
        </Col>
        <Col md={6}>
        <Card className="shadow-sm">
          <Card.Body  className='text-center'>
          <h3>Venue Information</h3>
          <p><strong> About: </strong>{court.description}</p>
          <p><FaMapMarkerAlt /><strong> Address:</strong> {court.city}, {court.country}</p>
          <p><FaPhoneAlt /><strong> Call Us: </strong> {court.mobile}</p>
          <div>
            <h4>4.2 <FaStar className="text-warning" /></h4>
            <p><a href="#">20 Ratings</a> | <a href="#">05 Reviews</a></p>
          </div>
          </Card.Body>
          
          <Card.Footer className="text-center">
          <h3>Court Details</h3>
          <p><strong>Sport: </strong> 
            <span className="badge bg-danger text-white d-inline-flex align-items-center px-2 py-1" style={{ fontSize: "1rem" }}>
              <MdOutlineSportsScore className="me-1" /> {court.sport}
            </span>
          </p>
          <div className=" badge bg-primary text-white p-3 rounded shadow-sm my-3">
            <p className="mb-0 fs-5">
              <strong>Price:</strong> {court.hourly_rate} LKR / Hr
            </p>
          </div>
          <p><strong>Size:</strong> {court.size} Square Feet</p>
          </Card.Footer>
        </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="text-center my-4">
          <hr/>
          <div className="bg-light p-3 rounded">
            <h5 className="text-center mb-3">Weekly Availability</h5>
            <table className="table table-bordered text-center">
              <thead className="table-secondary">
                <tr>
                  <th>Day</th>
                  <th>Opening Time</th>
                  <th>Closing Time</th>
                </tr>
              </thead>
              <tbody>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const dayInfo = availability[day];
                  return (
                    <tr key={day} className={day === new Date().toLocaleString('en-US', { weekday: 'long' }) ? 'table-primary' : ''}>
                      <td>{day}</td>
                      <td>{dayInfo?.open || 'Closed'}</td>
                      <td>{dayInfo?.close || 'Closed'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </Col> 
      </Row>

      <Row>
        <Row className="text-center my-4">
          <Col className="text-center my-4">
            <hr />
            <h3>Reserve Your Spot</h3>
            <p>Select a date and time to book your court.</p>
          </Col>
        </Row>
        <Row>
        <Col md={6}>
          <h5>Make a Booking</h5>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Select a date</Form.Label>
              <Form.Control type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Start Time</Form.Label>
              <Form.Control as="select" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
                <option value="">Select time</option>
                {(() => {
                  if (!selectedDate) return null;
                  
                  const dayName = new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' });
                  const dayAvail = availability[dayName];
                  if (!dayAvail || !dayAvail.open || !dayAvail.close) return <option disabled>No available times</option>;

                  const openHour = parseInt(dayAvail.open.split(':')[0]);
                  const closeHour = parseInt(dayAvail.close.split(':')[0]);

                  const options = [];
                  for (let h = openHour; h < closeHour; h++) {
                    options.push(
                      <option key={h} value={`${h}:00`}>{`${h}:00`}</option>
                    );
                  }

                  return options;
                })()}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Duration</Form.Label>
              <Form.Control as="select" value={duration} onChange={e => setDuration(e.target.value)}>
                <option value="">Select duration</option>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              disabled={
                !selectedDate || !selectedTime || !duration || isDayClosed || !isLoggedInPlayer()
              }
              onClick={handleBooking}
            >
              Reserve and Book Now
            </Button>

            {!isLoggedInPlayer() && (
              <p className="text-danger mt-2">
                Please&nbsp;
                <span
                  className="text-decoration-underline"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  log&nbsp;in&nbsp;as&nbsp;a&nbsp;Player
                </span>
                &nbsp;to make a booking.
              </p>
            )}

            {isDayClosed && <p className="text-danger mt-2">The selected day is closed for bookings.</p>}
          </Form>
        </Col>
        <Col md={6}>
          <h5>Booking Summary</h5>
          <Card className="shadow-sm">
            <Card.Body>
              <p><strong>Date:</strong> {selectedDate || 'Not selected'}</p>
              <p><strong>Time:</strong> {selectedTime || 'Not selected'}</p>
              <p><strong>Duration:</strong> {duration ? `${duration} Hour(s)` : 'Not selected'}</p>
              <p><strong>Total Cost:</strong> {selectedTime && duration ? `${court.hourly_rate * duration} LKR` : 'N/A'}</p>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ViewingPage;
