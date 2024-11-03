import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ReactComponent as LogoSVG } from './logo3.svg';

const NavBar = () => {
  const { authToken } = useContext(AuthContext);

  return (
    <nav className="relative flex items-center justify-center mb-8 p-4 bg-gray-800 shadow rounded">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <LogoSVG
          className="h-auto w-48 sm:w-48 md:w-64 lg:w-80 xl:w-96 text-gray-100 transition-all duration-500 ease-out
                     hover:text-blue-400 hover:scale-105"
        />
      </Link>

      {/* Logout Button */}
      {authToken && (
        <div className="absolute right-5"> 
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