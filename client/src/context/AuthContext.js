import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for Auth
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state
  const [authLoading, setAuthLoading] = useState(true); // For loading state during initial authentication check

  useEffect(() => {
    // Check if there's a stored user in localStorage or sessionStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser) {
      setUser(storedUser);  // Set user state if a valid user is found
    }
    
    // Set loading to false after checking auth state
    setAuthLoading(false);
  }, []);

  const login = (userData) => {
    console.log("Logging in user:", userData); // Debug user data
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };


  const logout = () => {
    setUser(null); // Log the user out
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
