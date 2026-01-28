const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const Booking = require('../models/Booking');
const TimeSlot = require('../models/TimeSlot');
const BarberShop = require('../models/BarberShop');

const router = express.Router();

// Create booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { barberShopId, serviceType, bookingDate, startTime, endTime, notes } = req.body;

    // Check if slot is available
    const existingBooking = await Booking.findOne({
      barberShopId,
      bookingDate: new Date(bookingDate),
      status: { $ne: 'cancelled' }
    });

    const booking = new Booking({
      customerId: req.user.id,
      barberShopId,
      serviceType,
      bookingDate: new Date(bookingDate),
      startTime,
      endTime,
      notes,
      customerName: req.user.name,
      customerEmail: req.user.email,
      status: 'pending'
    });

    // Update time slot
    const timeSlot = await TimeSlot.findOneAndUpdate(
      {
        barberShopId,
        date: new Date(bookingDate),
        startTime
      },
      {
        isBooked: true,
        bookingId: booking._id
      }
    );

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get available time slots
router.get('/slots/:barberShopId', async (req, res) => {
  try {
    const { date } = req.query;

    const slots = await TimeSlot.find({
      barberShopId: req.params.barberShopId,
      date: new Date(date),
      isBooked: false
    });

    res.json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get customer's bookings
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id })
      .populate('barberShopId', 'shopName address phone')
      .sort({ bookingDate: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get booking details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('barberShopId', 'shopName address phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking.customerId.toString() !== req.user.id && req.user.role !== 'partner') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Free up time slot
    await TimeSlot.findByIdAndUpdate(
      booking._id,
      { isBooked: false, bookingId: null }
    );

    res.json({ success: true, message: 'Booking cancelled', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
