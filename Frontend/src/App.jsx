import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center' }}>Loading Notes-Maker...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
            user ? (
              <Navigate to="/notes" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/register" element={
            user ? (
              <Navigate to="/notes" replace />
            ) : (
              <Register onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/notes" element={
            user ? (
              <Notes user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={user ? "/notes" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
