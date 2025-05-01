import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser, FaPlus, FaChartBar, FaCog } from "react-icons/fa";

const OwnerSideMenu = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="sidebar">
            {/* Search Bar */}
            <Form.Control type="text" placeholder="🔍 Search for..." className="mb-3 search-bar" />

            {/* Menu Items */}
            <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => navigate('/owner-dashboard')} className="menu-item active">
                    <FaHome className="menu-icon" /><span className="active-text">Dashboard</span>
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/owner/bookings')} className="menu-item">
                    <FaCalendarAlt className="menu-icon" /> Arena Bookings
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/owner/arenas')} className="menu-item">
                    <FaUser className="menu-icon" /> My Arenas
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/owner/add-arena')} className="menu-item">
                    <FaPlus className="menu-icon" /> Add Arena
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/owner/profits')} className="menu-item">
                    <FaChartBar className="menu-icon" /> My Profits
                </ListGroup.Item>
                <hr className="divider" />
                <ListGroup.Item action onClick={() => navigate('/owner-profile')} className="menu-item ">
                    <FaCog className="menu-icon" /> Account Settings
                </ListGroup.Item>
                <hr className="divider" />
                <ListGroup.Item className="profile-section">
                    <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
                    Robert Andrew
                </ListGroup.Item>
            </ListGroup>
        </div>
        <style>
            {`.sidebar {
                background-color: rgba(206, 221, 251, 1); /* Light blue */
                padding: 15px;
                height: 75vh;
                width: 250px;
                display: flex-start;
                flex-direction: column;
                border-radius: 25px;
            }

            .search-bar {
                background-color: white;
                border-radius: 20px;
                padding: 5px 10px;
                font-size: 14px;
            }

            .menu-item {
                display: flex;
                align-items: center;
                gap: 10px;
                background-color: transparent;
                border: none;
                padding: 10px;
                font-size: 16px;
                color: black;
                transition: background 0.3s, color 0.3s;
            }

            .menu-item:hover {
                background-color: rgba(0, 0, 255, 0.1);
                color: blue;
            }

            .menu-item.active {
                background-color: rgba(0, 0, 255, 0.2);
                color: blue;
                font-weight: bold;
            }

            .menu-icon {
                font-size: 18px;
            }

            .divider {
                margin: 10px 0;
                border-top: 1px solid #000000;
            }

            .profile-section {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                font-weight: bold;
            }

            .profile-pic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            `}
        </style>
        </>
    );
};

export default OwnerSideMenu;