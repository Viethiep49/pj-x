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
    user_id: Optional[str] = None
    pet_id: Optional[str] = None
    breed: str
    confidence: float
    image_url: str
    top_3_predictions: List[Dict[str, Any]]

# --- Endpoints ---

@app.get("/")
def home():
    return {"message": "PetAI API is running! Model available at /model/model.json"}

@app.post("/api/ai/chat")
async def chat(request: ChatRequest):
    response = await chatbot.get_response(request.message)
    return {"response": response}

@app.post("/api/ai/scan-results")
async def save_scan_result(request: ScanResultRequest):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("SELECT id FROM breeds WHERE name = %s OR display_name = %s", (request.breed, request.breed))
        breed_record = cur.fetchone()
        breed_id = breed_record['id'] if breed_record else None

        if not breed_id:
            print(f"Warning: Breed '{request.breed}' not found in DB. Saving with NULL breed_id.")

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


@app.get("/api/ai/recommendations/{breed_id}")
async def get_recommendations(breed_id: str):
    """Get product & service recommendations for a specific breed."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("SELECT * FROM breeds WHERE id = %s", (breed_id,))
        breed = cur.fetchone()
        if not breed:
            raise HTTPException(status_code=404, detail="Breed not found")

        cur.execute("""
            SELECT br.recommendation_type, br.recommendation_reason, br.priority,
                   p.id as product_id, p.name as product_name, p.price,
                   p.sale_price, p.image_url, p.slug,
                   s.id as service_id, s.name as service_name, s.price as service_price
            FROM breed_recommendations br
            LEFT JOIN products p ON br.product_id = p.id AND p.is_active = true
            LEFT JOIN services s ON br.service_id = s.id AND s.is_active = true
            WHERE br.breed_id = %s
            ORDER BY br.priority DESC, br.recommendation_type
        """, (breed_id,))
        recommendations = cur.fetchall()

        # Fallback: suggest by species/fur_type if no specific recommendations
        if not recommendations:
            cur.execute("""
                SELECT id, name, price, sale_price, image_url, slug,
                       target_species, target_fur_type, target_size
                FROM products
                WHERE is_active = true
                  AND (target_species = %s OR target_species = 'both')
                  AND (target_fur_type = %s OR target_fur_type = 'all')
                ORDER BY rating_avg DESC
                LIMIT 8
            """, (breed['species'], breed['fur_type']))
            fallback_products = cur.fetchall()
            return {
                "success": True,
                "breed": dict(breed),
                "recommendations": [],
                "suggested_products": [dict(p) for p in fallback_products],
                "note": "Generic suggestions based on breed characteristics"
            }

        return {
            "success": True,
            "breed": dict(breed),
            "recommendations": [dict(r) for r in recommendations]
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn:
            conn.close()


@app.get("/api/ai/analytics")
async def get_analytics():
    """Admin analytics dashboard: scan stats, appointments, orders."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("""
            SELECT COUNT(*) as total_scans,
                   COUNT(DISTINCT user_id) as unique_users,
                   AVG(confidence) as avg_confidence
            FROM scan_results
        """)
        scan_stats = cur.fetchone()

        cur.execute("""
            SELECT b.display_name, b.species, COUNT(sr.id) as scan_count
            FROM scan_results sr
            JOIN breeds b ON sr.breed_id = b.id
            GROUP BY b.id, b.display_name, b.species
            ORDER BY scan_count DESC
            LIMIT 5
        """)
        top_breeds = cur.fetchall()

        cur.execute("""
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM scan_results
            WHERE created_at >= NOW() - INTERVAL '7 days'
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        """)
        recent_scans = cur.fetchall()

        cur.execute("SELECT status, COUNT(*) as count FROM appointments GROUP BY status")
        appointment_stats = cur.fetchall()

        cur.execute("""
            SELECT status, COUNT(*) as count, SUM(total_amount) as revenue
            FROM orders GROUP BY status
        """)
        order_stats = cur.fetchall()

        return {
            "success": True,
            "data": {
                "scans": {
                    "total": int(scan_stats['total_scans'] or 0),
                    "unique_users": int(scan_stats['unique_users'] or 0),
                    "avg_confidence": float(scan_stats['avg_confidence'] or 0),
                    "top_breeds": [dict(b) for b in top_breeds],
                    "daily_trend": [dict(r) for r in recent_scans],
                },
                "appointments": {s['status']: int(s['count']) for s in appointment_stats},
                "orders": {
                    s['status']: {
                        "count": int(s['count']),
                        "revenue": float(s['revenue'] or 0)
                    } for s in order_stats
                },
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    import uvicorn
    # Using string reference enables hot-reload
    uvicorn.run("aicore.api:app", host="0.0.0.0", port=8000, reload=True)
