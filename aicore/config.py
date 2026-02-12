import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "1")
DB_NAME = os.getenv("DB_NAME", "pet_grooming")

# Project Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Note: User provided path for dataset needs to be verified. 
# Assuming dataset is in a sibling directory or subfolder.
DATASET_DIR = os.path.join(BASE_DIR, 'dataset') 
IMAGES_DIR = os.path.join(DATASET_DIR, 'images', 'images')
ANNOTATIONS_DIR = os.path.join(DATASET_DIR, 'annotations', 'annotations')

# Model Paths
# Model Paths
# Using the TF.js model as the single source of truth
WEB_MODEL_DIR = os.path.join(BASE_DIR, 'web_model')
MODEL_JSON_PATH = os.path.join(WEB_MODEL_DIR, 'model.json')
CLASSES_JSON_PATH = os.path.join(WEB_MODEL_DIR, 'classes.json')

# Deprecated paths (kept for reference if training script is revived)
WEIGHTS_PATH = os.path.join(BASE_DIR, 'fine_tuned_mobilenetv2.weights.h5')
EXPORT_PATH = os.path.join(BASE_DIR, 'model', 'web_model')

# Hyperparameters
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 0.001
NUM_CLASSES = 37 # Oxford-IIIT Pet Breeds
