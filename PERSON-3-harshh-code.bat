@echo off
REM ========================================
REM PERSON 3: harshh-code (Collaborator)
REM ========================================

echo.
echo ========================================
echo PERSON 3: harshh-code
echo Collaborator - Fork & Pull Request
echo ========================================
echo.

REM Get day number
set /p day_num="Enter day number (e.g., 1, 2, 3): "

if "%day_num%"=="" (
    echo ERROR: Day number required!
    pause
    exit /b 1
)

echo.
echo Step 1: Updating from main repository...
git pull upstream main
git push origin main

echo.
echo Step 2: Creating new branch...
git checkout -b harshh-day-%day_num%

echo.
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
    set commit_msg=Update by harshh-code - Day %day_num%
)

echo.
echo Adding files...
git add "%file1%" "%file2%"

echo.
echo Committing...
git commit -m "%commit_msg%"

echo.
echo Pushing to YOUR fork...
git push origin harshh-day-%day_num%

echo.
echo ========================================
echo SUCCESS! Files pushed to your fork.
echo.
echo NEXT STEP:
echo 1. Go to: https://github.com/harshh-code/PG-Finder-React
echo 2. Click "Pull Request" button
echo 3. Create PR to ros-han113/PG-Finder-React
echo 4. Wait for merge
echo.
echo After merge, you'll get green dot on GitHub!
echo ========================================
pause

REM Return to main branch
git checkout main
