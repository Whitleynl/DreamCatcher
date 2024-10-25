import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const NavBar = () => {
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    // Force a page refresh to clear any stale state
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center mb-8 p-4 bg-white shadow rounded">
      {authToken ? (
        <>
          <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
          <button 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
          <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;