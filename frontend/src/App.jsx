import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

// Common Views
import Login from "./views/Login";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import ContactUs from "./views/ContactUs";
import Chatbot from "./components/Chatbot";
import ExploreNow from "./views/ExploreNow";

// Player Views
import PlayerDashboard from "./views/PlayerDashboard";
import PlayerProfile from "./views/PlayerProfile";

// Owner Views
import OwnerDashboard from "./views/OwnerDashboard";
import ChangePassword from "./views/changePassword";
import OwnerProfile from "./components/OwnerProfile";

// Admin Views
import AdminDashboard from "./views/AdminDashboard";
import AdminBugs from "./views/AdminBugs";
import AdminOwners from "./views/AdminOwners";
import AdminPlayers from "./views/AdminPlayers";
import AdminPricing from "./views/AdminPricing";
import AdminProfit from "./views/AdminProfit";
import AdminReviews from "./views/AdminReviews";
import AdminSettings from "./views/AdminSettings";

// Helper component for wrapping routes with layout
const withLayout = (Component) => (
  <MainLayout>
    <Component />
  </MainLayout>
);

// Route configs
const commonRoutes = [
  { path: "/", element: Login },
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
  { path: "/dashboard", element: Dashboard },
  { path: "/forgot-password", element: ForgotPasswordPage },
  { path: "/reset-password/:token", element: ResetPasswordPage },
  { path: "/contact", element: ContactUs },
  { path: "/chatbot", element: Chatbot },
  { path: "/explore-now", element: ExploreNow }
];

const playerRoutes = [
  { path: "/player-dashboard", element: PlayerDashboard },
  { path: "/player-profile", element: PlayerProfile }
];

const ownerRoutes = [
  { path: "/owner-dashboard", element: OwnerDashboard },
  { path: "/change-password", element: ChangePassword },
  { path: "/owner-profile", element: OwnerProfile }
];

const adminRoutes = [
  { path: "/admin-dashboard", element: AdminDashboard },
  { path: "/admin-owners", element: AdminOwners },
  { path: "/admin-players", element: AdminPlayers },
  { path: "/admin-profit", element: AdminProfit },
  { path: "/admin-pricing", element: AdminPricing },
  { path: "/admin-bugs", element: AdminBugs },
  { path: "/admin-reviews", element: AdminReviews },
  { path: "/admin-settings", element: AdminSettings }
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Common Routes */}
          {commonRoutes.map(({ path, element: Component }) => (
            <Route key={path} path={path} element={withLayout(Component)} />
          ))}

          {/* Player Routes */}
          <Route element={<PrivateRoute allowedRoles={["Player"]} />}>
            {playerRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={withLayout(Component)} />
            ))}
          </Route>

          {/* Owner Routes */}
          <Route element={<PrivateRoute allowedRoles={["Owner"]} />}>
            {ownerRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={withLayout(Component)} />
            ))}
          </Route>

          {/* Admin Routes - No layout */}
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            {adminRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
