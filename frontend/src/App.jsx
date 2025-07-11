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
import Homepage from "./views/Home";

// Player Views
import PlayerDashboard from "./views/PlayerDashboard";
import PlayerProfile from "./views/PlayerProfile";
import PlayerChangePassword from "./views/PlayerChangePassword";
import PlayerInvoice from "./views/PlayerInvoice";
import ViewReviews from "./views/ViewReviews";
import FeedbackPage from "./views/Feedback";
import PaymentPage from "./views/paymentPage";
import PaymentSuccess from "./views/PaymentSuccess";
import PaymentCancel from "./views/paymentCancel";

// Owner Views
import OwnerDashboard from "./views/OwnerDashboard";
import ChangePassword from "./views/changePassword";
import OwnerProfile from "./components/OwnerProfile";
import AddArena from "./views/AddArenas";
import AddCourts from "./views/AddCourts";
import ArenaManagement from "./views/ManageArenas";
import OwnerArenaBookings from "./views/OwnerArenaBookings";
import MyProfitPage from "./views/MyProfit";

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
  { path: "/", element: Homepage },
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
  { path: "/dashboard", element: Dashboard },
  { path: "/forgot-password", element: ForgotPasswordPage },
  { path: "/reset-password/:token", element: ResetPasswordPage },
  { path: "/contact", element: ContactUs },
  { path: "/chatbot", element: Chatbot },
  { path: "/explore-now", element: ExploreNow },
  { path: "/view/:courtId", element: ViewingPage },
  { path: "/home", element: Homepage },

];

const playerRoutes = [
  { path: "/player-dashboard", element: PlayerDashboard },
  { path: "/player-profile", element: PlayerProfile },
  { path: "/player-change-password", element: PlayerChangePassword },
  { path: "/player-invoices",element: PlayerInvoice }, 
  { path: "/reviews/:courtId", element: ViewReviews },
  { path: "/feedback/:courtId", element: FeedbackPage},
  { path: "/payment/:total", element: PaymentPage },
  { path: "/payment-success", element: PaymentSuccess }, 
  { path: "/payment-cancel", element: PaymentCancel },
];

const ownerRoutes = [
  { path: "/owner-dashboard", element: OwnerDashboard },
  { path: "/change-password", element: ChangePassword },
  { path: "/owner-profile", element: OwnerProfile },
  { path: "/add-arena", element: AddArena },
  { path: "/add-courts", element: AddCourts },
  { path: "/manage-arenas", element: ArenaManagement },
  { path: "/arena-bookings", element: OwnerArenaBookings },
  { path: "/my-profit", element: MyProfitPage},

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
