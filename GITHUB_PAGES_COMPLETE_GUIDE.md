# 🚀 BookBarber - Complete GitHub Pages Hosting Guide

## 📊 Overview

Your BookBarber application is now configured for GitHub Pages deployment with:

✅ **React Frontends** (GitHub Pages)
✅ **Node.js Backend** (Railway/Render)  
✅ **MongoDB Database** (MongoDB Atlas)
✅ **Environment Configuration** (Ready)
✅ **Automated Deployments** (GitHub Actions)
✅ **Deployment Scripts** (Bash & Batch)

---

## 🎯 Quick Start (5 Minutes)

### Option 1: Automated Deployment (Recommended)

#### On Mac/Linux:
```bash
chmod +x deploy-github-pages.sh
./deploy-github-pages.sh
```

#### On Windows:
```bash
deploy-github-pages.bat
```

This script will:
1. Ask for your GitHub username
2. Update all package.json homepage URLs
3. Install dependencies
4. Build all applications
5. Deploy to GitHub Pages

### Option 2: Manual Deployment

#### Step 1: Install gh-pages in each portal
```bash
cd admin-portal && npm install --save-dev gh-pages
cd ../partner-portal && npm install --save-dev gh-pages
cd ../customer-portal && npm install --save-dev gh-pages
```

#### Step 2: Update homepage in package.json
Replace `YOUR_USERNAME` with your actual GitHub username in:
- `admin-portal/package.json`
- `partner-portal/package.json`
- `customer-portal/package.json`

#### Step 3: Build and deploy each portal
```bash
cd admin-portal
npm run build
npm run deploy

cd ../partner-portal
npm run build
npm run deploy

cd ../customer-portal
npm run build
npm run deploy
```

#### Step 4: Enable GitHub Pages
1. Push your code to GitHub (if not already done)
2. Go to **Settings → Pages**
3. Select **Branch: gh-pages** as source
4. Click **Save**

---

## 🔧 Backend Deployment (Required)

The React apps are now on GitHub Pages, but they need a backend API. Choose one:

### ⚡ Option A: Railway.app (Easiest - Free Tier)

1. **Sign up**: [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. **Select** your BookBarber repository
4. **Add Variables**:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookbarber
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```
5. **Deployment** → Select `/backend` folder
6. **Deploy** and wait for your URL

Then update `.env.production` files:
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

### ⚡ Option B: Render.com (Free Tier)

1. **Sign up**: [render.com](https://render.com)
2. **New** → **Web Service**
3. **Connect** GitHub repository
4. **Configure**:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables** (add all from .env.example)
6. **Create Web Service**

Then update `.env.production` files with your Render URL.

### 🗄️ Option C: MongoDB Atlas (Database)

1. **Sign up**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Free Cluster** (M0 - shared)
3. **Create Database User**
4. **Get Connection String**: `mongodb+srv://user:pass@cluster.mongodb.net/bookbarber`
5. **Use in** `MONGODB_URI` environment variable

---

## 📋 What's Configured for You

### ✅ Package.json Updates
- Added `homepage` field pointing to GitHub Pages
- Added `predeploy` and `deploy` scripts
- Ready for gh-pages deployment

### ✅ Environment Files
Each portal now has:
- `.env` - Local development
- `.env.production` - Production deployment

Example content:
```
REACT_APP_API_URL=https://your-backend-url/api
```

### ✅ API Configuration
All React apps now use environment variables:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### ✅ GitHub Actions Workflow
Automatic deployment on every push to `main` branch.

---

## 🌐 Access Your Portals

After deployment, access at:

```
https://YOUR_USERNAME.github.io/BookBarber/admin
https://YOUR_USERNAME.github.io/BookBarber/partner
https://YOUR_USERNAME.github.io/BookBarber/customer
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🔐 Production Environment Variables

For GitHub Actions to work, add these secrets to your repository:

1. Go to **Settings → Secrets and variables → Actions**
2. **New repository secret**:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url/api`

This allows GitHub Actions to build with the correct API endpoint.

---

## 🧪 Testing Locally First

Before deploying to GitHub Pages, test locally:

```bash
# Terminal 1: Start backend
cd backend
npm install
npm start

# Terminal 2: Start admin portal (local)
cd admin-portal
npm install
npm start  # Opens http://localhost:3000

# Terminal 3: Start partner portal (local)
cd partner-portal
npm install
npm start  # Opens http://localhost:3001

# Terminal 4: Start customer portal (local)
cd customer-portal
npm install
npm start  # Opens http://localhost:3002
```

Test all features work before deploying to GitHub Pages.

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Code committed and pushed to GitHub
- [ ] Backend deployed to Railway/Render
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] `.env.production` files updated with backend URL
- [ ] All apps tested locally

