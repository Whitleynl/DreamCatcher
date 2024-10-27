import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Logo = () => (
  <div className="relative group">
    <svg 
      viewBox="0 0 1554 413" 
      className="w-48 h-auto text-gray-100 transition-all duration-500 ease-out
                group-hover:text-blue-400 group-hover:scale-105
                filter group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.3)]"
    >
      <path d="M373.56,206.5c0-18.09-7.33-34.46-19.19-46.32,0-16.76-6.39-33.53-19.18-46.31s-29.55-19.18-46.32-19.18c-11.85-11.85-28.23-19.18-46.32-19.18s-34.46,7.33-46.32,19.18c-16.76,0-33.53,6.4-46.32,19.18-12.79,12.79-19.18,29.55-19.18,46.32-11.85,11.85-19.18,28.23-19.18,46.32s7.33,34.46,19.18,46.32c0,16.76,6.4,33.53,19.18,46.32,12.34,12.34,28.37,18.71,44.54,19.14,11.86,11.88,28.25,19.23,46.36,19.23s33.33-6.85,45.07-18c.59.02,1.17.04,1.76.04,16.76,0,33.53-6.39,46.32-19.18,12.8-12.8,19.2-29.59,19.18-46.37,12.57-11.93,20.42-28.79,20.42-47.49Z" className="fill-current" />
      <g className="fill-current">
        <path d="M472.03,248.95c-7.68,8.08-17.14,13.2-28.76,13.2-19.31,0-34.48-14.38-34.48-37.04s16.55-40.19,38.61-40.19c9.46,0,17.34,2.56,24.63,7.09v-35.46c0-2.76,2.36-4.93,4.92-4.93,2.76,0,4.93,2.17,4.93,4.93v100.67c0,2.76-2.17,4.93-4.93,4.93-2.56,0-4.92-2.36-4.92-4.93v-8.27Z" />
        {/* ... rest of your text paths ... */}
      </g>
    </svg>
    <div className="absolute inset-0 -z-10 bg-blue-500/0 group-hover:bg-blue-500/5 
                    rounded-full blur-xl transition-all duration-500 
                    scale-0 group-hover:scale-150"></div>
  </div>
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