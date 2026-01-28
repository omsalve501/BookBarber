import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function Bookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="bookings-page">
      <h2>All Bookings</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Barber Shop</th>
            <th>Service</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.customerId?.name}</td>
              <td>{booking.barberShopId?.shopName}</td>
              <td>{booking.serviceType}</td>
              <td>
                {new Date(booking.bookingDate).toLocaleDateString()} {booking.startTime}
              </td>
              <td>
                <span className={`badge ${booking.status}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                <span className={`badge ${booking.paymentStatus}`}>
                  {booking.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
