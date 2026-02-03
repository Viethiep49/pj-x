import os
import tensorflow as tf
import aicore.config as config
from aicore.data_loader import get_datasets
from aicore.model_factory import create_model

def run_training():
    """Main function to train or fine-tune the model."""
    
    print("--- 1. Loading Datasets ---")
    train_ds, val_ds, test_ds = get_datasets()
    
    print("--- 2. Building/Loading Model ---")
    model = create_model()
    
    # Load existing weights if provided
    if os.path.exists(config.WEIGHTS_PATH):
        print(f"Loading weights from: {config.WEIGHTS_PATH}")
        try:
            model.load_weights(config.WEIGHTS_PATH)
            print("Successfully loaded existing weights.")
        except Exception as e:
            print(f"Failed to load weights: {e}. Starting from scratch.")
    else:
        print("No existing weights found. Starting training for a new model.")

    print("--- 3. Starting Training ---")
    callbacks = [
        tf.keras.callbacks.ModelCheckpoint(
            filepath=config.WEIGHTS_PATH,
            save_weights_only=True,
            monitor='val_accuracy',
            mode='max',
            save_best_only=True
        ),
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=3,
            restore_best_weights=True
        )
    ]

    history = model.fit(
        train_ds,
        epochs=config.EPOCHS,
        validation_data=val_ds,
        callbacks=callbacks
    )
    
    print("--- 4. Evaluating on Test Set ---")
    loss, acc = model.evaluate(test_ds)
    print(f"Test Accuracy: {acc:.4f}")
    
    return history

if __name__ == "__main__":
    run_training()
