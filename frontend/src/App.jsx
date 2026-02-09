import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import MyServices from "./pages/MyServices";
import ServiceDetails from "./pages/ServiceDetails";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services/:id"
        element={
          <ProtectedRoute>
            <ServiceDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-services"
        element={
          <ProtectedRoute allowedRoles={["provider"]}>
            <MyServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;
