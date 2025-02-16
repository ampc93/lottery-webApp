// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { loginUser, logoutUser, verifyToken } from '../services/authService.js';
import { getUserById } from '../services/userProfileService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(Cookies.get('authToken') || null);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {

    const response = await loginUser(username, password);
    if (response?.success && response?.result?.accessToken) {
      setAccessToken(response?.result?.accessToken);
      await fetchUserData();
    }

  };

  const logout = async (userId) => {
    await logoutUser(userId);
    setAccessToken(null);
  };

  const verify = async () => {

    const userId = parseJwt(accessToken)?.id;
    const response = await verifyToken();
    
    if (response?.success && response?.result?.accessToken) {
      setAccessToken(response?.result?.accessToken);
    } else {
      if(userId){
        await logoutUser(userId); // Si falla el refresco, cerrar sesión
        }
    }

  };

  const fetchUserData = async () =>{

    try {

      if(accessToken){
        const userId = parseJwt(accessToken)?.id;
        if(userId){
          const userData = await getUserById(userId);
          setUser(userData?.data);
        }
      }

    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }

  };

  useEffect(() =>{
    if(accessToken){
      fetchUserData();
    }
  }, [accessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      verify();
    }, 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };


  return (
    <AuthContext.Provider value={{ accessToken, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
