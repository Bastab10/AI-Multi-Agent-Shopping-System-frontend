import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Compare from "./pages/Compare";
import Auth from "./pages/Auth";
import AuthSuccess from "./pages/AuthSuccess";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* Google Callback */}
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/compare"
          element={
            <ProtectedRoute>
              <Compare />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;