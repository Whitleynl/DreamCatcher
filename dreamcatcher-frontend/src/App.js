// src/App.js
import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext
import DreamForm from './DreamForm';
import DreamList from './DreamList';
import Register from './Register'; // Import Register component
import Login from './Login';       // Import Login component
import Logout from './Logout';     // Import Logout component
import NavBar from './NavBar';     // Optional: Import NavBar component

function App() {
  const { authToken } = useContext(AuthContext); // Access authentication state

  return (
    <Router>
      <div className="container mx-auto p-8">
        <NavBar /> {/* Optional: Include a navigation bar */}
        <Routes>
          {/* Routes accessible to unauthenticated users */}
          {!authToken ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Redirect any other path to /login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Routes accessible to authenticated users */}
              <Route
                path="/"
                element={
                  <>
                    <DreamForm />
                    <DreamList />
                  </>
                }
              />
              <Route path="/logout" element={<Logout />} />
              {/* Redirect any other path to / */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;