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

  // Add test data helper
  const fillTestData = () => {
    const random = Math.random().toString(36).substring(7);
    const testData = {
      username: `testuser_${random}`,
      email: `test_${random}@example.com`,
      password1: 'TestPass123!',
      password2: 'TestPass123!'
    };
    setFormData(testData);
    console.log('Test data filled:', testData); // Debug log
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Attempting registration with:', formData); // Debug log
    console.log('Current API URL:', process.env.REACT_APP_BACKEND_URL); // Debug log
    const success = await register(formData);
    console.log('Registration result:', success); // Debug log
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

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;