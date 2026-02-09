#!/bin/bash

# Function to kill all background processes when the script exits
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p)
    exit
}

# Trap SIGINT (Ctrl+C) to run cleanup
trap cleanup SIGINT

echo "🚀 Starting Pet Grooming Project..."

# 1. Start AI Core (Python/FastAPI)
echo "🤖 Starting AI Core..."
source venv/bin/activate
# Run as module to fix imports
python3 -m aicore.api > aicore_api.log 2>&1 &
AICORE_PID=$!
echo "   -> AI Core running on PID $AICORE_PID"

# 2. Start Backend (Node/Express)
echo "🔙 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "   -> Backend running on PID $BACKEND_PID"
cd ..

# 3. Start Frontend (React/Vite)
echo "🎨 Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "   -> Frontend running on PID $FRONTEND_PID"
cd ..

echo "✅ All systems go!"
echo "   - AI Core: http://localhost:8000"
echo "   - Backend: http://localhost:5000 (check your port)"
echo "   - Frontend: http://localhost:5173"
echo "PRESS CTRL+C TO STOP ALL SERVICES"

# Wait for all background processes
wait
