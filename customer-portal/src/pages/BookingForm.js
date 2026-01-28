import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function BookingForm({ token, shop, onBack }) {
  const [formData, setFormData] = useState({
    serviceType: 'haircut',
    bookingDate: '',
    startTime: '',
    notes: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (formData.bookingDate && shop) {
      fetchAvailableSlots();
    }
  }, [formData.bookingDate, shop]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/slots/${shop._id}`, {
        params: { date: formData.bookingDate }
      });
      setAvailableSlots(response.data.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const slot = availableSlots.find(s => s.startTime === formData.startTime);
      
      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        {
          barberShopId: shop._id,
          serviceType: formData.serviceType,
          bookingDate: new Date(formData.bookingDate),
          startTime: formData.startTime,
          endTime: slot?.endTime || formData.startTime,
          notes: formData.notes
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessage('✅ Booking confirmed! Check your bookings for details.');
        setTimeout(() => onBack(), 2000);
      }
    } catch (error) {
      setMessage('❌ Booking failed. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="booking-form-container">
      <button onClick={onBack} className="back-btn">← Back</button>
      
      <div className="booking-card">
        <h2>Book Appointment at {shop?.shopName}</h2>
        <p>📍 {shop?.address}</p>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Service Type *</label>
            <select 
              name="serviceType" 
              value={formData.serviceType} 
              onChange={handleChange}
            >
              <option value="haircut">Haircut</option>
              <option value="shave">Shave</option>
              <option value="beard">Beard Trim</option>
              <option value="coloring">Hair Coloring</option>
              <option value="styling">Styling</option>
              <option value="treatment">Treatment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Booking Date *</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              min={getTodayDate()}
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot *</label>
            {availableSlots.length === 0 ? (
              <p className="no-slots">No slots available for selected date</p>
            ) : (
              <select 
                name="startTime" 
                value={formData.startTime} 
                onChange={handleChange}
                required
              >
                <option value="">Select a time...</option>
                {availableSlots.map(slot => (
                  <option key={slot._id} value={slot.startTime}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or preferences..."
              rows="3"
            />
          </div>

          <button type="submit" disabled={loading} className="book-btn">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
