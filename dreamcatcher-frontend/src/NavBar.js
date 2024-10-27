import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const NavBar = () => {
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center mb-8 p-4 bg-gray-800 shadow rounded">
      {authToken ? (
        <>
          <Link to="/" className="text-blue-500 hover:text-blue-300 transition-colors">Home</Link>
          <button 
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Login</Link>
          <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;