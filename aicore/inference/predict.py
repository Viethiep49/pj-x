import os
import numpy as np
import tensorflow as tf
from PIL import Image
import sys
import json
import tensorflowjs as tfjs

# Thêm thư mục gốc vào path để import được aicore
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import aicore.config as config

def load_trained_model():
    """Khởi tạo model từ định dạng TensorFlow.js."""
    tfjs_model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'web_model')
    model_json_path = os.path.join(tfjs_model_path, 'model.json')
    classes_json_path = os.path.join(tfjs_model_path, 'classes.json')
    
    print("--- Đang khởi tạo model từ TensorFlow.js ---")
    
    if not os.path.exists(model_json_path):
        print(f"ERROR: Không tìm thấy file model.json tại {model_json_path}")
        return None, None

    try:
        # Load model định dạng Keras từ TF.js
        model = tfjs.converters.load_keras_model(model_json_path)
        print("--- Load model thành công! ---")
        
        # Load class names
        with open(classes_json_path, 'r') as f:
            class_names = json.load(f)
        
        return model, class_names
    except Exception as e:
        print(f"ERROR khi load model: {e}")
        return None, None

def preprocess_image(image_path):
    """Tiền xử lý ảnh giống như lúc training."""
    img = Image.open(image_path).convert('RGB')
    img = img.resize(config.IMG_SIZE)
    img_array = np.array(img).astype(np.float32)
    # MobileNetV2 preprocessing: scale về [-1, 1]
    img_array = (img_array / 127.5) - 1.0
    img_array = np.expand_dims(img_array, axis=0) # Thêm batch dimension
    return img_array

def predict(model, class_names, image_path):
    """Dự đoán giống Pet từ ảnh."""
    if model is None or class_names is None:
        return
    
    print(f"\n--- Đang xử lý ảnh: {os.path.basename(image_path)} ---")
    processed_img = preprocess_image(image_path)
    
    predictions = model.predict(processed_img)
    
    class_idx = np.argmax(predictions[0])
    confidence = predictions[0][class_idx] * 100
    
    result = class_names[class_idx]
    print(f"Kết quả dự đoán: {result}")
    print(f"Độ tin cậy: {confidence:.2f}%")
    
    return result, confidence

if __name__ == "__main__":
    # Đường dẫn ảnh mặc định
    default_img = os.path.join(os.path.dirname(__file__), 'poodle.jpg')
    
    img_path = sys.argv[1] if len(sys.argv) > 1 else default_img
    
    if not os.path.exists(img_path):
        print(f"ERROR: Không tìm thấy ảnh tại {img_path}")
    else:
        pet_model, labels = load_trained_model()
        if pet_model:
            predict(pet_model, labels, img_path)
