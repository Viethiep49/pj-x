import os
import numpy as np
import tensorflow as tf
from PIL import Image
import sys

# Thêm thư mục gốc vào path để import được aicore
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import aicore.config as config
from aicore.model_factory import create_model


CLASS_NAMES = [
    'Abyssinian', 'Bengal', 'Birman', 'Bombay', 'British_Shorthair', 
    'Egyptian_Mau', 'Maine_Coon', 'Persian', 'Ragdoll', 'Russian_Blue', 
    'Siamese', 'Sphynx', 'american_bulldog', 'american_pit_bull_terrier', 
    'basset_hound', 'beagle', 'boxer', 'chihuahua', 'english_cocker_spaniel', 
    'english_setter', 'german_shorthaired', 'great_pyrenees', 'havanese', 
    'japanese_chin', 'keeshond', 'leonberger', 'miniature_pinscher', 
    'newfoundland', 'pomeranian', 'pug', 'saint_bernard', 'samoyed', 
    'scottish_terrier', 'shiba_inu', 'staffordshire_bull_terrier', 
    'wheaten_terrier', 'yorkshire_terrier'
]

def load_trained_model():
    """Khởi tạo model và load weight."""
    print("--- Đang khởi tạo model MobileNetV2 ---")
    model = create_model(num_classes=len(CLASS_NAMES))
    
    if os.path.exists(config.WEIGHTS_PATH):
        print(f"--- Đang load weights từ: {config.WEIGHTS_PATH} ---")
        model.load_weights(config.WEIGHTS_PATH)
        print("--- Load weights thành công! ---")
    else:
        print(f"ERROR: Không tìm thấy file weights tại {config.WEIGHTS_PATH}")
        return None
    return model

def preprocess_image(image_path):
    """Tiền xử lý ảnh giống như lúc training."""
    img = Image.open(image_path).convert('RGB')
    img = img.resize(config.IMG_SIZE)
    img_array = np.array(img).astype(np.float32)
    # MobileNetV2 preprocessing: scale về [-1, 1]
    img_array = (img_array / 127.5) - 1.0
    img_array = np.expand_dims(img_array, axis=0) # Thêm batch dimension
    return img_array

def predict(model, image_path):
    """Dự đoán giống Pet từ ảnh."""
    if model is None:
        return
    
    print(f"\n--- Đang xử lý ảnh: {os.path.basename(image_path)} ---")
    processed_img = preprocess_image(image_path)
    
    predictions = model.predict(processed_img)
    score = tf.nn.softmax(predictions[0]) # Nếu model output chưa qua softmax
    # Lưu ý: Model trong model_factory đã có activation='softmax' ở lớp cuối
    # nên predictions[0] chính là xác suất rồi.
    
    class_idx = np.argmax(predictions[0])
    confidence = predictions[0][class_idx] * 100
    
    result = CLASS_NAMES[class_idx]
    print(f"Kết quả dự đoán: {result}")
    print(f"Độ tin cậy: {confidence:.2f}%")
    
    return result, confidence

if __name__ == "__main__":
    # Đường dẫn ảnh mặc định
    default_img = os.path.join(os.path.dirname(__file__), '76cf5b9153b8816802a90187259d8656.jpg')
    
    img_path = sys.argv[1] if len(sys.argv) > 1 else default_img
    
    if not os.path.exists(img_path):
        print(f"ERROR: Không tìm thấy ảnh tại {img_path}")
    else:
        pet_model = load_trained_model()
        predict(pet_model, img_path)
