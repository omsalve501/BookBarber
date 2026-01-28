import React, { useEffect, useState } from 'react';

function Dashboard({ token }) {
  const [shopCount, setShopCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    // Fetch shop and booking stats
    // This will be connected to the API
  }, [token]);

  return (
    <div className="dashboard">
      <h2>Partner Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Registered Shops</h3>
          <p className="stat-number">{shopCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-number">{bookingCount}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">$0</p>
        </div>
      </div>
      <div className="dashboard-info">
        <h3>Quick Start</h3>
        <ul>
          <li>📋 Register your barber shop</li>
          <li>⏰ Create time slots for bookings</li>
          <li>📅 Manage your appointments</li>
          <li>⭐ Build your ratings and reviews</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
