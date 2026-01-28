import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function ManageShop({ token }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingShop, setEditingShop] = useState(null);

  useEffect(() => {
    fetchShops();
  }, [token]);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/partners/my-shops`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShops(response.data.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (shop) => {
    setEditingShop(shop);
  };

  const handleSave = async (updatedShop) => {
    try {
      await axios.put(`${API_BASE_URL}/partners/shops/${updatedShop._id}`, updatedShop, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingShop(null);
      fetchShops();
    } catch (error) {
      console.error('Error updating shop:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-shop-page">
      <h2>Manage Your Barber Shops</h2>
      {shops.length === 0 ? (
        <div className="no-data">
          <p>No shops registered yet. Register your first shop to get started!</p>
        </div>
      ) : (
        <div className="shops-grid">
          {shops.map(shop => (
            <div key={shop._id} className="shop-card">
              <h3>{shop.shopName}</h3>
              <p><strong>Location:</strong> {shop.address}, {shop.city}</p>
              <p><strong>Phone:</strong> {shop.phone}</p>
              <p><strong>Status:</strong> <span className={`badge ${shop.isVerified ? 'verified' : 'unverified'}`}>
                {shop.isVerified ? '✅ Verified' : '⏳ Pending'}
              </span></p>
              <p><strong>Rating:</strong> ⭐ {shop.rating.toFixed(1)}</p>
              <button onClick={() => handleEdit(shop)} className="btn-edit">Edit Shop</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageShop;
