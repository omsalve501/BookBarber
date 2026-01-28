import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './pages/Dashboard';
import RegisterShop from './pages/RegisterShop';
import ManageShop from './pages/ManageShop';
import Bookings from './pages/Bookings';
import TimeSlots from './pages/TimeSlots';
import Login from './pages/Login';
import Register from './pages/Register';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [partnerName, setPartnerName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setPartnerName(user.name || 'Partner');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setToken(null);
    setPartnerName('');
    setCurrentPage('dashboard');
  };

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setPartnerName(user.name);
    setIsLoggedIn(true);
    setIsNewUser(false);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setPartnerName(user.name);
    setIsLoggedIn(true);
    setIsNewUser(false);
    setCurrentPage('register-shop');
  };

  const toggleRegister = () => {
    setIsNewUser(!isNewUser);
  };

  if (!isLoggedIn) {
    return isNewUser ? 
      <Register onRegisterSuccess={handleRegisterSuccess} onToggleLogin={toggleRegister} /> :
      <Login onLoginSuccess={handleLoginSuccess} onToggleRegister={toggleRegister} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>💈 BookBarber Partner Portal</h1>
        </div>
        <ul className="navbar-menu">
          <li><button onClick={() => setCurrentPage('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>Dashboard</button></li>
          <li><button onClick={() => setCurrentPage('register-shop')} className={currentPage === 'register-shop' ? 'active' : ''}>Register Shop</button></li>
          <li><button onClick={() => setCurrentPage('manage-shop')} className={currentPage === 'manage-shop' ? 'active' : ''}>Manage Shop</button></li>
          <li><button onClick={() => setCurrentPage('bookings')} className={currentPage === 'bookings' ? 'active' : ''}>Bookings</button></li>
          <li><button onClick={() => setCurrentPage('time-slots')} className={currentPage === 'time-slots' ? 'active' : ''}>Time Slots</button></li>
        </ul>
        <div className="navbar-user">
          <span>Welcome, {partnerName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="container">
        {currentPage === 'dashboard' && <Dashboard token={token} />}
        {currentPage === 'register-shop' && <RegisterShop token={token} />}
        {currentPage === 'manage-shop' && <ManageShop token={token} />}
        {currentPage === 'bookings' && <Bookings token={token} />}
        {currentPage === 'time-slots' && <TimeSlots token={token} />}
      </div>
    </div>
  );
}

export default App;
