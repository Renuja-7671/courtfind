import React, { useState } from "react";
import { Card, Image, Container, Row, Col,Button,Modal } from "react-bootstrap";
import { FaEdit, FaCalendarAlt, FaClock } from "react-icons/fa";
import PlayerNavbar from "../components/Player/Navbar";

const PlayerDashboard = () => {
  const [profilePic, setProfilePic] = useState("/assets/Profilepic.png");
  const [clickedItem, setClickedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);


  const [bookings, setBookings] = useState([
    { id: 1, stadium: "R. Premadasa Stadium", date: "29 / 11 / 2022", time: "11:30 a.m. - 1:30 p.m.", status: "ACTIVE", image: "https://via.placeholder.com/300" },
    { id: 2, stadium: "Pallekele Stadium", date: "29 / 11 / 2022", time: "11:30 a.m. - 1:30 p.m.", status: "PAST", image: "https://via.placeholder.com/300" },
    { id: 3, stadium: "Galle Cricket Stadium", date: "29 / 11 / 2022", time: "11:30 a.m. - 1:30 p.m.", status: "CANCELLED", image: "https://via.placeholder.com/300" }
  ]);

  const handleProfilePicChange = (event) => {
    const file=event.target.filese[0];
    if (file){
    const newPic = URL.createObjectURL(file);
    setProfilePic(newPic);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "ACTIVE": return { color: "#28a745", dotColor: "#28a745" };
      case "PAST": return { color: "#6c757d", dotColor: "#6c757d" };
      case "CANCELLED": return { color: "#dc3545", dotColor: "#dc3545" };
      default: return { color: "#6c757d", dotColor: "#6c757d" };
    }
  };

  const handleCancelBooking = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowModal(true);
  };

  const confirmCancelBooking = () => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === selectedBooking) {
        return { ...booking, status: "CANCELLED" };
      }
      return booking;
    });
    // Update the state with new booking data
    setBookings(updatedBookings);
    setShowModal(false);
  };

  return (
    <div style={{ backgroundColor: "#e9f5ff", minHeight: "100vh", display: "flex" }}>
      {/* PlayerNavbar */}
      <div style={{ minWidth:"360px"}}>
      <PlayerNavbar />
      </div>
      
      <Container className="flex-grow-1 d-flex flex-column align-items-center mt-4">
        <Card className="text-center p-4 shadow-sm rounded w-75 position-relative">
        <div style={{
    backgroundColor: "#003366",
    width: "100%",
    height: "80px",
    position: "absolute",
    top: "0",
    left: "0",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    zIndex: "0"
  }}></div>

  <div className="position-relative d-flex flex-column align-items-center">
    {/* Profile Picture */}
    <div className="position-relative" style={{zIndex:"1",marginTop:"40px"}}>
            <Image src={profilePic} roundedCircle width={120} height={120} className="shadow" />
           <label htmlFor="profilePicInput">
            <FaEdit className="position-absolute bg-white p-1 rounded-circle shadow"
              style={{ cursor: "pointer", bottom: "0px", right: "0px", fontSize: "16px", color: "black", border: "2px solid white", width: "28px", height: "28px" }}/>
                            </label>
                            <input type="file" id="profilePicInput" style={{ display: "none" }}
              onChange={handleProfilePicChange}
          />
          </div>
          <h4 className="mt-2">Hi, Patty 👋</h4>
          <p className="text-muted mb-0">Joined Since Jan, 2025</p>
        </div>
        </Card>

        <Card className="mt-4 p-3 shadow-sm rounded w-75" style={{ backgroundColor: "#e9f5ff" }}>
          <h5 className="mb-3">My Bookings</h5>
          {bookings.map((booking) => (
            <Card key={booking.id} className="my-2 p-3 shadow-sm rounded"
              style={{ borderLeft: `5px solid ${getStatusStyles(booking.status).dotColor}`, background: clickedItem === booking.id ? "#0056b3" : "#ffffff", color: clickedItem === booking.id ? "#fff" : "#000", cursor: "pointer",transition:"0.3s",  boxShadow: clickedItem === booking.id ? "0px 4px 6px rgba(0,0,0,0.1)" : "none", }}
              onClick={() => setClickedItem(clickedItem === booking.id ? null : booking.id)}>
              <Row className="align-items-center">
                <Col xs={3}>
                  <Image src={booking.image} width={80} height={50} className="rounded" style={{ filter: booking.status === "CANCELLED" ? "grayscale(80%)" : "none" }} />
                </Col>
                <Col xs={6}>
                  <h6 className="mb-1">{booking.stadium}</h6>
                  <p className="text-muted small mb-1"><FaCalendarAlt className="me-1" /> {booking.date}</p>
                  <p className="text-muted small mb-0"><FaClock className="me-1" /> {booking.time}</p>
                </Col>
                <Col xs={3} className="d-flex flex-column align-items-center justify-content-center">
                  <div style={{ width: "10px", height: "10px", backgroundColor: getStatusStyles(booking.status).dotColor, borderRadius: "50%", marginBottom: "5px" }}></div>
                  <span className="fw-bold" style={{ fontSize: "14px", color: getStatusStyles(booking.status).color }}>{booking.status}</span>
                  {booking.status === "ACTIVE" && (
                    <Button variant="danger" size="sm" disabled={selectedBooking === booking.id} onClick={(e) => { e.stopPropagation(); handleCancelBooking(booking.id); }}>
                      Cancel Booking
                    </Button>
                  )}
                
                </Col>
              </Row>
            </Card>
          ))}
        </Card>
      </Container>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>No, Keep It</Button>
          <Button variant="danger" onClick={confirmCancelBooking}>Yes, Cancel It</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default PlayerDashboard;

