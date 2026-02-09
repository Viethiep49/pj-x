from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
from aicore.model_factory import create_model
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

# Load Model
MODEL_PATH = "aicore/fine_tuned_mobilenetv2.weights.h5"
NUM_CLASSES = 37 # Oxford Pets
IMG_SIZE = (224, 224)

print("Loading model...")
model = create_model(num_classes=NUM_CLASSES)
if os.path.exists(MODEL_PATH):
    model.load_weights(MODEL_PATH)
    print("Model loaded successfully.")
else:
    print(f"Warning: Model weights not found at {MODEL_PATH}")

# Class names (You might want to load this from a file or config)
CLASS_NAMES = [
    'Abyssinian', 'American_Bulldog', 'American_Pit_Bull_Terrier', 'Basset_Hound',
    'Beagle', 'Bengal', 'Birman', 'Bombay', 'Boxer', 'British_Shorthair',
    'Chihuahua', 'Egyptian_Mau', 'English_Cocker_Spaniel', 'English_Setter',
    'German_Shorthaired', 'Great_Pyrenees', 'Havanese', 'Japanese_Chin',
    'Keeshond', 'Leonberger', 'Maine_Coon', 'Miniature_Pinscher', 'Newfoundland',
    'Persian', 'Pomeranian', 'Pug', 'Ragdoll', 'Russian_Blue', 'Saint_Bernard',
    'Samoyed', 'Scottish_Terrier', 'Shiba_Inu', 'Siamese', 'Sphynx',
    'Staffordshire_Bull_Terrier', 'Wheaten_Terrier', 'Yorkshire_Terrier'
]

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "PetAI API is running!"}

@app.post("/predict/breed")
async def predict_breed(file: UploadFile = File(...)):
    try:
        # Read and preprocess image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        image = image.resize(IMG_SIZE)
        
        img_array = tf.keras.preprocessing.image.img_to_array(image)
        img_array = tf.expand_dims(img_array, 0) # Create batch axis
        img_array = (img_array / 127.5) - 1.0 # Normalize to [-1, 1] for MobileNetV2

        # Predict
        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        
        top_class_index = np.argmax(score)
        confidence = 100 * np.max(score)
        predicted_breed = CLASS_NAMES[top_class_index] if top_class_index < len(CLASS_NAMES) else "Unknown"

        return {
            "breed": predicted_breed,
            "confidence": f"{confidence:.2f}%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    response = await chatbot.get_response(request.message)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
