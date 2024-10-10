import React, { useState, useContext } from 'react';
import api from './api';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [success, setSuccess] = useState(false); // <-- Add it here

  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/registration/', formData);

      if (response.status === 204) {
        console.log("Registration successful with no additional response data.");
        setSuccess(true);
        setAuthToken('');
      } else {
        setAuthToken(response.data.key);
        setSuccess(true);
      }
      
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Registration error:', error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  };

  return (
    <div>
      {success ? (
        <div>Registration successful! Welcome!</div>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password1"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            name="password2"
            type="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;