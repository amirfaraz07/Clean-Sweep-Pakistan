import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setIsAdmin(savedRole === 'admin');
    }
    setIsLoading(false); // Set loading to false once checked
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setToken(token);
    setIsAdmin(role === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

