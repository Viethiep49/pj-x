import express from 'express';
import { getMockAIResponse } from '../utils/mockAiEngine.js';
import { protect } from '../middlewares/auth.js';
import { saveScanResult } from '../controllers/aiController.js';
import { getSmartRecommendations } from '../controllers/breedController.js';

const router = express.Router();

/**
 * @route   POST /api/ai/chat
 * @desc    Get mock AI response for demo purposes
 * @access  Private
 */
router.post('/chat', protect, async (req, res, next) => {
    try {
        const { message } = req.body;
        
        // Simulating AI thinking time (1-1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1200));

        const response = getMockAIResponse(message);

        res.json({
            success: true,
            data: {
                reply: response,
                usage: { total_tokens: 0, model: "Mock-Gemini-1.5-Pro" }
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   POST /api/ai/scan-results
 * @desc    Save pet scan result
 * @access  Private
 */
router.post('/scan-results', protect, saveScanResult);

/**
 * @route   GET /api/ai/recommendations
 * @desc    Get smart recommendations by breed name
 * @access  Public (or Private if needed, but usually shop search is public)
 */
router.get('/recommendations', getSmartRecommendations);

export default router;
