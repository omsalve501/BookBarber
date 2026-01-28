# 🚀 BookBarber - Deployment Guide

## Overview

BookBarber is a full-stack application with:
- **3 React Frontends** (deployable to GitHub Pages)
- **1 Node.js Backend** (needs a server)
- **MongoDB Database** (cloud-hosted)

This guide covers both options.

---

## 📋 Option 1: Full GitHub Pages + Free Services (Recommended)

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a **Free Cluster** (M0)
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/bookbarber`
5. Create a database user and save credentials

### Step 2: Deploy Backend to Railway or Render (Free)

#### Option A: Railway.app (Free Tier)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create a new project
4. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookbarber
   JWT_SECRET=your-secret-key
   PORT=5000
   ```
5. Deploy backend folder
6. Get your backend URL: `https://your-railway-app.railway.app`

#### Option B: Render.com (Free Tier)
1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Configure:
   - Build command: `npm install`
   - Start command: `npm start`
5. Add environment variables
6. Deploy

### Step 3: Deploy React Apps to GitHub Pages

#### Step 3a: Prepare Admin Portal

1. Edit `admin-portal/package.json`:
```json
{
  "name": "admin-portal",
  "homepage": "https://yourusername.github.io/BookBarber/admin",
  "proxy": "https://your-backend-url.railway.app"
}
```

2. Install GitHub Pages dependency:
```bash
cd admin-portal
npm install --save-dev gh-pages
```

3. Add scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```

4. Deploy:
```bash
npm run deploy
```

#### Step 3b: Prepare Partner Portal

Repeat steps 3a for partner-portal with:
```json
"homepage": "https://yourusername.github.io/BookBarber/partner"
```

#### Step 3c: Prepare Customer Portal

Repeat steps 3a for customer-portal with:
```json
"homepage": "https://yourusername.github.io/BookBarber/customer"
```

### Step 4: Update Backend API URLs

Update all API calls in React apps to use your deployed backend:

**In admin-portal/src/App.js** (and other portals):
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-backend-url.railway.app/api';
```

Create `.env` file in each portal:
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

