@echo off
REM ========================================
REM DAILY SINGLE FILE COMMIT SCRIPT
REM ========================================
REM HOW TO USE:
REM 1. Run this script: git-push-single-file.bat
REM 2. Enter the file path (e.g., src/pages/owner/AddPG.jsx)
REM 3. Enter commit message or press Enter for default
REM 4. File will be committed and pushed to GitHub
REM 
REM IMPORTANT: This commits ONLY ONE file at a time
REM Run this script daily with different files to show daily contributions
REM ========================================

echo.
echo ========================================
echo   DAILY SINGLE FILE COMMIT
echo ========================================
echo.

REM Show all files in the project
echo Available files to commit:
echo.
git ls-files

echo.
echo ========================================
set /p file_path="Enter file path to commit: "

if "%file_path%"=="" (
    echo.
    echo ERROR: File path cannot be empty!
    echo.
    pause
    exit /b 1
)

REM Check if file exists
if not exist "%file_path%" (
    echo.
    echo ERROR: File '%file_path%' does not exist!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo File selected: %file_path%
echo.

REM Stage the file
git add "%file_path%"

echo.
set /p commit_msg="Enter commit message (or press Enter for default): "

if "%commit_msg%"=="" (
    REM Generate default commit message
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    set commit_msg=Update %file_path% - %mydate%
)

echo.
echo Committing: %commit_msg%
git commit -m "%commit_msg%"

if errorlevel 1 (
    echo.
    echo ERROR: Commit failed! File may have no changes.
    echo.
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed! Check your internet connection.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! File pushed to GitHub.
echo Your contribution will show on GitHub.
echo ========================================
echo.
pause
