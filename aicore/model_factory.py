import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
import aicore.config as config

def create_model(num_classes=config.NUM_CLASSES):
    """Creates the MobileNetV2 model with custom classification head."""
    
    # Load base model
    base_model = MobileNetV2(
        input_shape=(*config.IMG_SIZE, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze the base model by default
    base_model.trainable = False
    
    # Define classification head
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(128, activation='relu'),
        # Add dropout for better generalization
        tf.keras.layers.Dropout(0.2), 
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=config.LEARNING_RATE),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
        metrics=['accuracy']
    )
    
    return model
