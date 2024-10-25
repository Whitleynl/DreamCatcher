import React, { createContext, useState, useEffect } from "react";
import api, { authApi } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.login(credentials);
      setAuthToken(response.data.key);
      return true;
    } catch (error) {
      setError(error.response?.data?.detail || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthToken(null);
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.register(userData);
      if (response.data?.key) {
        setAuthToken(response.data.key);
      }
      return true;
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
      api.defaults.headers.common["Authorization"] = `Token ${authToken}`;
    } else {
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ 
      authToken, 
      loading, 
      error,
      login,
      logout,
      register,
      setError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};