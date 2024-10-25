import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import DreamForm from './DreamForm';
import DreamList from './DreamList';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import NavBar from './NavBar';

// Create a wrapper component for protected routes
const ProtectedRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  return authToken ? children : null;
};

function App() {
  const { authToken } = useContext(AuthContext);

  return (
    <Router>
      <div className="container mx-auto p-8">
        <NavBar />
        <Routes>
          {!authToken ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div>
                      <DreamForm />
                      <DreamList />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;