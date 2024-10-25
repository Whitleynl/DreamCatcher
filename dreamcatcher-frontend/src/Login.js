import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  // Add test data helper for development
  const fillTestData = () => {
    setCredentials({
      username: 'chingy82', // You can change this to your test username
      password: 'chingchang8282!' // And this to your test password
    });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', credentials); // Debug log
    const success = await login(credentials);
    console.log('Login result:', success); // Debug log
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      {/* Add test data button in development */}
      {process.env.NODE_ENV === 'development' && (
        <button 
          type="button" 
          onClick={fillTestData}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Fill Test Data
        </button>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {typeof error === 'object' ? JSON.stringify(error) : error}
          </div>
        )}
        <div>
          <input
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;