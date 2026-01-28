const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const BarberShop = require('../models/BarberShop');
const Booking = require('../models/Booking');
const TimeSlot = require('../models/TimeSlot');

const router = express.Router();

// Register barber shop
router.post('/register-shop', authMiddleware, roleMiddleware('partner'), async (req, res) => {
  try {
    const { shopName, phone, email, address, city, state, zipCode, latitude, longitude } = req.body;

    const shop = new BarberShop({
      partnerId: req.user.id,
      shopName,
      phone,
      email,
      address,
      city,
      state,
      zipCode,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

    await shop.save();

    res.status(201).json({
      success: true,
      message: 'Barber shop registered',
      data: shop
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get partner's barber shops
router.get('/my-shops', authMiddleware, roleMiddleware('partner'), async (req, res) => {
  try {
    const shops = await BarberShop.find({ partnerId: req.user.id });
    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update barber shop
router.put('/shops/:id', authMiddleware, roleMiddleware('partner'), async (req, res) => {
  try {
    const shop = await BarberShop.findById(req.params.id);
    
    if (shop.partnerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const updated = await BarberShop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get bookings for partner's shops
router.get('/bookings', authMiddleware, roleMiddleware('partner'), async (req, res) => {
  try {
    const shops = await BarberShop.find({ partnerId: req.user.id });
    const shopIds = shops.map(s => s._id);

    const bookings = await Booking.find({ barberShopId: { $in: shopIds } })
      .populate('customerId', 'name email phone')
      .populate('barberShopId', 'shopName')
      .sort({ bookingDate: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update booking status
router.put('/bookings/:id/status', authMiddleware, roleMiddleware('partner'), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create time slots
router.post('/time-slots', authMiddleware, roleMiddleware('partner'), async (req, res) => {
  try {
    const { barberShopId, date, startTime, endTime, slotDuration } = req.body;

    // Verify shop belongs to partner
    const shop = await BarberShop.findById(barberShopId);
    if (shop.partnerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const slots = [];
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let currentTime = new Date(date);
    currentTime.setHours(startHour, startMin, 0, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(endHour, endMin, 0, 0);

    while (currentTime < endDateTime) {
      const slotStartTime = currentTime.toTimeString().slice(0, 5);
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      const slotEndTime = currentTime.toTimeString().slice(0, 5);

      slots.push({
        barberShopId,
        date: new Date(date),
        startTime: slotStartTime,
        endTime: slotEndTime,
        isBooked: false
      });
    }

    await TimeSlot.insertMany(slots);

    res.status(201).json({
      success: true,
      message: `${slots.length} time slots created`,
      data: slots
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
