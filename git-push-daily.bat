@echo off
REM Daily Git Push Script for PG Finder Project
REM This script helps you commit and push changes daily

echo ========================================
echo PG Finder - Daily Git Push
echo ========================================
echo.

REM Check if there are changes
git status

echo.
echo ========================================
echo Adding all changes...
git add .

echo.
echo ========================================
set /p commit_msg="Enter commit message (or press Enter for default): "

if "%commit_msg%"=="" (
    REM Generate default commit message with date
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    set commit_msg=Daily update - %mydate%
)

echo.
echo Committing with message: %commit_msg%
git commit -m "%commit_msg%"

echo.
echo ========================================
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Done! Your changes have been pushed to GitHub.
echo ========================================
pause
