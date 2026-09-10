import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const restoreAuth = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!token || token === "undefined" || !savedUser) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const currentTime = Date.now() / 1000;

        if (payload.exp && payload.exp < currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setUser(null);
          setLoading(false);
          return;
        }

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;

        setUser(JSON.parse(savedUser));

        const compareProducts = JSON.parse(localStorage.getItem("compareProducts") || "[]");
        setCompareCount(compareProducts.length);
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

  const login = (userData, token) => {
    if (!token || token === "undefined") return;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    axios.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    localStorage.removeItem("searchProducts");
    localStorage.removeItem("compareProducts");

    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
    setWishlistCount(0);
    setCompareCount(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        wishlistCount,
        compareCount,
        setWishlistCount,
        setCompareCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);