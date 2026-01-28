import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function MapView({ token, onSelectShop }) {
  const [shops, setShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(5000); // 5km default

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyShops(longitude, latitude);
        },
        () => {
          console.error('Could not get location');
          setLoading(false);
        }
      );
    }
  }, [radius]);

  const fetchNearbyShops = async (longitude, latitude) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers/nearby`, {
        params: {
          longitude,
          latitude,
          maxDistance: radius
        }
      });
      setShops(response.data.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading nearby shops...</div>;
  }

  return (
    <div className="map-view">
      <div className="map-controls">
        <h2>Find Barber Shops Near You</h2>
        <div className="control-group">
          <label>Search Radius (km)</label>
          <select value={radius / 1000} onChange={(e) => setRadius(e.target.value * 1000)}>
            <option value="1">1 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </div>
      </div>

      <div className="shops-display">
        {shops.length === 0 ? (
          <div className="no-data">
            <p>No barber shops found in your area. Try increasing the search radius.</p>
          </div>
        ) : (
          <div className="shops-list">
            <h3>Found {shops.length} Barber Shops Nearby</h3>
            {shops.map(shop => (
              <div key={shop._id} className="shop-item">
                <div className="shop-info">
                  <h4>{shop.shopName}</h4>
                  <p>📍 {shop.address}, {shop.city}</p>
                  <p>📞 {shop.phone}</p>
                  <p>⭐ Rating: {shop.rating.toFixed(1)} ({shop.reviewCount} reviews)</p>
                  <p>⏰ {shop.openingTime} - {shop.closingTime}</p>
                </div>
                <button onClick={() => onSelectShop(shop)} className="book-btn">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="map-info">
        <p>💡 Your current location has been detected. Tap "Book Now" to schedule an appointment!</p>
      </div>
    </div>
  );
}

export default MapView;
