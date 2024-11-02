// NavBar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ReactComponent as LogoSVG } from './logo.svg';

const Logo = () => (
  <div className="relative group">
    <LogoSVG
      className="h-auto w-32 sm:w-48 md:w-56 lg:w-64 xl:w-72 text-gray-100 transition-all duration-500 ease-out
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
    <nav className="flex items-center justify-between mb-8 p-4 bg-gray-800 shadow rounded">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <Logo />
      </Link>

      {/* Right section - Logout button for authenticated users */}
      {authToken && (
        <div className="flex-shrink-0 text-right pr-2 sm:pr-4">
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;