import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ReactComponent as LogoSVG } from './logo.svg';

const NavBar = () => {
  const { authToken } = useContext(AuthContext);

  return (
    <nav className="relative flex items-center justify-center mb-8 p-4 bg-gray-800 shadow rounded">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <LogoSVG
          className="h-auto w-32 sm:w-48 md:w-56 lg:w-64 xl:w-72 text-gray-100 transition-all duration-500 ease-out
                     hover:text-blue-400 hover:scale-105"
        />
      </Link>

      {/* Logout Button */}
      {authToken && (
        <div className="absolute right-4">
          <Link
            to="/logout"
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;