import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Attempting registration with:', formData);
    const success = await register(formData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/50 text-red-300 rounded">
            {typeof error === 'object' ? JSON.stringify(error) : error}
          </div>
        )}
        <div>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="password1"
            type="password"
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={formData.password2}
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;