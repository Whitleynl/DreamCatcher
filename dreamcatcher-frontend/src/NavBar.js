import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Logo = () => (
  <svg 
    viewBox="0 0 1554 413" 
    className="w-48 h-auto text-gray-100"
    fill="currentColor"
  >
    <path d="M373.56,206.5c0-18.09-7.33-34.46-19.19-46.32,0-16.76-6.39-33.53-19.18-46.31s-29.55-19.18-46.32-19.18c-11.85-11.85-28.23-19.18-46.32-19.18s-34.46,7.33-46.32,19.18c-16.76,0-33.53,6.4-46.32,19.18-12.79,12.79-19.18,29.55-19.18,46.32-11.85,11.85-19.18,28.23-19.18,46.32s7.33,34.46,19.18,46.32c0,16.76,6.4,33.53,19.18,46.32,12.34,12.34,28.37,18.71,44.54,19.14,11.86,11.88,28.25,19.23,46.36,19.23s33.33-6.85,45.07-18c.59.02,1.17.04,1.76.04,16.76,0,33.53-6.39,46.32-19.18,12.8-12.8,19.2-29.59,19.18-46.37,12.57-11.93,20.42-28.79,20.42-47.49Z"/>
  </svg>
);

const NavBar = () => {
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between mb-8 p-6 bg-gray-800 shadow rounded">
      {/* Left section */}
      <div className="w-24">
        {authToken ? (
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Home
          </Link>
        ) : (
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Login
          </Link>
        )}
      </div>

      {/* Center section - Logo */}
      <Link to="/" className="flex justify-center items-center py-2">
        <Logo />
      </Link>

      {/* Right section */}
      <div className="w-24 text-right">
        {authToken ? (
          <button 
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;