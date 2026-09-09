import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      // No login information
      if (!token || token === "undefined" || !savedUser) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Check JWT token
        const payload = JSON.parse(atob(token.split(".")[1]));

        const currentTime = Date.now() / 1000;

        // Token expired
        if (payload.exp && payload.exp < currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setUser(null);
          setLoading(false);
          return;
        }

        // Restore authorization
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;

        // Restore user
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid token:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  // Login
  const login = (userData, token) => {
    if (!token || token === "undefined") return;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    axios.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear previous user's shopping data
    localStorage.removeItem("searchProducts");
    localStorage.removeItem("compareProducts");

    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);