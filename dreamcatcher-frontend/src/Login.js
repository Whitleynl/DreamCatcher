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

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', credentials);
    const success = await login(credentials);
    console.log('Login result:', success);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/50 text-red-300 rounded">
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
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;