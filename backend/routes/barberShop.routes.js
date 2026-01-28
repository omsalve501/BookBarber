const express = require('express');
const BarberShop = require('../models/BarberShop');

const router = express.Router();

// Get all verified barber shops
router.get('/', async (req, res) => {
  try {
    const { city, serviceType, rating } = req.query;

    let filter = { isVerified: true, isActive: true };

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (serviceType) {
      filter.serviceTypes = serviceType;
    }

    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    const shops = await BarberShop.find(filter)
      .populate('partnerId', 'name phone email');

    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get top rated shops
router.get('/top-rated', async (req, res) => {
  try {
    const shops = await BarberShop.find({ isVerified: true, isActive: true })
      .sort({ rating: -1 })
      .limit(10);

    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
