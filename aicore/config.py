import os

# Project Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Note: User provided path for dataset needs to be verified. 
# Assuming dataset is in a sibling directory or subfolder.
DATASET_DIR = os.path.join(BASE_DIR, 'dataset') 
IMAGES_DIR = os.path.join(DATASET_DIR, 'images', 'images')
ANNOTATIONS_DIR = os.path.join(DATASET_DIR, 'annotations', 'annotations')

# Model Paths
WEIGHTS_PATH = os.path.join(BASE_DIR, 'fine_tuned_mobilenetv2.weights.h5')
EXPORT_PATH = os.path.join(BASE_DIR, 'model', 'web_model')

# Hyperparameters
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 0.001
NUM_CLASSES = 37 # Oxford-IIIT Pet Breeds
