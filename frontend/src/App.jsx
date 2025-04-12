import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
import ChangePassword from "./views/changePassword";
import Chatbot from "./components/Chatbot";
import OwnerProfile from "./components/OwnerProfile";
import MainLayout from "./components/MainLayout"; //import common components to player and owner

//admin routes
import AdminDashboard from "./views/AdminDashboard";
import AdminBugs from "./views/AdminBugs";
import AdminOwners from "./views/AdminOwners";
import AdminPlayers from "./views/AdminPlayers";
import AdminPricing from "./views/AdminPricing";
import AdminProfit from "./views/AdminProfit";
import AdminReviews from "./views/AdminReviews";
import AdminSettings from "./views/AdminSettings";


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <NavigationBar />
            <div className="content">  */}
        <Routes>
          {/*common routes with layout */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <MainLayout>
                <Signup />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <MainLayout>
                <ForgotPasswordPage />
              </MainLayout>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <MainLayout>
                <ResetPasswordPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactUs />
              </MainLayout>
            }
          />

          {/* Role-based protected routes */}
          {/* Player Routes with Layout */}
          <Route element={<PrivateRoute allowedRoles={["Player"]} />}>
            <Route
              path="/player-dashboard"
              element={
                <MainLayout>
                  <PlayerDashboard />
                </MainLayout>
              }
            />
            <Route
              path="/player-profile"
              element={
                <MainLayout>
                  <PlayerProfile />
                </MainLayout>
              }
            />
          </Route>

          {/* Owner Routes with Layout */}

          <Route element={<PrivateRoute allowedRoles={["Owner"]} />}>
            <Route
              path="/owner-dashboard"
              element={
                <MainLayout>
                  <OwnerDashboard />
                </MainLayout>
              }
            />
            <Route
              path="/change-password"
              element={
                <MainLayout>
                  <ChangePassword />
                </MainLayout>
              }
            />
            <Route
              path="/owner-profile"
              element={
                <MainLayout>
                  <OwnerProfile />
                </MainLayout>
              }
            />
          </Route>

          {/* Admin Route WITHOUT MainLayout */}

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            <Route path="/" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-owners" element={<AdminOwners />} />
            <Route path="/admin-players" element={<AdminPlayers />} />
            <Route path="/admin-profit" element={<AdminProfit />} />
            <Route path="/admin-pricing" element={<AdminPricing />} />
            <Route path="/admin-bugs" element={<AdminBugs />} />
            <Route path="/admin-reviews" element={<AdminReviews />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
          </Route>

          {/* End of Role-based protected routes */}
          <Route
            path="/chatbot"
            element={
              <MainLayout>
                <Chatbot />
              </MainLayout>
            }
          />
        </Routes>
        {/*
            <FloatingChatbot />
            </div>  
            <Footer />*/}
      </Router>
    </AuthProvider>
  );
}

export default App;
