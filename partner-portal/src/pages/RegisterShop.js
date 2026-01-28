import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function RegisterShop({ token }) {
  const [formData, setFormData] = useState({
    shopName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    openingTime: '09:00',
    closingTime: '18:00',
    slotDuration: 30,
    slotPrice: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }));
        setSuccess('Location captured successfully');
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_BASE_URL}/partners/register-shop`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setFormData({
          shopName: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          latitude: '',
          longitude: '',
          openingTime: '09:00',
          closingTime: '18:00',
          slotDuration: 30,
          slotPrice: 0
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-shop-page">
      <h2>Register Your Barber Shop</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="shop-form">
        <fieldset>
          <legend>Shop Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Shop Name *</label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
                placeholder="ABC Barber Shop"
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="shop@email.com"
              />
            </div>
            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Shop Address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="State"
              />
            </div>
            <div className="form-group">
              <label>Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="12345"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Location</legend>
          <button type="button" onClick={getCurrentLocation} className="location-btn">
            📍 Get Current Location
          </button>
          <div className="form-row">
            <div className="form-group">
              <label>Latitude *</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="0.000001"
                required
                placeholder="40.7128"
              />
            </div>
            <div className="form-group">
              <label>Longitude *</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="0.000001"
                required
                placeholder="-74.0060"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Business Hours</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Slot Duration (minutes)</label>
              <input
                type="number"
                name="slotDuration"
                value={formData.slotDuration}
                onChange={handleChange}
                min="15"
                max="120"
              />
            </div>
            <div className="form-group">
              <label>Slot Price ($)</label>
              <input
                type="number"
                name="slotPrice"
                value={formData.slotPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </fieldset>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Registering...' : 'Register Shop'}
        </button>
      </form>
    </div>
  );
}

export default RegisterShop;
