import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MapView from './pages/MapView';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchShops from './pages/SearchShops';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('map');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [customerName, setCustomerName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setCustomerName(user.name || 'Customer');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setToken(null);
    setCustomerName('');
    setCurrentPage('map');
  };

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setCustomerName(user.name);
    setIsLoggedIn(true);
    setIsNewUser(false);
    setCurrentPage('map');
  };

  const handleRegisterSuccess = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setCustomerName(user.name);
    setIsLoggedIn(true);
    setIsNewUser(false);
    setCurrentPage('map');
  };

  const toggleRegister = () => {
    setIsNewUser(!isNewUser);
  };

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
    setCurrentPage('booking');
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
          <h1>💇 BookBarber - Find Your Barber</h1>
        </div>
        <ul className="navbar-menu">
          <li><button onClick={() => setCurrentPage('map')} className={currentPage === 'map' ? 'active' : ''}>Map</button></li>
          <li><button onClick={() => setCurrentPage('search')} className={currentPage === 'search' ? 'active' : ''}>Search</button></li>
          <li><button onClick={() => setCurrentPage('my-bookings')} className={currentPage === 'my-bookings' ? 'active' : ''}>My Bookings</button></li>
        </ul>
        <div className="navbar-user">
          <span>Welcome, {customerName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="container">
        {currentPage === 'map' && <MapView token={token} onSelectShop={handleSelectShop} />}
        {currentPage === 'search' && <SearchShops token={token} onSelectShop={handleSelectShop} />}
        {currentPage === 'booking' && <BookingForm token={token} shop={selectedShop} onBack={() => setCurrentPage('map')} />}
        {currentPage === 'my-bookings' && <MyBookings token={token} />}
      </div>
    </div>
  );
}

export default App;
