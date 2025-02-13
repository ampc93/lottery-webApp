// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { loginUser, logoutUser, verifyToken } from '../services/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(Cookies.get('authToken') || null);

  const login = async (username, password) => {

    const response = await loginUser(username, password);
    console.log(response?.result?.accessToken);
    if (response?.success && response?.result?.accessToken) {
      setAccessToken(response?.result?.accessToken);
    }

  };

  const logout = async (userId) => {
    await logoutUser(userId);
    setAccessToken(null);
  };

  const verify = async () => {

    const response = await verifyToken();
    if (response?.success && response?.result?.accessToken) {
      setAccessToken(response?.result?.accessToken);
    } else {
      logout(); // Si falla el refresco, cerrar sesión
    }

  };

  useEffect(() => {
    const interval = setInterval(() => {
      verify();
    }, 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
