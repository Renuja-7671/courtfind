import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/assets/logo.png"; // since it's in public/assets
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Use global auth state
import {
  FaHome,
  FaUsers,
  FaUserAlt,
  FaDollarSign,
  FaTags,
  FaBug,
  FaStar,
  FaCog,
  FaSearch,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon, label, isSettings }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "8px",
        textDecoration: "none",
        color: isActive ? "violet" : "white",
        backgroundColor: isActive ? "rgba(128, 0, 128, 0.1)" : "transparent",
      })}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "violet";
      }}
      onMouseLeave={(e) => {
        if (!e.currentTarget.classList.contains("active")) {
          e.currentTarget.style.color = "white";
        }
      }}
    >
      {icon}
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
    </NavLink>
  );
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useAuth();
  
  // Protect this layout
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Map paths to titles
  const pageMeta = {
    "/admin-dashboard": {
      title: "Dashboard",
      icon: <FaHome />,
    },
    "/admin-owners": {
      title: "Arena Owners",
      icon: <FaUsers />,
    },
    "/admin-players": {
      title: "Players",
      icon: <FaUserAlt />,
    },
    "/admin-profit": {
      title: "Profit Analysis",
      icon: <FaDollarSign />,
    },
    "/admin-pricing": {
      title: "Pricing",
      icon: <FaTags />,
    },
    "/admin-bugs": {
      title: "Bug Tracker",
      icon: <FaBug />,
    },
    "/admin-reviews": {
      title: "Reviews",
      icon: <FaStar />,
    },
    "/admin-settings": {
      title: "Account Settings",
      icon: <FaCog />,
    },
  };

  const currentMeta = pageMeta[location.pathname] || {
    title: "Admin Panel",
    icon: null,
  };

  const user = {
    name: "Ms. Melissa",
    avatar: "https://i.pravatar.cc/40?img=47", // Replace with actual avatar URL if available
  };

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };


  const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();           // This clears localStorage and state
  navigate("/login"); // Now you can safely redirect
};

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#0a1120",
        color: "white",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          padding: "20px",
          borderRight: "1px solid #1e293b",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "250px", marginBottom: "20px" }}
        />
        <input
          type="text"
          placeholder="Search for..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "none",
            outline: "none",
          }}
        />
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <SidebarLink
            to="/admin-dashboard"
            icon={<FaHome />}
            label="Dashboard"
          />
          <SidebarLink
            to="/admin-owners"
            icon={<FaUsers />}
            label="Arena Owners"
          />
          <SidebarLink
            to="/admin-players"
            icon={<FaUserAlt />}
            label="Players"
          />
          <SidebarLink
            to="/admin-profit"
            icon={<FaDollarSign />}
            label="Profit Analysis"
          />
          <SidebarLink to="/admin-pricing" icon={<FaTags />} label="Pricing" />
          <SidebarLink to="/admin-bugs" icon={<FaBug />} label="Bug Tracker" />
          <SidebarLink to="/admin-reviews" icon={<FaStar />} label="Reviews" />

          {/* Divider Line */}
          <hr style={{ borderColor: "004377", margin: "10px 0" }} />

          <SidebarLink
            to="/admin-settings"
            icon={<FaCog />}
            label="Account Settings"
            isSettings
          />
          {/* Divider Line */}
          <hr style={{ borderColor: "004377", margin: "10px 0" }} />
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {currentMeta && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Left: Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "white",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              {currentMeta.icon}
              <h2 style={{ margin: 0 }}>{currentMeta.title}</h2>
            </div>

            {/* Right: Profile */}
            <div className="profile-dropdown" style={{ position: "relative" }}>
              <div
                onClick={toggleDropdown}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <img
                  src={user.avatar}
                  alt="Profile"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span>{user.name}</span>
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: 0,
                    backgroundColor: "#1e293b",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    padding: "10px",
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "5px 10px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