### GitHub Pages Setup
- [ ] `npm install --save-dev gh-pages` run in all portals
- [ ] `homepage` field updated in all package.json files
- [ ] `predeploy` and `deploy` scripts added
- [ ] Router basenames configured correctly
- [ ] Build successful for all portals

### Deployment
- [ ] Run deployment script OR manually deploy each portal
- [ ] GitHub Pages enabled in repository settings
- [ ] Source branch set to `gh-pages`
- [ ] Wait 1-2 minutes for deployment

### Verification
- [ ] Admin portal loads at /admin path
- [ ] Partner portal loads at /partner path
- [ ] Customer portal loads at /customer path
- [ ] All portals connect to backend API
- [ ] Login works with correct API calls

---

## 🆘 Troubleshooting

### Problem: Blank White Page
**Solution**: 
- Check browser console (F12) for errors
- Verify Router `basename` matches URL path
- Rebuild: `npm run build`
- Redeploy: `npm run deploy`

### Problem: 404 Errors on Page Refresh
**Solution**:
- GitHub Pages requires hash-based routing for single-page apps
- Consider adding `HashRouter` instead of `BrowserRouter`
- Or configure 404.html redirect

### Problem: API Calls Return 404
**Solution**:
- Verify backend is deployed and running
- Check backend URL in `.env.production`
- Verify CORS settings in backend
- Check Network tab in browser (F12)

### Problem: CORS Errors
**Solution**:
- Update backend CORS configuration:
  ```javascript
  app.use(cors({
    origin: [
      'https://YOUR_USERNAME.github.io',
      'http://localhost:3000'
    ]
  }));
  ```
- Redeploy backend

### Problem: Deployment Script Fails
**Solution**:
- Ensure Node.js 18+ is installed: `node --version`
- Ensure Git is installed: `git --version`
- Clear npm cache: `npm cache clean --force`
- Try manual deployment

---

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Users' Browser                           │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐          ┌─────────┐          ┌─────────┐
    │  Admin  │          │ Partner │          │Customer │
    │ Portal  │          │ Portal  │          │ Portal  │
    │ GH Pgs  │          │ GH Pgs  │          │ GH Pgs  │
    └─────────┘          └─────────┘          └─────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Backend API     │
                    │  (Railway/Render)│
                    │  Node.js/Express │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ MongoDB Atlas    │
                    │ (Cloud Database) │
                    └──────────────────┘
```

---

## 💰 Cost Breakdown

| Service | Cost | Limits |
|---------|------|--------|
| GitHub Pages | FREE | Unlimited |
| Railway | FREE | 5GB/month CPU |
| MongoDB Atlas | FREE | 512MB storage |
| **Total** | **FREE** | **Suitable for production** |

---

## 🎯 Next Steps

1. ✅ Run the deployment script (automated or manual)
2. ✅ Deploy backend to Railway/Render
3. ✅ Test all three portals
4. ✅ Share GitHub Pages URLs with users
5. ✅ Monitor GitHub Actions for automatic deployments

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Railway Deployment Docs](https://docs.railway.app/getting-started)
- [Render Deployment Guide](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [React GitHub Pages Guide](https://create-react-app.dev/deployment/github-pages/)
- [gh-pages Package Docs](https://www.npmjs.com/package/gh-pages)

---

## 🎉 Success!

Your BookBarber application is now:
- ✅ Hosted on GitHub Pages (free, fast, reliable)
- ✅ Backend running on Railway/Render (auto-scaling)
- ✅ Database in MongoDB Atlas (cloud-hosted)
- ✅ Automatically deployed on code push (GitHub Actions)
- ✅ Production-ready for real users

**Share your GitHub Pages URLs:**
```
Admin:    https://YOUR_USERNAME.github.io/BookBarber/admin
Partner:  https://YOUR_USERNAME.github.io/BookBarber/partner
Customer: https://YOUR_USERNAME.github.io/BookBarber/customer
```

---

**Happy hosting! 🚀**
