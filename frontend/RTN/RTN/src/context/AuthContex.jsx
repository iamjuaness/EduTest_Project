import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth.js";

// Context
export const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  // Register
  const signUp = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors([error?.response?.data?.message || "Registration error"]);
    }
  };

  // Login
  const signIn = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors([error?.response?.data?.message || "Login error"]);
    }
  };

  // Logout
  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logOut,
        isAuthenticated,
        errors,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
