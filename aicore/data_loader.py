import os
import tensorflow as tf
from sklearn.model_selection import train_test_split
import aicore.config as config

def extract_breed_name(image_name_prefix):
    """Extracts breed name (everything before the last underscore)."""
    return '_'.join(image_name_prefix.split('_')[:-1])

def get_class_mappings():
    """Parses list.txt to create breed name to label mappings."""
    list_file = os.path.join(config.ANNOTATIONS_DIR, 'list.txt')
    breed_names = []
    
    if not os.path.exists(list_file):
        raise FileNotFoundError(f"Could not find {list_file}")

    with open(list_file, 'r') as f:
        for line in f:
            if line.startswith('#'): continue
            parts = line.split(' ')
            if parts:
                breed_name = extract_breed_name(parts[0])
                if breed_name:
                    breed_names.append(breed_name)

    unique_breeds = sorted(list(set(breed_names)))
    class_to_label = {name: i for i, name in enumerate(unique_breeds)}
    label_to_class = {i: name for i, name in enumerate(unique_breeds)}
    
    return class_to_label, label_to_class

def parse_set_file(file_name, class_to_label):
    """Parses trainval.txt or test.txt."""
    file_path = os.path.join(config.ANNOTATIONS_DIR, file_name)
    image_paths = []
    labels = []
    
    with open(file_path, 'r') as f:
        for line in f:
            if line.startswith('#'): continue
            parts = line.split(' ')
            if len(parts) >= 1:
                prefix = parts[0]
                breed = extract_breed_name(prefix)
                if breed in class_to_label:
                    img_path = os.path.join(config.IMAGES_DIR, f"{prefix}.jpg")
                    if os.path.exists(img_path):
                        image_paths.append(img_path)
                        labels.append(class_to_label[breed])
    return image_paths, labels

def preprocess(image_path, label):
    """Tf.data preprocessing function."""
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, config.IMG_SIZE)
    # MobileNetV2 preprocessing: scaled to [-1, 1]
    image = (image / 127.5) - 1.0
    return image, label

def get_datasets():
    """Main function to get train, val, and test datasets."""
    class_to_label, _ = get_class_mappings()
    
    # Load raw paths
    trainval_paths, trainval_labels = parse_set_file('trainval.txt', class_to_label)
    test_paths, test_labels = parse_set_file('test.txt', class_to_label)
    
    # Split train/val
    train_paths, val_paths, train_labs, val_labs = train_test_split(
        trainval_paths, trainval_labels, test_size=0.2, random_state=42, stratify=trainval_labels
    )
    
    # Create tf.data objects
    def create_ds(paths, labels, shuffle=True):
        ds = tf.data.Dataset.from_tensor_slices((paths, labels))
        ds = ds.map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
        if shuffle:
            ds = ds.shuffle(buffer_size=len(paths))
        return ds.batch(config.BATCH_SIZE).prefetch(tf.data.AUTOTUNE)

    return (
        create_ds(train_paths, train_labs),
        create_ds(val_paths, val_labs, shuffle=False),
        create_ds(test_paths, test_labels, shuffle=False)
    )
