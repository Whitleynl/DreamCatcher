import React, { createContext, useState, useEffect } from "react";
import api, { authApi } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    console.log('Login attempt with credentials:', {
      username: credentials.username,
      passwordLength: credentials.password?.length || 0
    }); // Log credentials (safely)
    
    try {
      setLoading(true);
      setError(null);
      console.log('Making login request to:', `${process.env.REACT_APP_BACKEND_URL}/auth/login/`);
      
      const response = await authApi.login(credentials);
      console.log('Login response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });

      if (response.data?.key) {
        console.log('Token received:', response.data.key.substring(0, 10) + '...');
        setAuthToken(response.data.key);
        return true;
      } else {
        console.warn('No token in response:', response.data);
        setError('Login successful but no token received');
        return false;
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        }
      });
      
      // Set a more user-friendly error message
      if (error.response?.status === 400) {
        setError(error.response.data?.non_field_errors?.[0] || 'Invalid credentials');
      } else if (error.response?.status === 404) {
        setError('Login service not available');
      } else {
        setError('Login failed: ' + (error.response?.data?.detail || error.message));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('Attempting logout');
    try {
      setLoading(true);
      setError(null);
      await authApi.logout();
      console.log('Logout API call successful');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      console.log('Clearing auth token');
      setAuthToken(null);
      setLoading(false);
    }
  };

  const register = async (userData) => {
    console.log('Registration attempt with:', {
      username: userData.username,
      email: userData.email,
      passwordsMatch: userData.password1 === userData.password2
    });
    
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.register(userData);
      console.log('Registration response:', {
        status: response.status,
        data: response.data
      });
      
      if (response.data?.key) {
        setAuthToken(response.data.key);
      }
      return true;
    } catch (error) {
      console.error('Registration error:', {
        status: error.response?.status,
        data: error.response?.data
      });
      setError(error.response?.data || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Auth token changed:', authToken ? 'Token present' : 'No token');
    if (authToken) {
      localStorage.setItem("authToken", authToken);
      api.defaults.headers.common["Authorization"] = `Token ${authToken}`;
      console.log('Set auth header and local storage');
    } else {
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
      console.log('Cleared auth header and local storage');
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