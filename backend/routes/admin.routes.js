const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const BarberShop = require('../models/BarberShop');
const Booking = require('../models/Booking');

const router = express.Router();

// Get dashboard stats
router.get('/dashboard', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBarberShops = await BarberShop.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingVerifications = await BarberShop.countDocuments({ isVerified: false });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBarberShops,
        totalBookings,
        pendingVerifications
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all barber shops
router.get('/barber-shops', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const shops = await BarberShop.find().populate('partnerId', 'name email phone');
    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify barber shop
router.put('/barber-shops/:id/verify', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const shop = await BarberShop.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    res.json({ success: true, message: 'Shop verified', data: shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all bookings
router.get('/bookings', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customerId', 'name email phone')
      .populate('barberShopId', 'shopName');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Deactivate user
router.put('/users/:id/deactivate', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.json({ success: true, message: 'User deactivated', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
