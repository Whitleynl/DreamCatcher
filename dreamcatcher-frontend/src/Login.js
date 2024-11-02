import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { login, loading, error, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">Login</h2>
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
      <p className="text-gray-400 mt-6 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;