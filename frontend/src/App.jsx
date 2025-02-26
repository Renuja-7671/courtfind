import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import ContactUs from "./views/ContactUs";
import PlayerDashboard from "./views/PlayerDashboard";
import OwnerDashboard from "./views/OwnerDashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <NavigationBar />
            <div className="content">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/contact" element={<ContactUs />} />
                {/* Role-based protected routes */}
                <Route element={<PrivateRoute allowedRoles={["Player"]} />}>
                    <Route path="/player-dashboard" element={<PlayerDashboard />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["Owner"]} />}>
                    <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                </Route>
            </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;


    
    