import React, { useEffect, useState } from 'axios';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function SearchShops({ token, onSelectShop }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/customers/search`, {
        params: {
          query: searchQuery,
          city
        }
      });
      setShops(response.data.data);
    } catch (error) {
      console.error('Error searching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h2>Search Barber Shops</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by shop name or service..."
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <button type="submit" disabled={loading} className="search-btn">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="search-results">
        {shops.length === 0 ? (
          <div className="no-data">
            <p>No shops found. Try different search terms.</p>
          </div>
        ) : (
          <div className="shops-grid">
            {shops.map(shop => (
              <div key={shop._id} className="shop-card">
                <h3>{shop.shopName}</h3>
                <p>📍 {shop.address}</p>
                <p>📞 {shop.phone}</p>
                <p>⭐ {shop.rating.toFixed(1)}</p>
                <button onClick={() => onSelectShop(shop)} className="book-btn">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchShops;
