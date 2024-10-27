import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ReactComponent as LogoSVG } from './logo.svg';

const Logo = () => (
  <div className="relative group">
    <LogoSVG
      className="w-48 h-auto text-gray-100 transition-all duration-500 ease-out
                 group-hover:text-blue-400 group-hover:scale-105"
    />
    {/* Background effect */}
    <div
      className="absolute inset-0 -z-10 bg-blue-500/0 group-hover:bg-blue-500/5 
                 rounded-full blur-xl transition-all duration-500 
                 scale-0 group-hover:scale-150"
    ></div>
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
    <nav className="flex items-center justify-between mb-8 p-3 bg-gray-800 shadow rounded">
      {/* Left section */}
      <div className="w-16 sm:w-32">
        {authToken ? (
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Home
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Login
          </Link>
        )}
      </div>

      {/* Center section - Logo */}
      <div className="flex-1 flex justify-center max-w-[200px] sm:max-w-none">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* Right section */}
      <div className="w-16 sm:w-32 text-right">
        {authToken ? (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 transition-colors text-sm sm:text-base"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
          >
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;