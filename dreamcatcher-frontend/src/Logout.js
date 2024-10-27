// Logout.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLogout = async () => {
      try {
        console.log('Starting logout process');
        await logout();
        console.log('Logout successful, navigating to login');
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/login');
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-100"></div>
      <span className="ml-2 text-gray-100">Logging out...</span>
    </div>
  );
};

export default Logout;