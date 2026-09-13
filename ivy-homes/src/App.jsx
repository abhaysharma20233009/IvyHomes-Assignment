import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/common/Navbar";

import Login from "./pages/Login";
import ListingsPage from "./pages/ListingsPage";
import Analytics from "./pages/Analytics";
import ListingDetailPage from "./pages/ListingDetailPage";
import SavedListingsPage from "./pages/SavedListingsPage";
import RentalsPage from "./pages/RentalsPage";
import ProjectsPage from "./pages/ProjectsPage";
import NotFound from "./pages/NotFound";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { SavedListingsProvider } from "./context/SavedListingsContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/:id"
          element={
            <ProtectedRoute>
              <ListingDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rentals"
          element={
            <ProtectedRoute>
              <RentalsPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/Analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SavedListingsProvider>
          <AppRoutes />
        </SavedListingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}