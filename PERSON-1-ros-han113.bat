@echo off
REM ========================================
REM PERSON 1: ros-han113 (Repository Owner)
REM ========================================

echo.
echo ========================================
echo PERSON 1: ros-han113
echo Repository Owner - Direct Commit
echo ========================================
echo.

REM Show current day's assignment
echo TODAY'S FILES TO COMMIT (2 files):
echo Check TEAM-COLLABORATION-GUIDE.txt for your assigned files
echo.

set /p file1="Enter first file path: "
set /p file2="Enter second file path: "

if "%file1%"=="" (
    echo ERROR: First file cannot be empty!
    pause
    exit /b 1
)

if "%file2%"=="" (
    echo ERROR: Second file cannot be empty!
    pause
    exit /b 1
)

echo.
echo Files selected:
echo 1. %file1%
echo 2. %file2%
echo.

set /p commit_msg="Enter commit message: "

if "%commit_msg%"=="" (
    echo ERROR: Commit message required!
    pause
    exit /b 1
)

echo.
echo Adding files...
git add "%file1%" "%file2%"

echo.
echo Committing...
git commit -m "%commit_msg%"

echo.
echo Pushing to main repository...
git push origin main

echo.
echo ========================================
echo SUCCESS! Your 2 files are committed.
echo Green dot will appear on GitHub!
echo ========================================
pause
