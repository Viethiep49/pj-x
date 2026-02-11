import sys
from types import ModuleType
import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import shutil

import aicore.config as config
from aicore.chatbot import chatbot

app = FastAPI()

# Database Connection Dependency
def get_db_connection():
    conn = psycopg2.connect(
        host=config.DB_HOST,
        port=config.DB_PORT,
        user=config.DB_USER,
        password=config.DB_PASSWORD,
        database=config.DB_NAME
    )
    return conn

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Serve Web Model Files Staticallly ---
if os.path.exists(config.WEB_MODEL_DIR):
    app.mount("/model", StaticFiles(directory=config.WEB_MODEL_DIR), name="model")
    print(f"Serving web model from {config.WEB_MODEL_DIR} at /model")
else:
    print(f"WARNING: Web model directory not found at {config.WEB_MODEL_DIR}")

# --- Pydantic Models ---
class ChatRequest(BaseModel):
    message: str

class ScanResultRequest(BaseModel):
    user_id: Optional[str] = None # UUID string, optional for guests
    pet_id: Optional[str] = None # UUID string, optional
    breed: str
    confidence: float
    image_url: str
    top_3_predictions: List[Dict[str, Any]] # [{"breed": "Beagle", "confidence": 0.95}, ...]

# --- Endpoints ---

@app.get("/")
def home():
    return {"message": "PetAI API is running! Model available at /model/model.json"}

@app.post("/chat")
async def chat(request: ChatRequest):
    response = await chatbot.get_response(request.message)
    return {"response": response}

@app.post("/api/ai/scan-results")
async def save_scan_result(request: ScanResultRequest):
    """
    Save the scan result to the database.
    Expects breed name to match the 'name' column in 'breeds' table to resolve UUID.
    """
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # 1. Resolve breed_id from breed name
        cur.execute("SELECT id FROM breeds WHERE name = %s OR display_name = %s", (request.breed, request.breed))
        breed_record = cur.fetchone()
        
        breed_id = breed_record['id'] if breed_record else None

        if not breed_id:
             print(f"Warning: Breed '{request.breed}' not found in DB. Saving with NULL breed_id.")

        # 2. Insert into scan_results
        insert_query = """
            INSERT INTO scan_results (user_id, pet_id, breed_id, confidence, image_url, top_3_predictions)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, created_at;
        """
        cur.execute(insert_query, (
            request.user_id,
            request.pet_id,
            breed_id,
            request.confidence,
            request.image_url,
            json.dumps(request.top_3_predictions)
        ))
        
        new_scan = cur.fetchone()
        conn.commit()
        
        return {
            "success": True,
            "message": "Scan result saved successfully",
            "data": {
                "id": new_scan['id'],
                "created_at": new_scan['created_at'],
                "breed_resolved": breed_id is not None
            }
        }

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
