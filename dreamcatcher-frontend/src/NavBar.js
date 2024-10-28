import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ReactComponent as LogoSVG } from './logo.svg';

const Logo = () => (
  <div className="relative group">
    <LogoSVG
      className="w-72 h-auto text-gray-100 transition-all duration-500 ease-out
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
      {/* Left section - now empty */}
      <div className="w-8 sm:w-16">
        {/* Empty div to maintain spacing */}
      </div>

      {/* Center section - Logo (acts as home button) */}
      <Link to="/" className="flex justify-center items-center">
        <Logo />
      </Link>

      {/* Right section - only Logout/Login */}
      <div className="w-8 sm:w-16 text-right">
        {authToken ? (
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
          <Link
            to="/login"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Register
          </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;