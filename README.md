# 💇 BookBarber - Barber Shop Booking System

A comprehensive, full-stack web application for booking barber shop appointments with three major components: Admin Center, Partner (Barber Shop) Portal, and Customer Portal with geolocation-based shop discovery.

## 🎯 Key Features

### 👨‍💼 Admin Center (`admin-portal`)
- **Dashboard** - Real-time statistics and metrics
- **User Management** - View and manage all customers and partners
- **Shop Verification** - Approve/verify barber shop registrations
- **Booking Oversight** - Monitor all bookings across the platform
- **Account Management** - Deactivate users, manage roles

### 💈 Partner Portal (`partner-portal`)
- **Shop Registration** - Register and manage barber shops
- **Business Profile** - Add photos, services, operating hours, pricing
- **Time Slot Management** - Create and manage appointment slots
- **Booking Management** - View incoming bookings and update status
- **Analytics** - Track bookings and revenue

### 👤 Customer Portal (`customer-portal`)
- **Location-Based Discovery** - Find nearby barber shops using GPS
- **Interactive Map** - Search shops by distance (1km, 5km, 10km, 20km)
- **Shop Details** - View ratings, services, hours, and contact info
- **Easy Booking** - Select date, time, and service type
- **Booking Management** - View and cancel appointments
- **Search & Filter** - Find shops by name, city, or service

## 📋 Project Structure

```
BookBarber/
├── backend/                    # Node.js Express API Server
│   ├── models/                # MongoDB Schemas
│   │   ├── User.js
│   │   ├── BarberShop.js
│   │   ├── Booking.js
│   │   ├── TimeSlot.js
│   │   └── Review.js
│   ├── routes/                # API Routes
│   │   ├── auth.routes.js
│   │   ├── admin.routes.js
│   │   ├── partner.routes.js
│   │   ├── customer.routes.js
│   │   ├── booking.routes.js
│   │   └── barberShop.routes.js
│   ├── middleware/            # Auth & Custom Middleware
│   ├── utils/                 # Helper Functions
│   ├── server.js              # Main Server File
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── admin-portal/              # React Admin Dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Users.js
│   │   │   ├── BarberShops.js
│   │   │   └── Bookings.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── public/
│
├── partner-portal/            # React Partner Dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── RegisterShop.js
│   │   │   ├── ManageShop.js
│   │   │   ├── Bookings.js
│   │   │   └── TimeSlots.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── public/
│
├── customer-portal/           # React Customer Portal
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── MapView.js
│   │   │   ├── SearchShops.js
│   │   │   ├── BookingForm.js
│   │   │   └── MyBookings.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── public/
│
├── docker-compose.yml         # Docker Orchestration
└── README.md                  # This File

```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ 
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**
- **Git**

### Option 1: Local Development Setup

#### 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

API runs on: `http://localhost:5000`

#### 2️⃣ Admin Portal

```bash
cd admin-portal
npm install
npm start
```

Opens on: `http://localhost:3000`

#### 3️⃣ Partner Portal

```bash
cd partner-portal
npm install
npm start
```

Opens on: `http://localhost:3001`

#### 4️⃣ Customer Portal

```bash
cd customer-portal
npm install
npm start
```

Opens on: `http://localhost:3002`

### Option 2: Docker Setup

```bash
# Build and run all services
docker-compose up -d

# Backend: http://localhost:5000
# Admin: http://localhost:3000
# Partner: http://localhost:3001
# Customer: http://localhost:3002
# MongoDB: localhost:27017
```

