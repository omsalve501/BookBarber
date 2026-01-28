# 🚀 Quick GitHub Pages Setup for BookBarber

## 5-Minute Setup Guide

### Step 1: Prerequisites
```bash
# Make sure you have Git and Node.js 18+
node --version  # Should be v18+
npm --version   # Should be v8+
```

### Step 2: Install gh-pages in Each Portal

```bash
# Admin Portal
cd admin-portal
npm install --save-dev gh-pages

# Partner Portal
cd ../partner-portal
npm install --save-dev gh-pages

# Customer Portal
cd ../customer-portal
npm install --save-dev gh-pages
```

### Step 3: Update package.json for Each Portal

**admin-portal/package.json** - Add these fields:
```json
{
  "name": "bookbarber-admin",
  "homepage": "https://YOUR_USERNAME.github.io/BookBarber/admin",
  "version": "1.0.0",
  
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

**partner-portal/package.json** - Change homepage:
```json
"homepage": "https://YOUR_USERNAME.github.io/BookBarber/partner"
```

**customer-portal/package.json** - Change homepage:
```json
"homepage": "https://YOUR_USERNAME.github.io/BookBarber/customer"
```

### Step 4: Update React Router Basenames

**admin-portal/src/App.js** - Update Router:
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/BookBarber/admin">
      {/* Rest of your routes */}
    </Router>
  );
}
```

**Do the same for partner-portal and customer-portal with their respective basenames:**
- Partner: `basename="/BookBarber/partner"`
- Customer: `basename="/BookBarber/customer"`

### Step 5: Create Environment Files

Create `.env` in admin-portal:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Create `.env.production` in admin-portal:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

**Repeat for partner-portal and customer-portal**

### Step 6: Update API Calls

In any file making API requests, use environment variable:
```javascript
// Before
const response = await axios.get('http://localhost:5000/api/users');

// After
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const response = await axios.get(`${API_BASE}/users`);
```

### Step 7: Build & Deploy

```bash
# Admin Portal
cd admin-portal
npm run build
npm run deploy

# Partner Portal
cd ../partner-portal
npm run build
npm run deploy

# Customer Portal
cd ../customer-portal
npm run build
npm run deploy
```

### Step 8: Enable GitHub Pages in Repository

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **Branch: gh-pages**
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 9: Access Your Portals

- Admin: `https://YOUR_USERNAME.github.io/BookBarber/admin`
- Partner: `https://YOUR_USERNAME.github.io/BookBarber/partner`
- Customer: `https://YOUR_USERNAME.github.io/BookBarber/customer`

---

## ⚠️ For Backend Deployment

Since GitHub Pages only hosts static files, you need to deploy the backend separately:

### Option A: Railway (Recommended - Free)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Create new project → Select backend folder
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A random secret key
5. Deploy

### Option B: Render.com
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub
4. Select repository and backend folder
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy

### Option C: Vercel (For Serverless Backend)
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Configure environment variables
4. Deploy

---

## 🔧 Update Backend for CORS

In `backend/server.js`, update CORS configuration:

```javascript
app.use(cors({
  origin: [
    'https://YOUR_USERNAME.github.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## ✅ Deployment Checklist

- [ ] All three portals have `homepage` in package.json
- [ ] All three portals have Router `basename` configured
- [ ] Environment files created (.env and .env.production)
- [ ] API calls use environment variable
- [ ] `gh-pages` package installed in each portal
- [ ] All builds successful (`npm run build`)
- [ ] All deployments completed (`npm run deploy`)
- [ ] GitHub Pages enabled in Settings
- [ ] Backend deployed to Railway/Render
- [ ] Backend CORS updated
- [ ] All portals tested and working

---

## 🧪 Testing Your Deployment

```bash
# Test builds locally
cd admin-portal
npm run build  # Should create build/ folder without errors

# Test production build locally
npx serve -s build

# Visit: http://localhost:3000/BookBarber/admin
```

---

## 🆘 Troubleshooting

### Blank White Page
- Check browser console (F12) for errors
- Verify basename in Router matches homepage URL
- Rebuild and redeploy

### 404 Errors
- Verify homepage value in package.json
- Check GitHub Pages settings
- Clear browser cache

### API Not Working
- Verify backend is deployed and running
- Check API URL in .env.production
- Verify CORS settings in backend
- Check browser Network tab for requests

### Deployment Fails
- Clear gh-pages cache: `rm -rf node_modules/.cache`
- Reinstall: `npm install`
- Try again: `npm run deploy`

---

## 📚 Resources

- [Create React App - Deployment](https://create-react-app.dev/deployment/)
- [GitHub Pages - React](https://github.pages.io/)
- [gh-pages NPM Package](https://www.npmjs.com/package/gh-pages)
- [Railway Docs](https://docs.railway.app/)

---

**You're ready! Deploy and celebrate! 🎉**
