import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function BarberShops({ token }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, [token]);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/barber-shops`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShops(response.data.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (shopId) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/barber-shops/${shopId}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchShops();
    } catch (error) {
      console.error('Error verifying shop:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="barber-shops-page">
      <h2>Manage Barber Shops</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Partner</th>
            <th>City</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map(shop => (
            <tr key={shop._id}>
              <td>{shop.shopName}</td>
              <td>{shop.partnerId?.name}</td>
              <td>{shop.city}</td>
              <td>{shop.phone}</td>
              <td>
                <span className={`badge ${shop.isVerified ? 'verified' : 'unverified'}`}>
                  {shop.isVerified ? '✅ Verified' : '⏳ Pending'}
                </span>
              </td>
              <td>⭐ {shop.rating.toFixed(1)}</td>
              <td>
                <button 
                  onClick={() => handleVerify(shop._id)}
                  className="btn-success"
                  disabled={shop.isVerified}
                >
                  {shop.isVerified ? 'Verified' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BarberShops;
