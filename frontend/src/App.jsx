import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
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
import PlayerProfile from "./views/PlayerProfile";
import ChangePassword from './views/changePassword';
import Chatbot from "./components/Chatbot";
import FloatingChatbot from "./components/FloatingChatbot";
import AdminDashboard from "./views/AdminDashboard";

function App() {
    return (
        <AuthProvider>
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
                    <Route path="/player-profile" element={<PlayerProfile />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["Owner"]} />}>
                    <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Route>


                {/* End of Role-based protected routes */}
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
            <FloatingChatbot />
            </div>
            <Footer />
        </Router>
        </AuthProvider>
    );
    
}

export default App;


    
    