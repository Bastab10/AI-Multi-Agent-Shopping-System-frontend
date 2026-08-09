import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load saved user on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      setUser(null);
      return;
    }

    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check token expiry
      const currentTime = Date.now() / 1000;

      if (payload.exp && payload.exp < currentTime) {
        // Token expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        return;
      }

      // Token still valid
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Invalid token:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // Login
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
