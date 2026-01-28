const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  barberShopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BarberShop',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String, // HH:MM format
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
