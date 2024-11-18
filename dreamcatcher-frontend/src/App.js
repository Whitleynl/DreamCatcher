import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import { DreamProvider } from './DreamContext';
import DreamForm from './DreamForm';
import DreamList from './DreamList';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';

function App() {
 const { authToken } = useContext(AuthContext);
 
 return (
   <AuthProvider>
     <DreamProvider>
       <Router>
         <div className="min-h-screen bg-gray-900">
           <div className="container mx-auto p-8">
             <NavBar />
             <Routes>
               {/* Public Routes */}
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               
               {/* Protected Routes */}
               <Route
                 path="/"
                 element={
                   <ProtectedRoute>
                     <div className="space-y-8">
                      <div>
                        <DreamList />
                      </div>
                      <div>
                        <DreamForm />
                      </div>
                     </div>
                   </ProtectedRoute>
                 }
               />
               <Route
                 path="/logout"
                 element={
                   <ProtectedRoute>
                     <Logout />
                   </ProtectedRoute>
                 }
               />
               
               {/* Catch-All Route */}
               <Route
                 path="*"
                 element={<Navigate to={authToken ? "/" : "/login"} replace />}
               />
             </Routes>
           </div>
         </div>
       </Router>
     </DreamProvider>
   </AuthProvider>
 );
}

export default App;