import sys
from types import ModuleType
import os
import json
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil

import aicore.config as config
from aicore.chatbot import chatbot

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Serve Web Model Files Staticallly ---
# This allows the frontend to fetching model.json and shard files
if os.path.exists(config.WEB_MODEL_DIR):
    app.mount("/model", StaticFiles(directory=config.WEB_MODEL_DIR), name="model")
    print(f"Serving web model from {config.WEB_MODEL_DIR} at /model")
else:
    print(f"WARNING: Web model directory not found at {config.WEB_MODEL_DIR}")

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "PetAI API is running! Model available at /model/model.json"}

@app.post("/predict/breed")
async def predict_breed(file: UploadFile = File(...)):
    # This endpoint is deprecated as inference moves to client-side
    # but we keep it returning a helpful message or error for now.
    raise HTTPException(status_code=400, detail="Endpoint deprecated. Please use client-side inference with /model/model.json")

@app.post("/chat")
async def chat(request: ChatRequest):
    response = await chatbot.get_response(request.message)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
