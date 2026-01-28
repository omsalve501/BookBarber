import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function TimeSlots({ token }) {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [slotDuration, setSlotDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchShops();
  }, [token]);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/partners/my-shops`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShops(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedShop(response.data.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  const handleCreateSlots = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/partners/time-slots`,
        {
          barberShopId: selectedShop,
          date,
          startTime,
          endTime,
          slotDuration: parseInt(slotDuration)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage(`✅ ${response.data.message}`);
        setDate('');
        setStartTime('09:00');
        setEndTime('18:00');
      }
    } catch (error) {
      setMessage('❌ Failed to create time slots');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="time-slots-page">
      <h2>Create Time Slots</h2>
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleCreateSlots} className="time-slots-form">
        <div className="form-group">
          <label>Select Barber Shop *</label>
          <select value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)} required>
            <option value="">Choose a shop...</option>
            {shops.map(shop => (
              <option key={shop._id} value={shop._id}>{shop.shopName}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Time *</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>End Time *</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Slot Duration (minutes)</label>
            <select value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)}>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">1 hour</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Time Slots'}
        </button>
      </form>
    </div>
  );
}

export default TimeSlots;
