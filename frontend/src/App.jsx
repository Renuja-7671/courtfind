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
import ViewingPage from "./views/sportViewing";

// Player Views
import PlayerDashboard from "./views/PlayerDashboard";
import PlayerProfile from "./views/PlayerProfile";
import PlayerChangePassword from "./views/PlayerChangePassword";
import PlayerInvoice from "./views/PlayerInvoice";

// Owner Views
import OwnerDashboard from "./views/OwnerDashboard";
import ChangePassword from "./views/changePassword";
import OwnerProfile from "./components/OwnerProfile";
import AddArena from "./views/AddArenas";
import AddCourts from "./views/AddCourts";

// Admin Views
import AdminDashboard from "./views/AdminDashboard";
import AdminMessagesPage from "./views/AdminViewMessages";
import AdminOwners from "./views/AdminOwners";
import AdminPlayers from "./views/AdminPlayers";
import AdminPricing from "./views/AdminPricing";
import AdminSports from "./views/AdminSports";
import AdminProfit from "./views/AdminProfit";
import AdminReviews from "./views/AdminReviews";
import AdminProfile from "./views/AdminProfile";


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
  { path: "/explore-now", element: ExploreNow },
  { path: "/view/:courtId", element: ViewingPage },
];

const playerRoutes = [
  { path: "/player-dashboard", element: PlayerDashboard },
  { path: "/player-profile", element: PlayerProfile },
  { path: "/player-change-password", element: PlayerChangePassword },
  {path: "/player-invoices",element: PlayerInvoice},
];

const ownerRoutes = [
  { path: "/owner-dashboard", element: OwnerDashboard },
  { path: "/change-password", element: ChangePassword },
  { path: "/owner-profile", element: OwnerProfile },
  { path: "/add-arena", element: AddArena },
  { path: "/add-courts", element: AddCourts },
];

const adminRoutes = [
  { path: "/admin-dashboard", element: AdminDashboard },
  { path: "/admin-owners", element: AdminOwners },
  { path: "/admin-players", element: AdminPlayers },
  { path: "/admin-profit", element: AdminProfit },
  { path: "/admin-pricing", element: AdminPricing },
  { path: "/admin-sports", element: AdminSports },
  { path: "/admin-messages", element: AdminMessagesPage },
  { path: "/admin-reviews", element: AdminReviews },
  { path: "/admin-profile", element: AdminProfile }
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
