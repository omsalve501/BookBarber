const mongoose = require('mongoose');

const barberShopSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shopName: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere'
    }
  },
  serviceTypes: [{
    type: String,
    enum: ['haircut', 'shave', 'beard', 'coloring', 'treatment', 'styling', 'other']
  }],
  openingTime: String,
  closingTime: String,
  operatingDays: [String], // ['Monday', 'Tuesday', etc.]
  slotDuration: {
    type: Number,
    default: 30 // in minutes
  },
  slotPrice: {
    type: Number,
    default: 0
  },
  photos: [String], // Array of photo URLs
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
barberShopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BarberShop', barberShopSchema);
