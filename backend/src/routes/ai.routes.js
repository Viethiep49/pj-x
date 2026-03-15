import express from 'express';
import { getMockAIResponse } from '../utils/mockAiEngine.js';
import { protect } from '../middlewares/auth.js';

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

export default router;
