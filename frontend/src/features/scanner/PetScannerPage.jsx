import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Scan, PawPrint, X, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import axios from 'axios';

// --- API Configuration ---
const API_URL = 'http://localhost:8000'; // Ensure this matches your backend

// --- Component ---
const PetScannerPage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("File size too large (max 5MB)");
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
        if (!image) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post(`${API_URL}/predict/breed`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (err) {
            console.error("Scan error:", err);
            setError("Failed to identify breed. Please check your connection.");
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
                        Upload a photo of your furry friend and let our AI magically identify their breed!
                    </p>
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
                                className="border-3 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-rose-300 hover:bg-rose-50/30 transition-all duration-300 cursor-pointer group"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                />
                                <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Click to Upload</h3>
                                <p className="text-slate-400">or drag and drop your photo here</p>
                                <p className="text-xs text-slate-300 mt-4">Supports JPG, PNG (Max 5MB)</p>
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
                                            Analyzing Breed DNA...
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
                                    <span>Identify Breed</span>
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
                                        <Sparkles className="w-4 h-4" /> Match Found!
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
                                        {result.breed}
                                    </h2>
                                    <p className="text-slate-500 mb-6 flex items-center justify-center gap-2">
                                        Confidence Score: 
                                        <span className="font-bold text-emerald-600">{result.confidence}</span>
                                    </p>
                                    
                                    <div className="flex justify-center gap-4">
                                        <button 
                                            onClick={resetScanner}
                                            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Scan Another
                                        </button>
                                        <button className="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors shadow-lg hover:shadow-slate-800/20">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-slate-400 text-sm mt-8">
                    Note: AI results are estimates. Always consult a professional for confirmation.
                </p>
            </motion.div>
        </div>
    );
};

export default PetScannerPage;
