import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function MyBookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="no-data">
          <p>You haven't booked any appointments yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.barberShopId?.shopName}</h3>
                <span className={`badge ${booking.status}`}>{booking.status}</span>
              </div>
              
              <div className="booking-details">
                <p><strong>Service:</strong> {booking.serviceType}</p>
                <p><strong>Date & Time:</strong> {new Date(booking.bookingDate).toLocaleDateString()} at {booking.startTime}</p>
                <p><strong>Address:</strong> {booking.barberShopId?.address}</p>
                <p><strong>Phone:</strong> {booking.barberShopId?.phone}</p>
                <p><strong>Payment:</strong> <span className={`badge ${booking.paymentStatus}`}>{booking.paymentStatus}</span></p>
              </div>

              {booking.notes && (
                <div className="booking-notes">
                  <p><strong>Notes:</strong> {booking.notes}</p>
                </div>
              )}

              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <button 
                  onClick={() => handleCancel(booking._id)}
                  className="cancel-btn"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
