#!/bin/bash

# BookBarber GitHub Pages Deployment Script
# This script automates the deployment of all three React portals to GitHub Pages

set -e  # Exit on error

echo "=================================="
echo "📱 BookBarber GitHub Pages Deployer"
echo "=================================="
echo ""

# Check prerequisites
echo "✓ Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git."
    exit 1
fi

echo "✓ Node.js $(node --version) found"
echo "✓ Git $(git --version | awk '{print $3}') found"
echo ""

# Get GitHub username
echo "Enter your GitHub username (for homepage URLs):"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username cannot be empty!"
    exit 1
fi

echo ""
echo "📝 Updating package.json files with homepage URLs..."

# Update admin-portal package.json
sed -i.bak "s|\"homepage\": \"https://YOUR_USERNAME.github.io/BookBarber/admin\"|\"homepage\": \"https://${GITHUB_USERNAME}.github.io/BookBarber/admin\"|g" admin-portal/package.json && rm admin-portal/package.json.bak

# Update partner-portal package.json
sed -i.bak "s|\"homepage\": \"https://YOUR_USERNAME.github.io/BookBarber/partner\"|\"homepage\": \"https://${GITHUB_USERNAME}.github.io/BookBarber/partner\"|g" partner-portal/package.json && rm partner-portal/package.json.bak

# Update customer-portal package.json
sed -i.bak "s|\"homepage\": \"https://YOUR_USERNAME.github.io/BookBarber/customer\"|\"homepage\": \"https://${GITHUB_USERNAME}.github.io/BookBarber/customer\"|g" customer-portal/package.json && rm customer-portal/package.json.bak

echo "✓ package.json files updated"
echo ""

# Deploy each portal
PORTALS=("admin-portal" "partner-portal" "customer-portal")

for PORTAL in "${PORTALS[@]}"; do
    echo "=================================="
    echo "📦 Deploying $PORTAL..."
    echo "=================================="
    
    cd "$PORTAL"
    
    echo "Installing dependencies..."
    npm install
    
    echo "Building application..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "Deploying to GitHub Pages..."
        npm run deploy
        
        if [ $? -eq 0 ]; then
            echo "✅ $PORTAL deployed successfully!"
        else
            echo "❌ Failed to deploy $PORTAL"
            cd ..
            exit 1
        fi
    else
        echo "❌ Build failed for $PORTAL"
        cd ..
        exit 1
    fi
    
    cd ..
    echo ""
done

echo "=================================="
echo "✅ Deployment Complete!"
echo "=================================="
echo ""
echo "🌐 Your portals are now available at:"
echo "   • Admin:    https://${GITHUB_USERNAME}.github.io/BookBarber/admin"
echo "   • Partner:  https://${GITHUB_USERNAME}.github.io/BookBarber/partner"
echo "   • Customer: https://${GITHUB_USERNAME}.github.io/BookBarber/customer"
echo ""
echo "📌 Important: Make sure GitHub Pages is enabled in your repository settings:"
echo "   1. Go to Settings → Pages"
echo "   2. Select 'gh-pages' as the source branch"
echo "   3. Save"
echo ""
echo "⏳ It may take 1-2 minutes for GitHub Pages to deploy your changes."
echo ""
echo "🔗 Backend Setup: Deploy your backend separately to Railway.app or Render.com"
echo "   Then update the API URLs in the .env.production files."
echo ""
