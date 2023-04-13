import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('Lekpay');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (Aname, Apassword) => {
    try {
      const response = await axios.post('http://localhost:8004/admin/login', {
        Aname,
        Apassword,
      });
      const { token } = response.data.token;

      setToken(token);
      localStorage.setItem('Lekpay', token);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('Lekpay');
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  const authContextValue = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
