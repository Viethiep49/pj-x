@echo off
setlocal enabledelayedexpansion

echo Starting Pet Grooming Project...

REM ================== 1. AI Core ==================
echo Starting AI Core...

if not exist venv\Scripts\python.exe (
    echo ERROR: venv not found at venv\Scripts\python.exe
    pause
    exit /b 1
)

start "AI Core" cmd /k "venv\Scripts\python.exe -m aicore.api"

REM ================== 2. Backend ==================
echo Starting Backend...

cd backend
start "Backend" cmd /k "npm run dev"
cd ..

REM ================== 3. Frontend ==================
echo Starting Frontend...

cd frontend
start "Frontend" cmd /k "npm run dev"
cd ..

echo.
echo All systems go!
echo AI Core: http://localhost:8000
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Close the opened windows to stop services.
pause
