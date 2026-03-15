import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Scan, PawPrint, X, RefreshCw, Sparkles, AlertCircle, Loader, ShoppingBag, CalendarDays } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// --- API Configuration ---
const API_URL = 'http://localhost:8000'; // Ensure this matches your backend

// --- Component ---
const PetScannerPage = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // AI Model State
    const [tfModel, setTfModel] = useState(null);
    const [classLabels, setClassLabels] = useState([]);
    const [isModelReady, setIsModelReady] = useState(false);
    const [modelLoadingError, setModelLoadingError] = useState(null);

    // Unmount cleanup
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // Load Model on Mount
    useEffect(() => {
        const loadModel = async () => {
            try {
                console.log("Loading model from:", `${API_URL}/model/model.json`);
                // Load Graph Model
                const model = await tf.loadGraphModel(`${API_URL}/model/model.json`);
                setTfModel(model);
                console.log("Model loaded successfully");

                // Load Classes
                const response = await fetch(`${API_URL}/model/classes.json`);
                if (!response.ok) throw new Error("Failed to load class labels");
                const labels = await response.json();
                setClassLabels(labels);
                console.log(`Loaded ${labels.length} classes`);

                setIsModelReady(true);
            } catch (err) {
                console.error("Failed to load AI model:", err);
                setModelLoadingError("Failed to load AI resources. Check backend connection.");
            }
        };

        loadModel();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Kích thước file quá lớn (tối đa 5MB)");
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileChange({ target: { files: [file] } });
        }
    };

    const handleScan = async () => {
        if (!image || !tfModel) return;

        setLoading(true);
        setError(null);

        try {
            // Create an HTMLImageElement to load the image data
            const imgElement = document.createElement('img');
            imgElement.src = preview;
            await new Promise((resolve, reject) => {
                imgElement.onload = resolve;
                imgElement.onerror = reject;
            });

            // Run Inference
            const { breed, confidence } = tf.tidy(() => {
                // 1. From Pixels
                let tensor = tf.browser.fromPixels(imgElement);

                // 2. Resize to 224x224
                tensor = tf.image.resizeBilinear(tensor, [224, 224]);

                // 3. Preprocess (Match Training Script: [0, 1])
                // The training script used img / 255.0
                tensor = tensor.toFloat().div(tf.scalar(255.0));

                // 4. Expand Batch Dimension [1, 224, 224, 3]
                tensor = tensor.expandDims(0);

                // 5. Predict
                const predictions = tfModel.predict(tensor);

                // 6. Get data
                // predictions might be a tensor or array of tensors? 
                // For graph model output usually strictly tensor.
                // MobileNetV2 usually outputs softmax logits or probs.
                // Check if it's logits or softmax. Assuming softmax if confidence is high.
                // If logits, we might need tf.softmax(predictions) but typically model output includes it.

                const scores = predictions.dataSync(); // Sync needed inside tidy? No, dataSync works but best to return values
                const maxScore = Math.max(...scores);
                const maxIndex = scores.indexOf(maxScore);

                const label = classLabels[maxIndex] || "Unknown";
                const conf = (maxScore * 100).toFixed(2);

                return { breed: label, confidence: conf };
            });

            setResult({ breed, confidence: `${confidence}%` });

            // Save scan result to history
            try {
                await api.post('/ai/scan-results', {
                    image_url: preview, // Mock URL for now, in real apps you'd upload first
                    predicted_breed: breed,
                    confidence_score: parseFloat(confidence)
                });
                console.log("Scan result saved to history");
            } catch (err) {
                console.warn("Failed to save scan result:", err);
            }

        } catch (err) {
            console.error("Scan error:", err);
            setError("Không thể nhận diện giống thú cưng. Vui lòng thử ảnh khác.");
        } finally {
            setLoading(false);
        }
    };

    const resetScanner = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const scanLineVariants = {
        scanning: {
            top: ["0%", "100%", "0%"],
            transition: { repeat: Infinity, duration: 2, ease: "linear" }
        }
    };

    return (
        <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-700">
            <motion.div
                className="max-w-3xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-lg mb-4"
                    >
                        <PawPrint className="w-10 h-10 text-rose-500" />
                    </motion.div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl mb-2">
                        Pet <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Scanner</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Tải lên ảnh thú cưng của bạn và AI sẽ giúp bạn nhận diện giống loài một cách thần kỳ!
                    </p>

                    {/* Model Status Indicator */}
                    {!isModelReady && !modelLoadingError && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Đang khởi động AI Model trên trình duyệt...</span>
                        </div>
                    )}
                    {modelLoadingError && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-500 font-medium">
                            <AlertCircle className="w-4 h-4" />
                            <span>{modelLoadingError}</span>
                        </div>
                    )}
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-50"></div>

                    <div className="relative p-8 sm:p-12">

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 border border-red-100"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{error}</p>
                                    <button onClick={() => setError(null)} className="ml-auto hover:bg-red-100 p-1 rounded-full"><X className="w-4 h-4" /></button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Upload Area / Preview */}
                        {!preview ? (
                            <div
                                className={`border-3 border-dashed border-slate-200 rounded-2xl p-12 text-center transition-all duration-300 group
                                    ${!isModelReady ? 'opacity-50 pointer-events-none' : 'hover:border-rose-300 hover:bg-rose-50/30 cursor-pointer'}`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => isModelReady && fileInputRef.current.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={!isModelReady}
                                />
                                <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Nhấn để Tải ảnh lên</h3>
                                <p className="text-slate-400">hoặc kéo thả ảnh vào đây</p>
                                <p className="text-xs text-slate-300 mt-4">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
                            </div>
                        ) : (
                            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video sm:aspect-[4/3] shadow-inner group">
                                <img src={preview} alt="Pet Preview" className="w-full h-full object-contain mx-auto" />

                                {/* Scanning Overlay */}
                                {loading && (
                                    <div className="absolute inset-0 z-10 bg-black/20">
                                        <motion.div
                                            variants={scanLineVariants}
                                            animate="scanning"
                                            className="absolute left-0 right-0 h-1 bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                                        />
                                        <div className="absolute inset-x-0 bottom-8 text-center text-white font-bold tracking-widest uppercase animate-pulse">
                                            Đang phân tích giống loài...
                                        </div>
                                    </div>
                                )}

                                {/* Controls Overlay */}
                                {!loading && !result && (
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={resetScanner}
                                            className="p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-colors"
                                            title="Remove Image"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        {preview && !loading && !result && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 flex justify-center"
                            >
                                <button
                                    onClick={handleScan}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-rose-500/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                                    <Scan className="w-6 h-6" />
                                    <span>Bắt đầu nhận diện</span>
                                </button>
                            </motion.div>
                        )}

                        {/* Result Display */}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full -mt-10 -mr-10 blur-2xl"></div>

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                                        <Sparkles className="w-4 h-4" /> Nhận diện thành công!
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
                                        {result.breed}
                                    </h2>
                                    <p className="text-slate-500 mb-6 flex items-center justify-center gap-2">
                                        Độ chính xác:
                                        <span className="font-bold text-emerald-600">{result.confidence}</span>
                                    </p>

                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <button
                                            onClick={resetScanner}
                                            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Quét ảnh lại
                                        </button>
                                        <button onClick={() => navigate('/booking')} className="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors shadow-lg hover:shadow-slate-800/20 flex items-center justify-center gap-2">
                                            <CalendarDays className="w-4 h-4" /> Đặt lịch Spa
                                        </button>
                                        <button onClick={() => navigate(`/shop?breed=${encodeURIComponent(result.breed)}`)} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-emerald-600/20 flex items-center justify-center gap-2">
                                            <ShoppingBag className="w-4 h-4" /> Xem gợi ý mua sắm
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-slate-400 text-sm mt-8">
                    Lưu ý: Kết quả từ AI mang tính tham khảo. Vui lòng hỏi tư vấn chuyên gia để có thông tin chính xác.
                </p>
            </motion.div>
        </div>
    );
};

export default PetScannerPage;
