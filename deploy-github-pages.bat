@echo off
REM BookBarber GitHub Pages Deployment Script for Windows
REM This script automates the deployment of all three React portals to GitHub Pages

echo.
echo ==================================
echo BookBarber GitHub Pages Deployer
echo ==================================
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js 18+.
    pause
    exit /b 1
)

where git >nul 2>nul
if errorlevel 1 (
    echo Error: Git is not installed. Please install Git.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i

echo Node.js %NODE_VERSION% found
echo Git %GIT_VERSION% found
echo.

REM Get GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username (for homepage URLs): "

if "%GITHUB_USERNAME%"=="" (
    echo Error: GitHub username cannot be empty!
    pause
    exit /b 1
)

echo.
echo Updating package.json files with homepage URLs...

REM Update admin-portal package.json
powershell -Command "(Get-Content admin-portal\package.json) -replace 'https://YOUR_USERNAME.github.io', 'https://%GITHUB_USERNAME%.github.io' | Set-Content admin-portal\package.json"

REM Update partner-portal package.json
powershell -Command "(Get-Content partner-portal\package.json) -replace 'https://YOUR_USERNAME.github.io', 'https://%GITHUB_USERNAME%.github.io' | Set-Content partner-portal\package.json"

REM Update customer-portal package.json
powershell -Command "(Get-Content customer-portal\package.json) -replace 'https://YOUR_USERNAME.github.io', 'https://%GITHUB_USERNAME%.github.io' | Set-Content customer-portal\package.json"

echo package.json files updated
echo.

REM Deploy each portal
setlocal enabledelayedexpansion

for %%P in (admin-portal partner-portal customer-portal) do (
    echo ==================================
    echo Deploying %%P...
    echo ==================================
    
    cd %%P
    
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error: npm install failed
        cd ..
        pause
        exit /b 1
    )
    
    echo Building application...
    call npm run build
    if errorlevel 1 (
        echo Error: Build failed for %%P
        cd ..
        pause
        exit /b 1
    )
    
    echo Deploying to GitHub Pages...
    call npm run deploy
    if errorlevel 1 (
        echo Error: Failed to deploy %%P
        cd ..
        pause
        exit /b 1
    )
    
    echo ✓ %%P deployed successfully!
    cd ..
    echo.
)

echo ==================================
echo Deployment Complete!
echo ==================================
echo.
echo Your portals are now available at:
echo   - Admin:    https://%GITHUB_USERNAME%.github.io/BookBarber/admin
echo   - Partner:  https://%GITHUB_USERNAME%.github.io/BookBarber/partner
echo   - Customer: https://%GITHUB_USERNAME%.github.io/BookBarber/customer
echo.
echo Important: Make sure GitHub Pages is enabled in your repository settings:
echo    1. Go to Settings ^> Pages
echo    2. Select 'gh-pages' as the source branch
echo    3. Save
echo.
echo It may take 1-2 minutes for GitHub Pages to deploy your changes.
echo.
echo Backend Setup: Deploy your backend separately to Railway.app or Render.com
echo    Then update the API URLs in the .env.production files.
echo.
pause
