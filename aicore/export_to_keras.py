import tensorflow as tf
from aicore.model_factory import create_model
import os

def export():
    # 1. Initialize the model with the correct architecture (37 classes for Oxford Pets)
    model = create_model(num_classes=37)
    
    # 2. Path to your weights
    weights_path = 'aicore/fine_tuned_mobilenetv2.weights.h5'
    
    if not os.path.exists(weights_path):
        print(f"Error: Weights file not found at {weights_path}")
        return
        
    # 3. Load the weights
    print(f"Loading weights from {weights_path}...")
    model.load_weights(weights_path)
    
    # 4. Save the full model (Architecture + Weights)
    output_path = 'aicore/model_full.h5'
    print(f"Saving full model to {output_path}...")
    model.save(output_path)
    print("Export successful!")

if __name__ == "__main__":
    export()
