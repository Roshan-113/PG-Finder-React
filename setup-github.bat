@echo off
REM GitHub Repository Setup Script
echo ========================================
echo PG Finder - GitHub Setup
echo ========================================
echo.

echo Please enter your GitHub repository URL
echo Example: https://github.com/yourusername/pg-finder.git
echo.
set /p repo_url="Repository URL: "

if "%repo_url%"=="" (
    echo Error: Repository URL cannot be empty!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setting up remote repository...
git remote add origin %repo_url%

echo.
echo Checking current branch...
git branch -M main

echo.
echo ========================================
echo Pushing to GitHub for the first time...
git push -u origin main

echo.
echo ========================================
echo Setup complete! Your repository is now connected.
echo Use 'git-push-daily.bat' for daily commits.
echo ========================================
pause