### Step 5: Update CORS in Backend

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'https://yourusername.github.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
  ],
  credentials: true
}));
```

---

## 🌐 Option 2: GitHub Pages Landing Site + Hosted Backend

If you want a professional landing page on GitHub Pages:

### Create Landing Page

```bash
mkdir gh-pages-site
cd gh-pages-site
git checkout -b gh-pages
```

Create `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>BookBarber - Book Your Haircut Online</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 20px; text-align: center; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .portals { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 40px 0; }
    .portal-card { background: #f4f4f4; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .portal-card h3 { color: #667eea; margin: 10px 0; }
    .btn { display: inline-block; background: #667eea; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px; }
    .btn:hover { background: #764ba2; }
  </style>
</head>
<body>
  <header>
    <h1>💇 BookBarber</h1>
    <p>Book Your Haircut Appointment Online</p>
  </header>

  <div class="container">
    <h2>Access BookBarber Portals</h2>
    
    <div class="portals">
      <div class="portal-card">
        <h3>👨‍💼 Admin</h3>
        <p>Manage users, shops, and bookings</p>
        <a href="https://yourusername.github.io/BookBarber/admin" class="btn">Admin Portal</a>
      </div>
      
      <div class="portal-card">
        <h3>💈 Partner</h3>
        <p>Register and manage your barber shop</p>
        <a href="https://yourusername.github.io/BookBarber/partner" class="btn">Partner Portal</a>
      </div>
      
      <div class="portal-card">
        <h3>👤 Customer</h3>
        <p>Find and book nearby barber shops</p>
        <a href="https://yourusername.github.io/BookBarber/customer" class="btn">Customer Portal</a>
      </div>
    </div>

    <h2>Test Credentials</h2>
    <pre>
Admin:
Email: admin@bookbarber.com
Password: admin123

Partners & Customers:
Create new accounts via registration
    </pre>

    <h2>Documentation</h2>
    <ul>
      <li><a href="https://github.com/yourusername/BookBarber">GitHub Repository</a></li>
      <li><a href="https://github.com/yourusername/BookBarber#readme">Full Documentation</a></li>
    </ul>
  </div>
</body>
</html>
```

---

## 📝 Required Changes for GitHub Pages Deployment

### 1. Update React Router (Basename)

Edit each portal's `App.js`:
```javascript
import { BrowserRouter as Router } from 'react-router-dom';

// For admin-portal:
<Router basename="/BookBarber/admin">

// For partner-portal:
<Router basename="/BookBarber/partner">

// For customer-portal:
<Router basename="/BookBarber/customer">
```

### 2. Create `.env.production` in each portal

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

### 3. Update API Calls

In all axios/fetch calls, use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

axios.get(`${API_URL}/endpoint`);
```

---

## 🔧 Complete Deployment Steps

### 1. Prepare Repository
```bash
# Make sure git is configured
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .
git commit -m "Initial BookBarber commit"
git push origin main
```

### 2. Create React App Build Configuration

In each portal folder:
```bash
cd admin-portal
npm install --save-dev gh-pages
npm run build
npm run deploy
```

### 3. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Select **Source**: Branch = `gh-pages`
3. Save

### 4. Configure Backend

- Deploy backend to Railway/Render
- Update CORS origins in backend
- Get backend API URL

### 5. Update Frontend Configurations

- Update all `.env.production` files
- Update Router basenames
- Rebuild and redeploy

### 6. Test Deployment

Visit:
- Admin: `https://yourusername.github.io/BookBarber/admin`
- Partner: `https://yourusername.github.io/BookBarber/partner`
- Customer: `https://yourusername.github.io/BookBarber/customer`

---

## 🚨 Common Issues & Solutions

### CORS Errors
**Problem**: Request blocked due to CORS
**Solution**: Update backend CORS configuration with exact GitHub Pages URLs

### 404 Errors on Refresh
**Problem**: React Router doesn't work on GitHub Pages refresh
**Solution**: Use hash routing or configure 404.html redirection

### API Not Connecting
**Problem**: Frontend can't reach backend
**Solution**: Verify backend URL in `.env.production` and CORS settings

### Blank Page
**Problem**: App loads but shows nothing
**Solution**: Check browser console, verify basename in Router

---

## 📊 Estimated Costs

- **MongoDB Atlas**: FREE (500MB, 3 shared nodes)
- **Railway/Render**: FREE (free tier with sleep)
- **GitHub Pages**: FREE (unlimited)
- **Custom Domain**: ~$12/year optional

---

## 🔐 Security Checklist

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS on all deployed services
- ✅ Set up CORS properly
- ✅ Hash passwords in database
- ✅ Validate input on backend
- ✅ Use JWT tokens securely
- ✅ Monitor API rate limiting

---

## 📚 Helpful Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Railway Deployment](https://docs.railway.app/)
- [Render Deployment](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [React Deployment](https://create-react-app.dev/deployment/)

---

## 🎯 Quick Checklist

- [ ] MongoDB Atlas account created & connection string ready
- [ ] Backend deployed to Railway/Render with env variables
- [ ] CORS updated in backend with GitHub Pages URLs
- [ ] gh-pages package installed in all React apps
- [ ] Router basenames configured
- [ ] API URLs updated in .env.production
- [ ] React apps built and deployed
- [ ] GitHub Pages enabled in repository settings
- [ ] All portals tested and working
- [ ] Custom domain configured (optional)

---

## 💡 Pro Tips

1. **Use environment variables** for all configuration
2. **Test locally first** before deploying
3. **Monitor API logs** for debugging
4. **Set up GitHub Actions** for automated deployment
5. **Keep MongoDB backups** of important data
6. **Monitor free tier quotas** to avoid surprise charges

---

**Status**: Ready for production deployment! 🚀
