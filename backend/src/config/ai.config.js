import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

/**
 * AI Core Config
 * Cấu hình kết nối từ Backend sang AI Core Service (FastAPI) để gọi tính năng phân tích hình ảnh thú cưng
 */

const AICORE_BASE_URL = process.env.AICORE_URL || 'http://localhost:8000'; // Port mặc định của FastAPI

/**
 * Hàm gửi dữ liệu và hình ảnh lên AI server để Scan Giống (Pet Scanning)
 */
export const scanPetImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await axios.post(`${AICORE_BASE_URL}/api/ai/scan-results`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error(`[AI Core] Lỗi Scan Hình Ảnh: ${error.message}`);
        throw error;
    }
};

/**
 * Lấy AI Recommendations (sản phẩm, dịch vụ) theo loại Breed ID
 */
export const getAiRecommendations = async (breedId) => {
    try {
        const response = await axios.get(`${AICORE_BASE_URL}/api/ai/recommendations/${breedId}`);
        return response.data;
    } catch (error) {
        console.error(`[AI Core] Lỗi lấy Recommendations: ${error.message}`);
        throw error;
    }
};

export default {
    scanPetImage,
    getAiRecommendations,
};
