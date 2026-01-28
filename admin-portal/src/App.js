import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import BarberShops from './pages/BarberShops';
import Bookings from './pages/Bookings';
import Login from './pages/Login';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setAdminName(user.name || 'Admin');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setToken(null);
    setCurrentPage('dashboard');
  };

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setAdminName(user.name);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>📊 BookBarber Admin</h1>
        </div>
        <ul className="navbar-menu">
          <li><button onClick={() => setCurrentPage('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>Dashboard</button></li>
          <li><button onClick={() => setCurrentPage('users')} className={currentPage === 'users' ? 'active' : ''}>Users</button></li>
          <li><button onClick={() => setCurrentPage('barber-shops')} className={currentPage === 'barber-shops' ? 'active' : ''}>Barber Shops</button></li>
          <li><button onClick={() => setCurrentPage('bookings')} className={currentPage === 'bookings' ? 'active' : ''}>Bookings</button></li>
        </ul>
        <div className="navbar-user">
          <span>Welcome, {adminName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="container">
        {currentPage === 'dashboard' && <Dashboard token={token} />}
        {currentPage === 'users' && <Users token={token} />}
        {currentPage === 'barber-shops' && <BarberShops token={token} />}
        {currentPage === 'bookings' && <Bookings token={token} />}
      </div>
    </div>
  );
}

export default App;