## 🔑 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - User login
POST   /api/auth/verify-email     - Verify email
```

### Admin Endpoints
```
GET    /api/admin/dashboard       - Dashboard statistics
GET    /api/admin/users           - List all users
GET    /api/admin/barber-shops    - List all barber shops
GET    /api/admin/bookings        - List all bookings
PUT    /api/admin/barber-shops/:id/verify - Verify shop
PUT    /api/admin/users/:id/deactivate   - Deactivate user
```

### Partner Endpoints
```
POST   /api/partners/register-shop        - Register barber shop
GET    /api/partners/my-shops             - Get partner's shops
PUT    /api/partners/shops/:id            - Update shop details
GET    /api/partners/bookings             - Get shop bookings
PUT    /api/partners/bookings/:id/status  - Update booking status
POST   /api/partners/time-slots           - Create time slots
```

### Customer Endpoints
```
GET    /api/customers/nearby      - Find nearby shops
GET    /api/customers/search      - Search shops
GET    /api/customers/shops/:id   - Get shop details
GET    /api/customers/profile     - Get customer profile
PUT    /api/customers/profile     - Update profile
```

### Booking Endpoints
```
POST   /api/bookings              - Create booking
GET    /api/bookings/slots/:shopId - Get available slots
GET    /api/bookings/my-bookings  - Get customer bookings
GET    /api/bookings/:id          - Get booking details
PUT    /api/bookings/:id/cancel   - Cancel booking
```

### Barber Shop Endpoints
```
GET    /api/barber-shops          - List verified shops
GET    /api/barber-shops/top-rated - Get top-rated shops
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: ['customer', 'partner', 'admin'],
  profileImage: String,
  isVerified: Boolean,
  isActive: Boolean,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  location: { type: 'Point', coordinates: [longitude, latitude] },
  createdAt: Date,
  updatedAt: Date
}
```

### BarberShop Model
```javascript
{
  partnerId: ObjectId (ref: User),
  shopName: String,
  description: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  location: { type: 'Point', coordinates: [longitude, latitude] },
  serviceTypes: [String], // haircut, shave, beard, coloring, etc.
  openingTime: String,
  closingTime: String,
  operatingDays: [String],
  slotDuration: Number (minutes),
  slotPrice: Number,
  photos: [String],
  rating: Number (0-5),
  reviewCount: Number,
  isVerified: Boolean,
  isActive: Boolean,
  bankDetails: { accountName, accountNumber, bankName, ifscCode },
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  customerId: ObjectId (ref: User),
  barberShopId: ObjectId (ref: BarberShop),
  serviceType: String,
  bookingDate: Date,
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  notes: String,
  status: ['pending', 'confirmed', 'completed', 'cancelled'],
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  totalPrice: Number,
  paymentStatus: ['pending', 'paid', 'cancelled'],
  paymentMethod: String,
  feedback: { rating, review, photos },
  createdAt: Date,
  updatedAt: Date
}
```

### TimeSlot Model
```javascript
{
  barberShopId: ObjectId (ref: BarberShop),
  date: Date,
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  isBooked: Boolean,
  bookingId: ObjectId (ref: Booking),
  createdAt: Date
}
```

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based authentication with 7-day expiration
✅ **Password Hashing** - bcryptjs for secure password storage
✅ **Role-Based Access Control (RBAC)** - Different permissions for admin, partner, customer
✅ **CORS Protection** - Configured for cross-origin requests
✅ **Input Validation** - Server-side validation for all inputs
✅ **Geospatial Indexing** - Secure 2dsphere indexing for location queries

## 🌍 Geolocation Features

- **GPS Location Detection** - Get user's current location with permission
- **Nearby Shop Discovery** - Find barber shops within configurable radius
- **Distance Calculation** - Calculate real distances using Haversine formula
- **2dsphere Indexing** - MongoDB geospatial indexing for fast queries
- **Search Radius Options** - 1km, 5km, 10km, 20km radius search

## 📱 Responsive Design

✅ Desktop (1920px and above)
✅ Tablet (768px - 1024px)
✅ Mobile (320px - 767px)
✅ Touch-friendly buttons and navigation
✅ Optimized performance

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Validation**: validator.js
- **CORS**: cors middleware

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 (Flexbox, Grid)
- **Maps**: Leaflet/React Leaflet (optional)
- **Date Handling**: date-fns

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Version Control**: Git

## 🧪 Test Users

### Admin User
```
Email: admin@bookbarber.com
Password: admin123
```

Create your own test accounts through:
- Partner registration
- Customer registration

## 📝 Environment Variables

Create `.env` file in backend folder:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bookbarber

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Admin
ADMIN_EMAIL=admin@bookbarber.com
ADMIN_PASSWORD=admin123

# Optional: Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional: Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Optional: AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=bookbarber-uploads
```

## 🚀 Deployment Guide

### Heroku Deployment

```bash
# Install Heroku CLI
heroku login

# Create apps
heroku create bookbarber-api
heroku create bookbarber-admin
heroku create bookbarber-partner
heroku create bookbarber-customer

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Vercel Deployment (Frontend)

```bash
npm install -g vercel

# Deploy each portal
cd admin-portal
vercel

cd ../partner-portal
vercel

cd ../customer-portal
vercel
```

### AWS Deployment

- Backend: AWS EC2 or Elastic Beanstalk
- Frontend: AWS S3 + CloudFront
- Database: AWS DocumentDB or MongoDB Atlas

## 📊 Features Roadmap

- [ ] Payment Gateway Integration (Stripe/PayPal)
- [ ] Email Notifications
- [ ] SMS Notifications
- [ ] Real-time Notifications (WebSocket)
- [ ] Advanced Analytics Dashboard
- [ ] Rating & Review System
- [ ] Cancellation Policy Enforcement
- [ ] Staff Member Management
- [ ] Service Add-ons & Pricing Tiers
- [ ] Loyalty Points Program
- [ ] Appointment Reminders
- [ ] Admin Reports & Export

## 🐛 Known Issues

None currently reported. Please file issues on GitHub.

## 📞 Support

For bugs, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include error messages and screenshots

## 📄 License

MIT License - You are free to use, modify, and distribute this software.

```
MIT License

Copyright (c) 2024 BookBarber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies.

---

**Happy Booking! 💇✂️ 🎉**

*Last Updated: January 28, 2025*
