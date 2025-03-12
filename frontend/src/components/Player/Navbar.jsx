import React from "react";
import { NavLink } from "react-router-dom";
import { FaClipboardList, FaFileInvoice, FaUser, FaLock, FaSignOutAlt } from "react-icons/fa";
import { Card } from "react-bootstrap";

const PlayerNavbar = () => {
  return (
    <div className="d-flex flex-column p-3" style={{ width: "250px", backgroundColor: "#f8f9fa",  height: "100vh",marginLeft:"130px" }}>
      {/* Section: Me */}
      <Card className="mb-3 p-3 shadow-sm border-0 rounded-lg" style={{backgroundColor:"#e3eaf1"}}>
        <h6 className="fw-bold text-dark mb-2">Me</h6>
        <NavLink to="/player-dashboard" className="nav-link text-primary">
          <FaClipboardList className="me-2" /> My Bookings
        </NavLink>
        <NavLink to="/player-invoices" className="nav-link text-primary">
          <FaFileInvoice className="me-2" /> My Invoices
        </NavLink>
      </Card>

      {/* Section: Account Settings */}
      <Card className="mb-3 p-3 shadow-sm  border-0 rounded-lg" style={{backgroundColor: "#e3eaf1" }}>
        <h6 className="fw-bold text-dark mb-2">Account Settings</h6>
        <NavLink to="/player-profile" className="nav-link text-primary">
          <FaUser className="me-2" /> My Profile
        </NavLink>
        <NavLink to="/change-password" className="nav-link text-primary" >
          <FaLock className="me-2" /> Change Password
        </NavLink>
      </Card>

      {/* Section: Logout */}
      <Card className="p-3 shadow-sm  border-0 rounded-lg" style={{ backgroundColor: "#e3eaf1" }} >
        <NavLink to="/logout" className="nav-link text-danger fw-bold">
          <FaSignOutAlt className="me-2" /> Log Out
        </NavLink>
      </Card>
    </div>
  );
};

const PlayerDashboard = () => {
  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar */}
      <PlayerNavbar />

      {/* Content Area */}
      <div className="flex-grow-1">
        {/* Your Dashboard Content */}
      </div>
    </div>
  );
};

export default PlayerDashboard;
