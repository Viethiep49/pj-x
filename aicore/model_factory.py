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
    
    # Create classification head as a sub-sequential to match training structure
    head = tf.keras.Sequential([
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    # Complete model
    model = tf.keras.Sequential([
        base_model,
        head
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=config.LEARNING_RATE),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
        metrics=['accuracy']
    )
    
    return model
