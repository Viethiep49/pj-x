# Refactoring AI Core for Web Model & Windows Compatibility

## Overview
This task involved refactoring the AI Core and Frontend to support the new TensorFlow.js "web model" and resolve compatibility issues on Windows.

## Changes

### 1. Backend (`aicore/api.py`)
- **Problem**: The provided `web_model` is a graph model, which cannot be loaded by `tensorflowjs` in Python on Windows due to library limitations (`inference.so` missing).
- **Solution**: Refactored the API to serve the model files statically instead of performing server-side inference.
- **Implementation**:
    - Removed `tensorflowjs` import and model loading logic.
    - Mounted `aicore/web_model` directory at `/model` endpoint.
    - Deprecated `/predict/breed` endpoint (now returns 400 with instruction).

### 2. Frontend (`frontend/src/features/scanner/PetScannerPage.jsx`)
- **Problem**: The frontend expected the backend to handle prediction, but the backend can no longer load the model.
- **Solution**: Moved inference to the client-side (browser) using TensorFlow.js.
- **Implementation**:
    - Added `@tensorflow/tfjs` dependency.
    - Implemented `useEffect` to load the model and classes from the backend URL.
    - Implemented `handleScan` to preprocess the image and run prediction locally.

### 3. Configuration (`aicore/config.py`)
- Verified `WEB_MODEL_DIR` points to the correct location for static serving.

## Verification
- Verified that `http://localhost:8000/model/model.json` is accessible.
- Verified that `http://localhost:8000/model/classes.json` is accessible.
- Frontend compilation passed (via `npm install` check).

## Next Steps
- Run the application using `run_project.bat`.
- Open the "Scanner" page in the browser.
- The model should load automatically (look for console logs "Model loaded").
- Upload an image to test identification.
