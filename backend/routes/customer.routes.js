const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const BarberShop = require('../models/BarberShop');

const router = express.Router();

// Get nearby barber shops
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query; // maxDistance in meters

    if (!longitude || !latitude) {
      return res.status(400).json({ success: false, message: 'Coordinates required' });
    }

    const shops = await BarberShop.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: maxDistance
        }
      },
      isVerified: true,
      isActive: true
    }).populate('partnerId', 'name phone');

    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Search barber shops
router.get('/search', async (req, res) => {
  try {
    const { query, city } = req.query;

    let filter = { isVerified: true, isActive: true };

    if (query) {
      filter.$or = [
        { shopName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    const shops = await BarberShop.find(filter);
    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get barber shop details
router.get('/shops/:id', async (req, res) => {
  try {
    const shop = await BarberShop.findById(req.params.id)
      .populate('partnerId', 'name phone email');
    
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    res.json({ success: true, data: shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get customer profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const customer = await User.findById(req.user.id).select('-password');
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update customer profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, city, state, zipCode, latitude, longitude } = req.body;

    const updateData = { name, phone, address, city, state, zipCode };

    if (latitude && longitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
    }

    const customer = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
